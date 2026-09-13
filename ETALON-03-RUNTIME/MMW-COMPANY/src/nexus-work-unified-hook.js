// NEXUS WORK — logical page order layer.
// Factory-only presentation transform. Protected project repositories are not modified.
const fs=require('fs');
const target='nexus-work-presentation-suite.html';
const original=fs.readFileSync.bind(fs);
const desired=['space','product','environment','catalog','engine','scenarios','value','economics','network'];
const labels={space:'01 / SPACE SYSTEM',product:'02 / PRODUCT ARCHITECTURE',environment:'03 / THEMATIC ENVIRONMENT',catalog:'04 / PRODUCTS & SERVICES',engine:'05 / UNIQUE FINANCIAL DEMO',scenarios:'06 / OCCUPANCY SCENARIOS',value:'07 / VALUE LOGIC',economics:'08 / DEVELOPMENT',network:'09 / NETWORK ENGINE'};
function keyOf(s){const id=(s.match(/id="([^"]+)"/)||[])[1];if(id)return id;if(s.includes('03 / VALUE LOGIC'))return 'value';return null}
function apply(out){if(!out.includes('<main>')||!out.includes('id="space"'))return out;const m=out.match(/<main>([\s\S]*?)<\/main>/);if(!m)return out;const sections=[...m[1].matchAll(/<section\b[\s\S]*?<\/section>/g)].map(x=>x[0]);const by={};sections.forEach(s=>{const k=keyOf(s);if(k)by[k]=s});let arranged=desired.map(k=>{let s=by[k];if(!s)return '';return s.replace(/(<div class="ey">)[^<]*(<\/div>)/,`$1${labels[k]}$2`)}).filter(Boolean).join('');const main='<main>'+arranged+'</main>';const nav='<div class="links"><a class="btn" href="#space">SPACE</a><a class="btn" href="#product">PRODUCT</a><a class="btn" href="#catalog">CATALOG</a><a class="btn" href="#engine">ENGINE</a><a class="btn" href="#network">NETWORK</a></div>';return out.replace(/<div class="links">[\s\S]*?<\/div>/,nav).replace(/<main>[\s\S]*?<\/main>/,main)}
fs.readFileSync=function(file,encoding,...rest){const out=original(file,encoding,...rest);if(typeof out!=='string')return out;if(typeof file==='string'&&file.endsWith(target))return apply(out);return out};
