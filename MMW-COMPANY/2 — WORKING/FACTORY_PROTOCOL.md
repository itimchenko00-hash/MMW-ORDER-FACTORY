# MMW-ORDER-FACTORY — WORK PROTOCOL

## Purpose
This repository is the ONLY active working factory for the MMW projects unless the user explicitly gives a different instruction.

## Mandatory preservation rule
**COPY, NEVER MOVE.** Original repositories and frozen source material must not be deleted, moved, overwritten, or modified during normal factory work.

## Project operating model
For each protected project we maintain two copies inside the factory:

- `1 — FROZEN` = immutable recovery copy. Never edit it during normal work.
- `2 — WORKING` = active working copy. All development, experiments, fixes, redesigns and testing are performed here.

Conceptually:

```text
MMW-ORDER-FACTORY/
├── MMW-COMPANY/
│   ├── 1 — FROZEN/
│   └── 2 — WORKING/
└── MMW-ORDER/
    ├── 1 — FROZEN/
    └── 2 — WORKING/
```

The current repository may temporarily use legacy/import/backup paths while migration to this naming convention is performed. The rule above is the target operating model.

## Recovery rule
If the working copy suffers irreversible loss or an unsafe change:
1. Stop work.
2. Preserve the frozen copy.
3. Create a fresh working copy from `1 — FROZEN`.
4. Resume work only in `2 — WORKING`.

Never use the frozen copy as the development workspace.

## Factory pipeline
`DRAFT → TEST → VISUAL REVIEW → FINAL → PUBLIC`

Render is used for draft/test preview. Production/public deployments remain separate.

## Safety checks
Before any destructive or structural operation:
- verify the target path;
- verify that it is the working copy;
- verify that no frozen/original source is being touched.

After every important operation:
- verify the resulting tree/files;
- report exactly what changed;
- do not claim completion without verification.

## Frozen originals
Original repositories outside the factory are considered conserved/frozen. They must not be touched unless the user gives an explicit concrete command.

## Current protected projects
- MMW-COMPANY
- MMW-ORDER

## Session orientation
At the start of a new chat, read this file first. Treat it as the factory's operational constitution and use it to orient the work before making changes.
