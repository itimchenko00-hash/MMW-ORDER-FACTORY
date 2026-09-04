const express=require('express');
const originalSend=express.response.send;

const swaps={
  '35018313':'6547200','31895796':'7745939','6890403':'13549900','33838523':'5439499',
  '25857391':'7031212','7028105':'6510429','31057548':'5998041',
  '38791657':'17861664','5223143':'37030520','37692742':'32578112','23880098':'6035312',
  '30278097':'8134802','19916702':'6032398','11018249':'7045361','6588594':'8135490'
};

function improve(body,req){
  if(typeof body!=='string'||!body.includes('</body>'))return body;
  if(!req||!/^\/aladin(?:\/|$)/.test(req.path||''))return body;
  for(const[a,b]of Object.entries(swaps))body=body.split(`photos/${a}/pexels-photo-${a}.jpeg`).join(`photos/${b}/pexels-photo-${b}.jpeg`);
  return body;
}

express.response.send=function(body){return originalSend.call(this,improve(body,this.req))};
