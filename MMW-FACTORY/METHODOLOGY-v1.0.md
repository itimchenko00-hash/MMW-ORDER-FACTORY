# MMW FACTORY METHODOLOGY v1.0

## Phase 0 — Protect

Record the current known-good commit. Never work directly on a frozen etalon. Create a dedicated iteration branch.

## Phase 1 — Diagnose

Define the requested outcome, affected scope and existing behavior. Inspect the canonical data/model before editing.

## Phase 2 — Specify

Write acceptance criteria and invariants before implementation. Identify which constitution and standard rules apply.

## Phase 3 — Build

Make the smallest coherent change. Keep shared systems separate from project-specific systems. Avoid incidental refactors during a targeted fix.

## Phase 4 — Validate locally

Run syntax/static checks, data integrity checks, media uniqueness checks, interaction checks and economic sensitivity checks appropriate to the change.

## Phase 5 — Regression

Re-check adjacent projects, shared renderers, catalog mappings, navigation, forms, order storage and public copy when the change touches shared infrastructure.

## Phase 6 — Commercial QA

Read the result as a client. Remove duplication, internal terminology, false certainty, dead controls and visual clutter.

## Phase 7 — Release decision

Only a passing gate set may be promoted. Record commit, test evidence, known limitations and rollback point.

## Phase 8 — Post-release verification

Verify the deployed artifact, not only source code. Production must be compared with the intended commit/version.

## Defect conversion rule

For every significant defect record:

1. symptom;
2. root cause;
3. affected layer;
4. immediate fix;
5. permanent prevention;
6. regression test/check;
7. whether the standard or constitution must change.

## Change-risk classification

P0 — security, data loss, broken production, constitutional violation.

P1 — major commercial/functional defect or cross-project regression.

P2 — material UX, visual, content or maintainability defect.

P3 — polish, optimization or non-blocking improvement.

P0/P1 changes require explicit regression review before release.
