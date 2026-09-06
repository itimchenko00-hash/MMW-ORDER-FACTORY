const fs=require('fs');
const path=require('path');
const expressResponse=require('express/lib/response');
const ENGINE_FILE=path.join(__dirname,'..','projects','ALADIN','website','aladin-investor-owner-engine.html');
const originalSend=expressResponse.send;
expressResponse.send=function(body){
  try{
    if(this.req&&this.req.path==='/aladin'&&typeof body==='string'){
      const engine=fs.readFileSync(ENGINE_FILE,'utf8');
      body=body.replace(/<section id="finance">[\s\S]*?<\/section>/gi,'');
      const marker='</main>';
      if(body.includes(marker)) body=body.replace(marker,engine+marker);
      else body=body.replace('</body>',engine+'</body>');
    }
  }catch(e){console.error('[ALADIN-ENGINE]',e.message)}
  return originalSend.call(this,body);
};
