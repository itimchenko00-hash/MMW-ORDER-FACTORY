# CARPATHIA ECO LODGE — approved semantic photo sources

Purpose: semantic media rebuild after full photo-layer reset.

Rule: one unique image per semantic block; no reuse across Experience Engine, seasons, hero/project media; only free-to-use sources; source URL and author metadata remain recorded.

| Local target | Block | Source | License status | Author |
|---|---|---|---|---|
| 01-territory.jpg | Territory / why visit | https://unsplash.com/photos/a-small-cabin-nestled-in-the-middle-of-a-forest-J6ppv3xYqKo | Unsplash License — free | Vika Strawberrika |
| 02-stay.jpg | STAY | https://unsplash.com/photos/cozy-cottage-nestled-amongst-natures-beauty-5QByqkRWVvE | Unsplash License — free | Nastia Petruk |
| 03-nature.jpg | NATURE | https://unsplash.com/photos/people-hiking-on-mountain-during-foggy-day-GJVsX4ngFKs | Unsplash License — free | Dmytro Bukhantsov |
| 04-food.jpg | FOOD | https://unsplash.com/photos/a-bowl-of-food-2NCQ8LDf7Lo | Unsplash License — free | Kateryna Hliznitsova |
| 05-experience.jpg | EXPERIENCE | https://unsplash.com/photos/a-man-standing-on-a-bridge-in-the-middle-of-a-forest--ncbK30AZ_c | Unsplash License — free | Viacheslav Marushchenko |
| 06-guest.jpg | GUEST | https://unsplash.com/photos/a-person-walking-up-a-hill-with-a-backpack-r_VqYTxWPb0 | Unsplash License — free | Vladyslav Tobolenko |
| 07-service.jpg | SERVICE | https://unsplash.com/photos/cozy-cabin-nestled-in-a-verdant-landscape-XolDLizhfQ0 | Unsplash License — free | Nastia Petruk |
| 08-model.jpg | MODEL | https://unsplash.com/photos/a-road-going-through-a-forest-APqRrAxwiE0 | Unsplash License — free | Margarita Marushevska |
| 09-hero.jpg | HERO | https://unsplash.com/photos/a-cabin-in-the-mountains-with-a-view-of-a-valley-oKwY1ldxjeQ | Unsplash License — free | Bogdan Ivanyshyn |
| 10-landscape.jpg | PRODUCT DESIGN | https://unsplash.com/photos/a-rural-area-with-a-lot-of-houses-and-a-bench-uO3BlrjXxRE | Unsplash License — free | Eugene Krasnaok |

The ten selected images are semantically distinct: territory/cabin, stay/cottage, hiking/nature, Ukrainian cuisine, active forest experience, guest/traveler, hospitality/service environment, and route/model.

Additional seasonal candidates are deliberately not imported yet. Seasons will receive a separate, non-overlapping four-image set after the eight Experience Engine images are physically stored and verified.

## Import gate
1. Binary image must be physically stored under ASSETS/CARPATHIA/photos/.
2. Source URL and license metadata must remain recorded.
3. Image must be unique within the CARPATHIA page.
4. Image must semantically match its card text.
5. Only after all eight files pass the gate may they be wired into app.js.

Validation note: legacy CARPATHIA photo files are removed before the eight-card import; auxiliary hero/product-design sources are then added separately; all ten final files must remain unique and pass JPEG validation.
