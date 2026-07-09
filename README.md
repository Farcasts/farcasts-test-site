# farcasts test site

The internal test site. It is a copy of the Aster demo site that always points at the
`test-farcasts-com` project (a private clone of the demo project, origin
`https://test.farcasts.com`). It exists so JS configurations can be experimented with
separately from the public demo site, without touching the `demo-farcasts-com` project
that the demo depends on.

Published at `test.farcasts.com` via GitHub Pages. Every page loads the applier from
`https://app.farcasts.com/farcasts.js` with `data-farcasts-project="test-farcasts-com"`.

## Pages

Static, multi page, no build step.

- `index.html`, home. Carries the gated hero, the tested surface.
- `menu.html`, the Field Guide, the season's coffee lots as an almanac.
- `story.html`, the brand story and roastery timeline.
- `visit.html`, hours, address, and a note form.
- `aster.css`, the shared design system (tokens, header, footer, gate CSS).

Every footer carries an "Internal test build" marker so this is never confused with the
public demo.

## Embed contract

`index.html` carries the whole contract on its gated hero:

- `<script src="https://app.farcasts.com/farcasts.js" data-farcasts-project="test-farcasts-com">`
  loads the applier and points it at the test project. Keep this value.
- `data-cf-hide` on the `<html>` element plus `data-farcasts-gate` on each testable
  element hold the gated surfaces at opacity 0 until the variant applies, so no control
  flash. The gate CSS lives in `aster.css`.
- The gated hero ids are `hero-headline`, `hero-sub`, `hero-cta`, and `hero-image`.

Every page includes the same applier script so cross navigation keeps it loaded, but
only the home page declares gated surfaces (that is the tested project).

## Deploy

Static site, no build. Served by GitHub Pages from `main` at root. The `CNAME` file pins
the custom domain `test.farcasts.com`.

## Local preview

Serve the folder with any static server, then open it, e.g.
`python3 -m http.server 8000`.
