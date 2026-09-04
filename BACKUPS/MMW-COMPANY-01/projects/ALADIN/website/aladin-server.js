const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 10000);
const file = path.resolve(__dirname, 'aladin-visual-system.html');

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`).pathname;

  if (pathname === '/' || pathname === '/index.html' || pathname === '/aladin' || pathname === '/aladin/') {
    if (!fs.existsSync(file)) {
      res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
      return res.end(`ALADIN file not found: ${file}`);
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    });
    return fs.createReadStream(file).pipe(res);
  }

  res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`ALADIN Factory listening on ${PORT}`);
  console.log(`Serving: ${file}`);
});
