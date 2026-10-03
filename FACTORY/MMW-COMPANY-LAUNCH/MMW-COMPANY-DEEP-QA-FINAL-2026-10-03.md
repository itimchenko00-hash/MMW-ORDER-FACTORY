# MMW-COMPANY — DEEP QA REPORT 2026-10-03 · FINAL PASS

## Scope
Clean-room branch: MMW-COMPANY-FROM-SCRATCH-2026-10-03.

## Verified statically
- JavaScript syntax: app.js, server.js, catalog, order store and PDF module — OK.
- 58 local media references in app.js; 58 unique; 0 duplicates.
- Project route, catalog route, customer journal route and protected internal journal route — present.
- Cart persistence and quantity controls — present.
- POST order API, customer access-code lookup, customer journal GET — present.
- Protected internal order journal and status update endpoint — present.
- PDF receipt endpoint — present.
- Static serving is restricted to public and approved asset roots.
- Legacy CSS rebuild markers removed.
- Constitution was not edited; new launch documents are a separate documentation package.
- Existing MMW-ORDER was inspected as a functional reference only; no MMW-ORDER file was changed.

## Commercial cleanliness
- Catalog is customer-facing and separated from internal technical implementation.
- Internal MMW-COMPANY service prices are dated 03.10.2026 and denominated in UAH.
- «От» items are clearly treated as starting prices.
- Six project products remain concepts; fixed capital/construction pricing is not fabricated.
- Project pages now provide direct path to catalog/order calculation.
- Cart → request → access code → journal → PDF is one continuous customer flow.

## Launch documentation
Added corporate/legal, finance/investment, land due diligence, technical master, project master dossier, public legal checklist, HR/operations, launch gate and price policy documents.

## Live verification boundary
Render workspace cannot currently be queried because the connected Render account has no selected workspace. The public Render URL also could not be opened by the web runtime. Therefore the current branch is technically prepared, but live deploy state, /healthz over the public URL, and browser visual QA remain unverified.

## Important operational boundary
The company order journal uses a local JSON fallback if no persistent database is configured. For a production multi-user journal, a persistent database must be attached to the MMW-COMPANY service before treating the journal as durable operational records. The existing MMW-ORDER remains untouched.

## Final verdict
The clean-room branch now contains the commercial catalog, dated price list, interactive cart/calculation, customer request flow, access-code journal, protected internal journal, PDF receipt generation and launch documentation. The remaining gate is live deployment verification and, separately, completion of real corporate/legal/project-specific documents with actual company and project data.