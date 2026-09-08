# MMW-COMPANY — SITE ARCHITECTURE / ETALON 03

Status: ARCHITECTURE BASELINE
Working branch: `ЭТАЛОН-03/MMW-COMPANY-WORK`
Rule: one canonical architecture, one working branch, no visual/content layering from historical branches.

## 1. COMPANY-LEVEL INFORMATION ARCHITECTURE

### 01 / HOME
Purpose: explain MMW-COMPANY in 5–10 seconds and route the visitor to the correct path.
Sections:
- Hero: MMW-COMPANY
- What we do: IDEA → BUSINESS PROJECT → IMPLEMENTATION
- Core capabilities
- Flagship portfolio
- How a project is developed
- Who we work with
- Ready-to-sell projects
- Services
- CTA: review a project / order development

### 02 / COMPANY
Purpose: establish identity, model, methodology and credibility.
Sections:
- Company identity
- Mission / positioning
- MMW-COMPANY model
- Development methodology
- Team / roles
- IP and project ownership logic
- Quality / readiness standard
- Governance and Factory relationship

### 03 / PROJECTS
Purpose: portfolio gateway; no project detail is duplicated here.
Sections:
- Portfolio overview
- Six flagship projects
- Project status labels
- Asset/readiness distinction
- CTA into each project

Projects:
- ALADIN
- AGROHUB
- ENERGY-PARK
- NEXUS-LOGISTICS
- NEXUS-WORK
- CARPATHIA

### 04 / SERVICES
Purpose: monetize MMW-COMPANY expertise independently of project sales.
Sections:
- Business Audit
- Business Model
- Financial Model
- Investment Package
- Full Business Project
- Development Project
- Implementation support
- Partnership / equity model

### 05 / READY-TO-SELL
Purpose: dedicated commercial catalogue of developed business projects.
Rules:
- Clearly state that projects are developed/packaged, not automatically operating businesses.
- Each project has a single canonical commercial page.
- No duplicated project descriptions across multiple page systems.

### 06 / PROCESS
Purpose: show the development pipeline.
Canonical chain:
IDEA → MARKET → BUSINESS MODEL → ECONOMICS → OPERATIONS → TECHNICAL → LEGAL → INVESTMENT → SALES → IMPLEMENTATION

### 07 / INVESTORS
Purpose: investor/partner entry point.
Sections:
- Investment logic
- Project selection
- Data room
- Due diligence
- Partnership models
- Contact / request

### 08 / KNOWLEDGE
Purpose: authority and explanation.
Sections:
- Methodology
- Case studies
- Market insights
- Project-development principles
- FAQ

### 09 / CONTACT
Purpose: one conversion point.
Actions:
- Request project review
- Request business development
- Request investment package
- Partnership inquiry

## 2. CANONICAL PAGE CONTRACT

Every page must have exactly one primary purpose, one canonical source file, one route, one CSS scope and one JS scope.

Page contract:
1. Identity / route
2. Purpose
3. Audience
4. Primary CTA
5. Secondary CTA
6. Section sequence
7. Content source
8. Image slots
9. Responsive behavior
10. SEO metadata
11. Accessibility
12. Analytics events

## 3. PROJECT PAGE TEMPLATE

Every flagship project uses the same information architecture but its own content and visual assets.

01 / IDENTITY
- Project name
- Category
- One-line proposition
- Status: READY-TO-SELL / CONCEPT / DEVELOPMENT as applicable

02 / CONCEPT
- Problem
- Solution
- Product
- Customer

03 / MARKET
- Target segments
- Demand logic
- Competitive context

04 / BUSINESS MODEL
- Revenue streams
- Value chain
- Operating logic

05 / PRODUCT / CATALOG
- Products/services
- Packages
- Pricing where validated

06 / OPERATING MODEL
- Processes
- Resources
- Team
- Partners

07 / ECONOMICS
- Assumptions
- Revenue model
- Cost model
- KPIs
- Explicit feasibility disclaimer

08 / IMPLEMENTATION
- Land/site/assets as applicable
- Technical requirements
- Legal/compliance track
- Phases

09 / SALES / INVESTMENT
- Buyer/investor profile
- Offer
- Transaction/partnership model
- CTA

10 / DATA ROOM
- Project documentation
- Financial model
- Technical package
- Legal package
- Due-diligence materials

## 4. VISUAL SYSTEM RULE

Visuals explain the section they belong to. No decorative image is allowed when a thematic image can communicate the business meaning better.

Image mapping examples:
- architecture → architecture / site / interiors
- operations → real operating process
- economics → infrastructure / production / measurable activity
- investment → asset / project / business context
- hospitality → landscape / lodging / wellness / food / experience
- logistics → vehicles / warehouse / dispatch / routes / documents

## 5. ANTI-LAYERING RULES

- Do not copy a page and modify it into a second competing page system.
- Do not inject project sections into company pages unless explicitly defined by this architecture.
- Do not let runtime hooks silently create new sections.
- Do not maintain duplicate canonical routes.
- Do not merge historical visual systems into the Etalon 3 architecture.
- Changes are made only on `ЭТАЛОН-03/MMW-COMPANY-WORK` until explicitly promoted.
- Baseline branch remains untouched.

## 6. BUILD ORDER

Phase 1: Company shell + navigation + route map.
Phase 2: HOME.
Phase 3: COMPANY.
Phase 4: PROJECTS gateway.
Phase 5: six canonical project pages.
Phase 6: SERVICES.
Phase 7: READY-TO-SELL.
Phase 8: PROCESS / INVESTORS / KNOWLEDGE / CONTACT.
Phase 9: media integration.
Phase 10: runtime simplification, QA, responsive audit, final publication.

## 7. DEFINITION OF DONE

A page is complete only when:
- its purpose is unique;
- its route is unique;
- its content has one source of truth;
- no historical hook is required to reconstruct it;
- its visuals match the information architecture;
- mobile and desktop are checked;
- CTA path is tested;
- no protected repository or baseline was changed.
