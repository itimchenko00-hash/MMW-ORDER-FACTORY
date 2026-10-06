(function(){
const config={
 "nexus.html":{folder:"NEXUS-WORK",files:["01-architecture.jpg","02-workspace.jpg","03-flex-office.jpg","04-meeting.jpg","05-collaboration.jpg","06-business-space.jpg"],roles:["ARCHITECTURE","WORKSPACE","FLEXIBLE FORMAT","MEETING","COLLABORATION","BUSINESS SERVICES"]},
 "carpathia.html":{folder:"CARPATHIA-ECO-LODGE",files:["01-mountain.jpg","02-forest.jpg","03-mountain-site.jpg","04-destination.jpg","05-nature-setting.jpg","06-lodge.jpg"],roles:["TERRITORY","FOREST","SITE","DESTINATION","NATURE EXPERIENCE","HOSPITALITY"]},
 "agrohub.html":{folder:"AGROHUB",files:["01-field.jpg","02-greenhouse.jpg","03-agro-processing.jpg","04-storage.jpg","05-product-flow.jpg","06-market-product.jpg"],roles:["RAW MATERIAL","GROWING","PROCESSING","STORAGE","PRODUCT FLOW","MARKET"]},
 "energy-park.html":{folder:"ENERGY-PARK",files:["01-solar-plant.jpg","02-solar-field.jpg","03-energy-infrastructure.jpg","04-engineering.jpg","05-industrial-site.jpg","06-control.jpg"],roles:["GENERATION","SOLAR FIELD","INFRASTRUCTURE","ENGINEERING","SITE","CONTROL"]}
};
const key=location.pathname.split("/").pop()||"index.html";
const c=config[key]; if(!c)return;
const sections=[...document.querySelectorAll("main > section")].slice(0,6);
sections.forEach((section,i)=>{
 if(section.querySelector(".mmw-semantic-photo"))return;
 const figure=document.createElement("figure");
 figure.className="mmw-semantic-photo";
 figure.innerHTML='<img loading="'+(i<2?"eager":"lazy")+'" src="/ASSETS/'+c.folder+'/photos/'+c.files[i]+'" alt="'+c.roles[i]+' — '+document.title.replace(" — MMW-COMPANY","")+'"><figcaption><b>'+c.roles[i]+'</b><span>FACTORY PROJECT MEDIA</span></figcaption>';
 const wrap=section.querySelector(".wrap,.w");
 if(wrap)wrap.insertBefore(figure,wrap.firstChild);
});
})();