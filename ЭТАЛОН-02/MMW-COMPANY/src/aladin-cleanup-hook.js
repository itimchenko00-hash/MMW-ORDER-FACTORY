const fs=require('fs');
const path=require('path');
const originalReadFileSync=fs.readFileSync.bind(fs);
const ALADIN='aladin-presentation-suite.html';
fs.readFileSync=function(file,options){
  const data=originalReadFileSync(file,options);
  const name=typeof file==='string'?path.basename(file):'';
  if(name!==ALADIN || typeof data!=='string') return data;
  return data.replace(/<div class="flow">[\s\S]*?<\/div><div class="grid" style="margin-top:12px">/,'<div class="grid" style="margin-top:12px">');
};
