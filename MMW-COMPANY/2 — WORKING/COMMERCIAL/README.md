# MMW-COMPANY — Commercial Contour

Separate commercial layer for MMW-COMPANY/2.

## Boundary

- Does not modify the frozen public site/project layer.
- Does not modify Etalon 7.
- Uses its own Render Web Service: `mmw-company-commercial`.
- Uses its own PostgreSQL: `mmw-company-commercial-db`.
- Uses the same repository and active branch because the workspace policy requires one branch.
- Commercial data remains separate from public project content.

## Customer flow

КАТАЛОГ → КОРЗИНА → ПРОВЕРКА → ЗАЯВКА → ПОДТВЕРЖДЕНИЕ → PDF → ЖУРНАЛ → СООБЩЕНИЯ

## Implemented core

- Catalog API with active-item filtering.
- Server-side price calculation; client input is never trusted for price.
- Customer record with name, E.164 phone and email.
- International phone normalization/validation.
- Unique 12-digit public order number.
- Separate five-digit access code derived server-side and stored only as a hash.
- Journal authentication requires order number + phone + five-digit code.
- Order items preserve the catalog snapshot used for the application.
- Order documents registry.
- Customer/company message model and event log.
- Branded PDF statement generated server-side on demand.
- Health endpoints and bounded request bodies.
- No public-site integration yet.

## API

- GET `/api/catalog`
- POST `/api/orders`
- POST `/api/journal`
- POST `/api/messages`
- POST `/api/orders/pdf`
- GET `/health`
- GET `/healthz`

## Infrastructure state

The Render PostgreSQL instance is provisioned and available. The remaining infrastructure action is to bind its connection to the commercial service as `DATABASE_URL`. Until that binding exists, the service intentionally reports `not_configured` and does not create fake persistent orders.

After database binding, the next implementation step is controlled catalog population and customer-facing commercial UI. Public MMW-COMPANY pages remain untouched until a separate explicit integration command.
