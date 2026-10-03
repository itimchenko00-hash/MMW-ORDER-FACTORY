# MMW-COMPANY — PRODUCTION ENVIRONMENT REQUIREMENTS

## Required before treating the order journal as durable production data
- MMW_COMPANY_ADMIN_KEY — secret for the internal journal.
- Dedicated persistent database for MMW-COMPANY orders. Do not reuse the MMW-ORDER database.
- Optional MMW_COMPANY_DATA_DIR only for local development/testing.

## Why
The clean-room implementation intentionally has a JSON fallback so the application can run without a database. A hosted free web service may restart or redeploy with an ephemeral filesystem, so the fallback is not a durable production journal.

## Separation rule
The production MMW-ORDER system is not modified, migrated, merged or reused as the company order database. The company order layer is isolated by design.