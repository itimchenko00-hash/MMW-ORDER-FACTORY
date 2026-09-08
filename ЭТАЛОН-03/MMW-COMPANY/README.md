# ЭТАЛОН-03 / MMW-COMPANY

## BASELINE

This directory marks the **ЭТАЛОН-03** baseline inside MMW-ORDER-FACTORY.

The exact current MMW-COMPANY state is preserved by the branch:

`ЭТАЛОН-03/MMW-COMPANY-CLEAN-BASELINE-2026-09-08`

Source snapshot: commit `c1c22ae5658c1638fedcf283c0f3e0084f629570`.

## RULES

- This baseline is a clean starting point for rebuilding the MMW-COMPANY website.
- No visual redesign is performed in this baseline operation.
- No conserved/frozen projects are modified.
- The production `MMW-ORDER` repository is outside scope and is not modified.
- The new website work must proceed on one dedicated working line derived from this baseline.
- Historical branches remain historical and are not merged into the new line unless explicitly authorized.
- New architecture must avoid runtime overlays, duplicated publication sources, accidental cross-project mutations, and layered transformations.

## NEXT WORKING MODEL

`ЭТАЛОН-03 BASELINE`
→ one working branch
→ one canonical source per route
→ explicit assets per project
→ isolated CSS/JS per project where required
→ controlled shared components
→ deterministic build
→ one publication path

This marker file does not replace or alter the original source tree; the branch itself is the immutable starting snapshot for the new build.