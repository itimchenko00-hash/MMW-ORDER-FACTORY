# NEXUS WORK — diagnostic archive

Source working state preserved at commit `c670511a82b5c1a5507748e9c4e7c9248cf02e0b`.

The following files were identified during the architectural audit as redundant NEXUS WORK hook layers and are excluded from the clean working version:

- `ЭТАЛОН-02/MMW-COMPANY/src/nexus-work-catalog-hook.js`
- `ЭТАЛОН-02/MMW-COMPANY/src/nexus-work-catalog-media-hook.js`
- `ЭТАЛОН-02/MMW-COMPANY/src/nexus-work-enhancement-hook.js`

The original branch remains available for exact recovery. No protected PROJECT repository was modified.

Reason: the active `package.json` startup command does not reference these NEXUS-specific hooks; keeping them in the active source tree creates unnecessary parallel layers and violates the Factory Architectural Integrity Law.
