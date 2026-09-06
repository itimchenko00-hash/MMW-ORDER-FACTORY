# NEXUS WORK — PAGE OWNERSHIP

## Status

This directory is the canonical Factory ownership boundary for the NEXUS WORK presentation page.

## Rule

The page `nexus-work-presentation-suite.html` is the source of truth for the page's content and presentation data.

Data, copy, catalog entries, prices, images, section structure, labels and page-specific interaction logic must be stored in the page itself unless a dependency is explicitly declared as a shared platform service.

## Prohibited

- Do not inject NEXUS WORK page content through `nexus-work-unified-hook.js`.
- Do not inject NEXUS WORK page photography through `nexus-work-catalog-photo-hook.js`.
- Do not use runtime hooks as the source of truth for page-specific content.
- Do not import content from another project repository.
- Do not modify protected/conserved project repositories from this ownership boundary.

## Migration checkpoint

Baseline: `1ec204e3f6a4e1489c6b3e382c1a219e8a1a49cc`

Work branch: `WORK/NEXUS-WORK-PAGE-OWNERSHIP-2026-09-07`

The first ownership step removes the two NEXUS WORK page-specific runtime hooks from `server.js`. The canonical HTML already contains the catalog images and the thematic image data currently visible in the page source. Any remaining presentation differences must be migrated into the canonical HTML before promotion.

## Constitutional rule

Develop in FACTORY. Preserve CONSERVED. Protect FINAL. Promote only by explicit command. Keep every project isolated. Maintain architectural integrity.
