# MMW-COMPANY — PROJECT MEDIA CONTOUR

## Purpose
Single media contract for all project pages. It separates asset preparation from semantic placement so each project can be prepared first and populated later without changing renderer architecture.

## Canonical pipeline
WEB SOURCE → CONTROLLED IMPORT → LOCAL FACTORY ASSET → SEMANTIC PLACEMENT → PROVENANCE → QA → LIVE

## Runtime rule
Project pages use local Factory assets only.

Repository asset root:
`public/ASSETS/<PROJECT>/photos/web-selected/`

Runtime URL root:
`/ASSETS/<PROJECT>/photos/web-selected/`

External image URLs may exist only during controlled import and must never remain in runtime JS/HTML.

## Ownership
Each project has one controlled asset layer, one provenance register and one semantic placement map.

- Asset layer: `public/ASSETS/<PROJECT>/photos/web-selected/`
- Provenance: `SOURCES.md` in that directory
- Placement: `P[id].media` and, only where a dedicated renderer exists, that renderer's local media map
- QA: every referenced local file exists; every semantic slot resolves; no accidental duplicates

No second loader, runtime CDN fallback or project-specific hotlink mechanism is allowed.

## Atomic import
A project becomes media-ready only when one controlled change contains:
1. approved local files;
2. provenance;
3. semantic naming/manifest;
4. application references;
5. syntax and path QA.

Never connect a path to a file that has not been imported.

## Semantic slots
Common slots:
`hero`, `product-01...`, `market`, `operations`, `economics`, `risk`, `next`.

Projects may add their own slots such as seasons, journey stages or infrastructure layers.

## Anti-duplication
One asset has one primary semantic role. If the visual set is smaller than the number of cards, use a meaningful infographic rather than duplicate a photo.

## Root cause of the previous failures
MMW-COMPANY and ALADIN worked because the local asset path and the renderer that actually displayed the image were aligned. Other projects had partial chains: paths pointed to another directory, a dedicated renderer retained an older media array, or an import workflow targeted another branch. A page could therefore be correct structurally while its images were unreachable.

This contour fixes the architecture by making asset root, provenance, placement ownership and QA explicit before each individual project import.

## Project-specific rule
The common architecture is fixed. Visual selection, semantic mapping, palette and interaction remain individual to each project. Do not copy one project's media map into another.
