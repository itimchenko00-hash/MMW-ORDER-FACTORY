const fs=require("node:fs"),path=require("node:path");
const imports=require("./media-import-manifest");
const root=path.join(__dirname,"..","public","ASSETS");
async function download(item){
  const dir=path.join(root,item.project,"photos","web-selected");
  const out=path.join(dir,item.file);
  fs.mkdirSync(dir,{recursive:true});
  if(fs.existsSync(out)&&fs.statSync(out).size>1024)return {item,status:"existing"};
  const url=`https://images.pexels.com/photos/${item.id}/pexels-photo-${item.id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;
  const res=await fetch(url,{redirect:"follow"});
  if(!res.ok)throw new Error(`${item.project}/${item.file}: HTTP ${res.status}`);
  const type=(res.headers.get("content-type")||"").toLowerCase();
  if(!type.startsWith("image/"))throw new Error(`${item.project}/${item.file}: unexpected content-type ${type}`);
  const buf=Buffer.from(await res.arrayBuffer());
  if(buf.length<1024)throw new Error(`${item.project}/${item.file}: image payload too small`);
  fs.writeFileSync(out,buf);
  return {item,status:"downloaded",bytes:buf.length};
}
(async()=>{const results=[];for(const item of imports)results.push(await download(item));console.log(JSON.stringify({ok:true,count:results.length,results},null,2));})().catch(err=>{console.error(err);process.exit(1);});
