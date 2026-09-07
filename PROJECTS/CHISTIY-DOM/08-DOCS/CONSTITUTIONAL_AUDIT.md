# CHISTIY DOM — constitutional build audit

Date: 2026-09-07
Working branch: `WORK/CHISTIY-DOM-SITE-2026-09-07`

## Verified architecture
- Project is isolated under `PROJECTS/CHISTIY-DOM`.
- Work is performed only on the dedicated WORK branch.
- The pre-polish checkpoint is conserved in `КОРЗИНА/CHISTIY-DOM-PRE-CONSTITUTION-POLISH-2026-09-07` and remains recoverable by Git commit `87664f7371f874349b39331e2c8999e3cf95b57e`.
- No FINAL or unrelated project paths are modified by this work.
- Public calculator/service data has one canonical runtime source: `05-DATA/site-data.js`.
- Runtime behavior is isolated in `03-PAGES/server.js` and does not require editing protected sources.
- Render deployment is attached to the CHISTIY DOM WORK branch only.

## Corrective actions in this pass
1. Removed duplicate calculator data from runtime ownership by introducing the canonical data layer.
2. Rebuilt calculator rendering around explicit units and quantities.
3. Added resilient initialization so the calculator renders even when legacy inline scripts are present.
4. Added keyboard-accessible HOME/B2B/CARE/OUT navigation behavior.
5. Added cache protection on the preview response to prevent stale HTML during Factory verification.
6. Kept gallery behavior conservative: unavailable external page URLs are not presented as actual image files.

## Promotion state
`FACTORY / WORKING / NOT APPROVED FOR FINAL`

No automatic promotion to FINAL or production is authorized by this document.
