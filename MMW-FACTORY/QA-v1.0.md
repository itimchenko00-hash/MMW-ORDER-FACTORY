# MMW FACTORY QA v1.1

## Gate 0 — Scope

Scope, exclusions, rollback point and affected systems are recorded. Frozen states are protected.

## Gate 1 — Structure

Stable ids; correct separation of shared/project data; no stale competing source; valid project/catalog mappings.

## Gate 2 — Content

Concept/status is honest; facts/assumptions/scenarios are distinguishable; no unsupported guarantees; no unnecessary duplication; no internal development terminology.

## Gate 3 — Media

Required assets exist; uniqueness holds within required scope; asset-to-project-to-placement-to-purpose mapping is correct; provenance exists where required.

## Gate 4 — Interaction

Every advertised interaction works at runtime; state changes visibly; result is meaningful; state is reversible where intended; no dead or duplicate primary controls; accessibility semantics are appropriate.

## Gate 5 — Economics

Inputs have units; outputs are derived; sensitivity confirms propagation; no hidden assumptions; missing data is visible; no guarantee language.

## Gate 6 — Technical

Syntax passes; server starts; health path works; API validation works; persistence is appropriate; secrets are protected; path traversal is prevented; security/privacy/SEO launch controls are present.

## Gate 7 — Commercial

First screen explains MMW-COMPANY; CTAs are intentional; project identity is clear; mobile experience is usable; privacy/consent and contact pathways are appropriate.

## Gate 8 — Production

Deployed commit matches approved release; production behavior matches tested artifact; logs show no release-blocking errors; rollback target is known; critical paths are verified after deployment.

## Evidence rule

A gate is not passed by assumption. Each applicable gate requires recorded evidence. Static checks cannot replace runtime or visual verification when those are the subject of the requirement.

## Executable baseline

The repository includes Factory Checks and CI. The check set must expand whenever a recurring failure can be converted into a deterministic automated control.

## Audit output

Every deep audit ends with gate scores, blockers, root causes, required changes, residual risks, tested commit, production commit and release decision.
