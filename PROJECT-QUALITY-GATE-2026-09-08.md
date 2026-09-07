# MMW-COMPANY — PROJECT QUALITY GATE

Updated: 2026-09-08

This gate audits the six active MMW-COMPANY project sales surfaces in Factory. It does not touch protected, frozen, backup or archived layers.

## Canonical public surfaces

| Project | Canonical public file | Duplicate presentation files | Status |
|---|---|---|---|
| AGROHUB | `agrohub-compact.html` | none | canonical |
| ALADIN | `aladin-presentation-suite.html` | financial/investor modules retained as supporting modules | canonical |
| CARPATHIA | `carpathia-catalog.html` | `carpathia-compact.html` is legacy | canonicalized at runtime |
| ENERGY-PARK | `energy-compact.html` | none | canonical |
| NEXUS-LOGISTICS | `nexus-logistics-presentation-v2.html` | none | canonical |
| NEXUS-WORK | `nexus-work-presentation-suite.html` | none | canonical |

## Calculation audit

### AGROHUB
800 t/month × 72% yield = 576 t finished product. Revenue = 576 × 14,500 = 8,352,000 UAH. Raw material = 800 × 6,800 = 5,440,000 UAH. Processing = 800 × 1,800 = 1,440,000 UAH. Value uplift = 1,472,000 UAH. Arithmetic is consistent, but this is not a full project P&L.

### ENERGY-PARK
800 kW × 1,050 kWh/kW·year = 840,000 kWh/year. Self-use = 571,200 kWh. Surplus = 268,800 kWh. At 7.2 UAH/kWh and 45% surplus realization: self-use value = 4,112,640 UAH; surplus value = 870,912 UAH; total gross value = **4,983,552 UAH/year (~4.98M)**. The stale static 6.05M / 4.03M / 1.02M labels are corrected at runtime.

### NEXUS-LOGISTICS
90 × 28,000 × 78% = 1,965,600 UAH revenue. Variable route cost = 90 × 420 × 19 = 718,200 UAH. Contribution = 1,247,400 UAH; contribution margin ≈ 63.4%. The stale static 2.52M / 1.80M / 71% labels are corrected. This remains contribution economics, not EBITDA/net profit.

### NEXUS-WORK
2,500 m² × 650 UAH/m² × 72% occupancy × 1.12 service uplift ≈ 1.31M UAH/month gross revenue. OPEX/NOI are demonstration assumptions and require site-specific rent/ownership, utilities, staffing, taxes, fit-out, churn and financing.

### ALADIN
The default model uses 1,800 m² saleable area, 52,000 UAH/m² price, 72% sales, 36,773 UAH/m² construction, land, infrastructure, soft costs, marketing, finance and 7% reserve. Under those defaults, effective revenue is below total cost; the base case is loss-making. This is a feasibility signal, not a result to hide. The project must not be marketed as profitable until site-specific inputs are validated.

### CARPATHIA
The catalog is a sales surface with service prices, not an investment feasibility model. Site, seasonality, occupancy, staffing, utilities, taxes, construction/fit-out and financing must be modeled for a selected location.

## Duplication policy
Repeated semantic labels are allowed when they represent different roles. Duplicate DOM IDs are not allowed. The runtime gate calculates duplicate IDs for every canonical page and exposes the result in the page QA strip.

CARPATHIA's legacy compact page is no longer the public canonical surface. ALADIN's financial and investor-owner files remain supporting modules rather than additional public routes.

## 100% rule
READY-TO-SELL means the buyer can understand the product, buyer profile, implementation path and financial caveats. Investment-grade feasibility still requires validated site-specific engineering, legal, tax, accounting and market data.
