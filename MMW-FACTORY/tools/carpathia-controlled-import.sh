#!/usr/bin/env bash
set -euo pipefail

ROOT="MMW-COMPANY/2 — WORKING"
ASSET_ROOT="$ROOT/public/ASSETS/CARPATHIA/photos/web-selected"
JOURNEY="$ASSET_ROOT/journey-2026-10-08"
FORMATS="$ASSET_ROOT/formats"
PAGE="$ROOT/public/carpathia.html"

journey_ready=0
formats_ready=0
if [[ -s "$JOURNEY/01-arrival.jpg" && -s "$JOURNEY/02-accommodation.jpg" && -s "$JOURNEY/03-experience.jpg" && -s "$JOURNEY/04-recovery.jpg" && -s "$JOURNEY/05-return.jpg" ]]; then journey_ready=1; fi
if [[ -s "$FORMATS/01-eco-lodge.jpg" && -s "$FORMATS/02-family-lodge.jpg" && -s "$FORMATS/03-wellness-retreat.jpg" && -s "$FORMATS/04-mountain-workation.jpg" && -s "$FORMATS/05-eco-resort.jpg" && -s "$FORMATS/06-recovery-retreat.jpg" ]]; then formats_ready=1; fi
[[ "$journey_ready" -eq 1 && "$formats_ready" -eq 1 ]] && exit 0

if [[ "$journey_ready" -eq 0 ]]; then
  mkdir -p "$JOURNEY"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/9479356/pexels-photo-9479356.jpeg?cs=srgb&dl=pexels-kalei-garcia-104294085-9479356.jpg&fm=jpg" -o "$JOURNEY/01-arrival.jpg"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/30722813/pexels-photo-30722813.jpeg?cs=srgb&dl=pexels-mdkamal-30722813.jpg&fm=jpg" -o "$JOURNEY/02-accommodation.jpg"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/9048781/pexels-photo-9048781.jpeg?cs=srgb&dl=pexels-alexmaksin55-9048781.jpg&fm=jpg" -o "$JOURNEY/03-experience.jpg"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/34155276/pexels-photo-34155276.jpeg?cs=srgb&dl=pexels-sasha-vukovic-449306304-34155276.jpg&fm=jpg" -o "$JOURNEY/04-recovery.jpg"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/6862444/pexels-photo-6862444.jpeg?cs=srgb&dl=pexels-cottonbro-6862444.jpg&fm=jpg" -o "$JOURNEY/05-return.jpg"
  for f in "$JOURNEY"/*.jpg; do test "$(wc -c < "$f")" -gt 10000; done
  cat > "$JOURNEY/SOURCES.md" <<'EOF'
# CARPATHIA ECO LODGE — Journey media provenance
Controlled import: 2026-10-08
These five photographs are local project assets and visual context, not photographs of a realized CARPATHIA ECO LODGE.
| Asset | Placement | Source | License |
|---|---|---|---|
| 01-arrival.jpg | 01 ПРИЕЗД | https://www.pexels.com/photo/cars-traveling-on-mountain-road-9479356/ | Pexels Free to use |
| 02-accommodation.jpg | 02 РАЗМЕЩЕНИЕ | https://www.pexels.com/photo/modern-hotel-room-with-scenic-view-30722813/ | Pexels Free to use |
| 03-experience.jpg | 03 ОПЫТ | https://www.pexels.com/photo/people-hiking-in-mountains-9048781/ | Pexels Free to use |
| 04-recovery.jpg | 04 ВОССТАНОВЛЕНИЕ | https://www.pexels.com/photo/modern-cylindrical-sauna-in-forest-setting-34155276/ | Pexels Free to use |
| 05-return.jpg | 05 ВОЗВРАТ | https://www.pexels.com/photo/a-person-s-hands-typing-on-a-laptop-6862444/ | Pexels Free to use |
EOF
fi

if [[ "$formats_ready" -eq 0 ]]; then
  mkdir -p "$FORMATS"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/38852783/pexels-photo-38852783.jpeg?auto=compress&cs=tinysrgb&w=1600" -o "$FORMATS/01-eco-lodge.jpg"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/9222068/pexels-photo-9222068.jpeg?auto=compress&cs=tinysrgb&w=1600" -o "$FORMATS/02-family-lodge.jpg"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/19980238/pexels-photo-19980238.jpeg?auto=compress&cs=tinysrgb&w=1600" -o "$FORMATS/03-wellness-retreat.jpg"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/37593643/pexels-photo-37593643.jpeg?auto=compress&cs=tinysrgb&w=1600" -o "$FORMATS/04-mountain-workation.jpg"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/35831683/pexels-photo-35831683.jpeg?auto=compress&cs=tinysrgb&w=1600" -o "$FORMATS/05-eco-resort.jpg"
  curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/9985427/pexels-photo-9985427.jpeg?auto=compress&cs=tinysrgb&w=1600" -o "$FORMATS/06-recovery-retreat.jpg"
  for f in "$FORMATS"/*.jpg; do test "$(wc -c < "$f")" -gt 10000; done
  cat > "$FORMATS/SOURCES.md" <<'EOF'
# CARPATHIA — format media provenance
Controlled local import for six dedicated product-format cards.
| Local asset | Format | Source | License |
|---|---|---|---|
| 01-eco-lodge.jpg | ECO LODGE | https://www.pexels.com/photo/charming-rustic-cabin-amidst-lush-forest-38852783/ | Pexels Free to use |
| 02-family-lodge.jpg | FAMILY LODGE | https://www.pexels.com/photo/family-on-balcony-of-cabin-in-forest-9222068/ | Pexels Free to use |
| 03-wellness-retreat.jpg | WELLNESS RETREAT | https://www.pexels.com/photo/interior-of-sauna-cabin-19980238/ | Pexels Free to use |
| 04-mountain-workation.jpg | MOUNTAIN WORKATION | https://www.pexels.com/photo/remote-work-desk-with-mountain-view-in-winter-37593643/ | Pexels Free to use |
| 05-eco-resort.jpg | ECO RESORT | https://www.pexels.com/photo/aerial-view-of-eco-lodge-with-lush-greenery-35831683/ | Pexels Free to use |
| 06-recovery-retreat.jpg | RECOVERY RETREAT | https://www.pexels.com/photo/woman-doing-yoga-in-forest-9985427/ | Pexels Free to use |
EOF
fi

ALL_IMPORTED="$JOURNEY/*.jpg $FORMATS/*.jpg"
find "$JOURNEY" "$FORMATS" -type f -iname '*.jpg' -print0 | xargs -0 sha256sum | awk '{print $1}' | sort | uniq -d | grep -q . && { echo "Duplicate among imported CARPATHIA assets"; exit 1; } || true
sha256sum "$JOURNEY"/*.jpg > "$JOURNEY/SHA256SUMS.txt"
sha256sum "$FORMATS"/*.jpg > "$FORMATS/SHA256SUMS.txt"

git config user.name "MMW-COMPANY Factory"
git config user.email "itimchenko00-hash@users.noreply.github.com"
git add "$JOURNEY" "$FORMATS" "$PAGE"
git commit -m "CARPATHIA: import unique local format media"
git push origin MMW-COMPANY-WORKSPACE-V1-2026-10-05
