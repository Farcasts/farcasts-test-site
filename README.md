# farcasts test site

The internal test site. It is a copy of the Halo demo site that always points at the
test project (a private clone of the demo project, origin `https://test.farcasts.com`).
It exists so JS configurations can be experimented with separately from the public demo
site, without touching the demo project that the demo depends on. Demo and test carry
the SAME Halo brand and content; they differ only in the install block (dev applier and
tracker here, prod applier on the public demo).

Published at `test.farcasts.com` via GitHub Pages. Every page carries the one-line applier
gate in `<head>`, `https://dev.farcasts.com/farcasts.js` with
`data-farcasts-project="p_a6764214-0a20-4abe-8360-866bc05c26f6"`, plus the tracker.

## Halo

Halo is a fictional clinical dermatology skincare brand. A formulation dossier identity:
porcelain neutrals, one slate-blue data-ink accent, wide sans display, mono for batch and
concentration data. Every product leads with its single active and disclosed concentration.

## Pages

Static, multi page, no build step.

- `index.html`, home. Carries the tested surface plus the store overlays.
- `menu.html`, the Formulary. 18 formulas with a category sidebar and working concern
  filters, quick-view modal, and add-to-cart.
- `story.html`, the Method, how a formula is made and why.
- `visit.html`, the Consult page, studio info, hours, and a booking form.
- `halo.css`, the shared design system (tokens, header, footer, overlays, gate CSS).
- `halo.js`, shared store interactions (cart drawer, quick-view, newsletter popup, sticky promo).

Every footer carries an "Internal test build" marker so this is never confused with the
public demo.

## Embed contract

Every page carries the same install, exactly what a customer has, plain HTML plus the
pinned one-line gate:

- `<script src="https://dev.farcasts.com/farcasts.js" data-farcasts-project="p_a6764214-0a20-4abe-8360-866bc05c26f6">`
  in `<head>` loads the applier gate, pointed at the test project. Keep this value. The
  gate hides the page pre-paint, pre-starts the config fetch, injects the applier itself,
  and reveals on apply, zero frames, timeout, or load failure. No `data-farcasts-gate`
  attributes anywhere, the whole-page gate needs none.
- `data-cf-hide` on the `<html>` element holds the page before paint until the applier
  reveals it. The residual gate CSS in `halo.css` is inert with no gated nodes present.
- The tracker tag at body end points at `https://t.farcasts.com`. Keep the project id and
  track key.
- The tested hero ids on the home page are `hero-headline`, `hero-sub`, `hero-cta`, and
  `hero-image`.

## Deploy

Static site, no build. Served by GitHub Pages from `main` at root. The `CNAME` file pins
the custom domain `test.farcasts.com`.

## Local preview

Serve the folder with any static server, then open it, e.g.
`python3 -m http.server 8000`.
