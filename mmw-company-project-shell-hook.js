// MMW-COMPANY — unified project shell + 10-point project standard
// FACTORY-only presentation layer. Does not alter protected/conserved sources.
const express=require('express');
const originalSend=express.response.send;
const PROJECTS={
  '/aladin':{name:'ALADIN RESIDENCE',kind:'RESIDENTIAL DEVELOPMENT',color:'#d8b56b',points:[
    ['POSITIONING','Энергоэффективный low-rise residential development / townhouses для семей, специалистов и предпринимателей.','CONCEPT'],
    ['MARKET','Локация и спрос: Ивано-Франковск и пригород; целевые группы и конкурентное поле требуют field validation.','VALIDATION'],
    ['PRODUCT','Таунхаусы ориентировочно 70 м², 2 этажа, 2–4 секции; собственная территория и энергоэффективность.','CONCEPT'],
    ['BUSINESS MODEL','Земля + девелопмент + организация проектирования/строительства + продажи; MMW/ALADIN как организатор и оператор.','CONCEPT'],
    ['ECONOMICS','CAPEX/OPEX, себестоимость единицы, цена продажи, маржа, ROI, payback и доход инвестора должны считаться по выбранной площадке.','OPEN'],
    ['OPERATIONS','Owner/investor/MMW roles, design, construction, procurement, quality control, sales and handover.','CONCEPT'],
    ['TECHNICAL','Генплан, инженерия, энергоэффективность, дороги, сети, благоустройство и fire/access requirements.','OPEN'],
    ['LEGAL / DD','Право на землю, назначение, градостроительные ограничения, сети, разрешения и договорная модель.','OPEN'],
    ['CAPITAL / SALES','Landowner + investor structure, buyer package, sales funnel and investor data room.','CONCEPT'],
    ['IMPLEMENTATION / RISK','Pilot → feasibility → design → permits → build → sell; ключевые риски: участок, DD, CAPEX, demand.','VALIDATION']
  ]},
  '/finance':{name:'ALADIN FINANCIAL SYSTEM',kind:'FINANCE / ENGINE',color:'#d8b56b',points:[
    ['POSITIONING','Финансовый двигатель проекта: единая логика расчёта для инвестора, девелопера и оператора.','CONCEPT'],
    ['MARKET','Входные рыночные данные: цены, ставки, валюты, спрос и стоимость капитала.','VALIDATION'],
    ['PRODUCT','Интерактивная модель сценариев, sensitivity, unit economics и контрольных KPI.','CONCEPT'],
    ['BUSINESS MODEL','Связка CAPEX → OPEX → revenue → profit → investor/MMW income.','CONCEPT'],
    ['ECONOMICS','Revenue, land, design, permits, construction, utilities, landscaping, marketing, sales, reserve, break-even, ROI, payback.','VALIDATION'],
    ['OPERATIONS','Версионность assumptions, сценарии, inputs/outputs и контроль изменений.','CONCEPT'],
    ['TECHNICAL','Интерактивный расчётный слой, currency/market feeds и устойчивое отображение на mobile.','CONCEPT'],
    ['LEGAL / DD','Дисклеймеры, источники данных, налоги и юридические допущения конкретного проекта.','OPEN'],
    ['CAPITAL / SALES','Investor return, MMW fee/income, financing structure и buyer-facing economics.','CONCEPT'],
    ['IMPLEMENTATION / RISK','Base / conservative / growth → feasibility → approved model; риск — неподтверждённые inputs.','VALIDATION']
  ]},
  '/nexus-work':{name:'NEXUS WORK',kind:'FLEXIBLE BUSINESS HUB',color:'#7fc8b5',points:[
    ['POSITIONING','Не классический офисный центр, а управляемая коммерческая среда: office + coworking + meeting + services + community.','CONCEPT'],
    ['MARKET','Целевая аудитория: команды, предприниматели, специалисты и сервисные компании; demand validation по локации обязательна.','VALIDATION'],
    ['PRODUCT','2–4 этажный flexible business hub с офисами, переговорными, сервисами, обучением и commercial units.','CONCEPT'],
    ['BUSINESS MODEL','Доходы от аренды, сервисов, commerce, событий и дополнительных услуг.','CONCEPT'],
    ['ECONOMICS','Occupancy, rent/m², service mix, OPEX, NOI, CAPEX, yield, break-even и payback.','VALIDATION'],
    ['OPERATIONS','Operator, leasing, community, facility management, events and digital management.','CONCEPT'],
    ['TECHNICAL','Flexible planning, HVAC, electrical/data, acoustics, fire safety, access control and BIM-ready coordination.','OPEN'],
    ['LEGAL / DD','Site, zoning, permits, lease/sale model, utilities and commercial compliance.','OPEN'],
    ['CAPITAL / SALES','Investor asset case + leasing strategy + tenant acquisition + service packaging.','CONCEPT'],
    ['IMPLEMENTATION / RISK','Site → feasibility → design → fit-out → leasing → operations; risks: occupancy, CAPEX, location.','VALIDATION']
  ]},
  '/nexus-logistics':{name:'NEXUS LOGISTICS',kind:'LOGISTICS INFRASTRUCTURE',color:'#e0a86b',points:[
    ['POSITIONING','Логистический актив: warehouse + cross-dock + fulfillment + dispatch + B2B services.','CONCEPT'],
    ['MARKET','Потоки грузов, transport access, target clients and regional demand must be validated by site.','VALIDATION'],
    ['PRODUCT','Warehouse/cross-dock, loading, storage, vehicle flow, parking, security and digital cargo control.','CONCEPT'],
    ['BUSINESS MODEL','Аренда, складская обработка, fulfillment, dispatch, value-added logistics and service income.','CONCEPT'],
    ['ECONOMICS','CAPEX, OPEX, occupancy, throughput, price per pallet/m², margin, break-even, ROI and payback.','OPEN'],
    ['OPERATIONS','Inbound/outbound, warehouse operations, WMS/TMS-ready workflows, staffing and SLA.','CONCEPT'],
    ['TECHNICAL','Masterplan, manoeuvring, loading geometry, racks, utilities, IT, security and fire requirements.','OPEN'],
    ['LEGAL / DD','Land use, road access, permits, environmental/fire requirements and contracts.','OPEN'],
    ['CAPITAL / SALES','Anchor tenants, logistics partners, investor structure and B2B commercial pipeline.','CONCEPT'],
    ['IMPLEMENTATION / RISK','Site → traffic study → design → equipment → pilot → scale; risks: access, volume, CAPEX.','VALIDATION']
  ]},
  '/carpathia':{name:'CARPATHIA ECO LODGE',kind:'HOSPITALITY / ECO TOURISM',color:'#8fc59b',points:[
    ['POSITIONING','Eco-lodge / hospitality destination combining accommodation, wellness, F&B, local experience and outdoor activity.','CONCEPT'],
    ['MARKET','Tourist segments, seasonality, ADR, occupancy, competing destinations and access require local validation.','VALIDATION'],
    ['PRODUCT','Low-rise/modular accommodation, shared facilities, wellness, F&B, outdoor/event and local-product experiences.','CONCEPT'],
    ['BUSINESS MODEL','Accommodation + F&B + wellness + experiences + events + local products.','CONCEPT'],
    ['ECONOMICS','Land, construction, utilities, landscaping, staffing, marketing, booking commissions, ADR, occupancy, EBITDA, ROI.','OPEN'],
    ['OPERATIONS','Hospitality operator, housekeeping, guest service, food, maintenance, booking and seasonal staffing.','CONCEPT'],
    ['TECHNICAL','Masterplan, low-impact construction, water/waste, roads, parking, utilities and fire safety.','OPEN'],
    ['LEGAL / DD','Land, environmental restrictions, construction permissions, access, water/waste and hospitality compliance.','OPEN'],
    ['CAPITAL / SALES','Investor case + direct booking + OTA mix + partnerships + experience sales.','CONCEPT'],
    ['IMPLEMENTATION / RISK','Land DD → concept → permits → pilot units → launch → expansion; risks: seasonality, ecology, access.','VALIDATION']
  ]},
  '/agrohub':{name:'AGROHUB',kind:'AGRO / PROCESSING',color:'#c9b56a',points:[
    ['POSITIONING','Агроинфраструктура с хранением, переработкой и сервисами для производителей.','CONCEPT'],
    ['MARKET','Фермеры, processors, raw-material base, regional demand and contract opportunities.','VALIDATION'],
    ['PRODUCT','Storage + processing + production infrastructure + logistics + farmer services.','CONCEPT'],
    ['BUSINESS MODEL','Processing fees, storage, product sales, rental/service income and B2B contracts.','CONCEPT'],
    ['ECONOMICS','Capacity, utilization, raw-material cost, energy, labor, logistics, CAPEX/OPEX, margin, ROI/payback.','OPEN'],
    ['OPERATIONS','Raw-material intake, quality control, production, storage, dispatch, maintenance and staffing.','CONCEPT'],
    ['TECHNICAL','Process line, capacity, utilities, energy load, storage, wastewater/waste and logistics flow.','OPEN'],
    ['LEGAL / DD','Land use, sanitary, environmental, food/production permits, utilities and contracts.','OPEN'],
    ['CAPITAL / SALES','Anchor producers, off-take contracts, equipment finance and B2B sales pipeline.','CONCEPT'],
    ['IMPLEMENTATION / RISK','Site → capacity study → equipment → pilot line → contracts → scale; risks: raw material, energy, seasonality.','VALIDATION']
  ]},
  '/energy':{name:'ENERGY PARK',kind:'ENERGY / PRODUCTION',color:'#8bb8d8',points:[
    ['POSITIONING','Энергоэффективный production-commercial cluster with energy infrastructure and modular premises.','CONCEPT'],
    ['MARKET','Industrial/commercial tenants, power demand, service demand and regional grid context.','VALIDATION'],
    ['PRODUCT','Production/commercial blocks, service premises, logistics, parking and shared energy infrastructure.','CONCEPT'],
    ['BUSINESS MODEL','Lease/sale of premises + energy services + infrastructure/service revenue.','CONCEPT'],
    ['ECONOMICS','CAPEX, connection costs, energy generation/storage, OPEX, tariffs, tenant revenue, ROI/payback.','OPEN'],
    ['OPERATIONS','Park operator, facility management, energy monitoring, tenant services and maintenance.','CONCEPT'],
    ['TECHNICAL','Grid capacity, load balance, generation, storage, backup, metering and phased infrastructure.','OPEN'],
    ['LEGAL / DD','Site, grid connection, permits, environmental and energy regulatory requirements.','OPEN'],
    ['CAPITAL / SALES','Anchor tenants, energy partners, infrastructure financing and leasing/sales strategy.','CONCEPT'],
    ['IMPLEMENTATION / RISK','Site/grid DD → feasibility → phase 1 → tenanting → expansion; risk: connection cost/capacity.','VALIDATION']
  ]}
};
const COMPANY={name:'MMW-COMPANY',kind:'BUSINESS PROJECT DEVELOPMENT',color:'#d8b56b',points:[
  ['POSITIONING','MMW-COMPANY — developer, organizer, project manager and operator of business-project concepts.','DEFINED'],
  ['MARKET','Каждый проект проходит market research и validation до перехода в investment/production status.','VALIDATION'],
  ['PRODUCT','Полный business-project package: concept, model, economics, operations, technical, legal, investment and sales.','DEFINED'],
  ['BUSINESS MODEL','MMW создаёт и организует проекты, привлекает владельцев земли/активов, капитал, специалистов и покупателей.','DEFINED'],
  ['ECONOMICS','Единая финансовая логика: land, design, permits, build, utilities, marketing, sales, reserve, unit economics, ROI/payback.','VALIDATION'],
  ['OPERATIONS','Development chain, project management, procurement, quality, documentation, partner coordination and operator model.','DEFINED'],
  ['TECHNICAL','Проектная, инженерная и digital-компетенция собираются под конкретный актив и feasibility.','VALIDATION'],
  ['LEGAL / DD','Каждый проект требует отдельного land/site/legal DD, permits, contracts and compliance package.','OPEN'],
  ['CAPITAL / SALES','Investor data room, owner proposition, specialist recruitment, buyer package and commercial funnel.','VALIDATION'],
  ['IMPLEMENTATION / RISK','FACTORY → TEST → VERIFY → CONSERVE → APPROVE → PRODUCTION; текущий общий статус — FACTORY / VALIDATION.','VALIDATION']
]};
const nav=[['ALADIN','/aladin'],['NEXUS WORK','/nexus-work'],['NEXUS LOGISTICS','/nexus-logistics'],['CARPATHIA','/carpathia'],['AGROHUB','/agrohub'],['ENERGY PARK','/energy']];
function standard10(p){return `<section class="mmw10" style="--mmw-accent:${p.color}"><div class="mmw10in"><div class="mmw10head"><div><span>MMW / 10-POINT PROJECT STANDARD</span><h2>${p.name}</h2></div><b>FACTORY · ${p.kind}</b></div><div class="mmw10grid">${p.points.map(([n,d,s],i)=>`<details class="mmw10card"><summary><i>${String(i+1).padStart(2,'0')}</i><strong>${n}</strong><em>${s}</em></summary><p>${d}</p></details>`).join('')}</div><div class="mmw10note">Статусы показывают уровень готовности концепта, а не подтверждённую инвестиционную доходность. VERIFIED / APPROVED / PRODUCTION не присваиваются без прохождения обязательных gates.</div></div></section>`}
function projectShell(p,reqPath){return `<style id="mmw-project-shell">.mmwProjectShell{position:sticky;top:0;z-index:9999;background:rgba(4,12,16,.97);backdrop-filter:blur(14px);border-bottom:1px solid rgba(216,181,107,.28);font:11px/1.2 Arial,sans-serif}.mmwProjectShell .inner{max-width:1240px;margin:auto;padding:9px 18px;display:flex;align-items:center;gap:12px}.mmwProjectShell .brand{font-weight:800;letter-spacing:.08em;color:#f4f7f3;white-space:nowrap;text-decoration:none}.mmwProjectShell .brand b{color:${p.color}}.mmwProjectShell .kind{color:#8f9d99;font-size:8px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap}.mmwProjectShell .status{font-size:8px;color:#d8b56b;letter-spacing:.08em;border:1px solid rgba(216,181,107,.28);padding:6px 8px;border-radius:999px;white-space:nowrap}.mmwProjectShell .nav{margin-left:auto;display:flex;gap:5px;align-items:center;overflow:auto}.mmwProjectShell a.navItem{color:#c8d1cd;text-decoration:none;border:1px solid rgba(216,181,107,.18);padding:6px 8px;border-radius:6px;white-space:nowrap}.mmwProjectShell a.navItem:hover,.mmwProjectShell a.active{color:#fff;border-color:${p.color};background:rgba(255,255,255,.035)}.mmwProjectShell a.company{color:${p.color};font-weight:800}.mmwProjectShell .rule{height:18px;width:1px;background:rgba(216,181,107,.2)}@media(max-width:900px){.mmwProjectShell .inner{display:block}.mmwProjectShell .brand{display:inline-block}.mmwProjectShell .kind{display:block;margin:4px 0 7px}.mmwProjectShell .status{display:none}.mmwProjectShell .nav{margin:0;justify-content:flex-start}.mmwProjectShell .rule{display:none}}@media(max-width:560px){.mmwProjectShell .inner{padding:8px 12px}.mmwProjectShell .nav{margin-right:-12px;padding-right:12px}.mmwProjectShell a.navItem{padding:6px 7px;font-size:10px}}.mmw10{background:#061017;color:#eef3ef;border-bottom:1px solid rgba(216,181,107,.22)}.mmw10in{max-width:1240px;margin:auto;padding:22px 18px 20px}.mmw10head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:12px}.mmw10head span{font:800 9px/1 Arial,sans-serif;letter-spacing:.16em;color:var(--mmw-accent)}.mmw10head h2{font:800 26px/1.05 Arial,sans-serif;margin:7px 0 0}.mmw10head>b{font-size:8px;letter-spacing:.1em;color:#9da9a5;white-space:nowrap}.mmw10grid{display:grid;grid-template-columns:repeat(5,1fr);gap:7px}.mmw10card{border:1px solid rgba(216,181,107,.18);background:#091921;border-radius:8px;min-height:76px;overflow:hidden}.mmw10card summary{list-style:none;cursor:pointer;padding:9px;display:grid;grid-template-columns:24px 1fr auto;gap:7px;align-items:start}.mmw10card summary::-webkit-details-marker{display:none}.mmw10card i{font-style:normal;color:var(--mmw-accent);font-weight:800;font-size:9px}.mmw10card strong{font-size:9px;letter-spacing:.05em}.mmw10card em{font-style:normal;font-size:7px;color:#d8b56b;border:1px solid rgba(216,181,107,.22);padding:2px 4px;border-radius:4px}.mmw10card p{margin:0;padding:0 9px 10px 40px;color:#aeb9b6;font-size:8px;line-height:1.45}.mmw10note{margin-top:10px;color:#788986;font-size:8px;line-height:1.45;border-left:2px solid var(--mmw-accent);padding-left:9px}@media(max-width:900px){.mmw10grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.mmw10in{padding:18px 12px}.mmw10head{display:block}.mmw10head>b{display:block;margin-top:7px}.mmw10grid{grid-template-columns:1fr}.mmw10card{min-height:auto}}</style>${standard10(p)}`}
function companyShell(){return `<style id="mmw-company-shell">.mmwCompanyBar{position:sticky;top:0;z-index:9998;background:rgba(2,12,18,.96);border-bottom:1px solid rgba(215,168,63,.28);font:10px Arial,sans-serif}.mmwCompanyBar .in{max-width:1536px;margin:auto;padding:8px 20px;display:flex;align-items:center;gap:12px}.mmwCompanyBar b{letter-spacing:.1em}.mmwCompanyBar span{color:#9da7a8;font-size:8px;letter-spacing:.1em}.mmwCompanyBar nav{margin-left:auto;display:flex;gap:6px;overflow:auto}.mmwCompanyBar a{border:1px solid rgba(215,168,63,.18);border-radius:6px;padding:6px 8px;color:#cbd2d0;text-decoration:none;white-space:nowrap}.mmwCompanyBar a:hover{border-color:#d7a83f;color:#fff}@media(max-width:700px){.mmwCompanyBar .in{display:block}.mmwCompanyBar nav{margin:7px -8px 0 0}}}</style><div class="mmwCompanyBar"><div class="in"><b>MMW-COMPANY</b><span>BUSINESS PROJECT DEVELOPMENT · FACTORY / VALIDATION</span><nav><a href="#company">COMPANY</a><a href="#projects">PROJECTS</a><a href="#methodology">METHODOLOGY</a><a href="#portfolio">PORTFOLIO</a><a href="#contact">CONTACT</a></nav></div></div>`}
express.response.send=function(body){try{const req=this.req;if(typeof body==='string'&&/<html/i.test(body)){const key=Object.keys(PROJECTS).find(k=>req&&req.path===k);if(key&&!body.includes('mmwProjectShell')){const p=PROJECTS[key];body=body.replace(/<body([^>]*)>/i,`<body$1>${projectShell(p,req.path)}`.replace('</style>','</style>')+standard10(p))}else if(req&&req.path==='/'&&!body.includes('mmw10')){body=body.replace(/<body([^>]*)>/i,`<body$1>${companyShell()}${standard10(COMPANY)}`)}}}catch(e){console.error('[MMW-PROJECT-SHELL]',e.message)}return originalSend.call(this,body)};
