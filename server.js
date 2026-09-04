const path=require('path');
const ROOT=path.join(__dirname,'ЭТАЛОН-02','MMW-COMPANY','src');
require(path.join(ROOT,'aladin-cleanup-hook.js'));
require(path.join(ROOT,'final-cleanup-hook.js'));
require(path.join(ROOT,'products-cart-hook.js'));
require(path.join(ROOT,'order-catalog-hook.js'));
require(path.join(ROOT,'company-ui-hook.js'));
require(path.join(ROOT,'labels-cleanup-hook.js'));
require(path.join(ROOT,'server.js'));
