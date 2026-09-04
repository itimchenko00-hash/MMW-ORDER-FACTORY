const express=require('express');
const fs=require('fs');
const originalSendFile=express.response.sendFile;
express.response.sendFile=function(filePath,options,callback){
  if(typeof filePath==='string'&&filePath.includes('aladin-presentation-suite.html')){
    fs.readFile(filePath,'utf8',(err,body)=>{
      if(err){if(typeof callback==='function')return callback(err);return this.status(500).send('ALADIN file error')}
      this.type('html');
      return this.send(body);
    });
    return this;
  }
  return originalSendFile.call(this,filePath,options,callback);
};
