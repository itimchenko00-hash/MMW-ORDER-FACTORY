# FACTORY CONSTITUTION AUDIT — 2026-09-07

## Objective
Bring the current MMW-COMPANY and all active Factory projects to launch-ready condition without changing the approved visual language or destroying the current working state.

## Preservation rule
The exact pre-audit Factory state is preserved at:
`CHECKPOINT/MMW-COMPANY-PRE-CONSTITUTION-2026-09-07`
commit: `56f198cb5912960afe13043676f5aaabcffc15ab`

All audit work is performed first on:
`WORK/MMW-CONSTITUTION-AUDIT-2026-09-07`

No conserved/protected source is modified.

## Constitutional test
Every change must satisfy all six gates:

1. **PRESERVE** — current visual identity, approved content and working interactions are retained unless they are objectively broken or redundant.
2. **ISOLATE** — one project cannot mutate another project, CONSERVED, FINAL or protected source.
3. **SIMPLIFY** — remove dead, duplicate, legacy and conflicting runtime layers; do not remove active functionality merely for code cleanliness.
4. **LOCALIZE** — production visuals and static dependencies must resolve from Factory-controlled assets whenever practical; no critical page may depend on an external image CDN at runtime.
5. **VERIFY** — every route, interaction, asset path and deployment must be checked after changes.
6. **RECOVER** — every promotion must have a known rollback commit.

## Architecture target
`FACTORY / WORKING → TEST → VERIFIED → CONSERVED → APPROVED → PRODUCTION`

The public Factory service is a verification surface, not the only source of truth.

## Current critical findings
- Render web startup was blocked by media downloads executed as `prestart`.
- NEXUS LOGISTICS route-design media source returned HTTP 404.
- MMW-COMPANY server-side presentation transforms still contain external Unsplash runtime image URLs.
- Project registry and physical project layout are not yet fully aligned (ALADIN is represented under ETALON-02 rather than PROJECTS/).
- Hook architecture contains broad HTML/readFile transforms with cross-project coupling risk.

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
