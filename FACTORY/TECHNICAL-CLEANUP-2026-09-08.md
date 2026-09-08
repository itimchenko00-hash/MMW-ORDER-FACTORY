# MMW-ORDER-FACTORY — TECHNICAL CLEANUP

Date: 2026-09-08
Canonical branch: `main`

## Protection scope

This cleanup applies only to `MMW-ORDER-FACTORY`.

The following are explicitly outside the change scope:

- conserved/frozen repositories and checkpoints;
- public production repositories;
- the production `MMW-ORDER` repository and its technical runtime role;
- visual content of the six canonical MMW-COMPANY projects.

No files in the production `MMW-ORDER` repository are modified by this cleanup.

## Changes applied

### 1. Installation safety

Removed the `postinstall` hook from `package.json`.

Factory installation must no longer trigger external media downloads automatically. The manual `factory:media` command remains available for deliberate maintenance.

### 2. AGROHUB media workflow safety

The `AGROHUB local asset mirror` workflow is no longer triggered by every push to `main`.

It is now manual (`workflow_dispatch`) only. This prevents external Unsplash availability from becoming a build/commit dependency of the canonical Factory branch.

The already mirrored local AGROHUB asset library remains untouched.

### 3. Runtime hook registry

The existing health-check reads the actual `require(...)` registrations from `server.js` rather than maintaining a separate hard-coded hook list.

This is retained as the canonical diagnostic approach.

### 4. Bootstrap boundary

`assets-server-bootstrap.js` remains limited to mounting `/assets` and starting `server.js`. Hook registration remains owned by `server.js`.

No visual/runtime page composition was changed.

## Findings intentionally NOT deleted yet

The following require a separate evidence pass before removal and are therefore preserved:

- legacy media downloader scripts;
- historical backup trees;
- frozen/conserved copies;
- historical branches;
- duplicate asset basenames where physical duplication may be intentional.

Preservation is deliberate: cleanup must not destroy recovery material or alter protected versions.

## Current technical policy

`main` is the only canonical working line for Factory.

Production `MMW-ORDER` is not a Factory cleanup target and must remain untouched unless a separate explicit command is given.

Next cleanup gate: run Factory health + canonical route + asset-reference + workflow checks after the current deployment completes.
