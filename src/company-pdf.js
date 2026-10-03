const PDFDocument=require("pdfkit"),fs=require("node:fs");
const money=n=>new Intl.NumberFormat("uk-UA",{style:"currency",currency:"UAH",maximumFractionDigits:0}).format(n);
const fonts=["/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf","/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"];
const font=fonts.find(x=>fs.existsSync(x));
function orderPdf(o){
 return new Promise((resolve,reject)=>{const doc=new PDFDocument({size:"A4",margin:48}),chunks=[];doc.on("data",x=>chunks.push(x));doc.on("end",()=>resolve(Buffer.concat(chunks)));doc.on("error",reject);
 if(font)doc.font(font);doc.fillColor("#111").fontSize(22).text("MMW-COMPANY",{align:"center"});doc.moveDown(.3).fontSize(15).text("КВИТАНЦИЯ ПО ЗАЯВКЕ",{align:"center"});doc.moveDown();
 doc.fontSize(10).text("Номер заявки: "+o.id).text("Код доступа: "+o.accessCode).text("Дата: "+new Date(o.createdAt).toLocaleString("uk-UA")).text("Статус: "+o.status);doc.moveDown();
 doc.fontSize(13).text("ЗАКАЗЧИК").fontSize(10).text("Имя: "+o.customerName).text("Телефон: "+o.phone).text("Email: "+o.email);if(o.company)doc.text("Компания: "+o.company);if(o.projectType)doc.text("Проект: "+o.projectType);if(o.address)doc.text("Адрес: "+o.address);doc.moveDown();
 doc.fontSize(13).text("СОСТАВ ЗАЯВКИ").moveDown(.3).fontSize(10);o.items.forEach(i=>doc.text(i.name+" — "+i.qty+" × "+money(i.price)+" = "+money(i.price*i.qty)));doc.moveDown().fontSize(15).text("ИТОГО: "+money(o.total));
 if(o.comment){doc.moveDown();doc.fontSize(12).text("КОММЕНТАРИЙ").fontSize(10).text(o.comment)}doc.moveDown(2).fontSize(8).fillColor("#666").text("Документ сформирован автоматически. Указанная сумма является расчётной стоимостью выбранных позиций; позиции с пометкой «от» требуют подтверждения окончательного объёма.");
 doc.end();});
}
module.exports={orderPdf};
