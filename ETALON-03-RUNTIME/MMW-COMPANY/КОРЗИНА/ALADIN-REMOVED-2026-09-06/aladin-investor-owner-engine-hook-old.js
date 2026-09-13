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
          const originalSendFile=res.sendFile;
          res.sendFile=function(file,...args){
            if(path.resolve(String(file))===path.resolve(path.join(__dirname,'..','projects','ALADIN','website','aladin-presentation-suite.html'))){
              try{
                const engine=fs.readFileSync(ENGINE_FILE,'utf8');
                let html=fs.readFileSync(file,'utf8');
                html=html.replace(/<section id="finance">[\s\S]*?<\/section>/gi,'');
                if(!html.includes('id="aladin-investor-owner-engine"')){
                  if(html.includes('</main>')) html=html.replace('</main>',engine+'</main>');
                  else if(html.includes('</body>')) html=html.replace('</body>',engine+'</body>');
                  else html+=engine;
                }
                res.type('html').send(html);
                return res;
              }catch(e){console.error('[ALADIN-ENGINE]',e.message)}
            }
            return originalSendFile.apply(this,[file,...args]);
          };
          return handler(req,res,next);
        };
      }
    }
    return originalGet.call(this,route,...handlers);
  };
}
