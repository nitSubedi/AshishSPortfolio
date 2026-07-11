# design-sync notes

## Scope pivot (2026-07-11)

The repo has two component sets:

- `src/components/*.jsx` (Contact, Hero, Lightbox, Portfolio, Sidebar, VideoModal) — **dead code**, last touched 2026-05-20, not imported anywhere in `App.jsx`. Left over from before the "Sam Ho Creative style" redesign. Excluded via `componentSrcMap: null`.
- `src/App.jsx` internal functions (TopBar, FilmsSection, FilmCard, TravelSection, PhotographySection, PhotoLightbox, PhotoLayout, AboutSection, Footer) — **the real live site**. These weren't exported originally; we added `export` to each (purely additive, confirmed via `git diff` — no logic changed) so the sync could discover them. This is what's actually synced.

If the dead `src/components/` files are ever deleted from the repo, remove the corresponding `componentSrcMap: null` entries in config.json (harmless to leave, but they'll be dead config too).

## Synth-entry mode (no dist, no TypeScript)

This isn't a component library — no `dist/`, no `.d.ts`. The build runs in "synth from src/" fallback mode, which requires:

- `node_modules/portfolio` symlinked to the repo root (`ln -sfn .. node_modules/portfolio`) so `PKG_DIR` resolves. Without this, `--node-modules ./node_modules` alone makes package-build.mjs look for `node_modules/portfolio/package.json`, which doesn't exist, and it crashes. **Never pass `--entry`** — any file passed there is treated as a real dist entry and skips synth-mode's src-derivation entirely.
- A forked `.design-sync/overrides/source-kit.mjs` (declared in `cfg.libOverrides`). Two fixes over the stock converter:
  1. Synth-entry's `export * from <file>` never re-exports **default** exports — all 6 real components use `export default`. The fork also emits `export { default as <Name> } from <file>` for each file's resolved default-export name.
  2. `src/main.jsx` (the Vite app entry) was getting swept into the synth-entry file list and its module-level `createRoot(...).render(...)` side effect threw when bundled into a page with no `#root` element (this is exactly the validator's bare `[BUNDLE_EXPORT]` smoke-test page) — silently poisoning the whole bundle IIFE before `window.PortfolioDS` got assigned. The fork excludes `main.jsx`/`index.jsx` from the synth file list.
- Props are hand-written via `cfg.dtsPropsFor` for every component (no TS means no real `.d.ts` to extract from — the auto-extracted stub was `[key: string]: unknown` for everything).
- `docs: 0/9 components matched` and `(0 src-matched)` in build output are expected/harmless — all 9 components live in the same file (`App.jsx`), not their own per-component file, so the fuzzy-find enrichment naturally misses; doesn't affect bundling or props (those come from `dtsPropsFor`).

## Fonts

`Instrument Serif`, `Geist`, `Geist Mono` load from Google Fonts via `<link>` tags in `index.html` (not a CSS `@import`, so the scraper can't see them) — handled via `cfg.runtimeFontPrefixes`, not `extraFonts`.

## Known render warns

- Image `src` values throughout (`/projects/...`, `/about-portrait.jpg`, `/media/...`) are site-relative paths that only resolve on the live site's own `public/` folder — they 404 inside the standalone `ds-bundle` preview server, falling back to the `--bg-2` placeholder background. This is expected across every component with a real image (AboutSection, FilmCard, PhotoLayout, PhotoLightbox) and was accounted for when grading — do not chase it as a defect on re-sync.
- `TopBar` originally flagged `[GRID_OVERFLOW]` (full-width nav bar wider than a grid cell) — fixed via `cfg.overrides.TopBar: {"cardMode": "column"}`. Not expected to re-flag.

## Re-sync risks

- If `App.jsx`'s internal functions get renamed, restructured, or moved to separate files, the `componentSrcMap`/`dtsPropsFor` entries here will silently stop matching — a re-sync would just show fewer/zero components rather than erroring loudly. Worth a quick component-count sanity check after any large `App.jsx` refactor.
- `dtsPropsFor` prop shapes were hand-derived by reading the source once (2026-07-11) — if `FilmCard`'s `film` object shape, `PhotoLayout`'s `layout` enum, or `TopBar`'s `section` enum changes, these will drift stale and should be re-verified against source, not assumed correct.
- The `source-kit.mjs` fork should be diffed against the upstream `lib/source-kit.mjs` on any skill update, per the base skill's troubleshooting section.
