const https=require("https"),fs=require("fs"),path=require("path");
const root=path.join(__dirname,"public","ASSETS");
const expected=[];

const sets={
"NEXUS-WORK":[
["photos/01-hero-business-hub.jpg","https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"],
["photos/02-workspace-coworking.jpg","https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85"],
["photos/03-business-community.jpg","https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85"],
["photos/04-business-location.jpg","https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=85"],
["photos/05-training-learning.jpg","https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85"],
["photos/06-economic-workspace.jpg","https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85"],
["photos/07-premium-office.jpg","https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85"],
["photos/08-networking-hub.jpg","https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85"],
["photos/09-teamwork-office.jpg","https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85"]
],
"CARPATHIA":[
["photos/01-territory.jpg","https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=85"],
["photos/02-stay.jpg","https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=85"],
["photos/03-nature.jpg","https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85"],
["photos/04-food.jpg","https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=85"],
["photos/05-experience.jpg","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=85"],
["photos/06-guest.jpg","https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=85"],
["photos/07-service.jpg","https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1600&q=85"],
["photos/08-model.jpg","https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=85"],
["photos/season-winter.jpg","https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=1600&q=85"],
["photos/season-spring.jpg","https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=85"],
["photos/season-summer.jpg","https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1600&q=85"],
["photos/season-autumn.jpg","https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=85"],
["photos/09-hero.jpg","https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&q=85"],
["photos/10-landscape.jpg","https://images.unsplash.com/photo-1458966480358-a0ac42de0a7a?auto=format&fit=crop&w=1600&q=85"],
["photos/15-positioning.jpg","https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85"]
],
"AGROHUB":[
["photos/web-selected/01-hero.jpg","https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/02-receiving.jpg","https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/03-storage.jpg","https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/04-drying.jpg","https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/05-processing.jpg","https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/06-packaging.jpg","https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/07-cold-storage.jpg","https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/08-logistics.jpg","https://images.unsplash.com/photo-1586528116493-da8c9f7b3f8b?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/09-export.jpg","https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&q=85"]
],
"ENERGY-PARK":[
["photos/web-selected/00-hero-energy-park.jpg","https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/01-industrial-energy-site.jpg","https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/02-grid-substation.jpg","https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/03-industrial-solar.jpg","https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/04-energy-storage.jpg","https://images.unsplash.com/photo-1508514177221-188b1cf16e6d?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/05-control-room.jpg","https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/06-engineering-operator.jpg","https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/07-energy-metering.jpg","https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=1600&q=85"],
["photos/web-selected/08-industrial-grid.jpg","https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=85"]
]};

function get(url,dest){return new Promise((resolve,reject)=>{const req=https.get(url,{headers:{"User-Agent":"MMW-ORDER-FACTORY/1.0"}},res=>{if(res.statusCode>=300&&res.statusCode<400&&res.headers.location)return get(new URL(res.headers.location,url).toString(),dest).then(resolve,reject);if(res.statusCode!==200){res.resume();return reject(new Error("HTTP "+res.statusCode+" "+url))}const out=fs.createWriteStream(dest);res.pipe(out);out.on("finish",()=>out.close(resolve));out.on("error",reject)});req.on("error",reject)})}

(async()=>{for(const [folder,files] of Object.entries(sets)){for(const [rel,url] of files){const dest=path.join(root,folder,rel);fs.mkdirSync(path.dirname(dest),{recursive:true});if(fs.existsSync(dest)&&fs.statSync(dest).size>50000)continue;console.log("download",folder,rel);await get(url,dest);const size=fs.statSync(dest).size;if(size<50000)throw new Error("invalid image "+dest);expected.push({path:"/ASSETS/"+folder+"/"+rel,size});await new Promise(r=>setTimeout(r,700))}}}
console.log("MMW media import verified:",expected.length,"project images");
for(const item of expected)console.log("MEDIA_OK",item.path,item.size);
})().catch(e=>{console.error(e);process.exit(1)});