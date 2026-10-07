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


## Broken local media recovery — binding troubleshooting method

When a page contains a broken image, first treat the failure as a **path/reference/runtime-resolution problem**, not as a reason to add another media layer.

Required recovery sequence:
1. **Freeze the known-good state** before changing media or routing.
2. **Identify the actual serving root** used by the live service and the exact command that starts it. Do not assume that a repository-level `ASSETS/` directory is the same as the runtime public asset directory.
3. **Trace one broken URL end-to-end**: page reference → requested URL → server route → filesystem path → tracked local binary. Record the exact filename and path.
4. **Reproduce the proven local-asset mechanism** already working on the same project/site. If a known-good project serves assets from `public/ASSETS/<PROJECT>/...`, use that mechanism rather than inventing a parallel one.
5. **Place the real binary asset physically in the active public asset tree**. No runtime hotlinks, generated substitutes, proxy images or placeholder URLs.
6. **Normalize the page reference to the real local asset filename** and search the complete page/source for stale references to the old filename. A single stale Hero/card reference can keep one image broken while all other images work.
7. **Do not stack workarounds** while the root cause is unresolved. Fallback routes, sync scripts, duplicate asset trees and alternate URL layers are not considered a fix by themselves.
8. **Run integrity checks**: asset exists, is tracked, path/case matches exactly, file is readable, and no duplicate/stale reference remains.
9. **Deploy and verify the deployed artifact**, not only the repository source. Confirm the deployment reaches `live`; then perform visual verification of the affected page/image.
10. **Only after live verification**, remove obsolete fallback layers if they are no longer needed, preserving rollback safety.
11. **Document the resolved cause** when it is non-obvious, especially when the failure was caused by a mismatch between the source asset location and the actual public serving root or by a stale filename/reference.

Acceptance condition: the image is a real local project asset, the live page references that exact asset, the server resolves it from the active public tree, no external runtime dependency exists, no stale reference remains, and the deployed page renders the image correctly.

This procedure is now the default method for all MMW-COMPANY project pages when repairing broken or partially missing photography.
