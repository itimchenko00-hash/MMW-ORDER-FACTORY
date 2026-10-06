# MMW-COMPANY/2 — FACTORY CONTROL BINDING v1.0

## Status
ACTIVE WORKSPACE.

This directory is governed by the MMW FACTORY governance layer. It is the only active working zone for the current MMW-COMPANY rebuild.

## Scope
- Workspace: `MMW-COMPANY/2 — WORKING`
- Parent repository: `itimchenko00-hash/MMW-ORDER-FACTORY`
- Frozen reference: `MMW-COMPANY/1 — FROZEN`
- Factory governance: `MMW-FACTORY/`

## Mandatory rules
1. `MMW-COMPANY/1 — FROZEN` is read-only unless the user explicitly authorizes a change.
2. Work is performed only inside `MMW-COMPANY/2 — WORKING` and the Factory files explicitly required to govern it.
3. No deployment to production from this workspace without an explicit user instruction.
4. Every material change has a declared scope, acceptance criteria and rollback point.
5. No silent scope expansion.
6. Evidence is required before a readiness claim.
7. Public content must comply with the MMW Constitution: truth before appearance, concepts are not presented as launched, forecasts are not guarantees, and economics must be traceable to inputs/formulas.
8. Public language must remain commercial; internal Factory/governance terminology must not leak into the public site.
9. Media must be semantically relevant, unique where required, locally controlled, and have provenance when imported from the web.
10. Interactive elements must have a visible affordance, a working state transition, a result, reversibility where applicable, and accessible state information.
11. Economics must be input-driven; derived values are not manually entered as independent facts.
12. Shared data or system changes require impact review before implementation.
13. Production is a controlled destination, never a test environment.
14. A release is blocked without QA evidence and a known rollback target.

## Factory lifecycle
`PROTECT → DIAGNOSE → SPECIFY → BUILD → STATIC QA → INTEGRITY QA → RUNTIME QA → COMMERCIAL QA → RELEASE → PRODUCTION VERIFY → LEARN`

## Release gates
`G0 Scope → G1 Structure → G2 Content → G3 Media → G4 Interaction → G5 Economics → G6 Technical → G7 Commercial → G8 Production`

## Required change record
Before material implementation:
- requested outcome
- scope / exclusions
- affected systems and projects
- applicable Factory rules
- acceptance criteria
- rollback point

After implementation:
- changed files/systems
- validation evidence
- regressions
- residual risks
- release decision

## Workspace invariant
The workspace must remain reproducible from Git history. A working state is not considered a release merely because it renders locally or visually.

## Source of authority
For governance, the current MMW FACTORY documents under `MMW-FACTORY/` are authoritative. This file binds the workspace to those rules; it does not replace them.
