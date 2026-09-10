// FACTORY: serve the permanent ASSETS library before the canonical server starts.
const express=require('express');
const path=require('path');
const originalUse=express.application.use;
let injected=false;
express.application.use=function(...args){
  if(!injected){
    injected=true;
    originalUse.call(this,'/assets',express.static(path.join(process.cwd(),'ASSETS')));
  }
  return originalUse.apply(this,args);
};

// Install the canonical Visual Master 01 homepage response hook BEFORE
// the legacy canonical server registers its routes. The previous order
// loaded the hook after server startup, so the old homepage remained active.
require('./MMW-COMPANY-PUBLIC/visual-master-home-hook.js');
require('./server.js');
