# FACTORY — PUBLICATION READINESS

Date: 2026-09-07

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
4. Only hooks proven active in the current Factory bootstrap are part of the runtime source audit.
5. Dormant/unproven hooks are preserved as historical source and are explicitly classified rather than silently deleted.
6. NEXUS-LOGISTICS uses dedicated project-owned local assets for its catalog media.
7. CHISTIY-DOM remains conserved and is not part of the publication candidate.

## Active runtime surface

Current Factory bootstrap loads `company-ui-hook.js`. The other historical project hooks remain preserved but are not loaded by the current bootstrap; they are therefore treated as dormant/unproven source, not runtime dependencies.

## Candidate status

- Asset ownership architecture: PASS for active runtime surface
- Cross-project runtime references: PASS for active runtime surface
- Missing active-runtime assets: PASS based on current canonical references and project-owned asset tree
- NEXUS-LOGISTICS catalog uniqueness: PASS (12 unique catalog media references)
- Protected repositories touched: NO
- Final external publication: NOT YET — awaiting final human consultation/approval and final CI health confirmation

## Approval gate

This is a candidate state for consultation. No final public promotion is authorized by this document alone.

Final publication requires:

1. Factory Health workflow PASS on the final commit.
2. Render deploy LIVE for the same commit.
3. Human approval of the candidate presentation.
4. Only then: publication/promotion of the selected project deployments.
