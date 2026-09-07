const fs=require('fs'),path=require('path'),https=require('https');
const dir=path.join(__dirname,'ASSETS','NEXUS-LOGISTICS','photos');fs.mkdirSync(dir,{recursive:true});
const files={
'01-logistics-audit.jpg':'https://images.unsplash.com/photo-1714627798569-b3e36d409c4b?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'02-route-design.jpg':'https://images.unsplash.com/photo-1773521746199-df30ab6c35ed?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'03-road-freight.jpg':'https://images.unsplash.com/photo-1786081061970-a7b1f22b5e4b?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'04-container-shipping.jpg':'https://images.unsplash.com/photo-1725100609222-86a51bee3c3a?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'05-multimodal-flow.jpg':'https://images.unsplash.com/photo-1713859272775-2e1cf7d777a1?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'06-air-cargo.jpg':'https://images.unsplash.com/photo-1774698078446-59299e016718?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'07-rail-freight.jpg':'https://images.unsplash.com/photo-1657710906008-adc237847473?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'08-warehouse-crossdock.jpg':'https://images.unsplash.com/photo-1627309366653-2dedc084cdf1?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'09-customs-documents.jpg':'https://images.unsplash.com/photo-1713859272766-76751031af78?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'10-project-cargo.jpg':'https://images.unsplash.com/photo-1784911546650-41642bfdfe3f?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'11-cold-logistics.jpg':'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&fm=jpg&q=88&w=1800',
'12-supply-chain-control.jpg':'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&fm=jpg&q=88&w=1800'
};
function get(url,tries=0){return new Promise((resolve,reject)=>{https.get(url,{headers:{'User-Agent':'MMW-ORDER-FACTORY/1.0'}},res=>{if(res.statusCode>=300&&res.statusCode<400&&res.headers.location)return get(new URL(res.headers.location,url).toString(),tries).then(resolve,reject);if(res.statusCode!==200)return reject(new Error('HTTP '+res.statusCode));const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve(Buffer.concat(chunks)))}).on('error',e=>{if(tries<2)setTimeout(()=>get(url,tries+1).then(resolve,reject),800);else reject(e)})})}
function validJpeg(buf){return buf.length>10000&&buf[0]===0xff&&buf[1]===0xd8&&buf[2]===0xff}
(async()=>{for(const [name,url] of Object.entries(files)){const out=path.join(dir,name);try{if(fs.existsSync(out))fs.rmSync(out,{force:true});const buf=await get(url);if(!validJpeg(buf))throw new Error('invalid JPEG payload');fs.writeFileSync(out,buf);console.log('NEXUS LOGISTICS media refreshed:',name)}catch(e){console.error('NEXUS LOGISTICS media failed:',name,e.message)}}})();
