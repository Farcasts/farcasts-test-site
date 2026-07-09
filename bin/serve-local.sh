#!/usr/bin/env bash
# Serve the test site against a local dashboard dev server instead of prod.
# Rewrites the applier script src into a throwaway .local/ build (gitignored),
# the published pages keep their https://app.farcasts.com origin untouched.
#   bin/serve-local.sh [applier-origin] [port]
set -euo pipefail
cd "$(dirname "$0")/.."
origin="${1:-http://localhost:3000}"
port="${2:-8788}"
mkdir -p .local
for f in *.html; do
  sed "s|https://app.farcasts.com/farcasts.js|$origin/farcasts.js|" "$f" > ".local/$f"
done
cp -R aster.css assets .local/
echo "serving http://localhost:$port with applier from $origin/farcasts.js"
python3 -m http.server "$port" --directory .local
