# MMW-COMPANY/2 — STABILITY GOVERNANCE

Effective: 2026-10-06

## Single source of ongoing changes

Workspace: **MMW-COMPANY/2**
Repository: **itimchenko00-hash/MMW-ORDER-FACTORY**
Sole active working branch: **MMW-COMPANY-NEW-MASTER-2026-10-01**
Render service: **mmw-company-master**
Render auto-deploy branch: **MMW-COMPANY-NEW-MASTER-2026-10-01**

This branch is intentionally the canonical branch because it is the branch already connected to the LIVE Render service. GitHub and Render therefore remain on one line.

## Projects

All project pages are maintained inside this same workspace and branch:
- MMW-COMPANY
- ALADIN RESIDENCE
- NEXUS WORK
- CARPATHIA ECO LODGE
- AGROHUB
- ENERGY PARK
- EDUCATION & TRAINING HUB
- HEALTH & WELLNESS
- SPORTS & ACTIVE LIFESTYLE
- SERVICE HUB
- DIGITAL BUSINESS

## Mandatory operating rules

1. **No project work is performed on WIP, AUDIT, SNAPSHOT, BACKUP, BEFORE, CHECKPOINT, MASTER, COPY, DEPLOY or other parallel branches.**
2. Those branches are historical recovery/reference points only.
3. Every new change starts from the current HEAD of this branch and is committed back to this branch.
4. Do not create a new working branch as a routine backup.
5. Before a risky change, create a normal checkpoint commit on this branch.
6. A project change must remain scoped to that project unless shared infrastructure is intentionally changed.
7. Never transplant an entire historical branch over the canonical branch. If an old branch contains something useful, compare it first and move only the required change.
8. Do not change the Render-connected branch without an explicit stability check.
9. After every structural or runtime change: verify repository state, then verify the live deployment.
10. Media follows: WEB SOURCE → CONTROLLED IMPORT → LOCAL FACTORY ASSET → SEMANTIC PLACEMENT → PROVENANCE → QA → LIVE.
11. No external runtime image dependencies.
12. If a change causes uncertainty, stop the change and return to the last known-good commit on this same branch rather than switching workspaces.

## Stability principle

The stable LIVE state is the baseline. Development moves forward from it linearly.

**ONE WORKSPACE → ONE BRANCH → ONE LIVE DEPLOYMENT LINE → ONE CURRENT STATE**

Parallel branches may remain in the repository as historical evidence, but they are not alternative versions of the active product.
