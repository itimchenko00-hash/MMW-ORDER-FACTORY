# FACTORY — PUBLICATION READINESS

Date: 2026-09-08 · technical cleanup pass

## Scope

This document records the candidate publication state after the constitutional pass across the active Factory runtime surface.

Protected/conserved repositories are outside this change set.

## Canonical projects

- MMW-COMPANY
- ALADIN
- ALADIN-FINANCE
- NEXUS-WORK
- NEXUS-LOGISTICS
- CARPATHIA
- AGROHUB
- ENERGY-PARK

## Constitutional rules enforced

1. Each project owns its own asset namespace under `/ASSETS/<PROJECT>/`.
2. ALADIN-FINANCE is intentionally owned by the ALADIN asset namespace as part of the ALADIN product family.
3. Runtime asset references are checked against the owning project namespace.
4. The active runtime hook chain is explicitly declared and loaded once in `assets-server-bootstrap.js`.
5. Historical/dormant hooks are preserved as source and are classified rather than silently deleted.
6. NEXUS-LOGISTICS uses dedicated project-owned local assets for its catalog media.
7. CHISTIY-DOM remains conserved and is not part of the publication candidate.

## Active runtime surface

The Factory runtime currently activates the following hooks, in fixed order:

1. `final-cleanup-hook.js`
2. `products-cart-hook.js`
3. `order-catalog-hook.js`
4. `company-ui-hook.js`
5. `labels-cleanup-hook.js`
6. `unified-process-system-hook.js`
7. `language-switcher-hook.js`
8. `aladin-investor-owner-engine-hook.js`
9. `nexus-work-catalog-photo-hook.js`
10. `nexus-work-unified-hook.js`
11. `agrohub-catalog-hook.js`
12. `energy-catalog-hook.js`
13. `nexus-logistics-catalog-hook.js`

`server.js` is now a thin canonical-server entrypoint and does not load a second hook chain. This removes the previous documentation/runtime contradiction and makes hook order auditable.

## Candidate status

- Central hook loading: PASS — explicit deterministic chain
- Asset ownership architecture: PASS for audited runtime surface
- Cross-project runtime references: checked by Factory Health
- Missing active-runtime assets: checked by Factory Health
- NEXUS-LOGISTICS catalog uniqueness: checked by Factory Health
- Runtime/calculation audit: added as `factory-runtime-audit.js`
- Protected repositories touched: NO
- Final external publication: NOT YET — technical cleanup and browser-level verification remain required

## Approval gate

This is a candidate state for consultation. No final public promotion is authorized by this document alone.

Final publication requires:

1. Factory Health workflow PASS on the final commit.
2. Runtime/calculation audit PASS on the final commit.
3. Render deploy LIVE for the same commit.
4. Human approval of the candidate presentation.
5. Only then: publication/promotion of selected project deployments.
