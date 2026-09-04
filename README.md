# MMW-ORDER-FACTORY 🏭

Isolated development and visual-testing factory for the MMW-ORDER project.

## Mission

Build and validate MMW-ORDER safely without changing the production repository.

## Release flow

`DRAFT → TEST → VISUAL REVIEW → FINAL → PUBLIC`

## Main directories

- `draft/` — temporary ideas and work in progress
- `workspace/` — active factory workspace
- `test/` — validation and test artifacts
- `final/` — approved release snapshots
- `archive/` — preserved historical factory versions
- `src/` — application source
- `public/` — web interface
- `.factory/` — factory control plane

## Principle

The factory is isolated. Production is never changed automatically from this repository.
