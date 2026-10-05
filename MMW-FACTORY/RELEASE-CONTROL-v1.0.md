# MMW FACTORY RELEASE CONTROL v1.0

Release states: DRAFT → QA → APPROVED → RELEASED → VERIFIED.

Every release records: approved commit, source branch, scope, affected systems/projects, G0–G8 evidence, known limitations, rollback reference, production commit and post-release verification.

Production artifact must match the approved commit. A release without a known rollback target is blocked.
