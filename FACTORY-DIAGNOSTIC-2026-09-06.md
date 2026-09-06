# FACTORY DIAGNOSTIC — 2026-09-06

## Purpose
Non-destructive diagnostic record for the Factory runtime. This branch is isolated from `main` and starts from NEXUS WORK control point `868877c57becf39065511d785649a526051494af`.

## Finding 1 — sequential global hooks
Root `server.js` loads multiple hooks globally before the inner server. Each hook can mutate shared runtime behavior before the next hook runs.

## Finding 2 — global `sendFile` monkey patch
`aladin-investor-owner-engine-hook.js` replaces `express.response.sendFile`. Although it checks a project-file set, it still intercepts requests globally and performs content rewriting for ALADIN and CARPATHIA, plus communication injection. This is a cross-project runtime mutation point.

## Finding 3 — global `fs.readFileSync` monkey patch
`nexus-work-catalog-hook.js` replaces `fs.readFileSync` and injects the NEXUS catalog whenever the requested filename ends with `nexus-work-presentation-suite.html`. This is another global runtime interception point.

## Finding 4 — order-dependent behavior
Because hooks are loaded in a fixed sequence, behavior depends on which hook patched a shared function first and what later hooks expect to receive. This explains why a request can be visually or functionally distorted after apparently unrelated changes.

## Finding 5 — isolation gap
The Factory currently lacks an explicit request-scoped contract of the form: request -> project -> canonical source -> permitted transformations -> response. Instead, multiple project transformations coexist in one process.

## Safe next architecture
1. Keep each project transformation in an explicit project adapter.
2. Stop monkey-patching Express response methods globally.
3. Stop monkey-patching `fs.readFileSync` globally.
4. Resolve the project from the request path first.
5. Apply only that project's transformations to its canonical file.
6. Keep preserved project repositories untouched; Factory remains the editable layer.
7. Add a diagnostic header/log for project resolution and transformation list.

## Current state
No production branch or preserved repository was modified by this diagnostic commit. `main` remains at the existing NEXUS WORK point; this file exists only on `FACTORY-DIAGNOSTIC-2026-09-06`.
