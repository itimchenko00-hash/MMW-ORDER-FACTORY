// VISUAL MASTER 01: serve the canonical MMW-COMPANY-PUBLIC homepage at the root route.
const fs=require('fs');
const path=require('path');
const express=require('express');
const originalSend=express.response.send;
const HOME=path.join(process.cwd(),'MMW-COMPANY-PUBLIC','index.html');
let html=null;
try{html=fs.readFileSync(HOME,'utf8');}catch(e){console.error('[MMW-VISUAL-MASTER] homepage read failed:',e.message)}
express.response.send=function(body){
  const req=this.req;
  if(html && req && req.method==='GET' && (req.path==='/' || req.path==='/index.html')) return originalSend.call(this,html);
  return originalSend.call(this,body);
};
