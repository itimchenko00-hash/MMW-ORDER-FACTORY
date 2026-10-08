#!/usr/bin/env bash
set -euo pipefail
ROOT="MMW-COMPANY/2 — WORKING/public/ASSETS/MMW-COMPANY/catalog"
if [[ $(find "$ROOT" -maxdepth 1 -type f -name '*.jpg' 2>/dev/null | wc -l) -eq 20 ]]; then
  echo "Catalog local media already complete."
  exit 0
fi
TMP="${RUNNER_TEMP}/mmw-catalog"
rm -rf "$TMP" "$ROOT"
mkdir -p "$TMP" "$ROOT"
download(){
  local file="$1" id="$2"
  curl -L --fail --retry 5 --retry-delay 2 --connect-timeout 30 --max-time 180 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/$id/pexels-photo-$id.jpeg?auto=compress&cs=tinysrgb&w=1800" -o "$TMP/$file"
  python - "$TMP/$file" <<'PY'
from pathlib import Path
import sys
b=Path(sys.argv[1]).read_bytes()
if len(b)<10000 or b[:3]!=b"\xff\xd8\xff":
    raise SystemExit(f"Invalid JPEG: {sys.argv[1]} ({len(b)} bytes)")
PY
}
download 01-project-audit.jpg 7947657
download 02-project-concept.jpg 33175651
download 03-business-project.jpg 36733299
download 04-investment-project.jpg 6779226
download 05-business-system.jpg 6804091
download 06-business-restart.jpg 6340632
download 07-business-investor.jpg 7698804
download 08-custom-business-project.jpg 8970671
download 09-large-scale.jpg 36765714
download 10-estimate.jpg 5506079
download 11-site-survey.jpg 7937681
download 12-docs.jpg 8112204
download 13-management.jpg 36766701
download 14-urgent.jpg 7887814
download 15-aladin-residence.jpg 38210395
download 16-carpathia-eco-lodge.jpg 33799052
download 17-nexus-work.jpg 7854200
download 18-nexus-logistics.jpg 221047
download 19-agrohub.jpg 9792176
download 20-energy-park.jpg 7527908
cp "$TMP"/*.jpg "$ROOT"/
cat > "$ROOT/SOURCES.md" <<'EOF'
# MMW-COMPANY catalog media provenance

Controlled import standard:
WEB SOURCE → CONTROLLED IMPORT → LOCAL FACTORY ASSET → SEMANTIC PLACEMENT → PROVENANCE → QA → LIVE

All 20 catalog photographs are committed local binary assets. The catalog does not fetch photographs at runtime.
EOF
test "$(find "$ROOT" -maxdepth 1 -type f -name '*.jpg' | wc -l)" -eq 20
test "$(find "$ROOT" -maxdepth 1 -type f -name '*.jpg' -printf '%s\n' | sort -u | wc -l)" -eq 20
