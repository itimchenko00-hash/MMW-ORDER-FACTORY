const fs=require('fs');
const path=require('path');
const express=require('express');
const ENGINE_FILE=path.join(__dirname,'..','projects','ALADIN','website','aladin-investor-owner-engine.html');
const ALADIN_FILE=path.resolve(path.join(__dirname,'..','projects','ALADIN','website','aladin-presentation-suite.html'));
const originalSendFile=express.response.sendFile;
if(!express.response.__mmwAladinInvestorOwnerPatched){
  express.response.__mmwAladinInvestorOwnerPatched=true;
  express.response.sendFile=function(file,...args){
    if(path.resolve(String(file))===ALADIN_FILE){
      try{
        const engine=fs.readFileSync(ENGINE_FILE,'utf8');
        let html=fs.readFileSync(ALADIN_FILE,'utf8');
        html=html.replace(/<section id="aladin-investor-owner-engine">[\s\S]*?<\/section>/gi,'');
        html=html.replace(/<section id="finance">[\s\S]*?<\/section>/gi,'');
        const marker='id="aladin-investor-owner-engine"';
        if(!html.includes(marker)){
          if(html.includes('</main>')) html=html.replace('</main>',engine+'</main>');
          else if(html.includes('</body>')) html=html.replace('</body>',engine+'</body>');
          else html+=engine;
        }
        this.type('html');
        return this.send(html);
      }catch(e){console.error('[ALADIN-ENGINE]',e.stack||e.message)}
    }
    return originalSendFile.apply(this,[file,...args]);
  };
}
