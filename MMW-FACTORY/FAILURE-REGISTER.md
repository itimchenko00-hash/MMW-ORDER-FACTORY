# MMW FACTORY FAILURE REGISTER

| ID | Failure | Root cause | Prevention | Priority |
|---|---|---|---|---|
| F-001 | Repeated photos | Media uniqueness not enforced | Duplicate asset scan | P1 |
| F-002 | Photo mismatches meaning | Manual semantic selection | Asset purpose mapping + review | P1 |
| F-003 | Cards do not open | Interaction not modeled/tested | State-machine regression | P1 |
| F-004 | Duplicate CTAs | No action inventory | CTA deduplication review | P2 |
| F-005 | Economic input has no effect | Formula wiring incomplete | Sensitivity propagation tests | P1 |
| F-006 | Hidden economic assumptions | Missing-input policy absent | Visible missing-input state | P1 |
| F-007 | Internal terms become public | Public QA too late | Forbidden-term scan | P2 |
| F-008 | Duplicated project/catalog data | Competing sources | Data lineage + mapping check | P1 |
| F-009 | Production local fallback | Environment guard incomplete | Production persistence fail-fast | P0 |
| F-010 | Production drifts from approved version | Release parity not enforced | Commit parity + post-release check | P0 |
| F-011 | Shared fix breaks another project | Regression scope incomplete | Cross-project regression | P1 |
| F-012 | Media workflow hides failure | Weak CI | Fail-closed required-file check | P1 |
| F-013 | Escaped/newline artifacts | Transformation/write defect | Literal-artifact scan | P2 |
| F-014 | Privacy/consent missing | Launch QA incomplete | Commercial privacy gate | P1 |
| F-015 | Security/SEO gaps | Functional QA treated as launch QA | Technical + commercial launch gates | P1 |
| F-016 | Asset exists but is semantically wrong | Existence checked without meaning | Asset→placement→purpose control | P1 |
| F-017 | Interaction is not reversible | Only click presence tested | Runtime state-transition test | P1 |
| F-018 | Project change contaminates another | Shared coupling not regression-tested | Isolation + cross-project regression | P1 |
| F-019 | Release judged from source only | Production artifact not verified | Post-release runtime verification | P0 |
| F-020 | Same defect repeatedly fixed manually | Lessons not converted to controls | Defect conversion rule | P1 |
| F-021 | Visual QA passes but commercial message is unclear | Appearance prioritized over communication | First-screen + CTA review | P2 |
| F-022 | Concept presented as established business | Status discipline lost | Concept/status gate | P1 |
| F-023 | External media source missing | Provenance omitted | Source/licensing register | P1 |
| F-024 | Shared data changes without impact review | Scope not recorded | Change-control impact review | P1 |
| F-025 | Static QA passes but runtime behavior fails | Runtime layer absent | Runtime QA gate | P0 |
| F-026 | Approved release differs from deployed artifact | Deployment parity not verified | Production commit/artifact comparison | P0 |
| F-027 | Scope expands silently during fix | Change boundaries undefined | Change-control exclusions | P1 |
| F-028 | Project identity leaks into another project | Shared visual/behavioral coupling | Project isolation review | P1 |
| F-029 | Missing evidence treated as pass | QA based on assumption | Evidence rule | P1 |
| F-030 | Governance rule exists only in prose | No executable/manual enforcement | Convert recurring rules into checks | P1 |

## Rule

A material recurring failure is not closed until a prevention mechanism exists in documentation, code, CI or a mandatory review step.
