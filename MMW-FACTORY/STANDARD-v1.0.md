# MMW-COMPANY STANDARD v1.0

## 1. Project identity

Every project has: stable id, name, type, status, summary, audience, location/site position, project-specific visual identity, interaction mechanic and media set.

## 2. Required project content

Minimum commercial structure:

1. Why the project exists / opportunity.
2. Product and offer.
3. Audience and demand logic.
4. Site / resources / constraints.
5. Creation and implementation path.
6. Economic model.
7. Risks and validation questions.
8. MMW-COMPANY role and next step.

The order may change for a project-specific experience, but the information must remain available without unnecessary duplication.

## 3. Visual standard

Company pages use a coherent premium corporate system. Each project may have its own palette, typography accents, graphic language and interaction metaphor. Project identity must not contaminate another project's visual system.

## 4. Media standard

- Hero media is project-specific.
- Card media is unique within the required uniqueness scope.
- Every image is semantically mapped to its card/section.
- Decorative media cannot replace missing product information.
- External media requires a source register when applicable.
- Missing media uses an intentional placeholder or infographic, never a random image.

## 5. Interaction standard

Every interactive block has:

- a clear affordance;
- a defined closed/open state;
- a visible state change;
- meaningful content on activation;
- no duplicate action competing with the same function;
- keyboard/accessibility behavior where applicable.

## 6. Economics standard

For each economic contour:

- inputs are named in business language;
- units are explicit;
- outputs are derived;
- formulas are deterministic;
- changing a relevant input changes dependent outputs;
- missing inputs are not silently invented;
- scenarios are labeled as scenarios;
- no guaranteed return language is used.

## 7. Catalog standard

Catalog entries must resolve to valid service/project identifiers and must not maintain a stale parallel media or project-data source when project data already exists.

## 8. Public-language standard

Public copy must be concise, commercial and understandable to a client, investor, owner or partner. Internal labels, debugging language, temporary names and development terminology do not belong in the public experience.

## 9. Form / order standard

Required fields are validated server-side. Product ids are normalized against the catalog. Quantities are bounded. Personal-data endpoints are rate-limited. Production business-critical records require persistent storage.

## 10. Technical standard

- Syntax must pass before release.
- Server must fail safely when required infrastructure is absent.
- File serving must prevent path traversal.
- API responses must not expose secrets.
- Admin endpoints require authorization.
- Production configuration must be explicit.
- Security headers, privacy/consent and SEO metadata are release requirements for commercial launch.

## 11. Release standard

A change is release-ready only when all applicable QA gates pass and a rollback reference is recorded.
