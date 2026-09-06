const fs=require('fs');
const path=require('path');
const express=require('express');
const ENGINE_FILE=path.join(__dirname,'..','projects','ALADIN','website','aladin-investor-owner-engine.html');
const originalGet=express.application.get;
if(!express.application.__mmwAladinInvestorOwnerPatched){
  express.application.__mmwAladinInvestorOwnerPatched=true;
  express.application.get=function(route,...handlers){
    if(route==='/aladin' && handlers.length){
      const last=handlers.length-1;
      const handler=handlers[last];
      if(typeof handler==='function'){
        handlers[last]=function(req,res,next){
          const originalSend=res.send;
          res.send=function(body){
            try{
              const engine=fs.readFileSync(ENGINE_FILE,'utf8');
              let html=Buffer.isBuffer(body)?body.toString('utf8'):String(body??'');
              html=html.replace(/<section id="finance">[\s\S]*?<\/section>/gi,'');
              if(!html.includes('id="aladin-investor-owner-engine"')){
                const marker='</main>';
                if(html.includes(marker)) html=html.replace(marker,engine+marker);
                else if(html.includes('</body>')) html=html.replace('</body>',engine+'</body>');
              }
              body=html;
            }catch(e){console.error('[ALADIN-ENGINE]',e.message)}
            return originalSend.call(this,body);
          };
          return handler(req,res,next);
        };
      }
    }
    return originalGet.call(this,route,...handlers);
  };
}
