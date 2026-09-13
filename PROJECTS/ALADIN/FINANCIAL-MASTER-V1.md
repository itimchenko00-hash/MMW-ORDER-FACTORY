# ALADIN RESIDENCE — FINANCIAL MASTER MODEL v2

**MMW-COMPANY / ETALON-03 / Working branch**

Status: `WORKING MODEL — DEMO / ASSUMPTION`

v2 extends the v1 demonstration into a controlled project-finance architecture: monthly cash-flow, minimum financing requirement, scenarios, investor waterfall, MMW income, break-even and sensitivity. It is **not** an investment offer, approved budget, construction estimate, valuation or guarantee of profitability.

## 1. Data discipline

| Class | Meaning |
|---|---|
| FACT | Confirmed by contract, quotation, technical document or primary source |
| ASSUMPTION | Working input requiring validation |
| TARGET | Desired KPI |
| DEMO | Existing concept-package calculation or illustrative timing |
| DERIVED | Arithmetic result of stated inputs |

No `DEMO` or `ASSUMPTION` value may be presented as a confirmed investment return.

## 2. Baseline configuration

To prevent incompatible product configurations from being mixed, v2 keeps the **4-unit pilot** from v1.

| Input | Value | Status |
|---|---:|---|
| Units | 4 | DEMO |
| Sale price / unit | 4.8m ₴ | DEMO |
| Gross sales | 19.2m ₴ | DERIVED |
| Construction | 13.6m ₴ | DEMO |
| Initial capital reference | 8.0m ₴ | DEMO |

The earlier 5.6m ₴ result is only the difference between gross sales and construction and is **not project net profit**.

## 3. v2 full cost stack — illustrative working case

The following values are deliberately marked `ASSUMPTION / DEMO` until backed by a real plot, TEP, BOQ, quotations and contracts.

| Cost line | v2 working value |
|---|---:|
| Land cash cost | 0.0m ₴ — landowner contribution assumption |
| Design + architecture | 0.60m ₴ |
| Permits / approvals | 0.15m ₴ |
| Construction | 13.60m ₴ |
| Utilities / connections | 0.40m ₴ |
| Landscaping / external works | 0.25m ₴ |
| Sales + marketing | 0.30m ₴ |
| Financing cost | 0.50m ₴ |
| Project management / administration | 0.50m ₴ |
| Contingency reserve | 0.70m ₴ |
| **Illustrative total project cost** | **17.00m ₴** |

**Important:** the 17.00m ₴ figure is an illustrative model input, not a construction quotation or approved CAPEX.

## 4. Base-case economics

Gross revenue: **19.20m ₴**.

Illustrative full project cost: **17.00m ₴**.

Illustrative project surplus before tax / final legal structuring: **2.20m ₴**.

Illustrative project margin on revenue: **11.46%**.

This demonstrates why the 29.2% v1 headline margin must not be used as the final developer margin: the missing cost stack consumes most of that apparent margin.

## 5. Monthly cash-flow — 24-month working schedule

The schedule below is an illustrative timing engine, not a claim about the actual build programme.

### Base assumptions

- Design: months 1–3.
- Permits: month 3.
- Construction: months 4–15, evenly distributed in this demo.
- Utilities: months 13–16.
- Landscaping: months 16–17.
- Marketing: months 3–17.
- Project management + finance: spread through development.
- Reserve: month 17.
- Unit sales: illustrative closings in months 10, 12, 14 and 16.
- Each unit: 20% reservation / early payment, 50% construction-stage payment, 30% closing payment.

| Month | Cash-in, m ₴ | Cash-out, m ₴ | Net, m ₴ | Cumulative, m ₴ |
|---:|---:|---:|---:|---:|
| 1 | 0.00 | 0.26 | -0.26 | -0.26 |
| 2 | 0.00 | 0.26 | -0.26 | -0.52 |
| 3 | 0.00 | 0.43 | -0.43 | -0.95 |
| 4 | 0.96 | 1.21 | -0.25 | -1.20 |
| 5 | 0.00 | 1.21 | -1.21 | -2.41 |
| 6 | 0.96 | 1.21 | -0.25 | -2.66 |
| 7 | 0.00 | 1.21 | -1.21 | **-3.88** |
| 8 | 3.36 | 1.21 | 2.15 | -1.73 |
| 9 | 0.00 | 1.21 | -1.21 | -2.94 |
| 10 | 4.80 | 1.21 | 3.59 | 0.65 |
| 11 | 0.00 | 1.21 | -1.21 | -0.56 |
| 12 | 3.84 | 1.21 | 2.63 | 2.06 |
| 13 | 0.00 | 1.31 | -1.31 | 0.75 |
| 14 | 3.84 | 1.31 | 2.53 | 3.28 |
| 15 | 0.00 | 1.31 | -1.31 | 1.97 |
| 16 | 1.44 | 0.30 | 1.14 | 3.10 |
| 17 | 0.00 | 0.90 | -0.90 | **2.20** |
| 18–24 | 0.00 | 0.00 | 0.00 | **2.20** |

### Cash-flow conclusions

- Total illustrative cash out: **17.00m ₴**.
- Total illustrative cash in: **19.20m ₴**.
- Maximum cumulative funding gap: approximately **3.88m ₴** in month 7.
- Therefore the 8.0m ₴ historical initial-capital reference is more than the modelled peak gap, but the two numbers are **not equivalent**: initial capital can include buffers and other uses.
- Financing should be sized from the monthly cash-flow plus an agreed liquidity buffer, not from the construction cost alone.

## 6. Investor waterfall — illustrative only

Example structure for testing, not a proposed term sheet:

1. Investor funds up to the agreed capital requirement.
2. Investor receives return of contributed capital.
3. Investor receives a **12% annual preferred return** on the illustrative invested capital, subject to the actual timing of capital calls.
4. Remaining distributable project surplus is split **70% investor / 30% MMW-project side** in this demo.

If the full 8.0m ₴ were treated as invested for one year, the illustrative preferred return would be **0.96m ₴**. With 2.20m ₴ total project surplus, the residual after that preference would be 1.24m ₴; a 70/30 split would produce 0.868m ₴ additional investor profit and 0.372m ₴ residual project-side profit.

This produces an **illustrative investor profit of 1.828m ₴ and simple ROI of 22.85% on 8.0m ₴**, before taxes and transaction effects. It is **not an offered return** and is not a true IRR because actual capital-call dates and distributions must be used.

## 7. MMW-COMPANY income model

MMW income must be contractual and separate from construction margin.

v2 working architecture:

- Development / project fee — percentage or fixed fee, to be contracted.
- Project management fee — illustrative **0.50m ₴** is already included in the cost stack above; this is a DEMO placeholder, not a confirmed fee.
- Sales / commercial fee — only if separately contracted and economically supportable.
- Operating / asset-management fee — only if ALADIN operates the asset.
- Success / performance fee — only after agreed hurdle / waterfall conditions.

**Rule:** MMW revenue is not the same as project profit. Every MMW fee must have a defined payer, base, timing and contract.

## 8. Break-even

For the illustrative base case, if variable sales-related cost is treated as 0.30m ₴ and the remaining 16.70m ₴ is fixed / semi-fixed for this simplified test:

`Contribution per unit = 4.80m ₴ - 0.075m ₴ = 4.725m ₴`

`Break-even units ≈ 16.70 / 4.725 = 3.53 units`

So the simplified model requires approximately **4 units** to cross project cost break-even. This is a modelling result, not a validated commercial break-even, because real sales commissions, taxes, discounts, financing and variable construction costs may materially change it.

## 9. Scenario analysis

| Metric | Conservative | Base | Upside |
|---|---:|---:|---:|
| Sale price / unit | 4.08m ₴ | 4.80m ₴ | 5.52m ₴ |
| Gross revenue | 16.32m ₴ | 19.20m ₴ | 22.08m ₴ |
| Construction | 15.64m ₴ | 13.60m ₴ | 12.24m ₴ |
| Other modelled costs* | 3.74m ₴ | 3.40m ₴ | 3.23m ₴ |
| Illustrative project result | **-3.06m ₴** | **2.20m ₴** | **6.61m ₴** |

`* Other modelled costs exclude construction and are stress-adjusted assumptions.`

Conservative case: sale price -15%, construction +15%, other non-construction costs +10%, slower sales and longer financing.

Base case: current working inputs.

Upside case: sale price +15%, construction -10%, other non-construction costs -5%, faster sales and shorter financing.

The conservative case is intentionally shown because an investment model must expose downside rather than sell the upside.

## 10. Sensitivity matrix

The next spreadsheet/data engine should recalculate project and investor returns dynamically for at least:

| Variable | Downside | Base | Upside |
|---|---:|---:|---:|
| Sale price | -15% | 0% | +15% |
| Construction cost | +15% | 0% | -10% |
| Sales velocity | -40% | Base | +30% |
| Development period | +6 months | Base | -3 months |
| Financing cost | +5 pp | Base | -3 pp |

Primary outputs: project surplus, peak funding gap, investor profit, investor ROI, IRR, MMW income and payback.

## 11. Investment-readiness gate

ALADIN remains `CONCEPT / WORKING MODEL` until all of the following are validated:

- specific land plot and legal due diligence;
- TEP and product configuration;
- BOQ / construction estimate from current quotations;
- utilities and connection conditions;
- tax and transaction structure;
- market evidence for price and absorption;
- financing term sheet;
- monthly cash-flow linked to real procurement and construction schedule;
- investor waterfall agreed contractually;
- downside mitigation plan;
- final sensitivity analysis remains acceptable to investor.

## 12. v2 output and next build

**Completed in v2:** monthly 24-month cash-flow architecture, peak funding requirement, three scenarios, illustrative investor waterfall, MMW fee architecture, simplified break-even and sensitivity framework.

**Next:** move the assumptions into a structured data source / spreadsheet, connect every web-page number to that source, and replace DEMO inputs with FACT data from the selected land plot, BOQ, quotations, market research, tax/legal structure and financing term sheet.
