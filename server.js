const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url'); // ← 追加

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url); // ← ここでパース
  let pathname = parsedUrl.pathname;    // ← クエリを除いたパスだけ取得

  // パスを解釈（/ の場合は index.html に）
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // フォルダっぽかったら index.html を補う
  if (path.extname(filePath) === '') {
    filePath = path.join(filePath, 'index.html');
  }

  // 拡張子から Content-Type を決定
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // ファイルを読み込んで返す
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

const port = 10000;
server.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動しました`);
});
