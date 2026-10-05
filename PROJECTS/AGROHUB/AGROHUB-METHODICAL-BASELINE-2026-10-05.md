# AGROHUB — METHODICAL CONTOUR BASELINE AUDIT
Date: 2026-10-05
Base: ca5a617087de7e02adbfe3e583ee90b2160e399c
Control snapshot: AGROHUB-DEEP-AUDIT-SNAPSHOT-2026-10-05

## 1. Status
AGROHUB exists in the current MMW-COMPANY application as a project entry and also has legacy standalone material in Factory archives.
The project workspace itself contains only WORKSPACE.md, so the active implementation currently lives in the main public application rather than in a dedicated AGROHUB working implementation folder.

Release status: NOT production-verified.
Concept status: CONCEPT / commercial demonstration, not an operating project.

## 2. Current active product definition
Name: AGROHUB
Type: Агроинфраструктура и переработка
Positioning: «От сырья к продукту.»
Core proposition: infrastructure for receiving, storage, preparation, processing, packaging and movement of agricultural products.
Audience currently stated: farmers, producers, processors and regional business.
Site principle: region and site are to be determined from raw-material base, logistics and market.

## 3. Existing active media
Factory path: ASSETS/AGROHUB/photos/
Named project set currently contains:
01-agro-audit.jpg
02-grain-receiving.jpg
03-storage-system.jpg
04-drying-cleaning.jpg
05-processing-line.jpg
06-packaging-label.jpg
07-cold-storage.jpg
08-agro-logistics.jpg
09-export-preparation.jpg
10-agrohub-masterplan.jpg
11-investment-model.jpg
12-full-agrohub.jpg
plus four older generic photo-* assets.
The named 12-photo set is semantically organized and suitable for a dedicated media map. The four generic assets require review before any reuse because their semantic roles are not encoded in their filenames.

## 4. Legacy material found
A standalone AGROHUB compact page exists in:
- MMW-COMPANY/1 — FROZEN/projects/AGROHUB/website/agrohub-compact.html
- ЭТАЛОН-02/MMW-COMPANY/projects/AGROHUB/website/agrohub-compact.html
- archive copies under КОРЗИНА
The legacy page contains its own visual language, a Yield Engine demo, value-chain sections, ecosystem and roadmap.
It also contains preset demonstration values and commercial catalog material in a legacy catalog hook.

These legacy materials must be treated as source material, not as an automatic specification for the new page.

## 5. Existing active application contour
The active public/app.js contains an AGROHUB project object with:
- summary
- audience
- site logic
- local Factory media references
- project sections
- an economics model
- project-specific visual/mechanic configuration.

This means AGROHUB is already structurally integrated into the current company application and should be evolved in-place through the controlled project method, not copied into a second application.

## 6. Methodical risks detected before implementation
### R1 — Legacy/current model collision
There are two generations of AGROHUB content: the current project object and the older compact business page.
Risk: importing legacy blocks wholesale can reintroduce duplicate text, duplicate CTAs, preset economics or obsolete visual logic.

### R2 — Preset economics
Legacy Yield Engine uses preset inputs (800 t/month, 72% yield, prices and processing cost).
For the commercial MMW standard, demonstration inputs must be clearly labelled as demonstration only, or replaced by explicit user inputs with empty/invalid states where appropriate.
No guaranteed profit or investment return may be implied.

### R3 — Commercial pricing claims
Legacy catalog hook contains explicit starting prices for services.
These prices are not yet established as the authoritative current commercial policy.
They must not be surfaced as current public pricing without an explicit approval/source.

### R4 — Media duplication / semantic drift
The active media set is stronger than the legacy set, but the four generic photo-* assets have no project role encoded.
Every public visual must receive one semantic role and must not be duplicated across nodes without justification.

### R5 — Internal/legacy terminology
Legacy material contains internal/product-development wording such as DATA ROOM and «READY-TO-SELL».
Such language must not leak into the public commercial page.

### R6 — Standalone page vs company project route
The legacy compact page is a separate artifact. The active application should remain the single public project route unless a separate route is deliberately approved.

### R7 — Production verification
Repository/code state is not equivalent to production verification. Render/browser verification remains a separate release gate.

## 7. Proposed AGROHUB information architecture
Recommended controlled chain:
01 / LOGIC — From raw material to value
02 / PRODUCT — Receiving, storage, preparation, processing, packaging, logistics
03 / MARKET — Who uses the infrastructure and why
04 / MODEL — Site → technology → operations → sales
05 / ECONOMICS — Throughput → yield → product → revenue → costs → result
06 / RISK CONTROL — raw material, yield, energy, logistics, market, compliance
07 / NEXT STEP — demand validation → site → pilot → implementation

This is a proposal for the controlled build, not a claim that all nodes are already implemented.

## 8. Media map proposal
Hero: 12-full-agrohub.jpg
Logic/value chain: 01-agro-audit.jpg, 02-grain-receiving.jpg, 03-storage-system.jpg, 04-drying-cleaning.jpg, 05-processing-line.jpg, 06-packaging-label.jpg
Product: 07-cold-storage.jpg, 08-agro-logistics.jpg, 09-export-preparation.jpg
Model / masterplan: 10-agrohub-masterplan.jpg
Economics: 11-investment-model.jpg
Closing/full contour: 12-full-agrohub.jpg only where repetition is explicitly justified; otherwise use an infographic to preserve uniqueness.

No external runtime image URLs are permitted.

## 9. Economic contour rules
The AGROHUB calculator must be an explicit demonstration model, not an investment promise.
Recommended input contract:
- raw material throughput
- yield %
- raw material cost
- finished-product price
- processing cost
- additional operating costs where modelled
- CAPEX only if used for return/payback calculations
Invalid or empty inputs must never produce false zeros.
Any ROI/payback output requires valid CAPEX and clearly defined period logic.
Demonstration output must carry a concise non-forecast disclaimer.

## 10. First implementation gate
Before visual redesign or content expansion:
1. preserve this snapshot;
2. separate current source from legacy source;
3. freeze the approved AGROHUB positioning;
4. define the seven-node information architecture;
5. assign one semantic role to each active media asset;
6. define the interaction contract for every expandable card;
7. define the economic input/validation contract;
8. only then implement;
9. run syntax, static media, duplication and functional checks;
10. only after those checks perform production verification.

## 11. Release gate
Current: G0 preserved / baseline.
Next target: G1 structured.
AGROHUB must not be described as production-ready until G7 Production is independently verified.

## 12. Decision
AGROHUB is NOT to be rebuilt blindly from the old compact page.
The legacy page is a reference/source archive.
The active company application is the integration target.
The named 12-photo Factory set is the preferred media base.
The Methodical Contour is the execution authority for all subsequent work.
