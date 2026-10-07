# NEXUS WORK — media provenance

Controlled media set for the NEXUS WORK concept page.

## Import method

WEB SOURCE → CONTROLLED IMPORT → LOCAL FACTORY ASSET → SEMANTIC PLACEMENT → PROVENANCE → QA → LIVE

The page contains no external runtime image URLs. At service start, the controlled importer downloads the approved source files into:

`public/ASSETS/NEXUS-WORK/photos/web-selected/`

The page then references only those local assets.

## Semantic mapping

| Local asset | Intended meaning |
|---|---|
| 01-hero-coworking.jpg | Hero / overall business-hub atmosphere |
| 02-workspace.jpg | Work environment / flexible workspace |
| 03-team-collaboration.jpg | Users and collaboration |
| 04-meeting.jpg | Meetings / business interaction |
| 05-training.jpg | Learning / training |
| 06-office-exterior.jpg | Site / business-address context |
| 07-networking.jpg | Professional connections / networking |
| 08-presentation.jpg | Events / knowledge exchange |
| 09-project-team.jpg | Project teams / delivery and growth |

## Sources

1. **01-hero-coworking.jpg** — Ryan Pilato — Pexels photo 8606292  
   Source: https://www.pexels.com/photo/modern-office-interior-8606292/

2. **02-workspace.jpg** — Nicolás Rueda — Pexels photo 26966417  
   Source: https://www.pexels.com/photo/coworking-office-space-with-pc-room-26966417/

3. **03-team-collaboration.jpg** — Mizuno K — Pexels photo 12903182  
   Source: https://www.pexels.com/photo/employees-working-together-in-coworking-office-12903182/

4. **04-meeting.jpg** — Misbaa eri — Pexels photo 31709064  
   Source: https://www.pexels.com/photo/modern-office-team-in-meeting-room-with-city-view-31709064/

5. **05-training.jpg** — Matheus Bertelli — Pexels photo 18999475  
   Source: https://www.pexels.com/photo/business-training-course-18999475/

6. **06-office-exterior.jpg** — Erik Mclean — Pexels photo 4889301  
   Source: https://www.pexels.com/photo/exterior-of-modern-office-building-4889301/

7. **07-networking.jpg** — Pavel Danilyuk — Pexels photo 8761555  
   Source: https://www.pexels.com/photo/groups-of-people-talking-in-the-office-8761555/

8. **08-presentation.jpg** — Mehmet BALCI — Pexels photo 30319116  
   Source: https://www.pexels.com/photo/business-presentation-in-modern-office-setting-30319116/

9. **09-project-team.jpg** — Antoni Shkraba — Pexels photo 5466236  
   Source: https://www.pexels.com/photo/office-team-looking-at-the-laptop-5466236/

## Rights check

Pexels states that its photos are free to use for commercial and non-commercial purposes under the Pexels License; attribution is not required. The project still records source, author and source page for provenance and auditability.

License reference: https://www.pexels.com/license/

## QA requirements

- no external runtime image URLs;
- all nine files must exist locally before server start;
- each imported file must be an image and at least 20 KB;
- old raster assets in the controlled NEXUS WORK media directory are replaced atomically;
- page mapping is one-to-one by semantic role;
- LIVE visual QA must confirm hero + project cards + all eight content cards.
