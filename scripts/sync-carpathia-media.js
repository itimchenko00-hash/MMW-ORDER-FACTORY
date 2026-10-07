const fs=require("node:fs");const path=require("node:path");
const root=process.cwd();
const src=path.join(root,"MEDIA-LIBRARY","CARPATHIA","photos","web-selected");
const dst=path.join(root,"public","ASSETS","CARPATHIA","photos","web-selected");
const map={
 "02-stay.jpg":"01-restoration-stay.jpg",
 "03-nature.jpg":"02-natural-environment.jpg",
 "04-food.jpg":"03-local-experience.jpg",
 "07-service.jpg":"04-service-context.jpg",
 "season-autumn.jpg":"05-season-autumn.jpg",
 "08-model.jpg":"06-scale-model-context.jpg",
 "06-guest.jpg":"07-family-guest-context.jpg",
 "05-experience.jpg":"08-active-experience.jpg",
 "season-winter.jpg":"09-winter-context.jpg",
 "season-spring.jpg":"10-spring-context.jpg",
 "season-summer.jpg":"11-summer-context.jpg",
 "01-hero.jpg":"12-mountain-guest-context.jpg"
};
fs.mkdirSync(dst,{recursive:true});
for(const [from,to] of Object.entries(map)){const a=path.join(src,from),b=path.join(dst,to);if(!fs.existsSync(a))throw new Error("Missing CARPATHIA media source: "+a);fs.copyFileSync(a,b)}
console.log("CARPATHIA local media synchronized:",Object.values(map).length);