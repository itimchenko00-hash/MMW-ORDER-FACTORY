# ALADIN RESIDENCE — FINANCIAL MASTER MODEL v1

**MMW-COMPANY / ETALON-03 / Working branch**

Status: `WORKING MODEL`

This document converts the current ALADIN demonstration economics into a controlled financial model structure. It does **not** represent an investment offer, approved budget, construction estimate, valuation or guarantee of profitability.

## 1. Data classification

| Class | Meaning |
|---|---|
| FACT | Confirmed by a contract, quotation, technical document or other primary source |
| ASSUMPTION | Working input requiring validation |
| TARGET | Desired project KPI |
| DEMO | Existing demonstration calculation from the concept package |

Current ALADIN model is predominantly `DEMO` + `ASSUMPTION`.

## 2. Baseline scenario selected for v1

The current project package contains more than one product configuration. To avoid mixing incompatible assumptions, v1 uses the **4-unit pilot configuration** as the financial baseline because it has a complete demonstration revenue / construction-cost pair.

| Input | v1 value | Status |
|---|---:|---|
| Units / sections | 4 | DEMO |
| Sale price / unit | 4.8m ₴ | DEMO |
| Gross sales revenue | 19.2m ₴ | DEMO / derived |
| Construction cost | 13.6m ₴ | DEMO |
| Preliminary project result before unmodelled costs | 5.6m ₴ | DEMO / derived |
| Initial capital before start | 8.0m ₴ | DEMO |
| Stated payback | 17.1 months | DEMO |

### Derived indicators

- Revenue per unit: **4.8m ₴**
- Direct construction cost per unit: **3.4m ₴**
- Preliminary result per unit: **1.4m ₴**
- Construction cost / revenue: **70.8%**
- Preliminary result / revenue: **29.2%**
- Simple preliminary result / initial capital: **70.0%**

The 70% figure is **not investor ROI**. It excludes financing, taxes, land economics, professional fees, utilities, marketing, reserve and other project costs that have not yet been validated.

## 3. Required full development CAPEX

The next model version must split total investment into:

1. LAND / landowner contribution
2. DESIGN + ARCHITECTURE
3. ENGINEERING
4. PERMITS / approvals
5. CONSTRUCTION
6. UTILITIES / connections
7. LANDSCAPING / external works
8. SALES + MARKETING
9. FINANCING COST
10. PROJECT MANAGEMENT / administration
11. CONTINGENCY RESERVE
12. WORKING CAPITAL

**Rule:** construction cost must never be treated as total project CAPEX.

## 4. Revenue model

### Base pilot

`4 units × 4.8m ₴ = 19.2m ₴ gross sales`

Revenue must subsequently be modelled by unit and by sales month rather than as one terminal number.

Required fields:

- unit type;
- sellable area;
- price per unit;
- price per m²;
- planned launch price;
- planned price escalation;
- reservation rate;
- payment schedule;
- sales velocity;
- cancellations / discounts;
- closing costs.

## 5. Cash-flow architecture

### Pre-development

LAND → due diligence → concept → design → permits → financing

### Development

CONSTRUCTION → utilities → external works → marketing → sales

### Monetisation

RESERVATION → CONTRACT → INSTALMENTS → CLOSING → CASH COLLECTION

The final model must calculate monthly cash-in, cash-out and minimum financing requirement.

## 6. Investor model

The investor layer must be separated from project economics.

Required outputs:

- investor capital;
- timing of capital calls;
- preferred return, if applicable;
- profit share;
- investor profit;
- investor ROI;
- IRR;
- distribution dates;
- downside case;
- exit / sale mechanism.

No investor return is presented as confirmed until the financing structure and project cash-flow are validated.

## 7. MMW-COMPANY income

MMW must be modelled separately from project profit.

Potential MMW revenue lines:

- development / project fee;
- project management fee;
- procurement / coordination fee where contractually justified;
- sales / commercial fee where applicable;
- operating / asset-management fee where applicable;
- performance / success fee where applicable.

Each fee must have a contractual basis and must not be hidden inside construction margin.

## 8. Break-even

The v1 model cannot yet claim a validated break-even point because total fixed and variable project costs are incomplete.

The next calculation must provide:

`Break-even units = fixed project costs / contribution per unit`

and:

`Break-even sales revenue = fixed project costs / contribution margin %`

## 9. Scenario model

### CONSERVATIVE

- lower sale price;
- slower sales;
- construction cost overrun;
- longer financing period;
- higher contingency.

### BASE

- current approved working assumptions after validation.

### UPSIDE

- stronger sales price;
- faster absorption;
- controlled construction cost;
- reduced financing period.

No upside scenario may be presented as the expected result.

## 10. Sensitivity matrix

The final spreadsheet / web model must test at minimum:

| Variable | Downside | Base | Upside |
|---|---|---|---|
| Sale price | -15% | 0% | +15% |
| Construction cost | +15% | 0% | -10% |
| Sales velocity | -40% | Base | +30% |
| Development period | +6 months | Base | -3 months |
| Financing cost | +5 pp | Base | -3 pp |

## 11. Current financial diagnosis

The existing 4-unit demonstration is commercially interesting because it shows a preliminary **29.2% result margin before unmodelled costs**. However, that margin is not yet the developer's net profit.

The most important financial task is therefore not increasing the headline sale price, but completing the missing cost stack and testing whether the project remains profitable after:

**LAND + DESIGN + PERMITS + UTILITIES + CONSTRUCTION + SALES + FINANCE + TAX + RESERVE.**

## 12. Investment readiness gate

ALADIN may move from `CONCEPT / DEMO` to `INVESTMENT-READY` only when:

- a specific land plot is identified;
- legal status is checked;
- TEP are confirmed;
- construction estimate is based on current quotations / BOQ;
- utility connection assumptions are confirmed;
- sales assumptions have market evidence;
- financing structure is agreed;
- monthly cash-flow is complete;
- downside scenario remains viable or mitigation is documented.

## 13. Next build

**ALADIN FINANCIAL MASTER v2** will add the monthly 18–24 month cash-flow, three scenarios, investor waterfall, MMW fee model, break-even and sensitivity analysis once the remaining project inputs are validated.
