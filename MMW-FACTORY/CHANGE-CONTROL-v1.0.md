# MMW FACTORY — CHANGE CONTROL v1.0

## Change classes

### Isolated project change
Affects one project and its dedicated assets/components. Regression focuses on shared components and navigation.

### Shared-system change
Affects company shell, renderer, catalog, media loader, interaction engine, economics engine, forms or other shared infrastructure. Mandatory cross-project regression applies.

### Governance change
Changes Constitution, Standard, Methodology, QA or release rules. Requires rationale, impact analysis, versioned document update and regression review.

## Mandatory change record

Before implementation:
1. requested outcome;
2. scope and exclusions;
3. affected systems/projects;
4. applicable constitutional/standard rules;
5. acceptance criteria;
6. rollback point.

After implementation:
1. changed files/systems;
2. validation evidence;
3. regressions checked;
4. residual risks;
5. release decision.

## No silent scope expansion

A defect discovered during a task may be fixed immediately only if it is necessary for the requested result or explicitly approved. Otherwise it becomes a registered follow-up item. This prevents uncontrolled refactoring and accidental cross-project changes.

## Shared-source rule

If the same fact, asset mapping or behavior is needed in multiple places, prefer one controlled source plus deterministic derivation. Any intentional duplication requires an explicit synchronization mechanism and test.
