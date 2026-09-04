# MMW-ORDER-FACTORY

## Purpose

This repository is the isolated development factory for MMW-ORDER.

It is the workspace for building, testing, visually reviewing and preparing releases before publication.

## Pipeline

DRAFT → TEST → VISUAL REVIEW → FINAL → PUBLIC

## Rules

1. `MMW-ORDER-FACTORY` is the only repository used for factory development.
2. The production repository `MMW-ORDER` is not modified by factory automation.
3. Render Factory is a preview/test environment, not the production source.
4. Every release must pass technical checks and visual review before entering `final/`.
5. A release is published only by an explicit release action.
6. Work-in-progress stays in `draft/` or `workspace/`.
7. Approved release snapshots are kept in `final/` and previous versions in `archive/`.

## Environments

- DRAFT: active development
- TEST: automated validation and Render preview
- FINAL: approved release candidate
- PUBLIC: explicitly published production version

## Repository isolation

No workflow in this repository may push, merge, delete, or otherwise modify `MMW-ORDER` or unrelated repositories.
