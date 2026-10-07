# MMW-COMPANY/2 — Internal Media Library

Controlled source library for website and project media.

Media flow: WEB SOURCE → CONTROLLED IMPORT → LOCAL LIBRARY ASSET → SEMANTIC PLACEMENT → PROVENANCE → QA → LIVE

Runtime delivery remains under `public/ASSETS/<PROJECT>/`.

Rules: no external runtime image URLs; project-specific media stays in its project namespace; selected web media requires provenance; binaries are verified before live use; all work stays in the single active MMW-COMPANY/2 branch.