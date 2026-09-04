import express from 'express';
import helmet from 'helmet';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import crypto from 'node:crypto';

const __dirname=path.dirname(fileURLToPath(import.meta.url));
const publicDir=path.join(__dirname,'../public');
const dataDir=path.join(__dirname,'../.data');
const dataFile=path.join(dataDir,'orders.json');
fs.mkdirSync(dataDir,{recursive:true});
let orders=[];
try{orders=JSON.parse(fs.readFileSync(dataFile,'utf8'));}catch{}
const save=()=>fs.writeFileSync(dataFile,JSON.stringify(orders,null,2));
const app=express();
app.use(helmet({contentSecurityPolicy:false}));
app.use(express.json({limit:'100kb'}));
app.use(express.static(publicDir));
app.get('/api/health',(q,r)=>r.json({ok:true,app:'MMW-ORDER',database:false,email:false,telegram:false}));
app.get('/api/config',(q,r)=>r.json({app:'MMW-ORDER',telegramBotUsername:''}));
app.get('/api/catalog',(q,r)=>r.sendFile(path.join(publicDir,'catalog.js')));
app.post('/api/orders',(q,r)=>{try{const p=q.body||{};if(!p.customerName?.trim()||!p.phone?.trim()||!p.email?.trim()||!Array.isArray(p.items)||!p.items.length)return r.status(400).json({error:'Заполните имя, телефон, email и добавьте позицию.'});if(!/^\S+@\S+\.\S+$/.test(p.email))return r.status(400).json({error:'Проверьте email.'});const d=new Date(),date=d.toISOString().slice(0,10).replaceAll('-','');const id=`MMW-${date}-${String(orders.length+1).padStart(5,'0')}`;const accessCode=String(Math.floor(10000+Math.random()*90000));const order={id,accessCode,status:'NEW',createdAt:d.toISOString(),customerName:String(p.customerName).trim(),phone:String(p.phone).trim(),email:String(p.email).trim(),company:String(p.company||'').trim(),projectType:String(p.projectType||'').trim(),address:String(p.address||'').trim(),comment:String(p.comment||'').trim(),items:p.items,total:p.items.reduce((s,x)=>s+Number(x.price||0)*Number(x.qty||1),0)};orders.push(order);save();r.status(201).json({order,accessCode,notifications:{}});}catch(e){console.error(e);r.status(500).json({error:'Не удалось создать заявку.'})}});
app.post('/api/order-access',(q,r)=>{const id=String(q.body?.id||'').trim().toUpperCase(),code=String(q.body?.code||'').trim();const o=orders.find(x=>x.id===id&&x.accessCode===code);if(!o)return r.status(404).json({error:'Заявка или код доступа не найдены.'});r.json({order:o})});
app.post('/api/feedback',(q,r)=>{const p=q.body||{};if(!p.name?.trim()||!p.contact?.trim()||!p.message?.trim())return r.status(400).json({error:'Заполните имя, контакт и сообщение.'});r.status(201).json({ok:true,notifications:{}})});
app.get('/api/orders/:id/pdf',(q,r)=>r.status(501).json({error:'PDF-выписка подключается отдельным серверным модулем.'}));
app.use((q,r)=>r.sendFile(path.join(publicDir,'index.html')));
const port=process.env.PORT||3000;
app.listen(port,'0.0.0.0',()=>console.log(`MMW-ORDER listening on ${port}`));
