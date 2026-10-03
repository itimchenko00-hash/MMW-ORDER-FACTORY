const PDFDocument=require("pdfkit"),fs=require("node:fs"),path=require("node:path");
const money=n=>new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",maximumFractionDigits:0}).format(n);
const font=path.join(__dirname,"..","node_modules","dejavu-fonts-ttf","ttf","DejaVuSans.ttf");
const NAVY="#173F2E",GOLD="#C6A85A",INK="#17202A",MUTED="#667085",PAPER="#F7F5EF";
function orderPdf(o){return new Promise((resolve,reject)=>{const d=new PDFDocument({size:"A4",margin:46}),chunks=[];d.on("data",x=>chunks.push(x));d.on("end",()=>resolve(Buffer.concat(chunks)));d.on("error",reject);if(fs.existsSync(font))d.font(font);
const W=d.page.width,H=d.page.height;
d.rect(0,0,W,92).fill(NAVY);d.fillColor("#fff").fontSize(23).text("MMW-COMPANY",46,25);d.fillColor(GOLD).fontSize(9).text("DEVELOPMENT • MANAGEMENT • PROJECTS",46,54,{characterSpacing:1});
d.save();d.opacity(.035).fillColor(GOLD).fontSize(120).text("MMW",W-220,H/2-52,{width:180,align:"center"});d.restore();
d.fillColor(NAVY).fontSize(19).text("ВЫПИСКА ПО ЗАЯВКЕ",46,116);d.fillColor(GOLD).rect(46,145,64,3).fill();
d.fillColor(INK).fontSize(9).text("Номер заявки",46,168).fontSize(11).text(o.id,46,183);d.fillColor(MUTED).fontSize(9).text("Дата",230,168).fontSize(11).fillColor(INK).text(new Date(o.createdAt).toLocaleString("uk-UA"),230,183);d.fillColor(MUTED).fontSize(9).text("Статус",430,168).fontSize(11).fillColor(NAVY).text(o.status,430,183);
let y=225;const box=(title,fn,h)=>{d.roundedRect(46,y,W-92,h,10).fill(PAPER);d.fillColor(NAVY).fontSize(10).text(title.toUpperCase(),62,y+14);fn(y+34);y+=h+14;};
box("Заказчик",yy=>{let x=62;[["Имя",o.customerName],["Телефон",o.phone],["Email",o.email],["Компания",o.company]].filter(x=>x[1]).forEach(v=>{d.fillColor(MUTED).fontSize(8).text(v[0],x,yy);d.fillColor(INK).fontSize(10).text(v[1],x,yy+12,{width:145});x+=160;});},92);
box("Проект и запрос",yy=>{d.fillColor(MUTED).fontSize(8).text("Проект",62,yy);d.fillColor(INK).fontSize(10).text(o.projectType||"—",62,yy+12,{width:220});d.fillColor(MUTED).fontSize(8).text("Адрес / площадка",300,yy);d.fillColor(INK).fontSize(10).text(o.address||"—",300,yy+12,{width:235});},78);
d.fillColor(NAVY).fontSize(11).text("СОСТАВ ЗАЯВКИ",46,y);y+=23;d.moveTo(46,y).lineTo(W-46,y).strokeColor("#D8D3C6").stroke();y+=12;
o.items.forEach(i=>{d.fillColor(INK).fontSize(10).text(i.name,46,y,{width:270});d.fillColor(MUTED).text(i.qty+" × "+money(i.price),320,y,{width:100,align:"right"});d.fillColor(NAVY).text(money(i.price*i.qty),W-150,y,{width:104,align:"right"});y+=20;});
d.moveTo(46,y+2).lineTo(W-46,y+2).lineWidth(1).strokeColor(GOLD).stroke();y+=16;d.fillColor(NAVY).fontSize(15).text("ИТОГО",46,y);d.fillColor(GOLD).fontSize(17).text(money(o.total),W-180,y,{width:134,align:"right"});y+=42;
if(o.comment){d.fillColor(NAVY).fontSize(10).text("КОММЕНТАРИЙ",46,y);y+=17;d.fillColor(INK).fontSize(9).text(o.comment,46,y,{width:W-92});y+=d.heightOfString(o.comment,{width:W-92,fontSize:9})+22;}
d.roundedRect(46,y,W-92,70,10).fill("#F1EFE8");d.fillColor(NAVY).fontSize(9).text("ДОКУМЕНТ ПОДТВЕРЖДАЕТ СОСТАВ ПОЛУЧЕННОЙ ЗАЯВКИ",62,y+13);d.fillColor(MUTED).fontSize(8).text("Расчётная стоимость соответствует выбранным позициям. Позиции с пометкой «от» требуют подтверждения окончательного объёма.",62,y+30,{width:W-124});d.fillColor(GOLD).text("Код доступа: "+o.accessCode,62,y+53);
d.fillColor(MUTED).fontSize(7).text("MMW-COMPANY  •  Выписка сформирована автоматически",46,H-30);d.end();});}
module.exports={orderPdf};