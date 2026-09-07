const fs=require('fs');const path=require('path');const https=require('https');
const dir=path.join(__dirname,'ASSETS','ENERGY-PARK','photos');fs.mkdirSync(dir,{recursive:true});
const files={
'01-energy-audit.jpg':'https://exotronthermal.com/assets/img/services/energy-audit.jpg',
'02-load-profile.jpg':'https://www.redhawkenergy.net/wp-content/uploads/2023/04/Utility1-scaled.jpg',
'03-backup-power.jpg':'https://vinur.com.ua/image/cache/catalog/product/2629/catalog-product-tmp-avtonomnaya-solnechnaya-elektrostantsiya-na-osnove-litij-ionnyh-akkumulyatornyh-batarej-s-ustanovkoj-na-kryshe-jpg-2-900x900.jpg',
'04-hybrid-solar-5kw.jpg':'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&fm=jpg&q=85&w=1400',
'05-hybrid-solar-10kw.jpg':'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&fm=jpg&q=85&w=1400',
'06-commercial-solar-50kw.jpg':'https://nuwattenergy.com/images/homepage-redesign/commercial-solar.webp',
'07-bess-50kw.jpg':'https://usimg.bjyyb.net/sites/97500/97732/1767493569866264578406043648.jpg',
'08-microgrid.jpg':'https://www.mtu-solutions.com/content/dam/mtu/technical-article/2020/tying-multiple-power-systems-together-with-intelligent-controls/Microgrid_Motiv_03_fabrik_oe.jpg/_jcr_content/renditions/original./Microgrid_Motiv_03_fabrik_oe.jpg',
'09-ev-charging.jpg':'https://soleosenergy.com/images/solar-carport.png',
'10-heat-pump.jpg':'https://www.allaroundmech.com/wp-content/uploads/2024/11/dw-1-commercial-heat-pump.jpeg',
'11-energy-monitoring.jpg':'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&fm=jpg&q=85&w=1400',
'12-energy-masterplan.jpg':'https://imageio.forbes.com/specials-images/imageserve/69c016ec81d80809a195883c/0x0.jpg?fit=bounds&format=jpg&height=900&width=1400'};
function get(url,n=0){return new Promise((resolve,reject)=>https.get(url,{headers:{'User-Agent':'MMW-ORDER-FACTORY/1.0'}},r=>{if(r.statusCode>=300&&r.statusCode<400&&r.headers.location)return get(new URL(r.headers.location,url).toString(),n).then(resolve,reject);if(r.statusCode!==200)return reject(new Error('HTTP '+r.statusCode));const a=[];r.on('data',c=>a.push(c));r.on('end',()=>resolve(Buffer.concat(a)))}).on('error',e=>n<2?setTimeout(()=>get(url,n+1).then(resolve,reject),700):reject(e)))}
(async()=>{for(const [name,url] of Object.entries(files)){const out=path.join(dir,name);if(fs.existsSync(out)&&fs.statSync(out).size>1000)continue;try{fs.writeFileSync(out,await get(url));console.log('ENERGY media saved:',name)}catch(e){console.error('ENERGY media failed:',name,e.message)}}})();