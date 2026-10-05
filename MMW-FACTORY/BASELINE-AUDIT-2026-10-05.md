# MMW FACTORY BASELINE AUDIT — 2026-10-05

## Scope

Baseline review performed against frozen Etalon 5 commit `989b8fbf429bbe3eaf04f59b20756519912590fa` in `itimchenko00-hash/MMW-ORDER-FACTORY`. This document evaluates the production-control system, not the visual quality of individual projects.

## Findings

### A. Governance

**Status: PARTIAL / implicit.** The codebase contains useful implementation safeguards, but a dedicated constitutional, standard, methodology and QA layer was not present as a single explicit governance system. Repeated project fixes therefore depended heavily on manual knowledge.

### B. Existing technical safeguards observed

- Production order storage has a fail-fast PostgreSQL requirement when running on Render/production.
- Order creation validates required fields server-side.
- Phone and email validation exist.
- API request rate limits exist.
- Admin order access requires an admin key.
- Static file serving applies path containment checks.
- ENERGY PARK media workflow validates required media and uses a guarded reconnect operation.
- Catalog and project media are connected through project data in the audited Etalon 5 implementation.

### C. Structural weaknesses

- Governance rules were not previously represented as a single executable/documented control layer.
- Many quality properties were established through individual fixes rather than reusable checks.
- Production-version parity requires explicit release control; the public Render service was previously observed running an older branch/commit than Etalon 5.
- Commercial launch readiness still requires privacy/consent, stronger security headers and complete SEO/social metadata work.
- The public homepage previously contained an internal-style MMW company economics calculator and overlapping communication entry points; these require a product decision before final commercial launch.

### D. Root cause

The main systemic issue is not lack of effort. It is that the production process historically relied on accumulated operator knowledge. A rule known to the operator is not yet a factory control.

## Baseline conclusion

MMW FACTORY is **functionally capable but governance-incomplete**. The immediate remedy is to formalize the control hierarchy and convert known recurring failures into repeatable gates and checks.

## Baseline status

- Etalon 5: FROZEN.
- Governance branch: ACTIVE WORK AREA.
- No production deployment from this governance branch is authorized merely because the governance files exist.
- Project work resumes only after the governance baseline is reviewed and approved.
