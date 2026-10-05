#!/usr/bin/env node
const fs=require('node:fs');
const path=require('node:path');
const root=process.env.MMW_WORKSPACE_ROOT||path.join(process.cwd(),'MMW-COMPANY','2 — WORKING');
const checks=[];
const add=(id,ok,msg,blocking=true)=>checks.push({id,ok,msg,blocking});
const exists=p=>fs.existsSync(path.join(root,p));
add('WORKSPACE',exists('README.md'),'MMW-COMPANY/2 — WORKING is present');
add('FACTORY-BINDING',exists('FACTORY/WORKSPACE-CONTROL.md'),'Workspace Factory control is present');
add('APP-SHELL',exists('public/index.html'),'Application shell exists',false);
add('SOURCE',exists('src'),'Source tree exists',false);
const frozen=path.join(process.cwd(),'MMW-COMPANY','1 — FROZEN');
add('FROZEN-PRESERVED',fs.existsSync(frozen),'Frozen workspace remains present');
console.log(JSON.stringify({factory:'MMW FACTORY',status:checks.some(x=>!x.ok&&x.blocking)?'FAIL':'PASS',checks},null,2));
process.exit(checks.some(x=>!x.ok&&x.blocking)?1:0);
