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

// Start the canonical server first; then attach the controlled MMW-COMPANY
// presentation transform to Express responses. This keeps startup deterministic.
require('./server.js');
require('./ЭТАЛОН-02/MMW-COMPANY/src/company-ui-hook.js');
