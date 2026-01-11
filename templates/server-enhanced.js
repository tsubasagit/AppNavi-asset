// 拡張版Node.js HTTPサーバー（APIルーティング対応）
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8080;
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.csv': 'text/csv'
};

// APIルーティング
const API_ROUTES = {
  '/api/templates/:templateId/schema.json': require('./api/templates/[templateId]/schema.json.js'),
  '/api/templates/:templateId/views.json': require('./api/templates/[templateId]/views.json.js'),
  '/api/templates/:templateId/sample-data.json': require('./api/templates/[templateId]/sample-data.json.js'),
  '/api/templates/:templateId/spreadsheet': require('./api/templates/[templateId]/spreadsheet.js'),
  '/api/templates/:templateId/apply.json': require('./api/templates/[templateId]/apply.json.js')
};

function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function handleAPIRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // APIルートをチェック
  for (const [route, handler] of Object.entries(API_ROUTES)) {
    const routePattern = route.replace(/:(\w+)/g, '([^/]+)');
    const regex = new RegExp(`^${routePattern}$`);
    const match = pathname.match(regex);
    
    if (match) {
      // パラメータを抽出
      const paramNames = route.match(/:(\w+)/g)?.map(m => m.slice(1)) || [];
      const params = {};
      paramNames.forEach((name, index) => {
        params[name] = match[index + 1];
      });
      
      // リクエストオブジェクトにパラメータを追加
      req.params = params;
      req.query = parsedUrl.query;
      
      // ハンドラーを実行
      try {
        handler(req, res);
      } catch (error) {
        console.error('API handler error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
      return true;
    }
  }
  
  return false;
}

const server = http.createServer((req, res) => {
  setCORSHeaders(res);
  
  // OPTIONSリクエストの処理
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // APIリクエストの処理
  if (handleAPIRequest(req, res)) {
    return;
  }
  
  // 静的ファイルの処理
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  
  // ディレクトリトラバーサル対策
  filePath = path.normalize(filePath);
  if (!filePath.startsWith('.' + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/html' });
    res.end('<h1>403 - Forbidden</h1>', 'utf-8');
    return;
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Enhanced server running at http://localhost:${PORT}/`);
  console.log('API endpoints available:');
  console.log('  GET /api/templates/:templateId/schema.json');
  console.log('  GET /api/templates/:templateId/views.json');
  console.log('  GET /api/templates/:templateId/sample-data.json');
  console.log('  GET /api/templates/:templateId/spreadsheet');
  console.log('  GET /api/templates/:templateId/apply.json');
  console.log('Press Ctrl+C to stop the server');
});
