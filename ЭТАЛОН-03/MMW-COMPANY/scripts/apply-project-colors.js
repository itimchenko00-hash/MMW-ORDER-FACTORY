const fs = require('fs');
const path = require('path');

const root = path.resolve(process.cwd());
const projects = {
  ALADIN: { primary:'#C98B5B', secondary:'#8E5A3C', soft:'#3A2921', signal:'#D8A06A' },
  'NEXUS-WORK': { primary:'#5C8DFF', secondary:'#314A73', soft:'#1C2940', signal:'#73A7FF' },
  'NEXUS-LOGISTICS': { primary:'#5B86A8', secondary:'#465867', soft:'#25313A', signal:'#D6A34A' },
  AGROHUB: { primary:'#5C9A67', secondary:'#66784A', soft:'#243326', signal:'#D6B84C' },
  'ENERGY-PARK': { primary:'#35D4E8', secondary:'#315E72', soft:'#17343D', signal:'#E7C84B' },
  CARPATHIA: { primary:'#4F8A69', secondary:'#35604C', soft:'#1E3028', signal:'#6CA6C4' }
};

const files = {
  ALADIN:'ЭТАЛОН-03/MMW-COMPANY/site/projects/ALADIN.html',
  AGROHUB:'ЭТАЛОН-03/MMW-COMPANY/site/projects/AGROHUB.html',
  CARPATHIA:'ЭТАЛОН-03/MMW-COMPANY/site/projects/CARPATHIA.html',
  'ENERGY-PARK':'ЭТАЛОН-03/MMW-COMPANY/site/projects/ENERGY-PARK.html',
  'NEXUS-LOGISTICS':'ЭТАЛОН-03/MMW-COMPANY/site/projects/NEXUS-LOGISTICS.html',
  'NEXUS-WORK':'ЭТАЛОН-03/MMW-COMPANY/site/projects/NEXUS-WORK.html'
};

const marker = 'ETALON-03 PROJECT COLOR SYSTEM 01';
for (const [name, file] of Object.entries(files)) {
  const full = path.join(root, file);
  let html = fs.readFileSync(full, 'utf8');
  const c = projects[name];
  const block = `<style data-etalon03-project-colors="${name}">/* ${marker} */:root{--project-primary:${c.primary};--project-secondary:${c.secondary};--project-soft:${c.soft};--project-signal:${c.signal};--gold:var(--project-primary);--gold2:var(--project-signal)}.logo span,.hero h1 span,.eyebrow{color:var(--project-primary)!important}.primary{background:linear-gradient(135deg,var(--project-signal),var(--project-primary))!important;border-color:var(--project-primary)!important}.card b,.node b,.metric strong,.stage strong,.price{color:var(--project-signal)!important}.metric{border-top-color:var(--project-primary)!important}.node:hover,.node.active{border-color:var(--project-primary)!important;background:var(--project-soft)!important}.btn.primary:hover,.btn.primary:focus-visible{filter:brightness(1.08)}.warning{border-color:color-mix(in srgb,var(--project-primary) 45%,#111 55%)!important}</style>`;
  const re = new RegExp(`<style data-etalon03-project-colors="${name}">[\\s\\S]*?<\\/style>`,'i');
  if (re.test(html)) html = html.replace(re, block);
  else if (html.includes('</head>')) html = html.replace('</head>', `${block}</head>`);
  else throw new Error(`No </head> in ${file}`);
  fs.writeFileSync(full, html);
  console.log(`updated ${file}`);
}
