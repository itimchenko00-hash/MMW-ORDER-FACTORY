// NEXUS WORK — local thematic media for catalog cards.
const fs=require('fs');
const path=require('path');
const target='nexus-work-presentation-suite.html';
const root=path.join(__dirname,'..','..','..');
const mediaDir=path.join(root,'nexus-work-media');
const original=fs.readFileSync.bind(fs);
const extra=String.raw`
<style>
.nx-cat-card{overflow:hidden;padding:0}.nx-cat-card .nx-cat-body{padding:20px;display:flex;flex-direction:column;flex:1}.nx-cat-photo{display:block;width:100%;height:150px;object-fit:cover;border-bottom:1px solid var(--line);background:var(--p2)}.nx-cat-card h3{margin:7px 0}.nx-cat-card .nx-cat-meta{margin-top:auto}
</style>
`;
fs.readFileSync=function(file,encoding,...rest){const out=original(file,encoding,...rest);if(typeof file==='string'&&file.endsWith(target)&&typeof out==='string'&&out.includes('</main>'))return out.replace('</main>',extra+'</main>');return out};
module.exports={mediaDir};
