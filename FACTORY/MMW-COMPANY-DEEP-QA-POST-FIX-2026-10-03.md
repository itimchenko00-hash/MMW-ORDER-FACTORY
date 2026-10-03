# MMW-COMPANY Deep QA — 2026-10-03 Post-Fix

## Scope
Second deep diagnostic after remediation of the previous audit findings. Active workspace only: MMW-COMPANY/1, branch MMW-COMPANY-FROM-SCRATCH-2026-10-03.

## Remediated
- Dedicated project start services mapped from every project page to the matching catalog item.
- Cart now has a dedicated #/cart route.
- Global contacts navigation now has a dedicated #/contact route.
- Calculator rejects negative values and invalid percentage/hour ranges before calculation.
- Admin journal GET authentication moved from URL query to x-admin-key header.
- Customer access-code endpoint rate-limited.
- Order storage module now supports a dedicated PostgreSQL database through MMW_COMPANY_DATABASE_URL/DATABASE_URL, with local JSON fallback for development.
- PostgreSQL driver added.
- Dedicated Render PostgreSQL instance created: mmw-company-orders-db, Frankfurt, PostgreSQL 18.
- MMW-ORDER production files were not modified.

## Deployment
- Latest code commit: 57ea9adf13856d258e921cb076a7df963599e1b2.
- Render build completed successfully for the latest commit; service reported live during rollout.
- Runtime logs show the application starts on port 10000 without startup errors.

## Remaining production boundary
- Render environment currently reports database=local-fallback because the dedicated PostgreSQL connection string is not yet present as MMW_COMPANY_DATABASE_URL. The database instance exists, but the connection credential is not exposed by the available Render connector and must be linked/set in the service environment before treating order persistence as production-grade.
- The Render-created free PostgreSQL instance has a finite free-plan lifecycle; a production launch should use a persistent paid database plan or equivalent long-lived storage before commercial orders are accepted.
- Browser visual QA of the public Render URL remains unverified in this environment because direct browser access to the Render hostname is unavailable. Static/deployment/log QA is complete.
- PDF font remains environment-dependent unless a bundled Unicode font is added to the repository.

## Constitution status
No constitution file was changed. All fixes were implemented within the existing standard.
