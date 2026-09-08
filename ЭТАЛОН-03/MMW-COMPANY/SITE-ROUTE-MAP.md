# MMW-COMPANY — CANONICAL SITE ROUTE MAP

Status: BUILD BASELINE
Branch: `ЭТАЛОН-03/MMW-COMPANY-WORK`

## COMPANY SITE

| ID | Route | Page | Primary purpose | Canonical source | Status |
|---|---|---|---|---|---|
| 01 | `/` | HOME | First contact + routing | `company/site/home.html` | ARCHITECTURE |
| 02 | `/company` | COMPANY | Identity + methodology + governance | `company/site/company.html` | ARCHITECTURE |
| 03 | `/projects` | PROJECTS | Portfolio gateway | `company/site/projects.html` | ARCHITECTURE |
| 04 | `/services` | SERVICES | Commercial services | `company/site/services.html` | ARCHITECTURE |
| 05 | `/ready-to-sell` | READY-TO-SELL | Sellable project catalogue | `company/site/ready-to-sell.html` | ARCHITECTURE |
| 06 | `/process` | PROCESS | Development methodology | `company/site/process.html` | ARCHITECTURE |
| 07 | `/investors` | INVESTORS | Investor/partner entry | `company/site/investors.html` | ARCHITECTURE |
| 08 | `/knowledge` | KNOWLEDGE | Authority + methodology content | `company/site/knowledge.html` | ARCHITECTURE |
| 09 | `/contact` | CONTACT | Conversion | `company/site/contact.html` | ARCHITECTURE |

## PROJECT ROUTES

| Project | Route | Canonical page |
|---|---|---|
| ALADIN | `/projects/aladin` | `projects/ALADIN/site/project.html` |
| AGROHUB | `/projects/agrohub` | `projects/AGROHUB/site/project.html` |
| ENERGY-PARK | `/projects/energy-park` | `projects/ENERGY-PARK/site/project.html` |
| NEXUS-LOGISTICS | `/projects/nexus-logistics` | `projects/NEXUS-LOGISTICS/site/project.html` |
| NEXUS-WORK | `/projects/nexus-work` | `projects/NEXUS-WORK/site/project.html` |
| CARPATHIA | `/projects/carpathia` | `projects/CARPATHIA/site/project.html` |

## LEGACY ROUTES

Existing historical routes/files remain untouched until migration is complete. They are not canonical for the new architecture.

## ROUTING RULES

1. One route has one canonical page.
2. One canonical page has one source file.
3. Company pages never embed full project pages.
4. Project pages own project-specific content.
5. `/projects` is only the portfolio gateway.
6. `/ready-to-sell` is commercial catalogue logic, not a duplicate project website.
7. Runtime hooks must not create competing navigation or sections.
8. Redirects are allowed only from legacy routes to canonical routes and must be explicit.
9. No protected Etalon 2 source is modified.
