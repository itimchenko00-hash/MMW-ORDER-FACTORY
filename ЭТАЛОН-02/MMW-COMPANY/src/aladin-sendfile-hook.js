const express=require('express');
const fs=require('fs');
const path=require('path');
const originalSendFile=express.response.sendFile;
express.response.sendFile=function(filePath,options,callback){
  if(typeof filePath==='string'&&filePath.includes('aladin-presentation-suite.html')){
    const working=path.join(path.dirname(filePath),'aladin-working-v2.html');
    fs.readFile(working,'utf8',(err,body)=>{
      if(err){if(typeof callback==='function')return callback(err);return this.status(500).send('ALADIN working page error')}
      this.type('html');
      return this.send(body);
    });
    return this;
  }
  return originalSendFile.call(this,filePath,options,callback);
};