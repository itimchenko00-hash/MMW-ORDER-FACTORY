# MMW-COMPANY/2 — WORKSPACE BASELINE

## Baseline purpose
This file records the initial protection point before active rebuilding begins.

## Protected references
- Frozen company workspace: `MMW-COMPANY/1 — FROZEN`
- Factory governance: `MMW-FACTORY/`
- Active workspace: `MMW-COMPANY/2 — WORKING`

## Initial operating rule
No production deployment is permitted from this workspace until the user explicitly requests it and the applicable Factory gates have evidence.

## First-work checkpoint
The first implementation task must begin with:
1. inspect the current contents of `MMW-COMPANY/2 — WORKING`;
2. identify the application entrypoints and data/media boundaries;
3. run the applicable Factory checks;
4. record the resulting state;
5. only then modify structure or content.

## Rollback principle
Every material checkpoint must be represented by a Git commit. If a later change causes regression, return to the last verified checkpoint rather than repairing blindly in-place.

## Note
This baseline is a governance checkpoint, not a claim that the workspace itself is production-ready.
