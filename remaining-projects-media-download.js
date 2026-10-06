const fs=require('fs'),path=require('path'),https=require('https');
const root=path.join(__dirname,'ASSETS');
const projects={
  'NEXUS-WORK':{
    '01-architecture.jpg':'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '02-workspace.jpg':'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '03-flex-office.jpg':'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '04-meeting.jpg':'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '05-collaboration.jpg':'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '06-business-space.jpg':'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&fm=jpg&q=88&w=1800'
  },
  'AGROHUB':{
    '01-field.jpg':'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '02-greenhouse.jpg':'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '03-agro-processing.jpg':'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '04-storage.jpg':'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '05-product-flow.jpg':'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '06-market-product.jpg':'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&fm=jpg&q=88&w=1800'
  },
  'ENERGY-PARK':{
    '01-solar-plant.jpg':'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '02-solar-field.jpg':'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '03-energy-infrastructure.jpg':'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '04-engineering.jpg':'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '05-industrial-site.jpg':'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&fm=jpg&q=88&w=1800',
    '06-control.jpg':'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&fm=jpg&q=88&w=1800'
  }
};
function get(url,tries=0){return new Promise((resolve,reject)=>{https.get(url,{headers:{'User-Agent':'MMW-ORDER-FACTORY/1.0'}},res=>{if(res.statusCode>=300&&res.statusCode<400&&res.headers.location)return get(new URL(res.headers.location,url).toString(),tries).then(resolve,reject);if(res.statusCode!==200)return reject(new Error('HTTP '+res.statusCode));const chunks=[];res.on('data',c=>chunks.push(c));res.on('end',()=>resolve(Buffer.concat(chunks)))}).on('error',e=>{if(tries<3)setTimeout(()=>get(url,tries+1).then(resolve,reject),1500);else reject(e)})})}
function validJpeg(b){return b.length>10000&&b[0]===0xff&&b[1]===0xd8&&b[2]===0xff}
(async()=>{for(const [project,files] of Object.entries(projects)){const dir=path.join(root,project,'photos');fs.mkdirSync(dir,{recursive:true});for(const [name,url] of Object.entries(files)){const out=path.join(dir,name);try{if(fs.existsSync(out))fs.rmSync(out,{force:true});const b=await get(url);if(!validJpeg(b))throw new Error('invalid JPEG payload');fs.writeFileSync(out,b);console.log('FACTORY media saved:',project,name);await new Promise(r=>setTimeout(r,1500))}catch(e){console.error('FACTORY media failed:',project,name,e.message);process.exitCode=1}}}})();