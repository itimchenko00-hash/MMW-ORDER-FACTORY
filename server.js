const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  const requested = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const file = path.join(root, requested);

  if (!file.startsWith(root) || !fs.existsSync(file)) {
    res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
    return res.end("Not found");
  }

  const ext = path.extname(file);
  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp"
  };

  res.writeHead(200, {"Content-Type": types[ext] || "application/octet-stream"});
  fs.createReadStream(file).pipe(res);
});

const port = process.env.PORT || 10000;
server.listen(port, "0.0.0.0", () => {
  console.log("MMW-COMPANY MASTER clean base listening on " + port);
});
