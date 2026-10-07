const PDFDocument=require("pdfkit"),fs=require("node:fs"),path=require("node:path");
const money=n=>new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",maximumFractionDigits:0}).format(n);
const font=path.join(__dirname,"..","node_modules","dejavu-fonts-ttf","ttf","DejaVuSans.ttf");
const BG="#102019",PAPER="#193027",ACCENT="#6B9B72",INK="#EDF2EE",MUTED="#AEBBB3",LINE="#385046",SOFT="#E5ECE7";
function orderPdf(o){return new Promise((resolve,reject)=>{
 const d=new PDFDocument({size:"A4",margin:46}),chunks=[];
 d.on("data",x=>chunks.push(x));d.on("end",()=>resolve(Buffer.concat(chunks)));d.on("error",reject);
 if(fs.existsSync(font))d.font(font);
 const W=d.page.width,H=d.page.height,MW=W-92;
 const text=(str,x,y,size,color=INK,opts={})=>d.fillColor(color).fontSize(size).text(String(str||"—"),x,y,opts);
 const line=(x1,y1,x2,y2,color=LINE,w=1)=>d.moveTo(x1,y1).lineTo(x2,y2).lineWidth(w).strokeColor(color).stroke();
 const pill=(label,x,y,w)=>{d.roundedRect(x,y,w,20,10).fill(ACCENT);text(label,x,y+5,7,BG,{width:w,align:"center",characterSpacing:.5});};
 d.rect(0,0,W,H).fill(BG);
 d.roundedRect(46,32,MW,82,18).fill(PAPER);
 d.roundedRect(62,48,44,44,12).fill(ACCENT);
 text("MMW",62,62,13,BG,{width:44,align:"center",characterSpacing:1});
 text("MMW-COMPANY",122,49,20,INK,{characterSpacing:1});
 text("DEVELOPMENT • MANAGEMENT • PROJECTS",122,76,8,MUTED,{characterSpacing:1.4});
 text("ВЫПИСКА ПО ЗАЯВКЕ",46,144,20,INK,{characterSpacing:.7});
 text("Документ с составом запроса и выбранных позиций",46,171,9,MUTED);
 pill("ЗАЯВКА",W-126,145,80);
 let y=210;
 const info=(label,value,x,w)=>{text(label.toUpperCase(),x,y,7,MUTED,{characterSpacing:.8});text(value||"—",x,y+13,10,INK,{width:w});};
 info("Номер заявки",o.id,46,145);info("Дата",new Date(o.createdAt).toLocaleString("uk-UA"),205,180);info("Статус",o.status,400,145);y=250;
 const section=(title,h,fn)=>{d.roundedRect(46,y,MW,h,14).fill(PAPER);text(title,62,y+14,9,ACCENT,{characterSpacing:1.1});fn(y+38);y+=h+14;};
 section("ЗАКАЗЧИК",92,yy=>{info2("Имя",o.customerName,62,145,yy);info2("Телефон",o.phone,220,145,yy);info2("Email",o.email,378,145,yy);info2("Компания",o.company,536,55,yy)});
 function info2(label,value,x,w,yy){text(label.toUpperCase(),x,yy,7,MUTED,{characterSpacing:.6});text(value||"—",x,yy+13,9,INK,{width:w});}
 section("ПРОЕКТ И ЗАПРОС",82,yy=>{info2("Проект / направление",o.projectType,62,220,yy);info2("Площадка / адрес",o.address,300,235,yy)});
 text("СОСТАВ ЗАЯВКИ",46,y+4,9,ACCENT,{characterSpacing:1.1});y+=28;
 line(46,y,W-46,y,LINE,1);y+=12;
 o.items.forEach((i,n)=>{if(y>690){d.addPage();d.rect(0,0,W,H).fill(BG);y=55;text("MMW-COMPANY · ПРОДОЛЖЕНИЕ ЗАЯВКИ",46,y,9,MUTED);y+=28}
   d.roundedRect(46,y-6,MW,30,8).fill(n%2?BG:PAPER);
   text(String(n+1).padStart(2,"0"),58,y+2,8,MUTED);
   text(i.name,86,y,9,INK,{width:220});
   text(i.qty+" × "+money(i.price),315,y,8,MUTED,{width:115,align:"right"});
   text(money(i.price*i.qty),W-155,y,9,INK,{width:109,align:"right"});
   y+=31;
 });
 y+=4;line(46,y,W-46,y,ACCENT,1);y+=16;
 text("ИТОГО",46,y,9,MUTED,{characterSpacing:1});text(money(o.total),W-210,y-4,18,INK,{width:164,align:"right"});y+=42;
 if(o.comment){text("КОММЕНТАРИЙ К ЗАПРОСУ",46,y,9,ACCENT,{characterSpacing:1});y+=18;text(o.comment,46,y,9,INK,{width:MW,lineGap:4});y+=d.heightOfString(o.comment,{width:MW,fontSize:9,lineGap:4})+20}
 d.roundedRect(46,y,MW,72,14).fill(PAPER);
 text("УСЛОВИЯ",62,y+14,8,ACCENT,{characterSpacing:1});
 text("Выписка фиксирует полученный состав заявки. Позиции с пометкой «от» требуют подтверждения окончательного объёма.",62,y+30,8,MUTED,{width:MW-32,lineGap:2});
 text("Код доступа: "+o.accessCode,62,y+51,8,INK,{characterSpacing:.3});
 text("MMW-COMPANY",46,H-34,7,MUTED,{characterSpacing:1});
 text("DEVELOPMENT • MANAGEMENT • PROJECTS",W-260,H-34,7,MUTED,{width:214,align:"right",characterSpacing:.7});
 d.end();
});}
module.exports={orderPdf};