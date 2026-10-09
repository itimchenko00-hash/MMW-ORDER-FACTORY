# Etalon 7.1 — implementation and recheck
Date: 2026-10-09
Workspace: MMW-COMPANY/2
Branch: MMW-COMPANY-WORKSPACE-V1-2026-10-05

## Implemented
- Added a company section to the homepage and a dedicated company page explaining the role, workflow, outputs and boundaries without inventing team members, completed cases or investor commitments.
- Added a privacy-information page based on the current site implementation: Google OAuth for feedback, public author/message data, session cookie, conditional database storage, external links and contact email.
- Clarified that catalog prices are starting references; scope, inputs, deliverables, timing and final budget must be agreed. External expenses require separate agreement; existing price values were not changed.
- Added Organization and WebSite JSON-LD using the confirmed brand, canonical URL and contact email.
- Added shared site information links and sitemap entries for the new pages.
- Excluded company/privacy pages from automatic feedback-widget injection.
- Preserved the active canonical host https://mmw-company-2.onrender.com; the existing robots.txt and sitemap host were already aligned. Did not change MMW-ORDER.

## Static checks
Homepage JSON-LD is present; sitemap includes the two new pages; catalog price boundaries are explicit; legal pages are excluded from feedback injection. This was a source-level review, not a browser test.

## Remaining release gates — NOT PASS
1. Confirm the legal operator, jurisdiction and applicable disclosures; complete legal review. No legal name, registration number, address or tax data was invented.
2. Test the journey from homepage/catalog/project CTAs through the external order system to actual registration and handling. MMW-ORDER was not changed.
3. Verify live Google OAuth, DATABASE_URL, feedback persistence and unavailable-storage behavior.
4. Test all pages in a real browser and physical mobile device: navigation, overflow, modal behavior, image loading, keyboard access and contrast.
5. Measure live performance and image weight.
6. Publish completed cases only when approved evidence is available.

## Status
Source improvements are ready for the existing workspace branch. This report does not certify full commercial launch readiness; legal and runtime gates remain open.
