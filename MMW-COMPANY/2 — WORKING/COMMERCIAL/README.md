# MMW-COMPANY — Commercial Contour

Separate commercial layer for MMW-COMPANY/2.

## Boundary

- Does not modify the frozen public site/project layer.
- Does not modify Etalon 7.
- Uses its own Render Web Service: `mmw-company-commercial`.
- Uses its own PostgreSQL: `mmw-company-commercial-db`.
- Uses the same repository and the same active branch; no new workspace or branch.
- Commercial data remains separate from project content.

## Product flow

КАТАЛОГ → КОНФИГУРАТОР → ЭКОНОМИКА → ПРОВЕРКА → ЗАКАЗ → ПОДТВЕРЖДЕНИЕ → ЖУРНАЛ

## Implemented foundation — stage 1

- PostgreSQL schema for catalog items, orders and order lines.
- Server-side price calculation from active catalog data.
- Five-digit order access code.
- Order lookup by access code.
- Input validation and bounded request payloads.
- `GET /health` and `GET /healthz`.
- `GET /api/catalog`.
- `POST /api/orders`.
- `GET /api/orders/lookup?code=12345`.
- Automatic schema initialization when `DATABASE_URL` is configured.

## Current limitation

The Render PostgreSQL instance is provisioned and available, but the commercial service still requires its database connection to be explicitly bound as `DATABASE_URL`. Until that binding is present, the service deliberately reports `not_configured` instead of pretending that orders are persistent.

## Next stages

1. Bind the commercial service to its PostgreSQL connection.
2. Add the controlled catalog data model and initial MMW commercial products/services.
3. Build the configurator with input-driven economics.
4. Add order confirmation and journal views.
5. Add a protected administrative contour.
6. Only after the commercial backend is stable, connect public commercial entry points.
