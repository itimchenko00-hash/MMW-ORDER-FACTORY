# NEXUS WORK — MEDIA PROVENANCE

Workflow: WEB SOURCE → CONTROLLED IMPORT → LOCAL FACTORY ASSET → SEMANTIC PLACEMENT → PROVENANCE → QA → LIVE

Local path:
public/ASSETS/NEXUS-WORK/photos/web-selected/

Runtime policy:
- No external image URLs are used by the page at runtime.
- Render runs scripts/import-nexus-work-media.cjs before server start.
- The importer downloads approved source files into the local project asset directory.
- Each file is validated as an image and must be at least 20 KB.

Semantic mapping:
01-hero-coworking.jpg — hero / overall working environment
02-workspace.jpg — WORK / flexible workspace
03-team-collaboration.jpg — CONNECT / collaboration
04-meeting.jpg — GROW / business meeting
05-training.jpg — PRIVATE OFFICES / professional development context
06-office-exterior.jpg — COWORKING / business infrastructure context
07-networking.jpg — MEETING / professional networking
08-presentation.jpg — TRAINING / presentations and learning
09-project-team.jpg — EVENT / team and project interaction

Source provenance:
All nine assets were selected from Pexels source pages and downloaded through the controlled importer. Source page records and original download URLs are maintained in the importer file in this project.

QA:
- 9 unique semantic assets.
- Local project paths only in HTML.
- No external runtime image source.
- Invalid/missing assets fail the controlled import before server startup.
- Final acceptance requires live visual verification.
