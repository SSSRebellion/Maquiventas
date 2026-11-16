/**
 * MAQUI VENTAS - Frontend Application Logic (Enhanced with Cart, Payment Gateway & Order History)
 * Sistema de Gestión y Comercialización de Maquinaria Pesada
 */

// --- 1. DIBUJOS TÉCNICOS VECTORIALES (SVG) COHERENTES Y EXACTOS ---
function generateMachinerySvg(type, variant = 1) {
    let svgBody = '';

    if (type === 'excavator') {
        svgBody = `
            <defs>
                <linearGradient id="catYel" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#facc15"/><stop offset="100%" stop-color="#d97706"/></linearGradient>
                <linearGradient id="earthGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#78350f"/><stop offset="100%" stop-color="#451a03"/></linearGradient>
            </defs>
            <rect width="600" height="340" fill="#0f172a"/>
            <polygon points="0,270 140,265 280,275 420,260 600,270 600,340 0,340" fill="url(#earthGrad)"/>
            <rect x="130" y="235" width="230" height="42" rx="20" fill="#090d16" stroke="#475569" stroke-width="4"/>
            <circle cx="160" cy="256" r="14" fill="#334155" stroke="#facc15" stroke-width="2"/>
            <circle cx="205" cy="256" r="14" fill="#334155" stroke="#facc15" stroke-width="2"/>
            <circle cx="250" cy="256" r="14" fill="#334155" stroke="#facc15" stroke-width="2"/>
            <circle cx="295" cy="256" r="14" fill="#334155" stroke="#facc15" stroke-width="2"/>
            <circle cx="335" cy="256" r="14" fill="#334155" stroke="#facc15" stroke-width="2"/>
            <path d="M 150,235 L 150,180 Q 150,165 180,165 L 290,165 L 320,195 L 320,235 Z" fill="url(#catYel)"/>
            <path d="M 140,235 L 140,190 Q 140,175 170,175 L 170,235 Z" fill="#1e293b"/>
            <path d="M 260,170 L 305,170 L 315,210 L 260,210 Z" fill="#38bdf8" opacity="0.85" stroke="#0f172a" stroke-width="3"/>
            <path d="M 280,205 L 385,95 L 415,110 L 305,225 Z" fill="url(#catYel)" stroke="#0f172a" stroke-width="2"/>
            <path d="M 395,100 L 485,160 L 475,175 L 385,110 Z" fill="url(#catYel)" stroke="#0f172a" stroke-width="2"/>
            <line x1="260" y1="195" x2="355" y2="125" stroke="#e2e8f0" stroke-width="7" stroke-linecap="round"/>
            <path d="M 485,165 Q 525,190 505,230 L 465,210 Z" fill="#334155" stroke="#0f172a" stroke-width="2"/>
            <polygon points="505,230 520,238 510,226" fill="#facc15"/>
            <polygon points="498,234 512,242 504,230" fill="#facc15"/>
            <rect x="185" y="200" width="65" height="18" rx="3" fill="#0f172a"/>
            <text x="217" y="213" fill="#facc15" font-family="sans-serif" font-weight="900" font-size="11" text-anchor="middle">CAT 320D</text>
            <text x="500" y="40" fill="#f59e0b" font-family="'Barlow Condensed', sans-serif" font-size="28" font-weight="800">EXCAVADORA HIDRÁULICA</text>
        `;
    } else if (type === 'tractor') {
        svgBody = `
            <defs>
                <linearGradient id="jdGr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#22c55e"/><stop offset="100%" stop-color="#15803d"/></linearGradient>
                <linearGradient id="jdYel" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="#eab308"/></linearGradient>
            </defs>
            <rect width="600" height="340" fill="#09141f"/>
            <polygon points="0,270 600,260 600,340 0,340" fill="#3f2e18"/>
            <line x1="0" y1="295" x2="600" y2="285" stroke="#5c4423" stroke-width="4"/>
            <line x1="0" y1="320" x2="600" y2="310" stroke="#5c4423" stroke-width="4"/>
            <path d="M 230,230 L 230,155 L 290,155 L 430,195 L 430,250 L 230,250 Z" fill="url(#jdGr)" stroke="#052e16" stroke-width="3"/>
            <path d="M 200,210 L 210,110 L 295,110 L 290,210 Z" fill="#38bdf8" opacity="0.85" stroke="#15803d" stroke-width="4"/>
            <path d="M 195,110 L 305,110 L 300,95 L 195,98 Z" fill="url(#jdYel)"/>
            <rect x="298" y="80" width="7" height="85" fill="#94a3b8" rx="2" stroke="#334155" stroke-width="1.5"/>
            <circle cx="395" cy="260" r="38" fill="#18181b" stroke="#334155" stroke-width="6"/>
            <circle cx="395" cy="260" r="22" fill="url(#jdYel)" stroke="#854d0e" stroke-width="3"/>
            <circle cx="210" cy="245" r="62" fill="#18181b" stroke="#334155" stroke-width="8"/>
            <circle cx="210" cy="245" r="38" fill="url(#jdYel)" stroke="#854d0e" stroke-width="4"/>
            <circle cx="210" cy="245" r="14" fill="#15803d"/>
            <rect x="330" y="205" width="80" height="18" rx="3" fill="#14532d"/>
            <text x="370" y="218" fill="#fef08a" font-family="sans-serif" font-weight="900" font-size="10" text-anchor="middle">JOHN DEERE 8R</text>
            <text x="500" y="40" fill="#4ade80" font-family="'Barlow Condensed', sans-serif" font-size="28" font-weight="800">TRACTOR AGRÍCOLA</text>
        `;
    } else if (type === 'forklift') {
        svgBody = `
            <defs>
                <linearGradient id="toyOr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fb923c"/><stop offset="100%" stop-color="#ea580c"/></linearGradient>
            </defs>
            <rect width="600" height="340" fill="#0f172a"/>
            <rect x="0" y="270" width="600" height="70" fill="#334155"/>
            <line x1="0" y1="275" x2="600" y2="275" stroke="#f59e0b" stroke-width="4" stroke-dasharray="25,15"/>
            <rect x="390" y="75" width="16" height="200" fill="#475569" stroke="#0f172a" stroke-width="2"/>
            <rect x="415" y="75" width="16" height="200" fill="#475569" stroke="#0f172a" stroke-width="2"/>
            <path d="M 400,230 L 400,255 L 530,255 L 530,248 L 415,248 L 415,230 Z" fill="#94a3b8" stroke="#1e293b" stroke-width="2"/>
            <rect x="430" y="234" width="90" height="12" fill="#d97706" rx="2" stroke="#78350f" stroke-width="1.5"/>
            <rect x="440" y="185" width="40" height="48" fill="#ca8a04" stroke="#854d0e" stroke-width="2"/>
            <rect x="485" y="195" width="35" height="38" fill="#a16207" stroke="#713f12" stroke-width="2"/>
            <path d="M 180,255 L 180,195 Q 180,170 230,170 L 320,170 L 390,220 L 390,255 Z" fill="url(#toyOr)" stroke="#9a3412" stroke-width="3"/>
            <path d="M 230,170 L 250,85 L 345,85 L 375,170" fill="none" stroke="#1e293b" stroke-width="7" stroke-linecap="round"/>
            <rect x="260" y="140" width="30" height="30" rx="6" fill="#0f172a"/>
            <circle cx="215" cy="260" r="28" fill="#09090b" stroke="#52525b" stroke-width="6"/>
            <circle cx="215" cy="260" r="14" fill="#cbd5e1"/>
            <circle cx="360" cy="260" r="28" fill="#09090b" stroke="#52525b" stroke-width="6"/>
            <circle cx="360" cy="260" r="14" fill="#cbd5e1"/>
            <rect x="220" y="205" width="75" height="18" rx="3" fill="#0f172a"/>
            <text x="257" y="218" fill="#ea580c" font-family="sans-serif" font-weight="900" font-size="10" text-anchor="middle">TOYOTA 2.5T</text>
            <text x="500" y="40" fill="#fb923c" font-family="'Barlow Condensed', sans-serif" font-size="28" font-weight="800">MONTACARGAS DE CARGA</text>
        `;
    } else if (type === 'loader') {
        svgBody = `
            <defs>
                <linearGradient id="komYel" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#facc15"/><stop offset="100%" stop-color="#ca8a04"/></linearGradient>
            </defs>
            <rect width="600" height="340" fill="#0b1320"/>
            <polygon points="0,280 600,275 600,340 0,340" fill="#451a03"/>
            <path d="M 150,240 L 150,175 Q 160,155 210,155 L 320,155 L 370,210 L 370,255 L 150,255 Z" fill="url(#komYel)" stroke="#854d0e" stroke-width="3"/>
            <path d="M 235,155 L 245,95 L 325,95 L 340,155 Z" fill="#38bdf8" opacity="0.85" stroke="#1e293b" stroke-width="4"/>
            <path d="M 330,205 L 435,165 L 480,230 L 460,240 L 330,225 Z" fill="url(#komYel)" stroke="#0f172a" stroke-width="2"/>
            <line x1="330" y1="200" x2="420" y2="150" stroke="#cbd5e1" stroke-width="7" stroke-linecap="round"/>
            <path d="M 470,215 L 530,215 L 560,270 L 485,270 Z" fill="#475569" stroke="#0f172a" stroke-width="3"/>
            <polygon points="560,270 575,275 558,265" fill="#facc15"/>
            <polygon points="555,270 568,275 552,265" fill="#facc15"/>
            <circle cx="215" cy="255" r="52" fill="#18181b" stroke="#3f3f46" stroke-width="10"/>
            <circle cx="215" cy="255" r="28" fill="url(#komYel)" stroke="#713f12" stroke-width="4"/>
            <circle cx="375" cy="255" r="52" fill="#18181b" stroke="#3f3f46" stroke-width="10"/>
            <circle cx="375" cy="255" r="28" fill="url(#komYel)" stroke="#713f12" stroke-width="4"/>
            <rect x="165" y="190" width="75" height="18" rx="3" fill="#0f172a"/>
            <text x="202" y="203" fill="#facc15" font-family="sans-serif" font-weight="900" font-size="10" text-anchor="middle">KOMATSU WA</text>
            <text x="500" y="40" fill="#facc15" font-family="'Barlow Condensed', sans-serif" font-size="28" font-weight="800">CARGADOR FRONTAL</text>
        `;
    } else {
        svgBody = `
            <defs>
                <linearGradient id="dynYel" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#b45309"/></linearGradient>
                <linearGradient id="drumSt" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#94a3b8"/><stop offset="50%" stop-color="#cbd5e1"/><stop offset="100%" stop-color="#64748b"/></linearGradient>
            </defs>
            <rect width="600" height="340" fill="#0f172a"/>
            <rect x="0" y="275" width="600" height="65" fill="#18181b"/>
            <line x1="0" y1="310" x2="600" y2="310" stroke="#f59e0b" stroke-width="5" stroke-dasharray="30,20"/>
            <path d="M 160,255 L 160,185 Q 160,165 200,165 L 340,165 L 370,230 L 370,255 Z" fill="url(#dynYel)" stroke="#78350f" stroke-width="3"/>
            <path d="M 210,165 L 225,90 L 310,90 L 325,165" fill="none" stroke="#0f172a" stroke-width="6"/>
            <rect x="365" y="205" width="45" height="75" rx="8" fill="url(#drumSt)" stroke="#334155" stroke-width="4"/>
            <line x1="387" y1="205" x2="387" y2="280" stroke="#475569" stroke-width="2"/>
            <line x1="335" y1="240" x2="387" y2="242" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
            <circle cx="215" cy="255" r="48" fill="#09090b" stroke="#3f3f46" stroke-width="9"/>
            <circle cx="215" cy="255" r="24" fill="url(#dynYel)" stroke="#78350f" stroke-width="3"/>
            <rect x="175" y="195" width="75" height="18" rx="3" fill="#0f172a"/>
            <text x="212" y="208" fill="#f59e0b" font-family="sans-serif" font-weight="900" font-size="10" text-anchor="middle">DYNAPAC CA</text>
            <text x="500" y="40" fill="#f59e0b" font-family="'Barlow Condensed', sans-serif" font-size="28" font-weight="800">RODILLO COMPACTADOR</text>
        `;
    }

    const fullSvg = `<svg viewBox="0 0 600 340" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">${svgBody}</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fullSvg)}`;
}

// --- 2. BASE DE DATOS Y ESTADO DE LA APLICACIÓN ---
let currentUser = null;
let currentCategoryFilter = 'all';
let currentSortCriteria = 'featured';
let currentSlideIndex = 0;
let slideInterval = null;

// Carrito de compras y estado financiero
let cart = [];
let activePaymentMethod = 'card';

// Historial previo de compras del usuario (CU-05 & Trazabilidad de órdenes)
const orderHistory = [
    {
        orderId: 'ORD-2026-8812',
        invoiceNumber: 'FAC-2026-38190',
        date: '10 de Noviembre, 2026 - 14:20',
        customerName: 'Cliente Principal',
        customerEmail: 'cliente@maqui.com',
        paymentMethod: 'Tarjeta de Crédito Corporativa (Visa **** 4812)',
        authCode: 'AUTH-948120',
        items: [
            { id: 3, name: 'Montacargas Toyota 8FGU25 (2.5 Ton)', price: 25000, qty: 1 }
        ],
        subtotal: 25000,
        discount: 0,
        total: 25000,
        status: 'Aprobado y Despachado'
    }
];

// Base de datos en memoria para Usuarios (CU-01 y CU-02)
const users = [
    { name: 'Cliente Principal', email: 'cliente@maqui.com', pass: '1234', role: 'client' },
    { name: 'Administrador Demo', email: 'admin@maqui.com', pass: 'admin', role: 'admin' }
];

// Inventario con fotografías provistas por el usuario
const inventory = [
    { 
        id: 1, 
        name: 'Excavadora Caterpillar 320D / XCMG XE225U', 
        price: 150000, 
        stock: 5,
        category: 'Movimiento de Tierras',
        specs: '173 HP · Peso 22.5 Ton · Cazo 1.2 m³',
        details: {
            brand: 'XCMG / Caterpillar Navitrans',
            year: 2024,
            engineHours: '120 hrs',
            power: '173 HP (129 kW) Turbo Diesel Tier 3',
            operatingWeight: '22,500 kg',
            transmission: 'Hidráulica de alta presión',
            warranty: '24 Meses con Respaldo Navitrans Oficial'
        },
        imageType: 'excavator',
        image: 'assets/hero-bg.jpg',
        gallery: [
            'assets/hero-bg.jpg',
            'assets/cargador-komatsu.jpg'
        ],
        placeholderIcon: ''
    },
    { 
        id: 2, 
        name: 'Tractor John Deere 8R / H165', 
        price: 85000, 
        stock: 3,
        category: 'Agrícola',
        specs: '370 HP · Tracción 4x4 · Pala Cargadora H165',
        details: {
            brand: 'John Deere Oficial',
            year: 2023,
            engineHours: '340 hrs',
            power: '370 HP Motor PowerTech™ 9.0 L',
            operatingWeight: '14,200 kg',
            transmission: 'e23™ PowerShift con Efficiency Manager',
            warranty: '18 Meses Certificada Oficial'
        },
        imageType: 'tractor',
        image: 'assets/tractor-john-deere.jpg',
        gallery: [
            'assets/tractor-john-deere.jpg',
            'assets/hero-bg.jpg'
        ],
        placeholderIcon: ''
    },
    { 
        id: 3, 
        name: 'Montacargas Toyota 8FGU25 (2.5 Ton)', 
        price: 25000, 
        stock: 10,
        category: 'Carga y Logística',
        specs: 'Capacidad 2.5 Ton · Mástil Triplex 4.8m · GLP',
        details: {
            brand: 'Toyota Material Handling',
            year: 2024,
            engineHours: '15 hrs (Nueva en Bodega)',
            power: '58 HP Motor Toyota 4Y-ECS',
            operatingWeight: '3,850 kg',
            transmission: 'Automática Powershift SAS',
            warranty: '36 Meses Sistema de Estabilidad Activa'
        },
        imageType: 'forklift',
        image: 'assets/montacargas-toyota.jpg',
        gallery: [
            'assets/montacargas-toyota.jpg',
            'assets/cargador-komatsu.jpg'
        ],
        placeholderIcon: ''
    },
    { 
        id: 4, 
        name: 'Cargador Frontal Komatsu WA380', 
        price: 135000, 
        stock: 4,
        category: 'Movimiento de Tierras',
        specs: '191 HP · Balde 3.4 m³ · Transmisión Hidráulica',
        details: {
            brand: 'Komatsu Earthmoving',
            year: 2023,
            engineHours: '480 hrs',
            power: '191 HP (142 kW) SAA6D107E-3',
            operatingWeight: '18,300 kg',
            transmission: 'Hidrostática Inteligente 4 Velocidades',
            warranty: '12 Meses o 1,500 Horas'
        },
        imageType: 'loader',
        image: 'assets/cargador-komatsu.jpg',
        gallery: [
            'assets/cargador-komatsu.jpg',
            'assets/hero-bg.jpg'
        ],
        placeholderIcon: ''
    },
    { 
        id: 5, 
        name: 'Rodillo Compactador Dynapac CA250', 
        price: 92000, 
        stock: 2,
        category: 'Pavimentación',
        specs: '130 HP · Tambor 2.13m · Frecuencia Dual',
        details: {
            brand: 'Dynapac Road Equipment',
            year: 2022,
            engineHours: '620 hrs',
            power: '130 HP Cummins QSB4.5 Turbo',
            operatingWeight: '12,400 kg',
            transmission: 'Hidrostática de alta tracción',
            warranty: '12 Meses Certificada'
        },
        imageType: 'roller',
        image: 'assets/rodillo-dynapac.jpg',
        gallery: [
            'assets/rodillo-dynapac.jpg',
            'assets/cargador-komatsu.jpg'
        ],
        placeholderIcon: ''
    }
];

let confirmModalCallback = null;

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(amount);
}

// --- 3. HERO SLIDER INTERACTIVO (E-COMMERCE) ---
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides || slides.length === 0) return;

    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        nextHeroSlide();
    }, 6000);
}

function showHeroSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    if (slides.length === 0) return;

    if (index >= slides.length) currentSlideIndex = 0;
    else if (index < 0) currentSlideIndex = slides.length - 1;
    else currentSlideIndex = index;

    slides.forEach((s, idx) => {
        if (idx === currentSlideIndex) s.classList.add('active');
        else s.classList.remove('active');
    });

    dots.forEach((d, idx) => {
        if (idx === currentSlideIndex) d.classList.add('active');
        else d.classList.remove('active');
    });
}

function nextHeroSlide() {
    showHeroSlide(currentSlideIndex + 1);
}

function prevHeroSlide() {
    showHeroSlide(currentSlideIndex - 1);
}

function startFlashCountdown() {
    let secondsLeft = 7 * 3600 + 42 * 60 + 15;
    const timerEl = document.getElementById('flash-timer');
    if (!timerEl) return;

    setInterval(() => {
        if (secondsLeft <= 0) secondsLeft = 8 * 3600;
        secondsLeft--;

        const h = Math.floor(secondsLeft / 3600).toString().padStart(2, '0');
        const m = Math.floor((secondsLeft % 3600) / 60).toString().padStart(2, '0');
        const s = (secondsLeft % 60).toString().padStart(2, '0');

        timerEl.textContent = `${h}h : ${m}m : ${s}s`;
    }, 1000);
}

function scrollToCatalog() {
    const cat = document.getElementById('client-section');
    if (cat) {
        cat.classList.remove('hidden');
        renderCatalog();
        if (typeof cat.scrollIntoView === 'function') {
            cat.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function selectCategoryFromHome(catName) {
    const catSection = document.getElementById('client-section');
    if (catSection) {
        catSection.classList.remove('hidden');
    }
    filterByCategory(catName);
    if (catSection && typeof catSection.scrollIntoView === 'function') {
        catSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- 4. SISTEMA DE TOASTS Y MODALES ---
function showToast(message, type = 'info', title = '') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let label = 'INFO';
    let defaultTitle = 'Información';
    if (type === 'success') { label = 'OK'; defaultTitle = 'Operación Exitosa'; }
    if (type === 'error') { label = 'ERROR'; defaultTitle = 'Error en la Solicitud'; }
    if (type === 'warning') { label = 'AVISO'; defaultTitle = 'Advertencia'; }

    toast.innerHTML = `
        <div class="toast-icon" style="font-family: var(--font-heading); font-size: 0.75rem; font-weight: 800; background: var(--cat-black); color: var(--cat-yellow); padding: 3px 6px; border-radius: 2px; text-transform: uppercase;">${label}</div>
        <div class="toast-content">
            <div class="toast-title">${title || defaultTitle}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(50px)';
            setTimeout(() => toast.remove(), 250);
        }
    }, 4000);
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
}

function showConfirmDialog({ title, message, onConfirm }) {
    document.getElementById('confirm-modal-title').textContent = title || '¿Estás seguro?';
    document.getElementById('confirm-modal-msg').textContent = message || 'Esta acción no se puede deshacer.';
    confirmModalCallback = onConfirm;
    openModal('confirm-modal');
}

function closeConfirmModal(accepted) {
    closeModal('confirm-modal');
    if (accepted && typeof confirmModalCallback === 'function') {
        confirmModalCallback();
    }
    confirmModalCallback = null;
}

// --- 5. AUTENTICACIÓN Y REGISTRO (CU-01 Y CU-02) ---
function switchAuthTab(tab) {
    const tabLogin = document.getElementById('tab-login');
    const tabReg = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login-container');
    const formReg = document.getElementById('form-register-container');

    if (!tabLogin || !tabReg) return;

    if (tab === 'login') {
        tabLogin.classList.add('active');
        tabReg.classList.remove('active');
        formLogin.classList.remove('hidden');
        formReg.classList.add('hidden');
    } else {
        tabReg.classList.add('active');
        tabLogin.classList.remove('active');
        formReg.classList.remove('hidden');
        formLogin.classList.add('hidden');
    }
}

function fillDemo(email, pass) {
    document.getElementById('email').value = email;
    document.getElementById('password').value = pass;
    showToast(`Campos autocompletados para ${email}`, 'info', 'Acceso Rápido');
}

function login() {
    const emailInput = document.getElementById('email').value.trim();
    const passInput = document.getElementById('password').value;

    const userFound = users.find(u => u.email.toLowerCase() === emailInput.toLowerCase() && u.pass === passInput);

    if (userFound) {
        currentUser = userFound;
        document.getElementById('login-section').classList.add('hidden');
        
        const userNav = document.getElementById('user-nav');
        userNav.classList.remove('hidden');
        document.getElementById('nav-user-name').textContent = currentUser.name;
        
        const roleBadge = document.getElementById('nav-user-role');
        roleBadge.textContent = currentUser.role === 'admin' ? 'Administrador' : 'Cliente';
        roleBadge.className = `role-badge ${currentUser.role}`;

        // Mostrar controles de carrito e historial para clientes
        const clientNavActions = document.getElementById('client-nav-actions');
        if (clientNavActions) {
            if (currentUser.role === 'client') clientNavActions.classList.remove('hidden');
            else clientNavActions.classList.add('hidden');
        }

        if (currentUser.role === 'client') {
            document.getElementById('client-section').classList.remove('hidden');
            renderCatalog();
            updateCartBadge();
            showToast(`Bienvenido a Maqui Ventas, ${currentUser.name}.`, 'success', 'Sesión Iniciada');
        } else if (currentUser.role === 'admin') {
            document.getElementById('admin-section').classList.remove('hidden');
            renderInventory();
            updateAdminStats();
            showToast(`Panel de control del inventario cargado.`, 'success', 'Bienvenido Administrador');
        }
    } else {
        showToast('Correo electrónico o contraseña incorrectos. Revisa las credenciales de prueba.', 'error', 'Error de Autenticación');
    }
}

function register() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const pass = document.getElementById('reg-password').value;

    if (!name || !email || !pass) {
        showToast('Por favor completa todos los campos del registro.', 'warning', 'Campos Incompletos');
        return;
    }

    if (pass.length < 4) {
        showToast('La contraseña debe tener al menos 4 caracteres.', 'warning', 'Contraseña Débil');
        return;
    }

    const exists = users.some(u => u.email.toLowerCase() === email);
    if (exists) {
        showToast('El correo ya se encuentra registrado. Por favor inicia sesión.', 'error', 'Usuario Ya Existe');
        return;
    }

    const newUser = {
        name: name,
        email: email,
        pass: pass,
        role: 'client'
    };
    users.push(newUser);

    showToast('Tu cuenta ha sido creada exitosamente. Iniciando tu sesión...', 'success', '¡Registro Exitoso!');

    document.getElementById('reg-name').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-password').value = '';

    currentUser = newUser;
    document.getElementById('login-section').classList.add('hidden');
    
    const userNav = document.getElementById('user-nav');
    userNav.classList.remove('hidden');
    document.getElementById('nav-user-name').textContent = currentUser.name;
    
    const roleBadge = document.getElementById('nav-user-role');
    roleBadge.textContent = 'Cliente';
    roleBadge.className = 'role-badge client';

    const clientNavActions = document.getElementById('client-nav-actions');
    if (clientNavActions) clientNavActions.classList.remove('hidden');

    document.getElementById('client-section').classList.remove('hidden');
    renderCatalog();
    updateCartBadge();
}

function logout() {
    currentUser = null;
    cart = [];
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('client-section').classList.add('hidden');
    document.getElementById('admin-section').classList.add('hidden');
    document.getElementById('user-nav').classList.add('hidden');
    
    const clientNavActions = document.getElementById('client-nav-actions');
    if (clientNavActions) clientNavActions.classList.add('hidden');

    closeCart();
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    switchAuthTab('login');
    showToast('Has cerrado la sesión de forma segura.', 'info', 'Sesión Finalizada');
}

// --- 6. CARRITO DE COMPRAS (SHOPPING CART) ---
function addToCart(id, qty = 1) {
    // CONDICIÓN OBLIGATORIA: Iniciar sesión antes de comprar o agregar al carrito
    if (!currentUser) {
        showToast('Debes iniciar sesión para agregar maquinaria al carrito y realizar compras.', 'warning', 'Inicio de Sesión Requerido');
        const loginSection = document.getElementById('login-section');
        if (loginSection) loginSection.classList.remove('hidden');
        const authSection = document.querySelector('.auth-wrapper');
        if (authSection) {
            if (typeof authSection.scrollIntoView === 'function') {
                authSection.scrollIntoView({ behavior: 'smooth' });
            }
            const emailInput = document.getElementById('email');
            if (emailInput && typeof emailInput.focus === 'function') emailInput.focus();
        }
        return false;
    }

    const item = inventory.find(i => i.id === id);
    if (!item) return false;

    if (item.stock <= 0) {
        showToast(`Lo sentimos, "${item.name}" está agotado en inventario.`, 'warning', 'Sin Stock');
        return;
    }

    if (qty > item.stock) {
        showToast(`Solo quedan ${item.stock} unidades disponibles en patio de "${item.name}".`, 'warning', 'Límite de Stock');
        return;
    }

    // DISMINUIR STOCK DEL INVENTARIO EN TIEMPO REAL
    item.stock -= qty;

    const existingCartItem = cart.find(ci => ci.id === id);
    if (existingCartItem) {
        existingCartItem.qty += qty;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            category: item.category,
            image: item.image,
            qty: qty
        });
    }

    // Refrescar catálogo para mostrar el nuevo stock disponible, actualizar contador y abrir carrito
    renderCatalog();
    updateCartBadge();
    renderCart();
    openCart();
    showToast(`"${item.name}" añadido al carrito. Stock disponible restante: ${item.stock} uds.`, 'success', 'Añadido al Carrito');
}

function updateCartQty(id, delta) {
    const cartItem = cart.find(ci => ci.id === id);
    const invItem = inventory.find(i => i.id === id);
    if (!cartItem) return;

    if (delta > 0) {
        // Aumentar en carrito: verificar si queda stock en inventario
        if (!invItem || invItem.stock <= 0) {
            showToast(`No hay más unidades disponibles de "${cartItem.name}" en patio.`, 'warning', 'Stock Agotado');
            return;
        }
        cartItem.qty += 1;
        invItem.stock -= 1;
    } else if (delta < 0) {
        // Disminuir en carrito: devolver 1 unidad al stock
        if (cartItem.qty <= 1) {
            removeFromCart(id);
            return;
        }
        cartItem.qty -= 1;
        if (invItem) invItem.stock += 1;
    }

    renderCatalog();
    updateCartBadge();
    renderCart();
}

function removeFromCart(id) {
    const item = cart.find(ci => ci.id === id);
    if (!item) return;

    const invItem = inventory.find(i => i.id === id);
    if (invItem) {
        // Restaurar el stock reservado en el carrito de vuelta al inventario
        invItem.stock += item.qty;
    }

    const itemName = item.name;
    cart = cart.filter(ci => ci.id !== id);
    renderCatalog();
    updateCartBadge();
    renderCart();
    showToast(`"${itemName}" retirado del carrito. Stock restaurado a ${invItem ? invItem.stock : ''} unidades.`, 'info');
}

function clearCart() {
    // Restaurar todo el stock reservado de los ítems en el carrito
    cart.forEach(cartItem => {
        const invItem = inventory.find(i => i.id === cartItem.id);
        if (invItem) {
            invItem.stock += cartItem.qty;
        }
    });

    cart = [];
    renderCatalog();
    updateCartBadge();
    renderCart();
    showToast('El carrito se vació y el stock fue restaurado al inventario.', 'info');
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalCount = cart.reduce((acc, curr) => acc + curr.qty, 0);
    if (badge) {
        badge.textContent = totalCount;
        badge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    }
}

function getCartTotals() {
    const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);
    // Descuento comercial de flota si lleva más de 1 maquinaria (5%)
    const discount = totalItems > 1 ? subtotal * 0.05 : 0;
    const total = subtotal - discount;
    return { subtotal, discount, total, totalItems };
}

function openCart() {
    renderCart();
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) overlay.classList.add('active');
}

function closeCart() {
    const overlay = document.getElementById('cart-drawer-overlay');
    if (overlay) overlay.classList.remove('active');
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal');
    const discountEl = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('cart-checkout-btn');

    if (!container) return;

    container.innerHTML = '';
    const { subtotal, discount, total, totalItems } = getCartTotals();

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--gray-600);">
                <div style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--dark-900); text-transform: uppercase;">Tu carrito está vacío</div>
                <p style="font-size: 0.85rem; margin-top: 6px;">Explora el catálogo y agrega maquinaria a tu orden de compra.</p>
                <button class="btn btn-primary btn-sm" style="margin-top: 1rem; font-weight: 700;" onclick="closeCart()">Explorar Catálogo</button>
            </div>
        `;
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            container.innerHTML += `
                <div class="cart-item-card">
                    <button class="cart-item-del-btn" onclick="removeFromCart(${item.id})" title="Eliminar ítem">&times;</button>
                    <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
                    <div class="cart-item-info">
                        <div>
                            <span class="cart-item-cat">${item.category || 'Equipo Pesado'}</span>
                            <div class="cart-item-name">${item.name}</div>
                        </div>
                        <div class="cart-item-controls">
                            <div class="cart-qty-ctrl">
                                <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
                                <span class="cart-qty-display">${item.qty}</span>
                                <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                            </div>
                            <div class="cart-item-price">${formatCurrency(itemTotal)}</div>
                        </div>
                    </div>
                </div>
            `;
        });
        if (checkoutBtn) checkoutBtn.disabled = false;
    }

    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (discountEl) discountEl.textContent = discount > 0 ? `-${formatCurrency(discount)} (5% Flota)` : '$0 USD';
    if (totalEl) totalEl.textContent = formatCurrency(total);
}

// --- 7. PASARELA DE PAGOS FINTECH (PAYMENT GATEWAY) ---
function openPaymentGateway() {
    if (!currentUser) {
        showToast('Debes iniciar sesión para acceder a la pasarela de pagos y finalizar la compra.', 'warning', 'Inicio de Sesión Requerido');
        closeCart();
        const loginSection = document.getElementById('login-section');
        if (loginSection) loginSection.classList.remove('hidden');
        const authSection = document.querySelector('.auth-wrapper');
        if (authSection) {
            if (typeof authSection.scrollIntoView === 'function') {
                authSection.scrollIntoView({ behavior: 'smooth' });
            }
            const emailInput = document.getElementById('email');
            if (emailInput && typeof emailInput.focus === 'function') emailInput.focus();
        }
        return false;
    }

    if (cart.length === 0) {
        showToast('Agrega al menos una maquinaria a tu carrito para proceder al pago.', 'warning', 'Carrito Vacío');
        return false;
    }

    closeCart();

    const { subtotal, discount, total, totalItems } = getCartTotals();

    // Llenar resumen previo en la pasarela
    const summaryItems = document.getElementById('gateway-summary-items');
    if (summaryItems) {
        summaryItems.innerHTML = '';
        cart.forEach(item => {
            summaryItems.innerHTML += `
                <div class="gateway-item-row">
                    <span>${item.qty}x ${item.name}</span>
                    <strong>${formatCurrency(item.price * item.qty)}</strong>
                </div>
            `;
        });
    }

    const payTotalEl = document.getElementById('gateway-total-amount');
    const payBtnAmount = document.getElementById('gateway-pay-btn-amount');
    if (payTotalEl) payTotalEl.textContent = formatCurrency(total);
    if (payBtnAmount) payBtnAmount.textContent = formatCurrency(total);

    // Ocultar overlay de procesamiento si estaba activo
    const procOverlay = document.getElementById('gateway-processing');
    if (procOverlay) procOverlay.classList.add('hidden');

    selectPaymentTab('card');
    openModal('payment-modal');
}

function selectPaymentTab(method) {
    activePaymentMethod = method;
    document.querySelectorAll('.gateway-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-method') === method) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    const formCard = document.getElementById('gateway-form-card');
    const formPse = document.getElementById('gateway-form-pse');
    const formLeasing = document.getElementById('gateway-form-leasing');

    if (formCard) formCard.classList.toggle('hidden', method !== 'card');
    if (formPse) formPse.classList.toggle('hidden', method !== 'pse');
    if (formLeasing) formLeasing.classList.toggle('hidden', method !== 'leasing');
}

function formatCardNumber(input) {
    let val = input.value.replace(/\D/g, '');
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    input.value = formatted.substring(0, 19);

    const simNum = document.getElementById('sim-card-num');
    if (simNum) simNum.textContent = formatted || '•••• •••• •••• ••••';
}

function updateCardHolder(input) {
    const simName = document.getElementById('sim-card-holder');
    if (simName) simName.textContent = input.value.toUpperCase() || (currentUser ? currentUser.name.toUpperCase() : 'TITULAR DE CUENTA');
}

function updateCardExpiry(input) {
    let val = input.value.replace(/\D/g, '');
    if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2, 4);
    input.value = val.substring(0, 5);

    const simExp = document.getElementById('sim-card-expiry');
    if (simExp) simExp.textContent = val || 'MM/AA';
}

function processPayment() {
    if (!currentUser) {
        showToast('Debes iniciar sesión para procesar y confirmar la compra.', 'warning', 'Inicio de Sesión Requerido');
        closeModal('payment-modal');
        const loginSection = document.getElementById('login-section');
        if (loginSection) loginSection.classList.remove('hidden');
        const authSection = document.querySelector('.auth-wrapper');
        if (authSection && typeof authSection.scrollIntoView === 'function') {
            authSection.scrollIntoView({ behavior: 'smooth' });
        }
        return false;
    }

    if (!cart || cart.length === 0) {
        showToast('El carrito de compras se encuentra vacío. Seleccione maquinaria antes de pagar.', 'warning', 'Carrito Vacío');
        return false;
    }

    const { subtotal, discount, total, totalItems } = getCartTotals();

    // Activar spinner y animación de conexión con pasarela bancaria
    const procOverlay = document.getElementById('gateway-processing');
    if (procOverlay) procOverlay.classList.remove('hidden');

    setTimeout(() => {
        // La transacción es confirmada. El stock ya fue reservado y deducido en tiempo real al agregar al carrito.
        const randomFacturaNum = 'FAC-2026-' + Math.floor(10000 + Math.random() * 90000);
        const randomOrderId = 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000);
        const randomAuthCode = 'AUTH-' + Math.floor(100000 + Math.random() * 900000);

        const now = new Date();
        const formattedDate = now.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        let methodDesc = 'Tarjeta de Crédito Corporativa';
        if (activePaymentMethod === 'pse') methodDesc = 'Transferencia Bancaria en Línea PSE';
        else if (activePaymentMethod === 'leasing') methodDesc = 'Línea de Crédito Empresarial / Leasing 36 Meses';

        // Guardar en el Historial de Compras del Usuario
        const newOrder = {
            orderId: randomOrderId,
            invoiceNumber: randomFacturaNum,
            date: formattedDate,
            customerName: currentUser ? currentUser.name : 'Cliente General',
            customerEmail: currentUser ? currentUser.email : 'cliente@maqui.com',
            paymentMethod: methodDesc,
            authCode: randomAuthCode,
            items: [...cart],
            subtotal: subtotal,
            discount: discount,
            total: total,
            status: 'Aprobado y Despachado'
        };
        orderHistory.unshift(newOrder);

        // Llenar modal de factura formal
        document.getElementById('inv-number').textContent = randomFacturaNum;
        document.getElementById('inv-customer-name').textContent = newOrder.customerName;
        document.getElementById('inv-customer-email').textContent = newOrder.customerEmail;
        document.getElementById('inv-date').textContent = formattedDate;

        // Construir tabla de productos en factura
        const invTableBody = document.querySelector('.invoice-item-table tbody');
        if (invTableBody) {
            invTableBody.innerHTML = '';
            newOrder.items.forEach(item => {
                invTableBody.innerHTML += `
                    <tr>
                        <td>
                            <strong>${item.name}</strong>
                            <div style="font-size: 0.75rem; color: var(--gray-400);">Garantía certificada + Alistamiento Técnico</div>
                        </td>
                        <td style="text-align: center; font-weight: 600;">${item.qty}</td>
                        <td style="text-align: right;">${formatCurrency(item.price)}</td>
                        <td style="text-align: right; font-weight: 700;">${formatCurrency(item.price * item.qty)}</td>
                    </tr>
                `;
            });
        }

        document.getElementById('inv-grand-total').textContent = formatCurrency(total);

        // Limpiar carrito y cerrar pasarela
        cart = [];
        updateCartBadge();
        renderCatalog();

        closeModal('payment-modal');
        if (procOverlay) procOverlay.classList.add('hidden');

        // Abrir Factura Comercial
        openModal('invoice-modal');
        showToast(`¡Transacción Aprobada (${randomAuthCode})! Factura ${randomFacturaNum} emitida.`, 'success', 'Pago Exitoso');
    }, 1400);
}

// --- 8. HISTORIAL DE COMPRAS (ORDER HISTORY) ---
function openOrderHistoryModal() {
    if (!currentUser) {
        showToast('Debes iniciar sesión para consultar tu historial previo de compras.', 'warning', 'Inicio de Sesión Requerido');
        const loginSection = document.getElementById('login-section');
        if (loginSection) loginSection.classList.remove('hidden');
        const authSection = document.querySelector('.auth-wrapper');
        if (authSection) {
            if (typeof authSection.scrollIntoView === 'function') {
                authSection.scrollIntoView({ behavior: 'smooth' });
            }
            const emailInput = document.getElementById('email');
            if (emailInput && typeof emailInput.focus === 'function') emailInput.focus();
        }
        return;
    }

    const listContainer = document.getElementById('history-orders-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    if (orderHistory.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--gray-600);">
                <div style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--dark-900); text-transform: uppercase;">Aún no tienes compras registradas</div>
                <p style="font-size: 0.85rem; margin-top: 6px;">Tus pedidos formalizados y facturas aparecerán aquí.</p>
            </div>
        `;
    } else {
        orderHistory.forEach(order => {
            let itemsHtml = order.items.map(i => `• <strong>${i.qty}x</strong> ${i.name} (${formatCurrency(i.price)})`).join('<br>');
            listContainer.innerHTML += `
                <div class="history-order-card">
                    <div class="history-order-header">
                        <div>
                            <span class="history-order-id">${order.orderId}</span>
                            <span style="font-size: 0.82rem; color: var(--gray-400); margin-left: 8px;">${order.date}</span>
                        </div>
                        <span class="history-badge">✓ ${order.status}</span>
                    </div>
                    <div style="font-size: 0.85rem; color: var(--dark-800); margin-bottom: 8px; line-height: 1.5;">
                        ${itemsHtml}
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--gray-200); padding-top: 8px;">
                        <span style="font-size: 0.82rem; color: var(--gray-600);">Pago: <strong>${order.paymentMethod}</strong></span>
                        <div style="text-align: right;">
                            <span style="font-size: 1.15rem; font-weight: 800; color: var(--dark-900);">${formatCurrency(order.total)}</span>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    openModal('history-modal');
}

// --- 9. CATÁLOGO DE CLIENTES Y COMPRA DIRECTA (CU-04 Y CU-05) ---
function renderCatalog(itemsToRender = null) {
    const catalog = document.getElementById('catalog');
    if (!catalog) return;

    let items = itemsToRender || getFilteredAndSortedInventory();

    const totalUnitsEl = document.getElementById('catalog-total-units');
    if (totalUnitsEl) {
        totalUnitsEl.textContent = `${items.length} modelos`;
    }

    catalog.innerHTML = '';

    if (items.length === 0) {
        catalog.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; background: white; border-radius: 4px; border: 1px dashed var(--gray-400);">
                <div style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; color: var(--dark-900); text-transform: uppercase;">No se encontraron maquinarias</div>
                <p style="color: var(--gray-600); font-size: 0.9rem; margin-top: 6px;">Intenta ajustando el filtro de categoría o tu término de búsqueda.</p>
                <button class="btn btn-outline btn-sm" style="margin-top: 1rem; font-weight: 700;" onclick="resetCatalogFilters()">Restablecer Filtros</button>
            </div>
        `;
        return;
    }

    items.forEach(item => {
        const isOutOfStock = item.stock <= 0;
        let stockClass = 'stock-available';
        let stockText = `${item.stock} en stock`;

        if (item.stock === 0) {
            stockClass = 'stock-out';
            stockText = 'Agotado';
        } else if (item.stock <= 2) {
            stockClass = 'stock-low';
            stockText = `¡Últimas ${item.stock}!`;
        }

        const cardHtml = `
            <div class="machine-card" id="card-machine-${item.id}">
                <div class="card-img-wrapper" onclick="openDetailModal(${item.id})" title="Clic para inspeccionar ficha técnica y galería">
                    <img 
                        src="${item.image}" 
                        alt="${item.name}" 
                        class="card-img" 
                        loading="lazy"
                    >
                    <span class="card-img-overlay-tag">${item.category || 'Equipo Pesado'}</span>
                    <span class="card-stock-badge ${stockClass}">
                        <span class="pulse-dot"></span>
                        <span>${stockText}</span>
                    </span>
                    <div class="card-img-interactive-hint">
                        <span>Inspeccionar Ficha Técnica 360°</span>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="machine-name" onclick="openDetailModal(${item.id})" style="cursor: pointer;" title="Ver detalles">${item.name}</h3>
                    <div class="machine-specs">
                        <span class="spec-chip">ID: #${item.id}</span>
                        <span class="spec-chip">${item.specs || 'Garantía 12 Meses'}</span>
                    </div>
                    <div class="card-footer">
                        <div class="price-container">
                            <span class="price-label">Precio de Venta</span>
                            <span class="price-amount">${formatCurrency(item.price)}</span>
                        </div>
                        <div class="card-action-group">
                            <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})" ${isOutOfStock ? 'disabled' : ''} style="flex: 1.4; font-weight: 700;" title="Añadir maquinaria al Carrito de Compras">
                                Añadir al Carrito
                            </button>
                            <button class="btn btn-outline btn-sm" onclick="buy(${item.id})" ${isOutOfStock ? 'disabled' : ''} style="flex: 1; font-size: 0.78rem;" title="Facturación Rápida 1-Clic">
                                ${isOutOfStock ? 'Sin Stock' : 'Comprar y Facturar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        catalog.innerHTML += cardHtml;
    });
}

function getFilteredAndSortedInventory() {
    const topSearch = document.getElementById('top-cat-search');
    const searchInput = topSearch || document.getElementById('catalog-search');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let result = inventory.filter(i => {
        const matchesQuery = !query || 
                             i.name.toLowerCase().includes(query) || 
                             (i.category && i.category.toLowerCase().includes(query)) ||
                             (i.specs && i.specs.toLowerCase().includes(query));

        const matchesCat = (currentCategoryFilter === 'all') || 
                           (i.category && i.category.toLowerCase().includes(currentCategoryFilter.toLowerCase()));

        return matchesQuery && matchesCat;
    });

    if (currentSortCriteria === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (currentSortCriteria === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
    } else if (currentSortCriteria === 'stock-desc') {
        result.sort((a, b) => b.stock - a.stock);
    }

    return result;
}

function syncCatalogSearch(val) {
    const topSearch = document.getElementById('top-cat-search');
    if (topSearch && topSearch.value !== val) {
        topSearch.value = val;
    }
    renderCatalog();
}

function filterCatalog() {
    renderCatalog();
}

function filterByCategory(category) {
    currentCategoryFilter = category;
    
    // Sincronizar items de la sub-barra CAT
    document.querySelectorAll('.cat-sub-item').forEach(item => {
        const text = item.textContent.trim().toLowerCase();
        if ((category === 'all' && text.includes('categorías')) || 
            (category !== 'all' && text.includes(category.toLowerCase().split(' ')[0]))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Sincronizar chips si existen
    document.querySelectorAll('.category-chip').forEach(chip => {
        if (chip.getAttribute('data-cat') === category) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    renderCatalog();
}

function sortCatalog(criteria) {
    currentSortCriteria = criteria;
    renderCatalog();
}

function resetCatalogFilters() {
    currentCategoryFilter = 'all';
    currentSortCriteria = 'featured';
    const topSearch = document.getElementById('top-cat-search');
    if (topSearch) topSearch.value = '';
    const searchInput = document.getElementById('catalog-search');
    if (searchInput) searchInput.value = '';
    const sortSelect = document.getElementById('catalog-sort');
    if (sortSelect) sortSelect.value = 'featured';
    filterByCategory('all');
}

// --- 10. MODAL DE FICHA TÉCNICA 360° ---
let currentDetailMachineId = null;

function openDetailModal(id) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    currentDetailMachineId = item.id;
    const isOutOfStock = item.stock <= 0;

    document.getElementById('detail-modal-title').textContent = item.name;
    document.getElementById('detail-modal-category').textContent = item.category || 'Maquinaria Pesada';
    document.getElementById('detail-modal-price').textContent = formatCurrency(item.price);
    
    const stockEl = document.getElementById('detail-modal-stock');
    stockEl.textContent = item.stock > 0 ? `${item.stock} unidades disponibles en patio` : 'Agotado temporalmente';
    stockEl.style.color = item.stock > 0 ? 'var(--success)' : 'var(--danger)';

    const mainImg = document.getElementById('detail-main-display-img');
    mainImg.src = item.image;

    const galleryStrip = document.getElementById('detail-gallery-thumbs');
    galleryStrip.innerHTML = '';

    const galleryList = (item.gallery && item.gallery.length > 0) ? item.gallery : [item.image];

    galleryList.forEach((src, idx) => {
        const thumbBtn = document.createElement('button');
        thumbBtn.className = `detail-thumb-btn ${idx === 0 ? 'active' : ''}`;
        thumbBtn.title = `Ver perspectiva ${idx + 1}`;
        thumbBtn.innerHTML = `<img src="${src}" alt="Vista ${idx + 1}">`;
        thumbBtn.onclick = () => {
            mainImg.src = src;
            document.querySelectorAll('.detail-thumb-btn').forEach(b => b.classList.remove('active'));
            thumbBtn.classList.add('active');
        };
        galleryStrip.appendChild(thumbBtn);
    });

    const specsBody = document.getElementById('detail-specs-body');
    const det = item.details || {
        brand: 'Industrial Partner',
        year: 2024,
        engineHours: '50 hrs',
        power: 'Alta Potencia',
        operatingWeight: 'Estándar',
        transmission: 'Automática / Asistida',
        warranty: '12 Meses Oficial'
    };

    specsBody.innerHTML = `
        <tr><td class="detail-spec-label">Fabricante / Marca:</td><td class="detail-spec-val">${det.brand}</td></tr>
        <tr><td class="detail-spec-label">Año de Fabricación:</td><td class="detail-spec-val">${det.year}</td></tr>
        <tr><td class="detail-spec-label">Horas de Motor:</td><td class="detail-spec-val">${det.engineHours}</td></tr>
        <tr><td class="detail-spec-label">Potencia Neta:</td><td class="detail-spec-val">${det.power}</td></tr>
        <tr><td class="detail-spec-label">Peso Operativo:</td><td class="detail-spec-val">${det.operatingWeight}</td></tr>
        <tr><td class="detail-spec-label">Transmisión:</td><td class="detail-spec-val">${det.transmission}</td></tr>
        <tr><td class="detail-spec-label">Garantía Certificada:</td><td class="detail-spec-val" style="color: var(--success);">${det.warranty}</td></tr>
    `;

    const buyBtn = document.getElementById('detail-modal-buy-btn');
    buyBtn.onclick = () => {
        closeModal('detail-modal');
        buy(item.id);
    };
    buyBtn.disabled = isOutOfStock;
    buyBtn.textContent = isOutOfStock ? 'Sin Stock Disponible' : 'Comprar y Facturar Ahora ➔';

    openModal('detail-modal');
}

function generateProformaQuoteFromDetail() {
    closeModal('detail-modal');
    if (!currentDetailMachineId) return;
    const item = inventory.find(i => i.id === currentDetailMachineId);
    if (!item) return;

    const quoteNum = 'COT-2026-' + Math.floor(1000 + Math.random() * 9000);
    const invNumEl = document.getElementById('inv-number');
    if (invNumEl) invNumEl.textContent = quoteNum;

    const customerName = currentUser ? currentUser.name : 'Cliente Interesado / Licitante';
    const customerEmail = currentUser ? currentUser.email : 'contacto@empresa.com';
    const custNameEl = document.getElementById('inv-customer-name');
    if (custNameEl) custNameEl.textContent = customerName;
    const custEmailEl = document.getElementById('inv-customer-email');
    if (custEmailEl) custEmailEl.textContent = customerEmail;

    const invDateEl = document.getElementById('inv-date');
    if (invDateEl) invDateEl.textContent = new Date().toLocaleDateString('es-CO');

    const invItemEl = document.getElementById('inv-item-name');
    if (invItemEl) invItemEl.textContent = item.name;

    const invPriceEl = document.getElementById('inv-item-unit-price');
    if (invPriceEl) invPriceEl.textContent = formatCurrency(item.price);

    const invTotalEl = document.getElementById('inv-item-total');
    if (invTotalEl) invTotalEl.textContent = formatCurrency(item.price);

    const invGrandEl = document.getElementById('inv-grand-total');
    if (invGrandEl) invGrandEl.textContent = formatCurrency(item.price);

    const stamp = document.querySelector('.invoice-stamp');
    if (stamp) {
        stamp.textContent = 'COTIZACIÓN VÁLIDA 30 DÍAS';
        stamp.style.borderColor = 'var(--cat-yellow)';
        stamp.style.color = '#000000';
        stamp.style.backgroundColor = 'var(--cat-yellow)';
    }

    const headerTitle = document.getElementById('invoice-header-title');
    if (headerTitle) headerTitle.textContent = 'Cotización Comercial Proforma';

    openModal('invoice-modal');
    showToast('Cotización proforma generada exitosamente con validez de 30 días.', 'success', 'Cotización Formal');
}

function openLeasingFromDetail() {
    closeModal('detail-modal');
    if (typeof window !== 'undefined' && window.location) {
        window.location.href = 'cotizador.html';
    }
}

// --- 11. COMPRA DIRECTA COMPATIBLE CON TESTS (CU-05) ---
function buy(id) {
    // CONDICIÓN OBLIGATORIA: Iniciar sesión antes de comprar
    if (!currentUser) {
        showToast('Debes iniciar sesión para comprar y facturar maquinaria.', 'warning', 'Inicio de Sesión Requerido');
        const loginSection = document.getElementById('login-section');
        if (loginSection) loginSection.classList.remove('hidden');
        const authSection = document.querySelector('.auth-wrapper');
        if (authSection) {
            if (typeof authSection.scrollIntoView === 'function') {
                authSection.scrollIntoView({ behavior: 'smooth' });
            }
            const emailInput = document.getElementById('email');
            if (emailInput && typeof emailInput.focus === 'function') emailInput.focus();
        }
        return false;
    }

    const item = inventory.find(i => i.id === id);
    if (!item) return false;

    if (item.stock <= 0) {
        showToast('Lo sentimos, este equipo no cuenta con stock disponible actualmente.', 'warning', 'Sin Stock');
        return;
    }

    item.stock -= 1;
    renderCatalog();

    const randomFacturaNum = 'FAC-2026-' + Math.floor(10000 + Math.random() * 90000);
    const randomOrderId = 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Guardar en el historial de compras
    orderHistory.unshift({
        orderId: randomOrderId,
        invoiceNumber: randomFacturaNum,
        date: formattedDate,
        customerName: currentUser ? currentUser.name : 'Cliente General',
        customerEmail: currentUser ? currentUser.email : 'cliente@maqui.com',
        paymentMethod: 'Facturación Directa Comercial',
        authCode: 'AUTH-' + Math.floor(100000 + Math.random() * 900000),
        items: [{ id: item.id, name: item.name, price: item.price, qty: 1 }],
        subtotal: item.price,
        discount: 0,
        total: item.price,
        status: 'Aprobado y Despachado'
    });

    document.getElementById('inv-number').textContent = randomFacturaNum;
    document.getElementById('inv-customer-name').textContent = currentUser ? currentUser.name : 'Cliente General';
    document.getElementById('inv-customer-email').textContent = currentUser ? currentUser.email : 'cliente@maqui.com';
    document.getElementById('inv-date').textContent = formattedDate;

    const invTableBody = document.querySelector('.invoice-item-table tbody');
    if (invTableBody) {
        invTableBody.innerHTML = `
            <tr>
                <td>
                    <strong id="inv-item-name">${item.name}</strong>
                    <div style="font-size: 0.75rem; color: var(--gray-400);">Garantía de fábrica certificada + Alistamiento Técnico</div>
                </td>
                <td style="text-align: center; font-weight: 600;">1</td>
                <td style="text-align: right;" id="inv-item-unit-price">${formatCurrency(item.price)}</td>
                <td style="text-align: right; font-weight: 700;" id="inv-item-total">${formatCurrency(item.price)}</td>
            </tr>
        `;
    }

    document.getElementById('inv-grand-total').textContent = formatCurrency(item.price);

    openModal('invoice-modal');
    showToast(`Compra procesada correctamente. Factura ${randomFacturaNum} emitida.`, 'success', '¡Compra Exitosa!');
}

function printInvoice() {
    window.print();
}

// --- 12. PANEL DE INVENTARIO ADMINISTRADOR (CU-09) ---
function renderInventory(itemsToRender = null) {
    const tbody = document.getElementById('inventory-table');
    if (!tbody) return;

    const items = itemsToRender || inventory;
    tbody.innerHTML = '';

    if (items.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 2.5rem; color: var(--gray-600);">
                    No hay maquinarias que coincidan con la búsqueda.
                </td>
            </tr>
        `;
        return;
    }

    items.forEach(item => {
        let stockBadgeStyle = 'background: #d1fae5; color: #065f46;';
        if (item.stock === 0) {
            stockBadgeStyle = 'background: #fee2e2; color: #991b1b;';
        } else if (item.stock <= 2) {
            stockBadgeStyle = 'background: #fef3c7; color: #92400e;';
        }

        tbody.innerHTML += `
            <tr id="admin-row-${item.id}">
                <td style="font-weight: 700; color: var(--gray-400);">#${item.id}</td>
                <td>
                    <div class="table-machinery-cell">
                        <img 
                            src="${item.image}" 
                            alt="${item.name}" 
                            class="table-img-thumb"
                        >
                        <div>
                            <div style="font-weight: 700; color: var(--dark-900);">${item.name}</div>
                            <div style="font-size: 0.78rem; color: var(--gray-600);">${item.specs || item.category || 'Equipo Pesado'}</div>
                        </div>
                    </div>
                </td>
                <td style="font-weight: 700; color: var(--dark-900);">${formatCurrency(item.price)}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="display: inline-block; padding: 4px 10px; border-radius: 999px; font-weight: 700; font-size: 0.78rem; ${stockBadgeStyle}">
                            ${item.stock} unidades
                        </span>
                        <div class="quick-stock-ctrl">
                            <button class="stock-adjust-btn" onclick="adjustStock(${item.id}, -1)" title="Disminuir stock">-</button>
                            <button class="stock-adjust-btn" onclick="adjustStock(${item.id}, 1)" title="Aumentar stock">+</button>
                        </div>
                    </div>
                </td>
                <td style="text-align: center;">
                    <button class="btn btn-danger btn-sm" onclick="remove(${item.id})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

    updateAdminStats();
}

function adjustStock(id, delta) {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    const newStock = item.stock + delta;
    if (newStock < 0) {
        showToast('El stock no puede ser menor a cero.', 'warning');
        return;
    }

    item.stock = newStock;
    renderInventory();
    showToast(`Stock de "${item.name}" actualizado a ${item.stock} unidades.`, 'info');
}

function filterAdminTable() {
    const query = document.getElementById('admin-table-search').value.toLowerCase().trim();
    const filtered = inventory.filter(i => 
        i.name.toLowerCase().includes(query) ||
        (i.category && i.category.toLowerCase().includes(query)) ||
        i.id.toString() === query
    );
    renderInventory(filtered);
}

function updateAdminStats() {
    const modelsEl = document.getElementById('admin-stat-models');
    const stockEl = document.getElementById('admin-stat-stock');
    const valueEl = document.getElementById('admin-stat-value');

    if (!modelsEl || !stockEl || !valueEl) return;

    const totalModels = inventory.length;
    const totalStock = inventory.reduce((acc, curr) => acc + (parseInt(curr.stock) || 0), 0);
    const totalValue = inventory.reduce((acc, curr) => acc + ((curr.price || 0) * (curr.stock || 0)), 0);

    modelsEl.textContent = totalModels;
    stockEl.textContent = totalStock;
    valueEl.textContent = formatCurrency(totalValue);
}

// --- GESTIÓN DE SUBIDA DE FOTOS Y MODAL AGREGAR PRODUCTO (CU-09) ---
let uploadedMachineImage = null;

function openAddMachineModal() {
    openModal('modal-add-machine');
}

function closeAddMachineModal() {
    closeModal('modal-add-machine');
}

function handleMachineImageSelect(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP).', 'warning', 'Formato Inválido');
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        showToast('La imagen seleccionada supera el límite de 10 MB.', 'warning', 'Archivo Muy Pesado');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedMachineImage = e.target.result;
        displayImagePreview(uploadedMachineImage, file.name, file.size);
        showToast('Foto cargada correctamente y lista para publicar.', 'info', 'Foto Lista');
    };
    reader.readAsDataURL(file);
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('image-dropzone-box');
    if (dropzone) dropzone.classList.add('drag-active');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('image-dropzone-box');
    if (dropzone) dropzone.classList.remove('drag-active');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropzone = document.getElementById('image-dropzone-box');
    if (dropzone) dropzone.classList.remove('drag-active');

    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
        const file = dt.files[0];
        const fakeEvent = { target: { files: [file] } };
        handleMachineImageSelect(fakeEvent);
    }
}

function displayImagePreview(dataUrl, fileName, fileSize) {
    const dropzone = document.getElementById('image-dropzone-content');
    const preview = document.getElementById('image-preview-container');
    const previewImg = document.getElementById('new-machine-img-preview');
    const nameEl = document.getElementById('preview-file-name');
    const sizeEl = document.getElementById('preview-file-size');

    if (previewImg) previewImg.src = dataUrl;
    if (nameEl) nameEl.textContent = fileName || 'Foto del Producto';
    if (sizeEl) sizeEl.textContent = fileSize ? `${(fileSize / 1024).toFixed(1)} KB · Vista Previa Activa` : 'Imagen Cargada';

    if (dropzone) dropzone.style.display = 'none';
    if (preview) preview.style.display = 'flex';
}

function removeUploadedImage(event) {
    if (event) event.stopPropagation();
    uploadedMachineImage = null;
    const fileInput = document.getElementById('new-machine-image-file');
    if (fileInput) fileInput.value = '';

    const dropzone = document.getElementById('image-dropzone-content');
    const preview = document.getElementById('image-preview-container');
    const previewImg = document.getElementById('new-machine-img-preview');

    if (previewImg) previewImg.src = '';
    if (dropzone) dropzone.style.display = 'flex';
    if (preview) preview.style.display = 'none';
}

// FORMULARIO PARA AGREGAR NUEVA MAQUINARIA (CU-09)
function addMachine() {
    const nameInput = document.getElementById('new-machine-name');
    const priceInput = document.getElementById('new-machine-price');
    const stockInput = document.getElementById('new-machine-stock');
    const catInput = document.getElementById('new-machine-category');
    const descInput = document.getElementById('new-machine-desc');
    const brandInput = document.getElementById('new-machine-brand');
    const yearInput = document.getElementById('new-machine-year');

    const name = nameInput ? nameInput.value.trim() : '';
    const price = priceInput ? parseFloat(priceInput.value) : 0;
    const stock = stockInput ? parseInt(stockInput.value) : 0;
    const category = catInput ? catInput.value : 'Movimiento de Tierras';
    const specs = descInput && descInput.value.trim() ? descInput.value.trim() : 'Garantía 24 Meses · Alistamiento Técnico Oficial';
    const brand = brandInput && brandInput.value.trim() ? brandInput.value.trim() : 'Maqui Pro Tech';
    const year = yearInput && yearInput.value ? parseInt(yearInput.value) : 2024;

    if (!name) {
        showToast('Por favor ingrese el nombre y modelo del producto.', 'warning', 'Campo Obligatorio');
        return;
    }

    if (isNaN(price) || price <= 0) {
        showToast('Por favor ingrese un precio válido mayor a 0.', 'warning', 'Precio Inválido');
        return;
    }

    if (isNaN(stock) || stock < 0) {
        showToast('El stock no puede ser negativo.', 'warning', 'Stock Inválido');
        return;
    }

    const newId = inventory.length > 0 ? Math.max(...inventory.map(i => i.id)) + 1 : 1;

    // Foto: usar la imagen subida por el admin, o preset inteligente
    let machineImage = uploadedMachineImage;
    if (!machineImage) {
        let machineType = 'loader';
        if (category.toLowerCase().includes('agrícola')) machineType = 'tractor';
        else if (category.toLowerCase().includes('carga')) machineType = 'forklift';
        else if (category.toLowerCase().includes('paviment')) machineType = 'roller';
        else if (name.toLowerCase().includes('excavadora')) machineType = 'excavator';
        machineImage = generateMachinerySvg(machineType);
    }

    const newMachine = {
        id: newId,
        name: name,
        price: price,
        stock: stock,
        category: category,
        specs: specs,
        details: {
            brand: brand,
            year: year,
            engineHours: '0 hrs (Equipo Nuevo)',
            power: 'Potencia Certificada Tier 4 Final Heavy Duty',
            operatingWeight: 'Alta capacidad operacional de faena',
            transmission: 'Automática Inteligente Powershift',
            warranty: '24 Meses Oficial con Respaldo Certificado'
        },
        imageType: uploadedMachineImage ? 'custom-upload' : 'preset',
        image: machineImage,
        gallery: [machineImage],
        placeholderIcon: ''
    };

    inventory.unshift(newMachine);

    // Limpiar campos y preview
    if (nameInput) nameInput.value = '';
    if (priceInput) priceInput.value = '';
    if (stockInput) stockInput.value = '';
    if (descInput) descInput.value = '';
    if (brandInput) brandInput.value = '';
    removeUploadedImage();

    closeAddMachineModal();
    renderInventory();
    renderCatalog();
    updateAdminStats();

    showToast(`Se agregó "${newMachine.name}" correctamente al inventario.`, 'success', 'Producto Publicado');
}

function remove(id) {
    const item = inventory.find(i => i.id === id);
    const itemName = item ? item.name : 'esta maquinaria';

    showConfirmDialog({
        title: '¿Eliminar del inventario?',
        message: `¿Estás seguro de que deseas eliminar permanentemente "${itemName}"? Esta acción removerá el producto del catálogo de venta.`,
        onConfirm: () => {
            const index = inventory.findIndex(i => i.id === id);
            if (index > -1) {
                inventory.splice(index, 1);
                renderInventory();
                showToast(`"${itemName}" fue eliminada del catálogo.`, 'info', 'Producto Eliminado');
            }
        }
    });
}

// --- 16. CENTRO DE AYUDA Y ASISTENCIA TÉCNICA (HELP CENTER) ---
function openHelpCenter(tab = 'faq') {
    const modal = document.getElementById('help-modal');
    if (modal) {
        switchHelpTab(tab);
        openModal('help-modal');
    } else if (typeof window !== 'undefined' && window.location) {
        window.location.href = 'ayuda.html';
    }
}

function closeHelpCenter() {
    closeModal('help-modal');
}

function switchHelpTab(tab) {
    const tabs = ['faq', 'contact', 'ticket'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-btn-${t}`);
        const pane = document.getElementById(`help-tab-${t}`);
        if (btn) btn.classList.toggle('active', t === tab);
        if (pane) pane.classList.toggle('hidden', t !== tab);
    });
}

function toggleFaq(btn) {
    if (!btn) return;
    const item = btn.closest('.faq-item');
    if (!item) return;
    const wasActive = item.classList.contains('active');
    
    // Cerrar los demás acordeones
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
    
    if (!wasActive) {
        item.classList.add('active');
    }
}

function submitHelpTicket(formEl) {
    const form = formEl || document.getElementById('help-ticket-form');
    const ticketId = 'TCK-2026-' + Math.floor(1000 + Math.random() * 9000);
    
    showToast(`Solicitud ${ticketId} radicada correctamente. Un ingeniero de soporte se contactará a la brevedad.`, 'success', 'Ticket Asignado');
    
    if (form && typeof form.reset === 'function') form.reset();
    setTimeout(() => {
        closeHelpCenter();
    }, 1500);
}

// Inicialización al cargar la ventana
window.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    startFlashCountdown();
    renderCatalog();
    updateCartBadge();
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal('invoice-modal');
        closeModal('detail-modal');
        closeModal('payment-modal');
        closeModal('history-modal');
        closeModal('help-modal');
        closeCart();
        closeConfirmModal(false);
    }
});
