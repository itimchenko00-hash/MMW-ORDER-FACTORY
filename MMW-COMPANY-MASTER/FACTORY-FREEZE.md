# MMW-COMPANY MASTER FACTORY — FREEZE POLICY

Status: ACTIVE
Created: 2026-10-01
Working branch: MMW-COMPANY-NEW-MASTER-2026-10-01

## Purpose

This branch is the new isolated development line for MMW-COMPANY.

All previous MMW-COMPANY versions, branches, Render services, project packages and historical checkpoints are reference/archive material only.

## Frozen sources

The following are frozen by default and must not be modified, deleted, renamed, moved, rebased, merged, cherry-picked into, or redeployed as part of this project without a direct explicit user command:

- ЭТАЛОН-03/MMW-COMPANY-CLEAN-BASELINE-2026-09-08
- ЭТАЛОН-03/MMW-COMPANY-MASTER
- ЭТАЛОН-03/MMW-COMPANY-WORK
- MMW-COMPANY-ETALON-03-COPY-2026-09-13
- MMW-COMPANY-VISUAL-MASTER-IMAGE-2026-09-30
- all historical MMW-COMPANY checkpoints/backups
- existing Render MMW-COMPANY services
- existing project branches and published project versions

## Extraction rule

Reference material may be READ and selectively recreated/copied into this new line.

Nothing is moved or removed from a frozen source.

No source file, asset, visual, code layer, runtime hook, route system or deployment configuration is inherited automatically merely because it exists in an older version.

## Replacement rule — CONSTITUTION

**When content is changed, the existing canonical content must be REPLACED, not layered on top of, duplicated, appended as a competing version, or overridden by a second runtime layer.**

For every canonical page, section, component, data object, visual block or configuration:

1. Identify the current canonical source.
2. Edit that source directly.
3. Replace the old content with the new content.
4. Remove obsolete duplicate content when it is part of the same canonical source.
5. Keep exactly one active canonical version.
6. Do not solve a content change by adding a second copy, overlay, hidden hook, duplicate route, CSS patch stack, DOM injection, runtime mutation or parallel data source.

**Canonical rule:**

ONE CANONICAL SOURCE → ONE CURRENT CONTENT VERSION → ONE DETERMINISTIC RENDER

A new version may coexist with an old version only when the old version is explicitly marked as an archive/reference and is outside the active canonical route.

## New-line rule

The new site is built as a clean implementation:

REFERENCE → CURATION → NEW ARCHITECTURE → NEW DESIGN → ONE SOURCE OF TRUTH → ONE BUILD → ONE DEPLOY

No runtime overlays, hidden hooks, duplicated canonical routes or layered visual mutation systems.

## Change authorization

Changes to frozen sources require a direct explicit command from the user identifying the source and the requested change.

Changes inside this new branch are allowed as part of normal development, but every content/design change must follow the Replacement Rule above.

## Architectural invariant

One canonical route = one canonical source = one deterministic render path.

One canonical content block = one current version.

ALADIN remains one project/product inside MMW-COMPANY, not the whole company.
