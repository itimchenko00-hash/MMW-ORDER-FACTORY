#!/usr/bin/env bash
set -euo pipefail

ROOT="MMW-COMPANY/2 — WORKING"
ASSET_ROOT="$ROOT/public/ASSETS/CARPATHIA/photos/web-selected"
JOURNEY="$ASSET_ROOT/journey-2026-10-08"
PAGE="$ROOT/public/carpathia.html"

# Idempotent: once the controlled journey set is present, do not touch it again.
if [[ -f "$JOURNEY/01-arrival.jpg" && -f "$JOURNEY/02-accommodation.jpg" && -f "$JOURNEY/03-experience.jpg" && -f "$JOURNEY/04-recovery.jpg" && -f "$JOURNEY/05-return.jpg" ]]; then
  exit 0
fi

mkdir -p "$JOURNEY"

curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/9479356/pexels-photo-9479356.jpeg?cs=srgb&dl=pexels-kalei-garcia-104294085-9479356.jpg&fm=jpg" -o "$JOURNEY/01-arrival.jpg"
curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/30722813/pexels-photo-30722813.jpeg?cs=srgb&dl=pexels-mdkamal-30722813.jpg&fm=jpg" -o "$JOURNEY/02-accommodation.jpg"
curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/9048781/pexels-photo-9048781.jpeg?cs=srgb&dl=pexels-alexmaksin55-9048781.jpg&fm=jpg" -o "$JOURNEY/03-experience.jpg"
curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/34155276/pexels-photo-34155276.jpeg?cs=srgb&dl=pexels-sasha-vukovic-449306304-34155276.jpg&fm=jpg" -o "$JOURNEY/04-recovery.jpg"
curl -L --fail --retry 4 --retry-delay 2 -A 'MMW-COMPANY controlled media import' "https://images.pexels.com/photos/6862444/pexels-photo-6862444.jpeg?cs=srgb&dl=pexels-cottonbro-6862444.jpg&fm=jpg" -o "$JOURNEY/05-return.jpg"

for f in "$JOURNEY"/*.jpg; do
  test "$(wc -c < "$f")" -gt 10000
done

# Five new binaries must be unique among themselves and must not duplicate any
# existing CARPATHIA binary already present in the active project asset tree.
declare -A NEW_HASHES=()
for f in "$JOURNEY"/*.jpg; do
  h="$(sha256sum "$f" | awk '{print $1}')"
  if [[ -n "${NEW_HASHES[$h]:-}" ]]; then
    echo "Duplicate inside journey import: $f"
    exit 1
  fi
  NEW_HASHES[$h]=1
done

while read -r h f; do
  case "$f" in
    "$JOURNEY"/*) continue ;;
  esac
  if [[ -n "${NEW_HASHES[$h]:-}" ]]; then
    echo "Journey binary duplicates existing CARPATHIA asset: $f"
    exit 1
  fi
done < <(find "$ASSET_ROOT" -type f -iname '*.jpg' -print0 | xargs -0 sha256sum)

cat > "$JOURNEY/SOURCES.md" <<'EOF'
# CARPATHIA ECO LODGE — Journey media provenance

Controlled import: 2026-10-08

These five photographs are local project assets. They are used as semantic visual context for the guest journey and are not presented as photographs of a realized CARPATHIA ECO LODGE. Runtime image references are local-only.

| Asset | Placement | Source | Author | License |
|---|---|---|---|---|
| 01-arrival.jpg | 01 ПРИЕЗД — логистика, трансфер, первый контакт с территорией | https://www.pexels.com/photo/cars-traveling-on-mountain-road-9479356/ | Kalei garcia | Pexels Free to use |
| 02-accommodation.jpg | 02 РАЗМЕЩЕНИЕ — комфорт, приватность, вид, сон | https://www.pexels.com/photo/modern-hotel-room-with-scenic-view-30722813/ | mohd hasan | Pexels Free to use |
| 03-experience.jpg | 03 ОПЫТ — маршруты, природа и активность | https://www.pexels.com/photo/people-hiking-in-mountains-9048781/ | Александр Максин | Pexels Free to use |
| 04-recovery.jpg | 04 ВОССТАНОВЛЕНИЕ — wellness, сауна, тишина | https://www.pexels.com/photo/modern-cylindrical-sauna-in-forest-setting-34155276/ | Sasha Vukovic | Pexels Free to use |
| 05-return.jpg | 05 ВОЗВРАТ — цифровой канал повторного бронирования | https://www.pexels.com/photo/a-person-s-hands-typing-on-a-laptop-6862444/ | cottonbro studio | Pexels Free to use |

QA gates:
- controlled local binary import;
- five unique SHA-256 hashes;
- no binary duplicate against the existing CARPATHIA JPG asset tree;
- semantic placement mapped 1:1 to the five journey stages;
- no external runtime image URLs;
- source, author and license recorded.
EOF

python3 <<'PY'
from pathlib import Path
p = Path("MMW-COMPANY/2 — WORKING/public/carpathia.html")
s = p.read_text(encoding="utf-8")

css = """.journeyMedia{margin:0 0 14px;border-radius:16px;overflow:hidden;border:1px solid var(--line);background:#e9e3d7}
.journeyMedia img{display:block;width:100%;height:145px;object-fit:cover}
.journeyMedia figcaption{padding:7px 9px;font-size:8px;line-height:1.3;color:var(--mut);background:#fff}
"""
if ".journeyMedia{" not in s:
    s = s.replace("</style>", css + "</style>", 1)

if "journey-2026-10-08/01-arrival.jpg" not in s:
    anchor = 'document.getElementById("journey").innerHTML=J.map(x=>\'<div class="step"><b>\'+x[0]+\'</b><strong>\'+x[1]+\'</strong><span>\'+x[2]+\'</span></div>\').join("");'
    repl = 'const J_MEDIA=["ASSETS/CARPATHIA/photos/web-selected/journey-2026-10-08/01-arrival.jpg","ASSETS/CARPATHIA/photos/web-selected/journey-2026-10-08/02-accommodation.jpg","ASSETS/CARPATHIA/photos/web-selected/journey-2026-10-08/03-experience.jpg","ASSETS/CARPATHIA/photos/web-selected/journey-2026-10-08/04-recovery.jpg","ASSETS/CARPATHIA/photos/web-selected/journey-2026-10-08/05-return.jpg"];document.getElementById("journey").innerHTML=J.map((x,i)=>\'<div class="step"><figure class="journeyMedia"><img src="\'+J_MEDIA[i]+\'" alt="\'+x[1]+\' — визуальный контекст пути гостя"><figcaption>Реальный визуальный контекст сценария · не фотография реализованного объекта.</figcaption></figure><b>\'+x[0]+\'</b><strong>\'+x[1]+\'</strong><span>\'+x[2]+\'</span></div>\').join("");'
    if anchor not in s:
        raise SystemExit("Journey render anchor not found")
    s = s.replace(anchor, repl, 1)

p.write_text(s, encoding="utf-8")
PY

git config user.name "MMW-COMPANY Factory"
git config user.email "itimchenko00-hash@users.noreply.github.com"
git add "$ROOT/public/ASSETS/CARPATHIA/photos/web-selected/journey-2026-10-08" "$PAGE"
git commit -m "CARPATHIA: import unique journey media"
git push origin MMW-COMPANY-WORKSPACE-V1-2026-10-05
