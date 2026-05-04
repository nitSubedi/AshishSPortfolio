/**
 * Convert an original image path to its optimized WebP variant.
 * e.g. "/projects/landscape/DSC08877.JPG" ->
 *   thumb: "/projects/optimized/landscape/DSC08877-thumb.webp"
 *   full:  "/projects/optimized/landscape/DSC08877-full.webp"
 *
 * External URLs (http) are returned as-is.
 */
export function thumbUrl(src) {
  if (!src || src.startsWith('http')) return src;
  return toOptimized(src, 'thumb');
}

export function fullUrl(src) {
  if (!src || src.startsWith('http')) return src;
  return toOptimized(src, 'full');
}

function toOptimized(src, suffix) {
  // "/projects/landscape/DSC08877.JPG" -> parts
  const idx = src.indexOf('/projects/');
  if (idx === -1) return src;

  const rest = src.slice(idx + '/projects/'.length); // "landscape/DSC08877.JPG"
  const lastSlash = rest.lastIndexOf('/');
  const dir = rest.slice(0, lastSlash);              // "landscape"
  const file = rest.slice(lastSlash + 1);            // "DSC08877.JPG"
  const base = file.replace(/\.[^.]+$/, '');         // "DSC08877"

  return `/projects/optimized/${dir}/${base}-${suffix}.webp`;
}
