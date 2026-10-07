# MMW-COMPANY/2 — architecture checkpoint

Date: 2026-10-07
Active branch: MMW-COMPANY-WORKSPACE-V1-2026-10-05
Render service: mmw-company-2

## Purpose
Freeze the currently working company + ALADIN media state before consolidating project architecture.

## Preserved working media
- MMW-COMPANY: local media remains active.
- ALADIN RESIDENCE: local media remains active.

## Project media rollback state
CARPATHIA ECO LODGE, NEXUS WORK, NEXUS LOGISTICS, AGROHUB and ENERGY PARK are treated as having **no active runtime project photography** until each project is rebuilt through the controlled local-media pipeline.

Existing historical/local files are not treated as runtime media. They remain available for rollback/review where already archived in the repository.

## Technical decision
- One repository.
- One active branch.
- One Render web service.
- Ten projects are catalog/content units, not separate technical applications.
- One project registry.
- One canonical runtime media URL namespace: /ASSETS/<PROJECT>/...
- No external runtime image URLs.
- Project media imports are manual/controlled, not autonomous project-specific workflows.
- Commercial subsystem remains untouched.

## Pre-change file fingerprints
- public/app.js: 292899c30009fc684b83ed665b7ab657632aa099
- public/style.css: 3cf12532b3de172ba14616693bb46e28d728111e
- public/index.html: c5a4e1389fc021e17427e12b86fc49261421b7d6
- server.js: a4b3eecbf8cb70db1bb2eb47abc47bf419683178

This checkpoint is documentation inside the same active branch; no new working branch or workspace is created.
