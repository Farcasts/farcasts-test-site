# farcasts test site

The internal test site. It is a copy of the Halo demo site that always points at the
test project (a private clone of the demo project, origin `https://test.farcasts.com`).
It exists so JS configurations can be experimented with separately from the public demo
site, without touching the demo project that the demo depends on. Demo and test carry
the SAME Halo brand and content; they differ only in the install block (dev applier and
tracker here, prod applier on the public demo).

Published at `test.farcasts.com` via GitHub Pages. Every page loads the applier from
`https://dev.farcasts.com/farcasts_dev.js` with
`data-farcasts-project="p_a6764214-0a20-4abe-8360-866bc05c26f6"`, plus the tracker.

## Halo

Halo is a fictional clinical dermatology skincare brand. A formulation dossier identity:
porcelain neutrals, one slate-blue data-ink accent, wide sans display, mono for batch and
concentration data. Every product leads with its single active and disclosed concentration.

## Pages

Static, multi page, no build step.

- `index.html`, home. Carries the gated hero, the tested surface, plus the store overlays.
- `menu.html`, the Formulary. 18 formulas with a category sidebar and working concern
  filters, quick-view modal, and add-to-cart.
- `story.html`, the Method, how a formula is made and why.
- `visit.html`, the Consult page, studio info, hours, and a booking form.
- `halo.css`, the shared design system (tokens, header, footer, overlays, gate CSS).
- `halo.js`, shared store interactions (cart drawer, quick-view, newsletter popup, sticky promo).

Every footer carries an "Internal test build" marker so this is never confused with the
public demo.

## Embed contract

`index.html` carries the whole contract on its gated hero:

- `<script src="https://dev.farcasts.com/farcasts_dev.js" data-farcasts-project="p_a6764214-0a20-4abe-8360-866bc05c26f6">`
  loads the applier and points it at the test project. Keep this value.
- The tracker tag points at `https://t.farcasts.com`. Keep the project id and track key.
- `data-cf-hide` on the `<html>` element plus `data-farcasts-gate` on each testable
  element hold the gated surfaces at opacity 0 until the variant applies, so no control
  flash. The gate CSS lives in `halo.css`.
- The gated hero ids are `hero-headline`, `hero-sub`, `hero-cta`, and `hero-image`.

Every page includes the same applier and tracker scripts so cross navigation keeps them
loaded, but only the home page declares gated surfaces (that is the tested project).

## Deploy

Static site, no build. Served by GitHub Pages from `main` at root. The `CNAME` file pins
the custom domain `test.farcasts.com`.

## Local preview

Serve the folder with any static server, then open it, e.g.
`python3 -m http.server 8000`.
