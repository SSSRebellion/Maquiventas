/**
 * MAQUI VENTAS - Servidor Estático Local Ultra-Optimizado
 * Cero dependencias externas. Ejecución: node server.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0];

    // Rutas amigables principales
    if (reqUrl === '/') {
        reqUrl = '/maqui_ventas_demo.html';
    } else if (reqUrl === '/catalogo' || reqUrl === '/catalogo.html') {
        reqUrl = '/src/catalogo.html';
    } else if (reqUrl === '/admin' || reqUrl === '/admin.html') {
        reqUrl = '/src/admin.html';
    } else if (reqUrl === '/cotizador' || reqUrl === '/cotizador.html') {
        reqUrl = '/src/cotizador.html';
    } else if (reqUrl === '/ayuda' || reqUrl === '/ayuda.html') {
        reqUrl = '/src/ayuda.html';
    } else if (reqUrl === '/index.html') {
        reqUrl = '/src/index.html';
    }

    let safePath = path.normalize(decodeURIComponent(reqUrl)).replace(/^(\.\.[\/\\])+/, '');
    if (safePath.startsWith(path.sep) || safePath.startsWith('/')) {
        safePath = safePath.slice(1);
    }

    let filePath = path.join(__dirname, safePath);

    // Mapeo automático de css/, js/ y assets/ hacia src/ si no existen en la raíz
    if (!fs.existsSync(filePath)) {
        if (safePath.startsWith('assets') || safePath.startsWith('css') || safePath.startsWith('js') || safePath.startsWith('partials')) {
            const srcPath = path.join(__dirname, 'src', safePath);
            if (fs.existsSync(srcPath)) {
                filePath = srcPath;
            }
        }
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found - Recurso no encontrado en Maqui Ventas');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const isHtml = ext === '.html';

        const headers = {
            'Content-Type': contentType,
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'SAMEORIGIN',
            'Cache-Control': isHtml ? 'no-cache, no-store, must-revalidate' : 'public, max-age=86400'
        };

        // Soporte de compresión GZIP para archivos de texto (HTML, CSS, JS, JSON, SVG)
        const acceptEncoding = req.headers['accept-encoding'] || '';
        const compressible = ['.html', '.css', '.js', '.json', '.svg'].includes(ext);

        if (compressible && acceptEncoding.includes('gzip')) {
            headers['Content-Encoding'] = 'gzip';
            res.writeHead(200, headers);
            const raw = fs.createReadStream(filePath);
            raw.pipe(zlib.createGzip()).pipe(res);
        } else {
            headers['Content-Length'] = stats.size;
            res.writeHead(200, headers);
            fs.createReadStream(filePath).pipe(res);
        }
    });
});

server.listen(PORT, () => {
    console.log(`\nServidor Maqui Ventas activo en: http://localhost:${PORT}`);
    console.log(`Modo optimizado con compresión GZIP y cabeceras de caché activas.\n`);
});
