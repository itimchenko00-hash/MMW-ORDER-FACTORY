# MMW-COMPANY — DEEP QA REPORT 2026-10-03

## Scope
Clean-room branch: MMW-COMPANY-FROM-SCRATCH-2026-10-03.

Checked: application syntax, server syntax, catalog/order/PDF integration, route presence, local media references, duplicate media references, cache version, legacy CSS markers, public terminology scan, launch-document register.

## Results
- app.js: syntax OK.
- server.js: syntax OK.
- company-catalog.js: syntax OK.
- company-orders.js: syntax OK.
- company-pdf.js: syntax OK.
- Local media references in app.js: 58; unique: 58; duplicates: 0.
- Catalog route: present.
- Journal route: present.
- Project route: present.
- Cart persistence: localStorage.
- Order API: POST and customer journal GET present.
- Access-code lookup: present.
- PDF receipt endpoint: present.
- Root static serving is restricted to public and approved asset roots; server source is no longer exposed by the previous generic root fallback.
- Legacy CSS markers CONTENT REBUILD and PROJECT PRESENTATION REBUILD: 0.
- Public technical-language scan: only code-context occurrence of Render remains; no evidence of that word being rendered as customer-facing copy.
- Six projects remain separate products and all current project status text remains КОНЦЕПТ.
- Existing MMW-ORDER directory was read for functional reference only. No MMW-ORDER file was modified by this implementation.

## Commerce layer
- Catalog is isolated from the production MMW-ORDER implementation.
- Prices are the MMW-COMPANY internal public price list effective 03.10.2026, in UAH.
- Items marked «от» are starting prices and require scope confirmation.
- Project orders are implemented as a paid starting/pre-project assessment item, not as a false fixed price for land/construction/capital expenditure.
- Cart → customer data → request → access code → journal → PDF receipt is implemented.

## Constitution / standard
The implementation follows the existing Constitution and Project Quality Standard without editing the Constitution itself. The new launch documentation was added as a separate Factory documentation package because Constitution changes require a direct user command.

## Remaining verification boundary
The Render service could not be queried from the connected Render account because no workspace was selected, and the public Render URL was not accessible through the web runtime. Therefore deployment state and live browser visual QA are not claimed as verified. This is the only major verification boundary remaining.

## Technical note
The stylesheet still contains intentional base/theme/responsive selector overrides. These are cascade layers serving responsive and project-specific presentation, not the removed legacy rebuild layers. A selector-by-selector CSS normalization is optional and should only be done if it can be proven not to change the visual product.

## Launch documents added
- 00 Launch Register
- 01 Corporate & Legal Templates
- 02 Finance & Investment Templates
- 03 Land Due Diligence
- 04 Project Technical Master
- 05 Project Master Dossier
- 06 Public Legal Checklist
- 07 Operations & HR
- 08 Launch Gate
- 09 Commercial Price Policy

## Verdict
The clean-room MMW-COMPANY branch now contains the complete commercial catalog/order foundation and the launch documentation system. It is ready for live deployment verification and, after that, controlled public launch of commercial inquiries. Real investment, land, construction, and capital transactions still require project-specific legal/technical/financial validation.