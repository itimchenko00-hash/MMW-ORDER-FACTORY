const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();
const PORT=process.env.PORT||10000;
const site=path.join(__dirname,'03-PAGES','site.html');
app.get('*',(req,res)=>{
  if(req.path==='/health') return res.type('text/plain').send('ok');
  if(fs.existsSync(site)) return res.sendFile(site);
  res.status(404).send('Site not found');
});
app.listen(PORT,'0.0.0.0',()=>console.log(`CHISTIY DOM listening on ${PORT}`));
