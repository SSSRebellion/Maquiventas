const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const srcDir = path.join(rootDir, 'src');

console.log('Construyendo maqui_ventas_demo.html unificado, ultra-optimizado y autónomo...');

let html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf-8');
let css = fs.readFileSync(path.join(srcDir, 'css', 'styles.css'), 'utf-8');
// Resolver modularmente cualquier @import url('./xxx.css')
css = css.replace(/@import\s+url\(['"]\.\/([^'"]+)['"]\);/g, (match, fileName) => {
    const filePath = path.join(srcDir, 'css', fileName);
    if (fs.existsSync(filePath)) {
        return `/* === Module: ${fileName} === */\n` + fs.readFileSync(filePath, 'utf-8') + '\n';
    }
    return match;
});
let js = fs.readFileSync(path.join(srcDir, 'js', 'app.js'), 'utf-8');

// Leer imágenes una sola vez y convertirlas a data URIs
const assetFiles = {
    'assets/hero-bg.jpg': path.join(srcDir, 'assets', 'hero-bg.jpg'),
    'assets/tractor-john-deere.jpg': path.join(srcDir, 'assets', 'tractor-john-deere.jpg'),
    'assets/montacargas-toyota.jpg': path.join(srcDir, 'assets', 'montacargas-toyota.jpg'),
    'assets/cargador-komatsu.jpg': path.join(srcDir, 'assets', 'cargador-komatsu.jpg'),
    'assets/rodillo-dynapac.jpg': path.join(srcDir, 'assets', 'rodillo-dynapac.jpg')
};

const base64Map = {};
for (const [relPath, fullPath] of Object.entries(assetFiles)) {
    if (fs.existsSync(fullPath)) {
        const buf = fs.readFileSync(fullPath);
        base64Map[relPath] = `data:image/jpeg;base64,${buf.toString('base64')}`;
    }
}

// Inyectar el diccionario de recursos _ASSETS_DICT una sola vez en el HEAD
const assetDictScript = `
<script>
window._ASSETS_DICT = ${JSON.stringify(base64Map)};
(function() {
    function resolveAsset(val) {
        if (!val || typeof val !== 'string') return val;
        for (var k in window._ASSETS_DICT) {
            if (val.indexOf(k) !== -1) {
                val = val.split(k).join(window._ASSETS_DICT[k]);
            }
        }
        return val;
    }
    window.resolveAsset = resolveAsset;
    
    // Ejecutar resolución inmediata de imágenes en background y DOM
    function applyAssets() {
        document.querySelectorAll('img').forEach(function(img) {
            var src = img.getAttribute('src');
            if (src && window._ASSETS_DICT[src]) {
                img.src = window._ASSETS_DICT[src];
            }
        });
        document.querySelectorAll('[style*="assets/"]').forEach(function(el) {
            var style = el.getAttribute('style');
            if (style) {
                el.setAttribute('style', resolveAsset(style));
            }
        });
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', applyAssets);
    } else {
        applyAssets();
    }
})();
</script>
`;

// Reemplazar referencias en el array inventory de JS al inicializarse
const inventoryResolver = `
(function() {
    if (typeof window !== 'undefined' && window._ASSETS_DICT && typeof inventory !== 'undefined') {
        inventory.forEach(function(item) {
            if (item.image && window._ASSETS_DICT[item.image]) {
                item.image = window._ASSETS_DICT[item.image];
            }
            if (Array.isArray(item.gallery)) {
                item.gallery = item.gallery.map(function(g) {
                    return window._ASSETS_DICT[g] || g;
                });
            }
        });
    }
})();
`;

// Insertar resolución de inventario justo después de la definición de inventory en js
js = js.replace(/(const\s+inventory\s*=\s*\[[\s\S]*?\];)/, `$1\n${inventoryResolver}\n`);

// Inyectar CSS en HTML
html = html.replace(
    /<link\s+rel=["']stylesheet["']\s+href=["']css\/styles\.css["']\s*\/?>/i,
    `<style>\n${css}\n</style>`
);

// Inyectar script de assets en HEAD
html = html.replace(
    /<\/head>/i,
    `${assetDictScript}\n</head>`
);

// Inyectar JS en HTML
html = html.replace(
    /<script\s+src=["']js\/app\.js["']><\/script>/i,
    `<script>\n${js}\n</script>`
);

// Guardar maqui_ventas_demo.html en la raíz
const outPath = path.join(rootDir, 'maqui_ventas_demo.html');
fs.writeFileSync(outPath, html, 'utf-8');

// Preparar carpeta dist/ para despliegues en Vercel, Netlify o cualquier CDN
const distDir = path.join(rootDir, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// 1. Escribir index.html y maqui_ventas_demo.html en dist/
fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf-8');
fs.writeFileSync(path.join(distDir, 'maqui_ventas_demo.html'), html, 'utf-8');

// 2. Copiar páginas modulares a dist/
const pages = ['catalogo.html', 'cotizador.html', 'admin.html', 'ayuda.html'];
pages.forEach(page => {
    const srcPage = path.join(srcDir, page);
    if (fs.existsSync(srcPage)) {
        fs.copyFileSync(srcPage, path.join(distDir, page));
    }
});

// 3. Copiar directorios estáticos de soporte a dist/
function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const item of fs.readdirSync(src)) {
        const sPath = path.join(src, item);
        const dPath = path.join(dest, item);
        if (fs.statSync(sPath).isDirectory()) {
            copyRecursive(sPath, dPath);
        } else {
            fs.copyFileSync(sPath, dPath);
        }
    }
}

copyRecursive(path.join(srcDir, 'css'), path.join(distDir, 'css'));
copyRecursive(path.join(srcDir, 'js'), path.join(distDir, 'js'));
copyRecursive(path.join(srcDir, 'assets'), path.join(distDir, 'assets'));
copyRecursive(path.join(srcDir, 'partials'), path.join(distDir, 'partials'));

const finalSizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
console.log(`✔ Archivo maqui_ventas_demo.html y bundle dist/ generados exitosamente (${finalSizeMB} MB).`);
