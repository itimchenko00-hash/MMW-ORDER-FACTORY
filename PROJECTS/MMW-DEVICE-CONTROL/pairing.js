const crypto = require('crypto');
const sessions = new Map();
function createPairing(){const code=crypto.randomBytes(4).toString('hex').toUpperCase().match(/.{1,4}/g).join('-');const id=crypto.randomUUID();const expiresAt=Date.now()+10*60*1000;sessions.set(code,{id,expiresAt,status:'waiting',permissions:[]});return {code,id,expiresAt};}
function getPairing(code){const item=sessions.get(String(code||'').toUpperCase());if(!item||item.expiresAt<Date.now()){sessions.delete(String(code||'').toUpperCase());return null}return item;}
function approvePairing(code,permissions){const item=getPairing(code);if(!item)return null;item.status='approved';item.permissions=Array.isArray(permissions)?permissions.slice(0,10):[];item.approvedAt=Date.now();return item;}
function revokePairing(code){return sessions.delete(String(code||'').toUpperCase())}
module.exports={createPairing,getPairing,approvePairing,revokePairing};