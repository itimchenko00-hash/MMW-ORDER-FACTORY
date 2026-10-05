# NEXUS LOGISTICS — external photo shortlist
Date: 2026-10-05
Status: selected and license-checked; binary import pending because the current execution environment cannot transfer external image binaries into the repository.

All selected sources are Pexels pages marked Free / Free to use. The public page must reference only local project files after import; external runtime image URLs are prohibited.

## Planned local mapping

| Local filename | Intended role | Source |
|---|---|---|
| logistics-01-highway.jpg | Hero / transport flow | https://www.pexels.com/photo/truck-on-highway-20862827/ |
| logistics-02-forklift.jpg | Warehouse / handling | https://www.pexels.com/photo/forklift-in-warehouse-14688876/ |
| logistics-03-loading-dock.jpg | Cross-dock / dispatch | https://www.pexels.com/photo/warehouse-with-delivery-truck-exiting-the-loading-dock-29786116/ |
| logistics-04-warehouse-worker.jpg | Operations / inventory | https://www.pexels.com/photo/person-pulling-box-from-a-shelf-7019313/ |
| logistics-05-racking.jpg | Storage infrastructure | https://www.pexels.com/photo/shelves-on-a-warehouse-4483608/ |
| logistics-06-industrial-yard.jpg | Site / infrastructure | https://www.pexels.com/photo/trucks-by-warehouse-18468444/ |
| logistics-07-road-freight.jpg | Transport network | https://www.pexels.com/photo/a-truck-on-an-expressway-15595843/ |
| logistics-08-loading-operation.jpg | Handling / service | https://www.pexels.com/photo/forklift-operators-loading-pallets-on-truck-34585120/ |

## Integration rule

1. Download binaries into `/ASSETS/NEXUS-LOGISTICS/photos/`.
2. Verify each file opens locally and has a unique hash.
3. Bind one photo to one semantic slot; no reuse within NEXUS LOGISTICS.
4. Keep attribution/source metadata in this manifest.
5. Only after local verification, replace the current photo-free placeholders with local paths.
