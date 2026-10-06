# MMW FACTORY METHODOLOGY v1.2

Effective: 2026-10-06

0 Protect — record known-good state and rollback.
1 Diagnose — define scope, exclusions, affected systems and regression surface.
2 Specify — acceptance criteria, invariants and applicable rules before build.
3 Build — smallest coherent change; no silent refactor.
4 Static/integrity QA — syntax, data, media, public-language checks.
5 Runtime QA — real interactions, forms, economics and critical paths.
6 Regression — shared changes require cross-project checks.
7 Commercial QA — clarity, duplication, CTAs, identity, mobile, honesty.
8 Release decision — record evidence, limitations and rollback.
9 Post-release verification — verify deployed artifact, not source only.

## Media import protocol — binding

The web is a SOURCE OF REFERENCE, never a runtime media dependency.

Required chain:
WEB SOURCE → CONTROLLED IMPORT → LOCAL PROJECT ASSET → SEMANTIC PLACEMENT → PROVENANCE → QA → LIVE

Rules:
1. Select media against the exact semantic purpose of the target block/card/section.
2. Download the selected source asset into the controlled project workspace before publication.
3. Store the published media physically inside the project/repository asset tree; external image URLs are not acceptable as production runtime sources.
4. Use stable, semantic filenames tied to project and placement purpose; do not keep opaque source filenames when a meaningful name is possible.
5. Record provenance in the project's SOURCES.md or equivalent source register: source page, asset identity where available, import date, usage purpose and any applicable license/rights note.
6. Validate file type, readability, dimensions, integrity and reasonable size before placement.
7. Check for duplicates and near-duplicates within the page/project asset set.
8. Each image must have one declared semantic placement. Reuse is prohibited when the page standard requires unique imagery.
9. Do not generate substitute imagery when the requirement is for real/source photography.
10. Do not load production imagery dynamically from Pexels, Unsplash, stock/CDN pages or other external hosts after deployment.
11. Do not introduce an automated workflow that silently downloads or replaces production media from the web. Any import must be controlled, reviewable and committed.
12. A page with missing provenance, external runtime media, broken local assets, duplicate media or semantically mismatched media fails the Media Gate G3.
13. Replacing an asset means replacing the controlled local asset and updating provenance; old variants must not remain layered into the live page unless explicitly archived.
14. Media changes require integrity QA and, when placement or interaction changes, the applicable runtime/commercial QA.

## Media source hierarchy

Preferred:
1. User-owned/project assets.
2. Controlled web import from a verified source with documented rights/usage conditions.
3. Other explicitly approved sources.

Never:
- runtime hotlinking;
- undocumented downloads;
- generated external placeholders presented as real project photography;
- random decorative substitutions;
- untracked media copied between projects.

## Evidence required for Media Gate G3

- local asset path exists;
- source register exists and matches the asset;
- no production external image dependency;
- no duplicate where uniqueness is required;
- semantic placement is documented/obvious;
- asset renders correctly;
- replacement did not leave stale layers or references.

P0 security/data loss/production/parity/constitutional failure; P1 major functional/commercial/cross-project failure; P2 material UX/content/visual issue; P3 polish.
