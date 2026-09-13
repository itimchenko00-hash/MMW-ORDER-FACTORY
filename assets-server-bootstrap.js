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

// Canonical presentation layers. Loaded before the server registers routes
// so the final HTML response can be normalized without changing project sources.
require('./MMW-COMPANY-PUBLIC/visual-master-home-hook.js');
require('./mmw-company-project-shell-hook.js');
require('./server.js');
