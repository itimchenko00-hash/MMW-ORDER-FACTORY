# MMW FACTORY

## Governance baseline v1.1 — 2026-10-05

MMW FACTORY is the controlled production system for MMW-COMPANY. It governs how company pages and projects are specified, built, tested, released, verified and corrected.

## Operating principle

The Factory does not optimize for “looks finished”. It optimizes for a result that is truthful, commercially clean, semantically coherent, technically functional, economically traceable, reproducible and safely releasable.

Mandatory lifecycle:

**PROTECT → DIAGNOSE → SPECIFY → BUILD → STATIC QA → INTEGRITY QA → RUNTIME QA → COMMERCIAL QA → RELEASE → PRODUCTION VERIFY → LEARN**

## Control hierarchy

1. CONSTITUTION — non-negotiable principles and prohibitions.
2. STANDARD — required characteristics of an acceptable result.
3. METHODOLOGY — production sequence and change discipline.
4. DATA / MEDIA / INTERACTION / ECONOMICS — integrity systems.
5. QA — evidence-based gates and automated checks.
6. RELEASE CONTROL — controlled promotion only after gates pass.
7. VERSION / ROLLBACK — known-good states and reproducible releases.
8. FAILURE REGISTER — recurring defects become permanent prevention rules.

## Core Factory laws

- **One change, one declared scope.** No unrelated changes are bundled into a targeted task.
- **One approved data lineage.** Public renderers must have an identifiable source of truth and must not silently compete with it.
- **Meaning before decoration.** Media, visual effects and interactions must reinforce the information they present.
- **Behavior before appearance.** An interactive element is not complete until its real state transition is tested.
- **Inputs before outputs.** Economic results are derived from visible inputs and formulas.
- **Evidence before readiness.** “Ready” is a QA decision supported by evidence, not a visual impression.
- **Production is not a laboratory.** Production is never used as the place to discover whether a change works.
- **Every release is reproducible.** The exact approved commit, tests and rollback target are recorded.
- **Every recurring defect becomes prevention.** Repeated manual correction without a new control is incomplete process improvement.
- **Project individuality without system fragmentation.** Each project may be visually and behaviorally unique while obeying the same integrity rules.

## Mandatory release gates

G0 Scope → G1 Structure → G2 Content → G3 Media → G4 Interaction → G5 Economics → G6 Technical → G7 Commercial → G8 Production.

A failed blocking gate means **NO RELEASE**.

## Frozen control state

MMW-COMPANY Etalon 5 remains frozen at commit 989b8fbf429bbe3eaf04f59b20756519912590fa. This governance branch is derived from that exact commit. Governance work must not modify the frozen Etalon 5 state.

## Defect conversion rule

For every recurring or material defect: **symptom → root cause → permanent rule → automated/manual control → regression test → register**.

## Change discipline

Every change records scope, affected systems, invariants, acceptance criteria, validation evidence, rollback point and release decision. Shared infrastructure changes require cross-project regression.
