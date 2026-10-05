# MMW FACTORY — RELEASE CONTROL v1.0

## Release states

**DRAFT → QA → APPROVED → RELEASED → VERIFIED**

A release may move backward at any point when evidence fails.

## Required release record

Every production release must identify:
- approved commit;
- branch/source;
- scope;
- affected projects/systems;
- passed gates G0–G8;
- test evidence;
- known limitations;
- rollback commit/reference;
- production commit after deployment;
- post-release verification result.

## Parity rule

The deployed production artifact must match the approved commit. A deployment that contains unapproved source changes is a release failure even if the page appears functional.

## Rollback rule

Every release has a known rollback target before deployment. Rollback must restore the last known-good state rather than introduce another untested change.

## Production verification

Source validation is insufficient. After deployment, verify the actual production artifact and critical user paths. If production cannot be verified, the release is not considered fully closed.

## Emergency change

An emergency change may bypass only non-safety-critical sequencing when necessary to protect production, but it must be documented immediately and subjected to full retrospective QA before the next normal release.
