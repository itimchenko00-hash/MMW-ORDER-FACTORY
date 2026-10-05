# MMW FACTORY FAILURE REGISTER

This register converts recurring project work into reusable prevention rules.

| ID | Observed failure | Root-cause class | Prevention rule/check | Priority |
|---|---|---|---|---|
| F-001 | Repeated photos across cards | Media uniqueness not enforced | Duplicate-asset scan in QA | P1 |
| F-002 | Photo does not match card meaning | Semantic mapping done manually | Asset register includes purpose; review each mapping | P1 |
| F-003 | Interactive cards do not open | Behavior not tested as a state machine | Interaction gate with open/close regression | P1 |
| F-004 | Duplicate buttons/CTAs | Action inventory absent | CTA/action deduplication review | P2 |
| F-005 | Economics input does not affect result | Formula wiring incomplete | Sensitivity tests for every declared input | P1 |
| F-006 | Hidden/default economic assumptions | Missing-input policy absent | Missing values remain visible; no silent assumptions | P1 |
| F-007 | Internal technical terms reach public page | Public-language review late | Forbidden-term scan before release | P2 |
| F-008 | Project data duplicated in renderer/catalog | Competing sources | Canonical-data rule and mapping checks | P1 |
| F-009 | Production uses local fallback for business records | Environment guard incomplete | Production DB requirement and startup fail-fast | P0 |
| F-010 | Production differs from approved etalon | Release/version drift | Deployment commit gate and post-release comparison | P0 |
| F-011 | Fix in one project breaks another | Shared code change without regression scope | Cross-project regression for shared renderers | P1 |
| F-012 | Media import workflow silently succeeds without required asset | Weak CI validation | Required-file checks must fail the workflow | P1 |
| F-013 | Temporary escaped/newline artifacts appear publicly | Transformation/write bug | Literal-artifact scan | P2 |
| F-014 | Public form lacks adequate privacy/consent layer | Commercial readiness treated separately | Commercial QA gate includes privacy | P1 |
| F-015 | Security/SEO launch gaps remain after functional QA | No release checklist | Technical + commercial launch gate | P1 |

## Rule

A new recurring failure is not closed until its prevention mechanism is documented here or in a more appropriate permanent control.
