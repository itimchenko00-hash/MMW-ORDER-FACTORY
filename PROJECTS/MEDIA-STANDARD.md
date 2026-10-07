# MMW-COMPANY/2 — media operating standard

## One active media namespace

Use only:

/ASSETS/<PROJECT>/...

The physical active layer for project photography is `public/ASSETS/<PROJECT>/photos/web-selected/` inside the active MMW-COMPANY/2 workspace. The browser-facing runtime path is `/ASSETS/<PROJECT>/photos/web-selected/<file>`.

**Photography is never generated.** No image-generation tool, synthetic image, remote image URL, runtime proxy, placeholder, or dynamically fetched third-party image may become an active project photograph. Only a real imported binary with recorded provenance may be activated.

The server may internally resolve a legacy physical ALADIN location, but the browser-facing path remains canonical. No generic lowercase /assets/ runtime namespace is used by the application.

## Activation gate

A project image becomes active only when all are true:

- local binary exists;
- semantic role is known;
- provenance is recorded in SOURCES.md or the project media register;
- image is unique within the project visual set;
- no external runtime URL is required;
- static path check passes;
- live HTTP response and visual placement pass.

## Provenance and no-generation rule

Every active photograph must have a provenance record in the project's `SOURCES.md` or approved media register. The local binary is the production asset; the external source is used only for controlled import and provenance, never at runtime.

If an image cannot be imported as a real local binary, it is not activated. Never replace a failed import with an external URL, placeholder, generated image, screenshot, remote CSS image, or other workaround.

## Deferred projects

CARPATHIA ECO LODGE, NEXUS WORK, NEXUS LOGISTICS, AGROHUB and ENERGY PARK intentionally have no active runtime photography after the architecture reset.

Their future media must be imported one project at a time through the same standard. One project does not create a new branch or service.
