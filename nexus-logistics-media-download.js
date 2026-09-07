const fs=require('fs');const path=require('path');const https=require('https');
const dir=path.join(__dirname,'ASSETS','NEXUS-LOGISTICS','photos');fs.mkdirSync(dir,{recursive:true});
const files={
'01-logistics-audit.jpg':'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'02-route-design.jpg':'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe70?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'03-road-freight.jpg':'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'04-container-shipping.jpg':'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'05-multimodal-flow.jpg':'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'06-air-cargo.jpg':'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'07-rail-freight.jpg':'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'08-warehouse-crossdock.jpg':'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'09-customs-documents.jpg':'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'10-project-cargo.jpg':'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'11-cold-logistics.jpg':'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&fm=jpg&q=82&w=1400',
'12-supply-chain-control.jpg':'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&fm=jpg&q=82&w=1400'
};
function get(url,tries=0){return new Promise((resolve,reject)=>{https.get(url,res=>{if(res.statusCode>=300&&res.statusCode<400&&res.headers.location)return get(res.headers.location,tries).then(resolve,reject);if(res.statusCode!==200)return reject(new Error('HTTP '+res.statusCode));const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve(Buffer.concat(chunks)))}).on('error',e=>{if(tries<2)setTimeout(()=>get(url,tries+1).then(resolve,reject),800);else reject(e)})})}
(async()=>{for(const [name,url] of Object.entries(files)){const out=path.join(dir,name);try{const b=await get(url);if(b.length<10000||b[0]!==0xff||b[1]!==0xd8)throw new Error('invalid JPEG');fs.writeFileSync(out,b);console.log('NEXUS LOGISTICS media saved:',name)}catch(e){console.error('NEXUS LOGISTICS media failed:',name,e.message)}}})();
