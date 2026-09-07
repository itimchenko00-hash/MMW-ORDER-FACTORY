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

// FACTORY runtime contract: presentation hooks are loaded once, in a fixed
// order, before the canonical Express server registers routes. The hook list
// below is the actual active runtime surface and is intentionally explicit.
const HOOK_ROOT=path.join(__dirname,'ЭТАЛОН-02','MMW-COMPANY','src');
const ACTIVE_HOOKS=[
  'final-cleanup-hook.js',
  'products-cart-hook.js',
  'order-catalog-hook.js',
  'company-ui-hook.js',
  'labels-cleanup-hook.js',
  'unified-process-system-hook.js',
  'language-switcher-hook.js',
  'aladin-investor-owner-engine-hook.js',
  'nexus-work-catalog-photo-hook.js',
  'nexus-work-unified-hook.js',
  'agrohub-catalog-hook.js',
  'energy-catalog-hook.js',
  'nexus-logistics-catalog-hook.js'
];
for(const hook of ACTIVE_HOOKS)require(path.join(HOOK_ROOT,hook));

// Start the canonical server only after the complete, deterministic hook
// chain is installed. No hook is loaded a second time by server.js.
require('./server.js');
