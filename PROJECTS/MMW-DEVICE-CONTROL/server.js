const express = require('express');
const app = express();
const port = process.env.PORT || 10000;

app.get('/', (_req, res) => {
  res.type('html').send(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MMW DEVICE CONTROL</title><style>body{font-family:system-ui;margin:0;background:#0b1110;color:#eef5f2}main{max-width:760px;margin:0 auto;padding:32px 20px}h1{letter-spacing:.04em}section{background:#121c19;border:1px solid #294039;border-radius:18px;padding:20px;margin-top:18px}span{opacity:.7}.status{font-weight:700}</style></head><body><main><h1>MMW DEVICE CONTROL</h1><section><div>Статус панели: <b class="status">ONLINE</b></div><div><span>Агент устройства:</span> ожидает подключения</div></section><section><h2>Устройство</h2><p>После установки разрешённого агента здесь появятся модель, Android, CPU, RAM, накопитель, батарея, сеть и доступные каталоги.</p></section><section><h2>Безопасность</h2><p>Доступ только по авторизации и с явного согласия владельца устройства. Скрытого доступа нет.</p></section></main></body></html>`);
});

app.listen(port, '0.0.0.0', () => console.log(`MMW DEVICE CONTROL listening on ${port}`));
