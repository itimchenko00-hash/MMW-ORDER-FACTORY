# CARPATHIA ECO LODGE — seasonal media sources

The seasonal cards are treated as a separate media layer. Existing Experience Engine, hero, Product Design and project media are not reused.

| Local target | Season | Semantic purpose | Source | License | Author |
|---|---|---|---|---|---|
| season-winter.jpg | WINTER | snow, cabin, quiet recovery | https://unsplash.com/photos/a-cabin-in-the-middle-of-a-snowy-forest-JuIuXVI7xiU | Free under Unsplash License | Artem Kniaz |
| season-spring.jpg | SPRING | spring forest, green landscape, outdoor routes | https://unsplash.com/photos/a-large-rock-with-a-tree-growing-out-of-it-Z_z_iaH3Z08 | Free under Unsplash License | Vlad Tamkin |
| season-summer.jpg | SUMMER | summer Carpathians, couple, outdoor stay | https://unsplash.com/photos/a-man-and-a-woman-sitting-on-a-bench-looking-at-the-mountains-GRX1NDOuogQ | Free under Unsplash License | Nastia Petruk |
| season-autumn.jpg | AUTUMN | autumn Carpathian landscape, slow travel | https://unsplash.com/photos/a-view-of-a-mountain-with-trees-in-the-foreground-ycmyUMIA08A | Free under Unsplash License | Margarita Marushevska |

Import gate:
1. Four binaries are stored locally under ASSETS/CARPATHIA/photos/.
2. Files are normalized to JPEG and validated by JPEG magic bytes.
3. All four seasonal hashes must be unique.
4. No seasonal file may duplicate an existing CARPATHIA asset.
5. Only after the files pass validation are they wired into the seasonal cards.
