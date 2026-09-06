const fs=require('fs');const path=require('path');const https=require('https');
const dir=path.join(__dirname,'nexus-work-media');fs.mkdirSync(dir,{recursive:true});
const files={
'hot-desk.jpg':'https://images.unsplash.com/photo-1758876020207-67890de8aa73?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'hot-desk-unlimited.jpg':'https://images.unsplash.com/photo-1758691737060-3814f16d5aba?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'dedicated-desk.jpg':'https://images.unsplash.com/photo-1674916974039-f9237e472998?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'private-office.jpg':'https://images.unsplash.com/photo-1705909773171-4ba952b9c0af?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'team-office-4.jpg':'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'meeting-room.jpg':'https://images.unsplash.com/photo-1684150949658-e94061bbe168?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'board-room.jpg':'https://images.unsplash.com/photo-1745920770891-b46fc1799646?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'conference-hall.jpg':'https://images.unsplash.com/photo-1777326587610-1ddcce610a5c?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'business-event.jpg':'https://images.unsplash.com/photo-1769798643237-8642a3fbe5bc?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'business-address.jpg':'https://images.unsplash.com/photo-1745970347652-8f22f5d7d3ba?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'virtual-office.jpg':'https://images.unsplash.com/photo-1758876020207-67890de8aa73?auto=format&fit=crop&fm=jpg&q=78&w=1400',
'office-support.jpg':'https://images.unsplash.com/photo-1613395450289-e560907d9308?auto=format&fit=crop&fm=jpg&q=78&w=1400'};
function get(url,tries=0){return new Promise((resolve,reject)=>{https.get(url,res=>{if(res.statusCode>=300&&res.statusCode<400&&res.headers.location)return get(res.headers.location,tries).then(resolve,reject);if(res.statusCode!==200)return reject(new Error('HTTP '+res.statusCode));const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve(Buffer.concat(chunks)))}).on('error',e=>{if(tries<2)setTimeout(()=>get(url,tries+1).then(resolve,reject),800);else reject(e)})})}
(async()=>{for(const [name,url] of Object.entries(files)){const out=path.join(dir,name);if(fs.existsSync(out)&&fs.statSync(out).size>1000)continue;try{const b=await get(url);fs.writeFileSync(out,b);console.log('NEXUS media saved:',name)}catch(e){console.error('NEXUS media failed:',name,e.message)}}})();
