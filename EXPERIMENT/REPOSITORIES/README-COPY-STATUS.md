# EXPERIMENT — COPY STATUS

EXPERIMENT-ISOLATED-2026-09-05 is the only working branch for experimental edits.

## Snapshots
- MMW-ORDER-FACTORY: full Factory main tree is included under `EXPERIMENT/REPOSITORIES/MMW-ORDER-FACTORY-SNAPSHOT`.
- MMW-ORDER: current main files are copied under `EXPERIMENT/REPOSITORIES/MMW-ORDER`.
- The Factory snapshot itself already contains the project folders, historical backups, root-level folders, and the Factory technical files that existed on the source snapshot.

## Isolation
- Do not edit `main` from this sandbox.
- Do not edit production/preserved repositories from this sandbox.
- Do not connect Render production services to this branch.
- No automatic reverse synchronization is configured.

## Important
This is a working snapshot, not a live mirror. External repository contents are copied into this branch as files/snapshots; changing files here does not write back to the original repositories.
