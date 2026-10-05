# MMW METHODICAL CONTOUR
## Universal operating method for MMW project production
### Version 1.0 — 2026-10-05

## 1. Purpose

The MMW Methodical Contour (МК MMW) is the universal operating instrument used to determine **how** MMW projects are planned, built, checked, corrected and released.

It does not replace the Constitution or the Standard.

- **Constitution** — controlling authority: defines what must not be violated.
- **Standard** — demanding authority: defines what the finished result must be.
- **Methodical Contour** — execution authority: defines the methods, order, checkpoints and verification required to reach that result.

The Methodical Contour converts experience from completed projects into reusable production methods.

## 2. Core principle

Every project is treated as a system of connected nodes:

**purpose → audience → status → structure → content → media → logic → interaction → economics → CTA → QA → production**

No node is considered complete until its dependencies and verification criteria are defined.

## 3. Operating cycle

### 0. Preserve
Before a material change:
- create a named checkpoint/snapshot;
- record the current branch and commit;
- identify what must not be lost.

### 1. Decompose
Break the project into:
- page;
- sections;
- blocks;
- cards;
- data;
- media;
- interactions;
- calculations;
- actions/CTA.

### 2. Define meaning
For every node define:
- purpose;
- user value;
- factual content;
- status/limitations;
- required action, if any.

Content is settled before visual decoration.

### 3. Define media
For every visual position define:
- what the image communicates;
- why it belongs to that block;
- exact local Factory asset;
- uniqueness requirement;
- fallback rule.

No random decorative media and no runtime external image fallback.

### 4. Define behavior
For interactive elements define:
- trigger;
- open state;
- closed state;
- content shown;
- media shown;
- keyboard/accessibility state where applicable;
- mobile behavior;
- failure behavior.

One interaction pattern should be reused for equivalent node types.

### 5. Define economics
For economic modules define:
- input fields;
- required fields;
- valid ranges;
- calculation rules;
- empty/invalid state;
- absence-of-data state;
- output interpretation.

No invented assumptions, guarantees or false precision.

### 6. Implement
Implementation follows the approved structure and mapping.

Do not simultaneously make unrelated architectural, content, media and functional changes unless a single controlled change explicitly requires all of them.

### 7. Verify locally/static
Minimum checks:
- syntax;
- asset existence;
- route/path correctness;
- duplicate media detection;
- duplicate CTA detection;
- required-field validation;
- calculation edge cases;
- internal/external URL audit;
- content duplication scan where applicable.

### 8. Verify functionally
Test:
- cards;
- tabs;
- forms;
- calculators;
- navigation;
- state changes;
- error states;
- responsive behavior.

### 9. Commercial cleanup
Remove:
- technical/debug wording;
- internal development terminology;
- unnecessary repetition;
- duplicate buttons;
- duplicate claims;
- visual noise;
- unsupported claims.

### 10. Audit
Run three independent gates:
1. Constitution;
2. Standard;
3. Methodical Contour.

A project cannot pass merely because the code runs.

### 11. Production verification
Separate:
- source/code PASS;
- functional PASS;
- visual PASS;
- content PASS;
- media PASS;
- production/browser PASS.

Never report production readiness when only repository/static checks have passed.

### 12. Fix and re-verify
When a defect is found:
1. stop uncontrolled changes;
2. identify the failed node and dependency;
3. restore the last safe checkpoint if the state is compromised;
4. apply the smallest targeted correction;
5. repeat the relevant tests;
6. repeat the full audit when the change can affect other nodes.

### 13. Freeze
After a clean final result:
- create a stable/final checkpoint;
- record the commit;
- record known limitations;
- do not begin the next project on an unverified state.

## 4. Change-risk rules

### Rule A — smallest safe change
Prefer one bounded change over a broad rewrite.

### Rule B — checkpoint before risk
Any change capable of affecting multiple sections, media mappings, routing, calculations or shared components requires a checkpoint first.

### Rule C — dependency awareness
Before changing a shared function/component, identify every project section that consumes it.

### Rule D — no blind visual replacement
Replacing a photo requires checking its semantic role, uniqueness and all mappings.

### Rule E — no blind text cleanup
Removing text requires checking whether the text is carrying unique meaning, a legal/status qualification or a required user action.

### Rule F — no false completion
A green static check does not equal production readiness.

## 5. Defect learning loop

Every significant defect is converted into a method rule.

Format:

**defect → cause → correction → prevention rule → reusable check**

Examples:

- duplicate media → uncontrolled mapping → centralized mapping → every project visual set gets a uniqueness scan;
- broken concatenated JS → unsafe string edit → syntax verification → every structural renderer change gets an immediate syntax check;
- cards not opening → inconsistent handlers → unified interaction pattern → equivalent cards share one interaction contract;
- external runtime image → incomplete asset workflow → local Factory asset → production scan rejects external image URLs;
- calculator false zero/invalid output → missing edge-state rule → explicit invalid/empty states → economic modules test zero, blank and missing-capex cases;
- production not verified → source-only confidence → browser/prod check → release status cannot be green without production verification.

## 6. Universal node contract

Every reusable MMW node should be answerable with these fields:

1. **Purpose** — why it exists.
2. **Input** — what it receives.
3. **Output** — what it produces/shows.
4. **Dependencies** — what can affect it.
5. **Media** — what visual asset belongs to it.
6. **Interaction** — how the user operates it.
7. **Validation** — how correctness is checked.
8. **Failure state** — what happens when data/action is invalid.
9. **Commercial role** — why it matters to the customer.
10. **Release status** — whether it is verified for production.

## 7. Release gates

### G0 — Preserved
Safe checkpoint exists.

### G1 — Structured
Architecture and dependencies defined.

### G2 — Content-complete
Commercial content is coherent and status-honest.

### G3 — Media-complete
Local, unique and semantically mapped media is verified.

### G4 — Functional
Interactions, forms and economics pass.

### G5 — Clean
No unnecessary technical or duplicate public content remains.

### G6 — Audited
Constitution + Standard + Methodical Contour pass.

### G7 — Production
Published version is independently verified.

Only G7 may be described as production-verified.

## 8. Project inheritance

The following lessons are now part of the universal method:

### ALADIN RESIDENCE
Use unified interaction contracts, controlled content density, semantic media mapping and explicit economic-input rules.

### CARPATHIA ECO LODGE
Treat media as information architecture, not decoration; control repetition and guest-experience card structure.

### NEXUS WORK
Treat economic logic as a functional subsystem with validation and edge cases, not merely a visual calculator.

### Media recovery protocol — proven method

When a project has accumulated duplicated, mismatched, layered or visually unstable photographs, do **not** attempt to repair the existing photo layer by replacing individual images in place.

Use the following controlled sequence:

1. **Freeze the current state** with a named checkpoint before touching media.
2. **Remove the entire affected runtime photo mapping** while preserving the blocks, cards, copy, interaction and layout.
3. **Verify the clean semantic layer** independently: every block/card must remain structurally valid with no image dependency.
4. **Build a semantic photo brief** from the actual meaning of each block/card, not from available filenames or previously used images.
5. **Search for candidate photographs by exact semantic role** (e.g. receiving, storage, processing, packaging, logistics), not by the project name alone.
6. **Check licensing/usage rights and record provenance** for every selected source.
7. **Save approved photographs as local project assets** in the project's dedicated Factory media folder. External image URLs may exist only in the provenance record, never as runtime media.
8. **Create an explicit one-to-one media map**: visual role → local file → block/card. No uncontrolled fallback to the first image.
9. **Enforce uniqueness** within the project set and check for accidental reuse across roles.
10. **Reinsert media only after the clean layer passes structural checks.**
11. **Run static checks** for local asset existence, path correctness, duplicate references, external runtime image URLs and broken mappings.
12. **Run functional/visual verification** of every block/card and its responsive state.
13. **Only then** advance the project to the Media-complete gate G3.

This is the preferred recovery method whenever the root problem is media-layer accumulation rather than missing content or broken structure.

**Known implementation constraint:** if the working environment cannot safely import binary image files into the repository, do not simulate completion with external runtime URLs. Keep the project in the clean no-photo state, preserve the selected source/provenance registry, and complete local binary import through the approved repository asset workflow before enabling the new media map.

### NEXUS LOGISTICS
Centralize media mapping, enforce local-only runtime assets, verify asset uniqueness/count, protect concatenated JS structure, and distinguish repository PASS from production PASS.

These lessons are methodological inheritance, not project-specific exceptions.

## 9. Universal rule for subsequent projects

For every new MMW project, the working order is:

**PRESERVE → DECOMPOSE → DEFINE → MAP → IMPLEMENT → VERIFY → CLEAN → AUDIT → PRODUCTION VERIFY → FREEZE**

Do not skip a stage because the project appears simple.

The Methodical Contour may add checks for a specific project, but it may not weaken Constitution or Standard requirements.

## 10. Authority hierarchy

When rules conflict:

1. Constitution prevails over Methodical Contour.
2. Standard prevails over a convenient implementation shortcut.
3. Methodical Contour determines the safest practical path to satisfy both.
4. A project-specific method may be stricter, never weaker.

## 11. Objective

The objective of the Methodical Contour is not to eliminate all errors.

Its objective is to ensure that:
- errors are detected earlier;
- changes are smaller and reversible;
- recurring defects become reusable controls;
- every completed project improves the production method for the next project.

**MMW Methodical Contour = a repeatable way of turning requirements into verified commercial products.**
