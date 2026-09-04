const path=require('path');
const ROOT=path.join(__dirname,'ЭТАЛОН-02','MMW-COMPANY','src');
// ALADIN WORKING is intentionally isolated: no legacy/global hooks are loaded here.
require(path.join(ROOT,'aladin-runtime-hook.js'));
require(path.join(ROOT,'server.js'));
