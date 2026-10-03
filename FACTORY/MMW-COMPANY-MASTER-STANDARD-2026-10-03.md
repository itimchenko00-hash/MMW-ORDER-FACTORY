# MMW-COMPANY MASTER STANDARD — 2026-10-03

## Purpose
This branch is the clean public master for MMW-COMPANY and its six project concepts.

## Structure
MMW-COMPANY is the parent development/organization/management system. Projects remain separate products:
ALADIN RESIDENCE, NEXUS WORK, NEXUS LOGISTICS, CARPATHIA ECO LODGE, AGROHUB, ENERGY PARK.

## Replacement rule
A changed section is replaced, not layered over the previous implementation. One renderer, one public stylesheet, one public application layer.

## Commercial cleanliness
Public pages contain only customer/investor-facing content. Internal branch names, Render IDs, commit SHAs, Factory terminology, technical diagnostics and implementation jargon are excluded.

## Media ownership
Every public company/project contour has local repository media. Runtime pages never depend on remote image URLs and never generate substitute images. Media is assigned by project ownership and used in relevant blocks.

## Interaction
Project cards open their own detail view and relevant local photo. Project navigation is anchored. Economic inputs react immediately without reload.

## Economics
Each project has its own model:
ALADIN DEVELOPMENT; SPACE & REVENUE; FLOW; HOSPITALITY; PROCESSING; ENERGY & ASSET.
No universal calculator is relabeled as a project model. Empty inputs never produce invented results.

## Truth status
All six projects are publicly marked as concepts. Unknown financial values remain user inputs.

## Publication
The public runtime is Node.js on 0.0.0.0 and process.env.PORT, default 10000. Health endpoint: /healthz.

## QA gate
Before publication: server starts, /healthz returns ok, company route loads, portfolio route loads, all six project routes load, local media responds, cards open, economics calculate only after valid inputs, mobile navigation works, and public text contains no internal technical terms.
