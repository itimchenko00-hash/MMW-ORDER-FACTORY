const express = require('express');
const originalSend = express.response.send;

function cleanCompanyHtml(body) {
  if (typeof body !== 'string' || !body.includes('</body>')) return body;

  // Remove the old four-stat strip completely. This is intentionally applied
  // to the final HTML response so no earlier transform can reintroduce it.
  body = body.replace(/<div\s+class=["']wrap\s+stats["'][^>]*>[\s\S]*?<\/div>\s*(?=<section\b)/gi, '');
  body = body.replace(/<div\s+class=["']stat["'][^>]*>\s*<b>\s*(?:MODEL|SYSTEM|LAUNCH)\s*<\/b>[\s\S]*?<\/div>/gi, '');

  // Final safety pass for the exact legacy labels, including variants created
  // by the original canonical HTML.
  body = body.replace(/<b>\s*(?:MODEL|SYSTEM|LAUNCH)\s*<\/b>\s*<span>\s*(?:Экономика проекта|Управление и процессы|План запуска)\s*<\/span>/gi, '');

  // ALADIN: the old explanatory sentence and the entire introductory
  // DEVELOPMENT INTELLIGENCE / FLOW block are discarded from the live page.
  body = body.replace(/<div\s+class=["']intro["']\s+id=["']journey["'][^>]*>[\s\S]*?(?=<section\s+id=["']product["'])/gi, '');
  body = body.replace(/Здесь\s+нет\s+параллельных\s+презентационных\s+блоков\.\s*Есть\s+одна\s+цепочка,\s+где\s+каждый\s+этап\s+отвечает\s+на\s+свой\s+вопрос\./gi, '');

  return body;
}

express.response.send = function (body) {
  return originalSend.call(this, cleanCompanyHtml(body));
};
