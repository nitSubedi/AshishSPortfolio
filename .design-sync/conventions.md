## Conventions

This is a personal documentary-filmmaker portfolio site (React + Vite, no component library, no TypeScript). The 9 synced components are the site's real page sections, pulled directly from `src/App.jsx` — not a generic UI kit. There is no provider/theme wrapper to set up: components read no context, so `<FilmsSection />` etc. render standalone with zero setup.

### Styling idiom: semantic classes + CSS custom-property tokens (not Tailwind)

The project has Tailwind configured, but the **live** components style entirely through hand-written semantic class names (`.card`, `.featured`, `.topbar`, `.section-head`, `.folder`, `.contact-card`, `.lightbox-overlay`, `.tab-panel`, `.grid` / `.grid-3`, ...) defined in `src/index.css`, driven by CSS custom-property tokens declared on `:root`:

```css
--bg     /* page background, warm off-white */
--bg-2   /* secondary surface / image placeholder background */
--ink    /* primary text */
--ink-2  /* secondary text */
--ink-3  /* tertiary / label text (eyebrows, mono captions) */
--rule   /* hairline borders/dividers */
--accent /* single accent color — hover states, active underline */
--serif  /* "Instrument Serif" — headings, editorial lede text */
--sans   /* "Geist" — body/UI text */
--mono   /* "Geist Mono" — eyebrows, labels, uppercase micro-text */
```

Build new layout by adding a semantic class + a rule in the same idiom (`var(--ink-2)` for secondary text, `var(--serif)` for any heading-weight text), not by reaching for Tailwind utilities — Tailwind classes exist in the codebase but belong to an earlier, now-unused version of the site (excluded from this sync).

### Fonts

`Instrument Serif`, `Geist`, and `Geist Mono` are loaded at runtime from Google Fonts (no shipped `@font-face`) — already wired via `runtimeFontPrefixes` in this sync, so no action needed; just use the `--serif` / `--sans` / `--mono` vars rather than naming the families directly.

### Where the truth lives

`styles.css` (imports `_ds_bundle.css`, which holds the compiled component CSS) and `tokens/` carry the real token values — read those before styling. Each component's `.prompt.md` shows its real usage.

### Idiomatic example

```jsx
import { FilmCard } from 'portfolio';

<div className="grid">
  <FilmCard film={{
    id: 'griot',
    title: 'Griot of the South',
    role: 'Director, Cinematographer, Editor',
    image: '/projects/griot/cover.png',
    description: 'A short musical documentary about John Mohead...',
  }} />
</div>
```

### Known gap

Image `src` paths throughout (`/projects/...`, `/about-portrait.jpg`) are site-relative and won't resolve outside the live site's `public/` folder — previews show the `--bg-2` placeholder in their place. This is expected, not a bundling defect.
