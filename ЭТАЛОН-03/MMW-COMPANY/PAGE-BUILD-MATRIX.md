# MMW-COMPANY — PAGE BUILD MATRIX

Branch: `ЭТАЛОН-03/MMW-COMPANY-WORK`

This matrix is the implementation contract. Build pages in this order. Do not create parallel page versions.

## COMPANY PAGES

### 01 HOME — `/`
**Job:** explain MMW-COMPANY and route the visitor.
**Audience:** everyone.
**Sections:** HERO → VALUE PROPOSITION → MMW SYSTEM → PORTFOLIO → PROCESS → READY-TO-SELL → SERVICES → TRUST/METHOD → CTA.
**Owns:** company proposition and routing.
**Must not own:** full project narratives, detailed project economics, investor data room.

### 02 COMPANY — `/company`
**Job:** explain who MMW-COMPANY is and how it operates.
**Sections:** IDENTITY → POSITIONING → MISSION → BUSINESS MODEL → METHODOLOGY → TEAM → GOVERNANCE → IP → FACTORY → STANDARD 100 → CTA.
**Owns:** company identity and operating philosophy.

### 03 PROJECTS — `/projects`
**Job:** portfolio gateway.
**Sections:** INTRO → SIX PROJECTS → CATEGORIES → STATUS → READINESS EXPLANATION → CTA.
**Owns:** cards, taxonomy and routing only.

### 04 SERVICES — `/services`
**Job:** sell MMW-COMPANY professional services.
**Sections:** OFFER → AUDIT → BUSINESS MODEL → FINANCIAL MODEL → INVESTMENT PACKAGE → FULL BUSINESS PROJECT → DEVELOPMENT → IMPLEMENTATION SUPPORT → PARTNERSHIP/EQUITY → CTA.
**Owns:** service packages and commercial logic.

### 05 READY-TO-SELL — `/ready-to-sell`
**Job:** sell developed/packaged projects.
**Sections:** DEFINITION → CATALOG → READINESS → BUYER RECEIVES → DUE DILIGENCE → TRANSACTION MODELS → CTA.
**Owns:** commercial catalogue; not a second project website.

### 06 PROCESS — `/process`
**Job:** explain methodology.
**Sections:** ENTRY → IDEA → MARKET → BUSINESS MODEL → ECONOMICS → OPERATIONS → TECHNICAL → LEGAL → INVESTMENT → SALES → IMPLEMENTATION → CONTROL.
**Owns:** methodology only.

### 07 INVESTORS — `/investors`
**Job:** convert investor/partner interest into qualified requests.
**Sections:** PROPOSITION → PROJECT SELECTION → INVESTMENT FORMATS → ECONOMICS → DUE DILIGENCE → DATA ROOM → PARTNERSHIP → REQUEST ACCESS.
**Owns:** investor entry and qualification.

### 08 KNOWLEDGE — `/knowledge`
**Job:** demonstrate expertise.
**Sections:** METHODOLOGY → CASES → PROJECT DEVELOPMENT → MARKET INSIGHTS → FAQ → CTA.

### 09 CONTACT — `/contact`
**Job:** one clear conversion point.
**Sections:** CONTACT → REQUEST TYPE → QUALIFICATION → PROJECT DATA → RESPONSE → PRIVACY/LEGAL.

## PROJECT PAGES

All six project pages follow the same information architecture and use independent content/media namespaces.

### ALADIN — `/projects/aladin`
IDENTITY → CONCEPT → MARKET → BUSINESS MODEL → PRODUCT/CATALOG → OPERATING MODEL → ECONOMICS → IMPLEMENTATION → SALES/INVESTMENT → DATA ROOM.

### AGROHUB — `/projects/agrohub`
IDENTITY → CONCEPT → MARKET → BUSINESS MODEL → PRODUCT/CATALOG → OPERATING MODEL → ECONOMICS → IMPLEMENTATION → SALES/INVESTMENT → DATA ROOM.

### ENERGY-PARK — `/projects/energy-park`
IDENTITY → CONCEPT → MARKET → BUSINESS MODEL → PRODUCT/CATALOG → OPERATING MODEL → ECONOMICS → IMPLEMENTATION → SALES/INVESTMENT → DATA ROOM.

### NEXUS-LOGISTICS — `/projects/nexus-logistics`
IDENTITY → CONCEPT → MARKET → BUSINESS MODEL → PRODUCT/CATALOG → OPERATING MODEL → ECONOMICS → IMPLEMENTATION → SALES/INVESTMENT → DATA ROOM.

### NEXUS-WORK — `/projects/nexus-work`
IDENTITY → CONCEPT → MARKET → BUSINESS MODEL → PRODUCT/CATALOG → OPERATING MODEL → ECONOMICS → IMPLEMENTATION → SALES/INVESTMENT → DATA ROOM.

### CARPATHIA — `/projects/carpathia`
IDENTITY → CONCEPT → MARKET → BUSINESS MODEL → PRODUCT/CATALOG → OPERATING MODEL → ECONOMICS → IMPLEMENTATION → SALES/INVESTMENT → DATA ROOM.

## CONTENT OWNERSHIP

Company facts live under `MMW-COMPANY`.
Project facts live under the respective project directory.
Media is referenced through the permanent Factory ASSETS library.
Commercial pricing must have one source of truth.
Financial assumptions must be labelled as assumptions/demo/validated as appropriate.

## CTA SYSTEM

There are only four primary conversion intents:

1. `REVIEW_PROJECT`
2. `ORDER_DEVELOPMENT`
3. `REQUEST_INVESTOR_ACCESS`
4. `BUY_READY_PROJECT`

Every CTA must map to one of these intents. Do not create unrelated CTA flows without an architecture change.

## NAVIGATION SYSTEM

Global navigation:
HOME / COMPANY / PROJECTS / SERVICES / READY-TO-SELL / PROCESS / INVESTORS / KNOWLEDGE / CONTACT.

Project navigation is local to each project and never replaces global company navigation.

## MEDIA SYSTEM

Each section receives media by semantic role:
HERO / IDENTITY / MARKET / PRODUCT / OPERATIONS / ECONOMICS / IMPLEMENTATION / SALES / PEOPLE / LANDSCAPE as applicable.

No generic image reuse is allowed where a project-specific thematic asset exists.
