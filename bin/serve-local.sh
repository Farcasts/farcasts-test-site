#!/usr/bin/env bash
# Serve the test site against a local dashboard dev server instead of prod.
# Rewrites the applier script src into a throwaway .local/ build (gitignored),
# the published pages keep their production origin untouched.
#   bin/serve-local.sh [applier-origin] [port]
set -euo pipefail
cd "$(dirname "$0")/.."
origin="${1:-http://localhost:3000}"
port="${2:-8788}"
mkdir -p .local
# Rewrite ONLY the origin of the farcasts gate/applier tag, keeping whatever
# filename the page declares (farcasts.js, farcasts_dev.js, ...). Matching a
# fixed host+filename literal silently no-ops the moment either changes (e.g.
# a page moved from app.farcasts.com/farcasts.js to dev.farcasts.com/farcasts_dev.js),
# leaving the served page pointed at the remote dashboard. This keys on the
# host pattern instead so any farcasts origin and any bundle name is redirected.
count=0
for f in *.html; do
  sed -E "s#https?://[a-z0-9.-]*farcasts\.com(/farcasts[_.a-z-]*\.js)#$origin\1#g" "$f" > ".local/$f"
  cmp -s "$f" ".local/$f" || count=$((count + 1))
done
[ "$count" -gt 0 ] || echo "WARNING: no farcasts script src rewritten in any *.html (page markup changed?)" >&2
cp -R aster.css assets .local/
echo "serving http://localhost:$port with the farcasts gate rewritten to $origin"
python3 -m http.server "$port" --directory .local
