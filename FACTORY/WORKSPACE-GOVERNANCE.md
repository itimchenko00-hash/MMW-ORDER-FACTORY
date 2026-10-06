# MMW-COMPANY Factory — Single Workspace / Single Branch

Effective: 2026-10-06

Canonical workspace: MMW-COMPANY/2
Repository: itimchenko00-hash/MMW-ORDER-FACTORY
Canonical working branch: MMW-COMPANY-WORKSPACE-V1-2026-10-05

Covered integrated projects:
- MMW-COMPANY
- ALADIN RESIDENCE
- NEXUS WORK
- CARPATHIA ECO LODGE
- AGROHUB
- ENERGY PARK

Rules:
1. All ongoing edits for these projects are made only on the canonical branch above.
2. AUDIT, SNAPSHOT, BACKUP, BEFORE, CHECKPOINT, DEPLOY, MASTER, COPY and WIP branches are historical references only, never active workspaces.
3. A backup is a commit on the canonical branch; do not create a new working branch for routine safety copies.
4. A project change must stay scoped to that project unless shared infrastructure genuinely requires a change.
5. If a useful change exists on a historical branch, compare it to the canonical branch and transplant only the required change into the canonical branch.
6. Media follows: WEB SOURCE -> CONTROLLED IMPORT -> LOCAL FACTORY ASSET -> SEMANTIC PLACEMENT -> PROVENANCE -> QA -> LIVE.
7. Live deployment for the integrated MMW-COMPANY site must consume this canonical branch.
8. No new parallel working branch may be introduced for project editing without an explicit architectural decision to split the project into a separate repository/workspace.

Reason for the rule:
The repository accumulated many parallel working/audit/backup/snapshot branches. This caused divergent states and made it unclear which version was authoritative. From 2026-10-06 this branch is the single ongoing source of truth for the integrated MMW-COMPANY workspace.
