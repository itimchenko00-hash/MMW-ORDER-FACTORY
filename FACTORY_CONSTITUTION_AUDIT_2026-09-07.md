# FACTORY CONSTITUTION AUDIT — 2026-09-07

## Objective
Bring the current MMW-COMPANY and all active Factory projects to launch-ready condition without changing the approved visual language or destroying the current working state.

## Preservation rule
The exact pre-audit Factory state is preserved at:
`CHECKPOINT/MMW-COMPANY-PRE-CONSTITUTION-2026-09-07`
commit: `56f198cb5912960afe13043676f5aaabcffc15ab`

Audit work remains isolated from CONSERVED/FINAL sources.

## Constitutional test
Every change must satisfy all six gates:

1. **PRESERVE** — current visual identity, approved content and working interactions are retained unless objectively broken or redundant.
2. **ISOLATE** — one project cannot mutate another project, CONSERVED, FINAL or protected source.
3. **SIMPLIFY** — remove dead, duplicate, legacy and conflicting runtime layers; do not remove active functionality merely for code cleanliness.
4. **LOCALIZE** — production visuals and static dependencies resolve from Factory-controlled assets whenever practical; no critical page should depend on an external image CDN at runtime.
5. **VERIFY** — every route, interaction, asset path and deployment is checked after changes.
6. **RECOVER** — every promotion has a known rollback checkpoint.

## Architecture target
`FACTORY / WORKING → TEST → VERIFIED → CONSERVED → APPROVED → PRODUCTION`

The public Factory service is a verification surface, not the only source of truth.

## Phase 1 — MMW-COMPANY findings

### Confirmed / fixed
- Render service is on the **Free** plan with `main` auto-deploy enabled.
- Network media downloaders are no longer part of `prestart`; package startup is `npm start` through `assets-server-bootstrap.js`.
- Permanent Factory assets are served from `/assets`.
- The first four MMW-COMPANY product-image references were found to be rewritten to filenames that were absent from the asset library. A controlled MMW-COMPANY presentation transform now maps those four broken names to existing Factory assets and localizes the generated process-media references.
- The presentation transform was not previously activated by the Factory bootstrap; it is now attached as a single controlled response layer.
- ALADIN is now represented in the logical `PROJECTS/` registry without moving or duplicating its current canonical source. The registry previously listed ALADIN while the directory itself lacked the project entry.

### Confirmed risks still under audit
- `server.js` contains a global `refreshHomePhotos()` transform that rewrites image base names. This is the root mechanism behind the first-four-card filename mutation and remains a coupling point until the transform is retired or narrowed.
- MMW-COMPANY's server-generated process section still contains external Unsplash source URLs; the activated presentation layer localizes those URLs at response time, but the canonical source should eventually be made local at generation time.
- `src/` contains multiple historical/project hooks. They must be classified as active, intentionally retained, or obsolete before any deletion. No blind deletion is permitted.
- The constitutional GitHub health workflow has already exposed at least one failing audit run; the failure must be resolved rather than bypassed.

## Current critical findings
- Render web startup was previously blocked by media downloads executed as `prestart` — fixed.
- NEXUS LOGISTICS route-design media source returned HTTP 404 — fixed.
- MMW-COMPANY has a global image-rewrite transform that can invalidate local assets — identified; controlled presentation layer added as an interim containment.
- Project registry and physical project layout were not fully aligned — ALADIN registry boundary added without moving the canonical source.
- Hook architecture contains broad HTML/response transforms with cross-project coupling risk — under active audit.

## Launch definition
The Factory is considered launch-ready only when:
- Render service starts and exposes its port reliably;
- canonical MMW-COMPANY and project routes return successfully;
- no critical image is missing or externally dependent at runtime;
- no duplicate/obsolete UI layer overrides an active layer;
- project boundaries are explicit;
- all protected/conserved versions remain untouched;
- a clean rollback checkpoint exists;
- final visual review confirms that the current MMW-COMPANY visual language has been preserved.
