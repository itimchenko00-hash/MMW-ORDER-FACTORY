# MMW-COMPANY / ETALON 03 — PROJECT MIGRATION STATUS

Working branch: `ЭТАЛОН-03/MMW-COMPANY-WORK`

## Canonical project routes

| Project | Canonical route | Canonical source | Architecture |
|---|---|---|---|
| ALADIN | `/projects/aladin` | `site/projects/ALADIN.html` | 10-section |
| CARPATHIA | `/projects/carpathia` | `site/projects/CARPATHIA.html` | 10-section |
| AGROHUB | `/projects/agrohub` | `site/projects/AGROHUB.html` | 10-section |
| ENERGY-PARK | `/projects/energy-park` | `site/projects/ENERGY-PARK.html` | 10-section |
| NEXUS-LOGISTICS | `/projects/nexus-logistics` | `site/projects/NEXUS-LOGISTICS.html` | 10-section |
| NEXUS-WORK | `/projects/nexus-work` | `site/projects/NEXUS-WORK.html` | 10-section |

## Migration rule

The six projects share one information architecture, while retaining independent content, economics, operating logic and visual identity. Historical Etalon 02 sources are not edited by this migration.

## Current implementation

- **ALADIN: migrated to the canonical 10-section architecture; content expanded with project identity, concept, market, business model, product/catalog, operating model, model economics, implementation, sales/investment and data room.**
- **CARPATHIA: canonical 10-section page prepared; detailed source-content migration remains pending.**
- **AGROHUB: canonical 10-section page prepared; detailed source-content migration remains pending.**
- **ENERGY-PARK: migrated to the canonical 10-section architecture with project concept, market, business model, catalog, operating model, demonstration economics, implementation, investment formats and Data Room.**
- NEXUS-LOGISTICS: canonical page exists; content migration pending.
- NEXUS-WORK: canonical page exists; content migration pending.
- Runtime: switched to Etalon 03 source tree; no historical project hooks are used by this runtime.

## Financial disclosure

Model economics are presented as assumptions/signals for validation, not guaranteed profitability. Investment-grade feasibility requires project-specific due diligence.

## Next gate

Continue with NEXUS-LOGISTICS, then NEXUS-WORK. After content migration, perform desktop/mobile/CTA/404 QA and verify the live Render deployment.