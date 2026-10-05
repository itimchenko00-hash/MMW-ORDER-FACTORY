# MMW FACTORY QA v1.0

## Gate 0 — Scope

- Requested change has a defined scope.
- Frozen etalons are protected.
- Rollback reference exists.

## Gate 1 — Structure

- Project ids are stable.
- Shared and project-specific data are correctly separated.
- No stale competing source is introduced.

## Gate 2 — Content

- Concept/status is honest.
- No unsupported guarantees.
- No duplicate or unnecessary copy.
- Public language contains no internal development terminology.

## Gate 3 — Media

- Every required asset exists.
- No forbidden duplicates within the required scope.
- Semantic mapping is correct.
- Source/licensing register exists for externally sourced assets where required.

## Gate 4 — Interaction

- Every advertised interactive element opens/changes state.
- State is reversible.
- No dead buttons.
- No duplicate controls with identical intent.
- Accessibility state is represented where appropriate.

## Gate 5 — Economics

- Inputs have units.
- Outputs are derived.
- Sensitivity tests confirm relevant inputs propagate.
- No hidden assumptions.
- Missing data is visible.

## Gate 6 — Technical

- JavaScript syntax passes.
- Server starts.
- Health endpoint works.
- API validation works.
- Production persistence is configured for business-critical data.
- Secrets are not exposed.
- Path traversal is prevented.

## Gate 7 — Commercial

- First screen explains what MMW-COMPANY does.
- Calls to action are intentional and non-duplicative.
- Company and project identities are clear.
- Mobile layout is usable.
- Privacy/consent and contact pathways are appropriate for launch.

## Gate 8 — Production

- Deployed commit matches the approved release.
- Production behavior matches the tested artifact.
- Logs show no release-blocking errors.
- Rollback target is known.

## Audit output

Every deep audit should end with: score by gate, blockers, root causes, changes required, residual risks, tested commit, production commit and release decision.
