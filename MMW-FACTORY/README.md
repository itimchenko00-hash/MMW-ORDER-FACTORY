# MMW FACTORY

## Governance baseline v1.0 — 2026-10-05

MMW FACTORY is the production-control layer for MMW-COMPANY projects. It defines the rules, standard, methodology and quality gates used before a project or company-site change can be released.

### Control hierarchy

1. CONSTITUTION — immutable principles and prohibitions.
2. STANDARD — required characteristics of an acceptable result.
3. METHODOLOGY — production sequence and change discipline.
4. DATA / MEDIA / INTERACTION / ECONOMICS — specialized execution systems.
5. QA — evidence-based verification.
6. RELEASE CONTROL — promotion to production only after gates pass.
7. VERSION / ROLLBACK — preservation of known-good states.
8. FAILURE REGISTER — every recurring defect becomes a prevention rule.

### Frozen control state

MMW-COMPANY Etalon 5 remains frozen at commit `989b8fbf429bbe3eaf04f59b20756519912590fa`. This governance branch is derived from that exact commit and must never modify Etalon 5.

### Non-negotiable production rule

A fix is not considered complete when the visible symptom disappears. It is complete only when the root cause is identified and a rule, validation or regression check exists to prevent recurrence where technically feasible.

### Change discipline

Every production change must state: scope, affected systems, expected invariants, validation performed, rollback point and release decision. Unrelated project content must not be changed incidentally.
