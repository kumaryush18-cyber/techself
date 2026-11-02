import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

function serveFile(res, filePath, contentType) {
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': data.length,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': filePath.endsWith('.html') ? 'no-cache' : 'public, max-age=31536000, immutable',
    });
    res.end(data);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(`Internal Server Error: ${err.message}`);
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // If root, serve index.html
  if (pathname === '/' || pathname === '') {
    return serveFile(res, path.join(__dirname, 'index.html'), MIME_TYPES['.html']);
  }

  // Check if static file exists directly
  const directPath = path.join(__dirname, pathname);
  if (fs.existsSync(directPath) && fs.statSync(directPath).isFile()) {
    const ext = path.extname(directPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    return serveFile(res, directPath, contentType);
  }

  // Support fallback for flag images if requested from /flags/
  if (pathname.startsWith('/flagcdn.com/')) {
    const flagFile = pathname.replace('/flagcdn.com/w20/', '');
    const localFlag = path.join(__dirname, 'flags', flagFile);
    if (fs.existsSync(localFlag) && fs.statSync(localFlag).isFile()) {
      return serveFile(res, localFlag, MIME_TYPES['.png']);
    }
  }

  // SPA fallback: If path has no extension or doesn't exist, serve index.html
  // This allows React Router client-side routing (/shop, /product/1, /checkout, etc.)
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    return serveFile(res, indexPath, MIME_TYPES['.html']);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(`  TechSelf E-Commerce Store preview server running!  `);
  console.log(`  Local URL:   http://localhost:${PORT}`);
  console.log(`  Network URL: http://${HOST}:${PORT}`);
  console.log(`====================================================`);
});
