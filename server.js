const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE = __dirname;

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jsx': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

http.createServer((req, res) => {
  let filePath = path.join(BASE, req.url === '/' ? '/InfluenceMatch.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();
  const type = mime[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
