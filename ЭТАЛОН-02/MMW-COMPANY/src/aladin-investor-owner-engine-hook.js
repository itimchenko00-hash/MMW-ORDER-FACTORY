const fs=require('fs');
const path=require('path');
const expressResponse=require('express/lib/response');
const ENGINE_FILE=path.join(__dirname,'..','projects','ALADIN','website','aladin-investor-owner-engine.html');
const originalSend=expressResponse.send;
expressResponse.send=function(body){
  try{
    const req=this.req;
    const route=String(req?.originalUrl||req?.url||req?.path||'').split('?')[0].replace(/\/$/,'');
    if(route==='/aladin'){
      const engine=fs.readFileSync(ENGINE_FILE,'utf8');
      let html=Buffer.isBuffer(body)?body.toString('utf8'):String(body??'');
      html=html.replace(/<section id="finance">[\s\S]*?<\/section>/gi,'');
      if(html.includes('id="aladin-investor-owner-engine"')) return originalSend.call(this,html);
      const marker='</main>';
      if(html.includes(marker)) html=html.replace(marker,engine+marker);
      else if(html.includes('</body>')) html=html.replace('</body>',engine+'</body>');
      body=html;
    }
  }catch(e){console.error('[ALADIN-ENGINE]',e.message)}
  return originalSend.call(this,body);
};
