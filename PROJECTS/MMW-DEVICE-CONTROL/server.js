const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 10000;

app.get('/api/server-info', (_req, res) => res.json({
  serverTime: new Date().toISOString(),
  platform: process.platform,
  node: process.version,
  hostname: os.hostname()
}));

app.get('/', (_req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MMW DEVICE DIAGNOSTIC</title>
<style>
body{font-family:system-ui;margin:0;background:#07110d;color:#eef5f2}
main{max-width:820px;margin:auto;padding:24px}
header,section{background:#0d1c15;border:1px solid #536b5e;border-radius:18px;padding:18px;margin:12px 0}
h1{margin-top:0} .status{font-weight:800}
dt{opacity:.65;margin-top:10px}dd{margin:2px 0;font-size:16px;word-break:break-word}
button{padding:12px 16px;border:0;border-radius:10px;font-weight:800;cursor:pointer}
small{opacity:.7}
</style>
</head>
<body>
<main>
<header><h1>MMW DEVICE DIAGNOSTIC</h1><div class="status">● СКАНИРОВАНИЕ УСТРОЙСТВА</div><small>Собираются только данные, доступные веб-браузеру без специальных системных разрешений.</small></header>
<section><dl id="info"><dd>Получение данных…</dd></dl></section>
<section><h3>Доступность защищённых функций</h3><dl id="permissions"></dl></section>
<button onclick="collect()">Обновить диагностику</button>
</main>
<script>
const esc=v=>String(v??'н/д').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
async function battery(){try{if(navigator.getBattery){const b=await navigator.getBattery();return Math.round(b.level*100)+'%'+(b.charging?' · зарядка':'');}}catch(e){}return 'н/д';}
async function permission(name){try{if(!navigator.permissions)return 'н/д';const p=await navigator.permissions.query({name});return p.state;}catch(e){return 'не поддерживается';}}
async function collect(){
 const n=navigator,s=screen,c=n.connection||{},ua=n.userAgentData||{};
 const b=await battery();
 const d={
 'Платформа':n.platform,
 'Браузер':n.userAgent,
 'Бренд/модель (если раскрывается браузером)':ua.model||'не раскрывается',
 'ОС/бренды (если раскрываются)':ua.platform||'не раскрывается',
 'Язык':n.language,
 'Онлайн':n.onLine?'Да':'Нет',
 'CPU — логические ядра':n.hardwareConcurrency||'н/д',
 'RAM, доступная браузеру':n.deviceMemory?(n.deviceMemory+' GB'):'н/д',
 'Экран':s.width+' × '+s.height,
 'Размер окна':innerWidth+' × '+innerHeight,
 'Плотность пикселей':devicePixelRatio,
 'Ориентация':s.orientation?.type||'н/д',
 'Сенсорный ввод':n.maxTouchPoints||0,
 'Сеть':c.effectiveType||'н/д',
 'Downlink':c.downlink?(c.downlink+' Mbps'):'н/д',
 'Часовой пояс':Intl.DateTimeFormat().resolvedOptions().timeZone,
 'Время устройства':new Date().toString(),
 'Батарея':b,
 'Cookies':n.cookieEnabled?'включены':'отключены',
 'Do Not Track':n.doNotTrack||'н/д'
 };
 document.querySelector('#info').innerHTML=Object.entries(d).map(([k,v])=>'<dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd>').join('');
 const p={Геолокация:await permission('geolocation'),Камера:await permission('camera'),Микрофон:await permission('microphone')};
 document.querySelector('#permissions').innerHTML=Object.entries(p).map(([k,v])=>'<dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd>').join('');
}
collect();
</script>
</body></html>`);
});

app.listen(port, '0.0.0.0', () => console.log(`MMW DEVICE CONTROL listening on ${port}`));
