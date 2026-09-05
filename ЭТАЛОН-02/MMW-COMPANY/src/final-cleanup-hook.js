const express = require('express');
const fs = require('fs');
const originalSend = express.response.send;
const originalSendFile = express.response.sendFile;

function cleanCompanyHtml(body) {
  if (typeof body !== 'string' || !body.includes('</body>')) return body;

  // Remove the old four-stat strip completely. This is intentionally applied
  // to the final HTML response so no earlier transform can reintroduce it.
  body = body.replace(/<div\s+class=["']wrap\s+stats["'][^>]*>[\s\S]*?<\/div>\s*(?=<section\b)/gi, '');
  body = body.replace(/<div\s+class=["']stat["'][^>]*>\s*<b>\s*(?:MODEL|SYSTEM|LAUNCH)\s*<\/b>[\s\S]*?<\/div>/gi, '');

  // Final safety pass for the exact legacy labels, including variants created
  // by the original canonical HTML.
  body = body.replace(/<b>\s*(?:MODEL|SYSTEM|LAUNCH)\s*<\/b>\s*<span>\s*(?:Экономика проекта|Управление и процессы|План запуска)\s*<\/span>/gi, '');

  // ALADIN: remove the entire introductory DEVELOPMENT INTELLIGENCE / FLOW
  // block and the duplicated explanatory sentence from the live HTML.
  body = body.replace(/<div\s+class=["']intro["']\s+id=["']journey["'][^>]*>[\s\S]*?(?=<section\s+id=["']product["'])/gi, '');
  body = body.replace(/Здесь\s+нет\s+параллельных\s+презентационных\s+блоков\.\s*Есть\s+одна\s+цепочка,\s+где\s+каждый\s+этап\s+отвечает\s+на\s+свой\s+вопрос\./gi, '');

  return body;
}

express.response.send = function (body) {
  return originalSend.call(this, cleanCompanyHtml(body));
};

// The ALADIN page is served with res.sendFile(), which bypasses res.send().
// Intercept that path so the same final cleanup is guaranteed on the actual
// HTTP response, not only when another middleware uses res.send().
express.response.sendFile = function (filePath, options, callback) {
  const normalized = String(filePath || '').replace(/\\/g, '/');
  if (/projects\/ALADIN\/website\/aladin-presentation-suite\.html$/i.test(normalized)) {
    try {
      const html = fs.readFileSync(filePath, 'utf8');
      return this.send(cleanCompanyHtml(html));
    } catch (err) {
      if (typeof callback === 'function') callback(err);
      else this.status(500).send('ALADIN page read error');
      return this;
    }
  }
  return originalSendFile.call(this, filePath, options, callback);
};
