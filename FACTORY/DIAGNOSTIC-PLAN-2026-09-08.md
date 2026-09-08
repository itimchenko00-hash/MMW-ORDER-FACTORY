# MMW-ORDER-FACTORY — TECHNICAL DIAGNOSTIC / CLEANUP PLAN

Date: 2026-09-08

## Scope

This diagnostic is limited to the canonical Factory `main` branch. Protected/conserved repositories and non-main branches are not modified.

## Findings requiring remediation

1. Runtime hook inventory must match the hooks actually loaded by the server.
2. Bootstrap/server hook loading must be checked for duplicate registration.
3. Canonical routes and canonical source files must be validated together.
4. All local `/assets/...` references must resolve.
5. External media dependencies must be inventoried and separated from local assets.
6. GitHub Actions media-download failures must not silently contaminate the canonical build.
7. Legacy media downloaders must be classified before removal.
8. Backup/frozen/trash copies must remain preserved but must not be treated as runtime sources.
9. Duplicate asset basenames must be classified as shared, project-owned, or legacy.
10. A post-cleanup smoke test must validate all six canonical projects.

## Safety rules

- Do not modify visual composition of canonical project pages.
- Do not delete historical branches.
- Do not delete backup/frozen material until an explicit archival policy is approved.
- Do not activate non-main branches automatically.
- Do not claim a project is implemented merely because its Factory package exists.

## Execution order

1. Establish diagnostic checkpoint.
2. Fix runtime duplication and health-check drift.
3. Fix CI/media failures.
4. Classify legacy hooks/downloaders.
5. Validate canonical routes/assets.
6. Run smoke tests.
7. Commit cleanup.
8. Deploy canonical `main`.
9. Re-check Render runtime.
