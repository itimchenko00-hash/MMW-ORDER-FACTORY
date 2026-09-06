const express = require('express');
const originalSend = express.response.send;

function cleanCompanyHtml(body) {
  if (typeof body !== 'string' || !body.includes('</body>')) return body;
  body = body.replace(/<div\s+class=["']wrap\s+stats["'][^>]*>[\s\S]*?<\/div>\s*(?=<section\b)/gi, '');
  body = body.replace(/<div\s+class=["']stat["'][^>]*>\s*<b>\s*(?:MODEL|SYSTEM|LAUNCH)\s*<\/b>[\s\S]*?<\/div>/gi, '');
  body = body.replace(/<b>\s*(?:MODEL|SYSTEM|LAUNCH)\s*<\/b>\s*<span>\s*(?:Экономика проекта|Управление и процессы|План запуска)\s*<\/span>/gi, '');
  body = body.replace(/<div\s+class=["']intro["']\s+id=["']journey["'][^>]*>[\s\S]*?(?=<section\s+id=["']product["'])/gi, '');
  body = body.replace(/Здесь\s+нет\s+параллельных\s+презентационных\s+блоков\.\s*Есть\s+одна\s+цепочка,\s+где\s+каждый\s+этап\s+отвечает\s+на\s+свой\s+вопрос\./gi, '');
  return body;
}

express.response.send = function (body) {
  const route = this.req?.path || this.req?.originalUrl || '';
  // This cleanup is intentionally limited to the two routes where it already belongs.
  // Nested routes must never inherit the presentation-layer mutation.
  if (route !== '/' && route !== '/aladin') return originalSend.call(this, body);
  return originalSend.call(this, cleanCompanyHtml(body));
};
