import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, extname, relative } from 'path';

const PUBLIC = new URL('../public', import.meta.url).pathname;
const PROJECTS = join(PUBLIC, 'projects');

// Output sizes
const THUMB_WIDTH = 800;   // grid thumbnails
const FULL_WIDTH = 1920;   // lightbox / detail view
const QUALITY = 80;

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip already-optimized directories
      if (entry.name === 'optimized') continue;
      yield* walk(full);
    } else if (IMAGE_EXTS.has(extname(entry.name).toLowerCase()) && !entry.name.startsWith('._')) {
      yield full;
    }
  }
}

async function optimizeImage(src) {
  const rel = relative(PROJECTS, src);
  const dir = join(PROJECTS, 'optimized', rel, '..');
  const base = rel.split('/').pop().replace(/\.[^.]+$/, '');

  await mkdir(dir, { recursive: true });

  const thumbOut = join(dir, `${base}-thumb.webp`);
  const fullOut = join(dir, `${base}-full.webp`);

  // Skip if both outputs already exist and are newer than source
  const srcStat = await stat(src);
  try {
    const [tStat, fStat] = await Promise.all([stat(thumbOut), stat(fullOut)]);
    if (tStat.mtimeMs > srcStat.mtimeMs && fStat.mtimeMs > srcStat.mtimeMs) {
      return null; // already up to date
    }
  } catch {
    // output doesn't exist yet, proceed
  }

  const image = sharp(src).rotate(); // auto-rotate based on EXIF

  const [thumbResult, fullResult] = await Promise.all([
    image.clone().resize(THUMB_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(thumbOut),
    image.clone().resize(FULL_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(fullOut),
  ]);

  return { rel, thumbKB: Math.round(thumbResult.size / 1024), fullKB: Math.round(fullResult.size / 1024) };
}

async function main() {
  console.log('Optimizing images in', PROJECTS);
  let count = 0;
  let skipped = 0;

  for await (const file of walk(PROJECTS)) {
    const result = await optimizeImage(file);
    if (result) {
      console.log(`  ${result.rel} -> thumb: ${result.thumbKB}KB, full: ${result.fullKB}KB`);
      count++;
    } else {
      skipped++;
    }
  }

  console.log(`\nDone. Optimized: ${count}, Skipped (up-to-date): ${skipped}`);
}

main().catch(console.error);
