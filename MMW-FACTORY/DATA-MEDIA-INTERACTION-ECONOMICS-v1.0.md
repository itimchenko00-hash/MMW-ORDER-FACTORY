# MMW FACTORY — INTEGRITY SYSTEMS v1.0

## 1. Data integrity

Every important public fact has identifiable ownership: project model, catalog, content structure or explicitly declared source. A renderer may transform data but must not silently create a competing business record.

Required controls:
- stable project identifiers;
- valid project-to-catalog mapping;
- no duplicate identifiers;
- no stale parallel media/project registries where canonical data exists;
- explicit distinction between confirmed fact, assumption, scenario and unresolved question;
- change impact analysis for shared data.

## 2. Media integrity

Every required image has four properties: **asset → project → placement → semantic purpose**.

Required controls:
- existence check;
- uniqueness check within the declared scope;
- semantic-purpose declaration;
- project ownership;
- source/licensing record for external assets;
- intentional placeholder/infographic when a suitable asset does not exist;
- no random substitution;
- no decorative image used to conceal missing information.

## 3. Interaction integrity

Every interactive component is a state machine, not merely a styled card.

Minimum states: available → activated → visible result → reversible/close where applicable.

Required controls:
- advertised affordance exists;
- click/tap produces the promised result;
- state is visible;
- state can be restored where intended;
- no dead controls;
- no duplicate primary actions;
- keyboard/accessibility semantics where applicable;
- shared interaction changes are regression-tested across affected projects.

## 4. Economic integrity

Every economic contour declares visible business inputs, units, derived outputs, formulas or calculation logic, dependency graph, missing-input behavior and scenario status.

For every relevant input, QA must demonstrate propagation to every claimed dependent output. Manual revenue or profit fields are prohibited where those values should be derived from operational inputs.

No economic output is a guarantee. Unknown values remain unknown until supplied or deliberately modeled as a labeled scenario.

## 5. Integrity evidence

A gate is passed only when evidence exists. Acceptable evidence includes automated test output, source inspection, runtime behavior, visual inspection, or a recorded production comparison as appropriate to the gate.

A green static check cannot substitute for runtime verification when the requirement concerns runtime behavior.
