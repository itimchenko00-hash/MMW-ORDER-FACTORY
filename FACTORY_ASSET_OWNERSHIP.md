# FACTORY — PROJECT ASSET OWNERSHIP

Effective: 2026-09-07

## Rule

Every project in Factory owns an independent asset namespace and an independent base of runtime media files. A project must never import, reference, or silently reuse another project's `/assets/<PROJECT>/...` files.

Shared visual language is allowed; shared physical asset files are not.

## Ownership map

- MMW-COMPANY → `ASSETS/MMW-COMPANY/`
- ALADIN → `ASSETS/ALADIN/`
- ALADIN-FINANCE → `ASSETS/ALADIN/` (same product family; finance is a page of ALADIN, not a separate project)
- NEXUS-WORK → `ASSETS/NEXUS-WORK/`
- NEXUS-LOGISTICS → `ASSETS/NEXUS-LOGISTICS/`
- CARPATHIA → `ASSETS/CARPATHIA/`
- AGROHUB → `ASSETS/AGROHUB/`
- ENERGY-PARK → `ASSETS/ENERGY-PARK/`
- CHISTIY-DOM → `ASSETS/CHISTIY-DOM/` and remains conserved/protected.

## Enforcement

`factory-health-check.js` now fails when a canonical project page or project source references another project's asset namespace, or when a referenced local asset does not exist.

No project is repaired by borrowing another project's image. Missing media must be supplied into that project's own namespace.

## Migration policy

1. Preserve a checkpoint before structural changes.
2. Inventory references before deletion.
3. Create/restore the missing asset inside the owning project namespace.
4. Change the project reference to its own asset.
5. Run the cross-project health check.
6. Deploy only after the health check is clean.

## Current remediation

NEXUS-LOGISTICS had catalog references for cards 04–12 without matching local files. Dedicated Factory-owned files were added under `ASSETS/NEXUS-LOGISTICS/photos/` and the catalog was switched to those local files. No NEXUS-WORK, MMW-COMPANY, or other project asset was used as a substitute.
