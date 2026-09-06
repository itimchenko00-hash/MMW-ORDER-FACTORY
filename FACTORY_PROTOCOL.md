# MMW-ORDER-FACTORY — WORK PROTOCOL / CONSTITUTION

## 0. STATUS
This document is the permanent operating constitution of `MMW-ORDER-FACTORY`.
It defines how the Factory is used and must be read before structural, architectural, destructive or deployment work.
Changes to this constitution require an explicit user instruction.

## 1. PURPOSE
`MMW-ORDER-FACTORY` is the active development Factory for the MMW ecosystem.

The Factory is the place where projects are developed, redesigned, tested and prepared for publication without disturbing conserved or production versions.

## 2. CORE ARCHITECTURE — MANDATORY
The ecosystem is organized as:

`MMW-COMPANY` = parent company / master brand.

Projects/products are independent development units under the MMW-COMPANY architecture, including but not limited to:
- ALADIN
- NEXUS WORK
- NEXUS LOGISTICS
- CARPATHIA
- AGROHUB
- ENERGY PARK
- MMW ORDER

A project is NOT the MMW-COMPANY website itself.

## 3. ABSOLUTE ISOLATION RULE
**A project being edited in FACTORY must never modify, overwrite, delete, merge into, or otherwise interfere with:**
- the MMW-COMPANY master page;
- another project's working version;
- any conserved/frozen repository or snapshot;
- FINAL / approved company assembly;
- production/public versions.

Changes are local to the selected project working area until the user explicitly promotes that version.

## 4. FACTORY / CONSERVED / FINAL
The operating model has three distinct states:

### FACTORY / WORKING
Active development area.
- experiments are allowed;
- code and content may change repeatedly;
- previews and tests are allowed;
- unfinished work stays here.

### CONSERVED / FROZEN
Immutable recovery snapshots.
- never used as a normal development workspace;
- never overwritten during ordinary work;
- retained so an exact prior state can be restored.

### FINAL
Stable approved assembly.
- contains only explicitly approved project versions;
- is not a playground;
- is changed only through an explicit promotion/assembly instruction.

## 5. PROJECT PROMOTION RULE
A project can change in FACTORY as many times as necessary.

Nothing is promoted automatically.

Only an explicit user instruction such as:

`ALADIN готов. Сними эту версию в CONSERVED и собери её в FINAL.`

authorizes:
1. identifying the exact current working version;
2. conserving/snapshotting that exact version;
3. verifying the snapshot;
4. copying/assembling it into FINAL;
5. verifying that MMW-COMPANY and unrelated projects remain unchanged.

## 6. COPY, NEVER MOVE
Original repositories, frozen snapshots and approved versions must be preserved.

Normal Factory operations use:

**COPY → DEVELOP → TEST → VERIFY → CONSERVE → APPROVE → ASSEMBLE**

Never move or destroy the only copy of a project.

## 7. RECOVERY RULE
If a working version is damaged or an unsafe change occurs:
1. stop work;
2. preserve the conserved version;
3. create a fresh working copy from the conserved version;
4. resume development only in the new working copy.

## 8. BRANCH / PROJECT DISCIPLINE
Each active project must have its own working branch or clearly isolated working path.

Example:
`FACTORY → ALADIN working branch → preview → verification`

A project branch must not be used as a shortcut to edit `main`, FINAL, or another project's conserved state.

## 9. PREVIEW / PUBLICATION MODEL
Development follows:

`FACTORY → PREVIEW → REVIEW → APPROVED → FINAL → PRODUCTION`

Preview deployments are for testing and visual verification.
Production/public deployment is separate from experimental work.

A preview may change frequently without changing FINAL.

## 10. SAFETY CHECKS — BEFORE EVERY STRUCTURAL CHANGE
Before any destructive, structural, architectural, branch, repository or deployment operation:
- identify the exact repository;
- identify the exact branch/ref;
- identify the exact path;
- confirm it is the intended working area;
- confirm no conserved/original source is being touched;
- confirm no unrelated project is included;
- map the current dependencies and runtime path when the change affects architecture or behavior.

After every important operation:
- verify the resulting tree/files;
- verify the target branch/commit;
- verify deployment status when relevant;
- report exactly what changed;
- never claim completion without verification.

## 11. ARCHITECTURAL INTEGRITY LAW — NON-NEGOTIABLE
Before adding, replacing or removing a substantial piece of code, the assistant must first understand the existing architecture and identify the actual source of the behavior being changed.

### 11.1 Single Source of Truth
Every working page, component or functional element must have one clearly identified canonical source.

**One architectural element = one responsible source.**

### 11.2 No Layering by Default
A new hook, script, style layer, server transformation or duplicate component must not be added merely to compensate for an unknown or malfunctioning existing layer.

The order is:

**FIND → UNDERSTAND → VERIFY → FIX EXISTING SOURCE → ADD ONLY IF NECESSARY.**

### 11.3 Single Owner of a Function
Each function must have one responsible owner. Multiple independent mechanisms must not simultaneously control the same element unless their interaction is explicitly documented and verified.

### 11.4 Runtime / Support / Archive Separation
Files must be classified as:
- **RUNTIME** — actively affects the current preview;
- **SUPPORT** — required infrastructure for the current version;
- **ARCHIVE** — historical, backup or recovery material that must not participate in runtime.

Archive material must not be loaded accidentally or used as a hidden second source.

### 11.5 Minimum Intervention
When the problem can be solved by changing one source, changing multiple sources is prohibited unless technically justified.

### 11.6 Visual Symptom Rule
A visual defect must not automatically be treated as a CSS or visual problem. Before adding CSS/JS, inspect the complete chain:

`SOURCE → SERVER → HOOKS → SCRIPTS → STYLES → RUNTIME`

### 11.7 Reversibility
Substantial architectural changes must have a recoverable checkpoint. History is preserved; obsolete working material is moved to `КОРЗИНА` or another designated archive location rather than being destroyed when recovery value exists.

## 12. CONSULTATION PROTOCOL
Every substantial Factory consultation follows this order:

1. **CURRENT STATE** — what exists now.
2. **RUNTIME** — what actually executes.
3. **CANONICAL SOURCE** — which file/path is authoritative.
4. **DEPENDENCIES** — which hooks, scripts, styles and server transformations are connected.
5. **CONFLICT** — where duplication or interference occurs.
6. **PRESERVE** — what must remain unchanged.
7. **ISOLATE / ARCHIVE** — what should be removed from runtime or moved to `КОРЗИНА`.
8. **PROPOSE** — the smallest safe change.
9. **IMPLEMENT** — only after the intended scope is clear.
10. **VERIFY** — inspect files, commit, runtime and preview as applicable.

A consultation is not considered technically complete merely because code was produced.

## 13. PROTECTED SOURCES
Original repositories outside the Factory and conserved copies inside the Factory are protected by default.

They may be touched only after an explicit concrete user command identifying what should be changed.

## 14. CURRENT FACTORY ORIENTATION
The repository may contain legacy/import/backup paths from earlier stages of construction. Their existence does not change the rules above.

The canonical logical model remains:

```text
MMW-ORDER-FACTORY/
├── MMW-COMPANY/          # parent company / master product
├── PROJECTS/             # isolated project working areas when applicable
│   ├── ALADIN/
│   ├── NEXUS-WORK/
│   ├── NEXUS-LOGISTICS/
│   ├── CARPATHIA/
│   ├── AGROHUB/
│   └── ENERGY-PARK/
├── CONSERVED/            # immutable snapshots
├── FINAL/                # approved stable assembly
├── КОРЗИНА/              # archived/removed-from-runtime working material
└── FACTORY_PROTOCOL.md   # this constitution
```

Physical paths may evolve, but logical isolation must not.

## 15. START-OF-SESSION RULE
At the start of work, orient against this constitution before making repository or deployment changes.

The assistant must treat this document as the Factory's operating constitution, not as optional notes.

## 16. NON-NEGOTIABLE PRINCIPLE
**Develop freely in FACTORY. Preserve CONSERVED. Protect FINAL. Promote only by explicit command. Keep every project isolated. Maintain architectural integrity. Do not add a new layer until the existing layer is understood.**

This constitution governs all future Factory work unless the user explicitly replaces it with a newer written rule.
