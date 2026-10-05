# MMW FACTORY METHODOLOGY v1.1

## Phase 0 — Protect

Record the current known-good commit. Never work directly on a frozen etalon. Create a dedicated iteration branch and define rollback.

## Phase 1 — Diagnose

Define outcome, scope, exclusions, affected systems and existing behavior. Inspect controlled data/model before editing. Identify likely regression surface.

## Phase 2 — Specify

Write acceptance criteria, invariants and applicable Constitution/Standard rules before implementation.

## Phase 3 — Build

Make the smallest coherent change. Keep shared and project-specific systems separated. Avoid incidental refactors.

## Phase 4 — Static and integrity QA

Run syntax, data lineage, media uniqueness/provenance, public-language and other applicable static checks.

## Phase 5 — Runtime QA

Verify actual interactions, forms, economics, navigation and critical user paths. A static pass does not prove runtime behavior.

## Phase 6 — Regression

Shared-system changes require cross-project regression. Re-check catalog mappings, shared renderers, media loading, forms, order storage and public shell as applicable.

## Phase 7 — Commercial QA

Read the result as a client. Remove duplication, internal terminology, false certainty, dead controls and visual clutter. Verify project identity and first-screen clarity.

## Phase 8 — Release decision

Only a passing gate set may be promoted. Record approved commit, evidence, known limitations and rollback point.

## Phase 9 — Post-release verification

Verify the deployed artifact, not only source. Compare production commit/artifact with approved version and test critical paths.

## Defect conversion

For every significant recurring defect record symptom, root cause, affected layer, immediate fix, permanent prevention, regression check and governance impact.

## Risk classes

P0 — security, data loss, broken production, constitutional violation or release parity failure.
P1 — major commercial/functional defect or cross-project regression.
P2 — material UX, visual, content or maintainability defect.
P3 — polish or non-blocking improvement.

P0/P1 require explicit regression review before release.
