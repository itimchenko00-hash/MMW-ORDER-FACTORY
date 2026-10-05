# MMW Factory — Methodological Contour
## Controlled Web Media Import

### Purpose
Standard method for importing thematic web photography into MMW-COMPANY and its projects without introducing runtime external media dependencies.

### Canonical workflow
1. Create a safety snapshot/backup branch before media work.
2. Select one distinct image per semantic block/card.
3. Verify the source page and usage/licensing status.
4. Do not use generated images when the task calls for web photography.
5. Import binary assets into the repository through a controlled GitHub Actions workflow, rather than linking remote image URLs from production HTML.
6. Store assets inside the relevant project/public media folder.
7. Maintain a provenance register (SOURCES.md) with:
   - local filename
   - project/block
   - semantic role
   - original source
   - licensing note
8. Connect the page only to local asset paths.
9. Never reuse the same photo where a distinct semantic image is required.
10. Add accessibility metadata (alt text) and lazy loading where appropriate.
11. Validate before release:
   - all expected files exist and are non-empty
   - files are valid images
   - local references resolve
   - no runtime Unsplash/Pexels/external image URLs remain
   - no duplicate image assignment
   - HTML structure remains valid
   - JavaScript syntax remains valid
   - existing interaction/content is preserved
12. Deploy through the existing Render auto-deploy chain and confirm the new deployment reaches LIVE.
13. Perform a visual/mobile QA pass after deployment before freezing the media layer.

### Core principle
**Source on the web → controlled import → local Factory asset → semantic placement → provenance → QA → LIVE.**

### Commercial/constitutional rules
- Photography is functional semantic media, not random decoration.
- One visual should reinforce the meaning of its block.
- No duplicate, mismatched or ornamental images.
- No external runtime dependency for production media.
- No invented project facts through photography.
- Existing content, interaction mechanics and project architecture must not be altered unnecessarily.
- Media is a separate layer and must not destabilize the established project standard.

### Reference implementation
The company media import completed on 2026-10-06 uses this method:
- repository: itimchenko00-hash/MMW-ORDER-FACTORY
- branch: MMW-COMPANY-WORKSPACE-V1-2026-10-05
- local media root: MMW-COMPANY/2 — WORKING/public/ASSETS/MMW-COMPANY/photos/web-selected/
- controlled import workflow: .github/workflows/import-company-media.yml
- provenance register: .../web-selected/SOURCES.md
- LIVE import commit: 88835bd2f180adcb685d463e4d54e2c679d150b9
- Render deployment: dep-db22pahup7fs73ce7r5g

This workflow is the default Factory method for future web-media imports unless a project-specific exception is explicitly approved.
