// MMW-COMPANY VISUAL MASTER 01
// Intentionally pass-through: the homepage is now a single canonical source.
// No runtime HTML/CSS injection, no secondary layers, no legacy augmentation.
const express=require('express');
const originalSend=express.response.send;
express.response.send=function(body){
  return originalSend.call(this,body);
};
