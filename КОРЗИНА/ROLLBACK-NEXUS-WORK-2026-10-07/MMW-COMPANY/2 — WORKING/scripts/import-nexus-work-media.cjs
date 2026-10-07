const fs=require("fs");const path=require("path");const https=require("https");
const root=path.join(process.cwd(),"public","ASSETS","NEXUS-WORK","photos","web-selected");
const files={
"01-hero-coworking.jpg":"https://images.pexels.com/photos/8606292/pexels-photo-8606292.jpeg?cs=srgb&dl=pexels-ryanpilat1-8606292.jpg&fm=jpg",
"02-workspace.jpg":"https://images.pexels.com/photos/26966417/pexels-photo-26966417.jpeg?cs=srgb&dl=pexels-nicolas-rueda-175965148-26966417.jpg&fm=jpg",
"03-team-collaboration.jpg":"https://images.pexels.com/photos/12903182/pexels-photo-12903182.jpeg?cs=srgb&dl=pexels-mizunokozuki-12903182.jpg&fm=jpg",
"04-meeting.jpg":"https://images.pexels.com/photos/31709064/pexels-photo-31709064.jpeg?cs=srgb&dl=pexels-misbaa-eri-426041722-31709064.jpg&fm=jpg",
"05-training.jpg":"https://images.pexels.com/photos/18999475/pexels-photo-18999475.jpeg?cs=srgb&dl=pexels-bertellifotografia-18999475.jpg&fm=jpg",
"06-office-exterior.jpg":"https://images.pexels.com/photos/4889301/pexels-photo-4889301.jpeg?cs=srgb&dl=pexels-introspectivedsgn-4889301.jpg&fm=jpg",
"07-networking.jpg":"https://images.pexels.com/photos/8761555/pexels-photo-8761555.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8761555.jpg&fm=jpg",
"08-presentation.jpg":"https://images.pexels.com/photos/30319116/pexels-photo-30319116.jpeg?cs=srgb&dl=pexels-mehmet-balci-166052147-30319116.jpg&fm=jpg",
"09-project-team.jpg":"https://images.pexels.com/photos/5466236/pexels-photo-5466236.jpeg?cs=srgb&dl=pexels-shkrabaanthony-5466236.jpg&fm=jpg"};
fs.mkdirSync(root,{recursive:true});
function get(url){return new Promise((resolve,reject)=>https.get(url,{headers:{"User-Agent":"MMW-COMPANY controlled media importer"}},res=>{if(res.statusCode>=300&&res.statusCode<400&&res.headers.location)return resolve(get(res.headers.location));if(res.statusCode!==200)return reject(new Error("HTTP "+res.statusCode));const chunks=[];res.on("data",d=>chunks.push(d));res.on("end",()=>{const b=Buffer.concat(chunks);if(!(res.headers["content-type"]||"").startsWith("image/")||b.length<20000)return reject(new Error("invalid image"));resolve(b)});}).on("error",reject))};
(async()=>{for(const [name,url] of Object.entries(files)){const dest=path.join(root,name);if(fs.existsSync(dest)&&fs.statSync(dest).size>=20000){console.log("OK",name);continue}const tmp=dest+".tmp";const b=await get(url);fs.writeFileSync(tmp,b);fs.renameSync(tmp,dest);console.log("IMPORTED",name,b.length)}console.log("NEXUS WORK media ready:",Object.keys(files).length)})().catch(e=>{console.error("NEXUS WORK media import failed:",e);process.exit(1)})