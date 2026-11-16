/**
 * MAQUI VENTAS - Suite de Pruebas Automatizadas (Unit & Integration Tests)
 * Ejecución: node test.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 1. Cargar el código fuente de la aplicación
const appJsPath = path.join(__dirname, 'src', 'js', 'app.js');
let scriptContent = '';

if (fs.existsSync(appJsPath)) {
    scriptContent = fs.readFileSync(appJsPath, 'utf-8');
} else {
    const htmlContent = fs.readFileSync(path.join(__dirname, 'maqui_ventas_demo.html'), 'utf-8');
    const match = htmlContent.match(/<script>([\s\S]*?)<\/script>/);
    scriptContent = match ? match[1] : '';
}

// 2. Mock del entorno DOM mínimo
const elementsMap = {};

function getOrCreateElement(id) {
    if (!elementsMap[id]) {
        elementsMap[id] = {
            value: '',
            textContent: '',
            innerHTML: '',
            className: '',
            classList: {
                add: () => {},
                remove: () => {},
                contains: () => false
            },
            appendChild: () => {},
            parentElement: { remove: () => {} },
            style: {}
        };
    }
    return elementsMap[id];
}

const mockDOM = {
    getElementById(id) {
        return getOrCreateElement(id);
    },
    createElement(tag) {
        return {
            tagName: tag.toUpperCase(),
            className: '',
            innerHTML: '',
            appendChild: () => {},
            remove: () => {},
            style: {}
        };
    },
    querySelector(sel) {
        return {
            innerHTML: '',
            textContent: '',
            style: {},
            classList: { add: () => {}, remove: () => {} }
        };
    },
    querySelectorAll(sel) {
        return [];
    }
};

const sandbox = {
    document: mockDOM,
    window: {
        addEventListener: () => {},
        print: () => {}
    },
    console: {
        log: () => {},
        error: console.error,
        warn: console.warn
    },
    Intl,
    Date,
    Math,
    parseFloat,
    parseInt,
    isNaN,
    setTimeout: (fn) => fn()
};

// Envolver para exponer todas las variables y funciones internas
const wrappedScript = `
${scriptContent}

; ({
    getUsers: () => users,
    getInventory: () => inventory,
    getCurrentUser: () => currentUser,
    setCurrentUser: (val) => { currentUser = val; },
    getCart: () => cart,
    getOrderHistory: () => orderHistory,
    login,
    logout,
    register,
    renderCatalog,
    renderInventory,
    buy,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    getCartTotals,
    processPayment,
    openOrderHistoryModal,
    addMachine,
    remove,
    formatCurrency,
    showConfirmDialog: (fn) => { showConfirmDialog = fn; }
});
`;

const context = vm.createContext(sandbox);
const app = vm.runInContext(wrappedScript, context);

// 3. Harness de Aserciones y Reporte
let passed = 0;
let failed = 0;

function assert(condition, testName) {
    if (condition) {
        console.log(`  \x1b[32m✔ PASS\x1b[0m ${testName}`);
        passed++;
    } else {
        console.error(`  \x1b[31m✖ FAIL\x1b[0m ${testName}`);
        failed++;
    }
}

console.log('\n======================================================');
console.log('       MAQUI VENTAS - SUITE DE PRUEBAS AUTOMATIZADAS  ');
console.log('======================================================\n');

// -----------------------------------------------------------
// TEST SUITE 1: Estado Inicial e Inventario
// -----------------------------------------------------------
console.log('\x1b[36m▶ TEST SUITE 1: Estado Inicial e Inventario\x1b[0m');
const initialInventory = app.getInventory();
const initialUsers = app.getUsers();

assert(initialInventory.length >= 3, 'El inventario inicial contiene al menos 3 maquinarias');
assert(initialUsers.length >= 2, 'Los usuarios iniciales contienen cuentas de Cliente y Administrador');

const clienteDemo = initialUsers.find(u => u.email === 'cliente@maqui.com');
const adminDemo = initialUsers.find(u => u.email === 'admin@maqui.com');
assert(clienteDemo && clienteDemo.role === 'client', 'Existe cuenta cliente@maqui.com con rol client');
assert(adminDemo && adminDemo.role === 'admin', 'Existe cuenta admin@maqui.com con rol admin');

// -----------------------------------------------------------
// TEST SUITE 2: Autenticación (CU-01) y Registro (CU-02)
// -----------------------------------------------------------
console.log('\n\x1b[36m▶ TEST SUITE 2: Autenticación (CU-01) y Registro (CU-02)\x1b[0m');

// Login inválido
mockDOM.getElementById('email').value = 'noexiste@maqui.com';
mockDOM.getElementById('password').value = 'wrongpass';
app.login();
assert(app.getCurrentUser() === null, 'Rechaza inicio de sesión con credenciales incorrectas');

// Bloqueo de compras y carrito sin sesión iniciada
const stockBeforeGuest = initialInventory[0].stock;
const guestBuy = app.buy(initialInventory[0].id);
assert(guestBuy === false && initialInventory[0].stock === stockBeforeGuest, 'Bloquea compras directas si no hay sesión iniciada');
const guestCart = app.addToCart(initialInventory[0].id);
assert(guestCart === false, 'Bloquea adición al carrito si no hay sesión iniciada');

// Registro de nuevo usuario (CU-02)
mockDOM.getElementById('reg-name').value = 'Constructora Andina';
mockDOM.getElementById('reg-email').value = 'contacto@andina.com';
mockDOM.getElementById('reg-password').value = 'clave123';
const usersCountBefore = initialUsers.length;
app.register();

assert(initialUsers.length === usersCountBefore + 1, 'CU-02: El nuevo usuario se almacena en el array temporal');
const registered = initialUsers.find(u => u.email === 'contacto@andina.com');
assert(registered && registered.role === 'client', 'CU-02: El nuevo usuario adquiere rol de cliente');
assert(app.getCurrentUser() && app.getCurrentUser().email === 'contacto@andina.com', 'CU-02: Inicia sesión automáticamente tras el registro');

// Evitar correos duplicados
mockDOM.getElementById('reg-name').value = 'Otra Empresa';
mockDOM.getElementById('reg-email').value = 'contacto@andina.com';
mockDOM.getElementById('reg-password').value = 'otra123';
const countBeforeDuplicate = initialUsers.length;
app.register();
assert(initialUsers.length === countBeforeDuplicate, 'CU-02: Bloquea registro con correo ya existente');

// -----------------------------------------------------------
// TEST SUITE 3: Catálogo y Facturación Formal (CU-04 y CU-05)
// -----------------------------------------------------------
console.log('\n\x1b[36m▶ TEST SUITE 3: Compra y Generación de Factura (CU-05)\x1b[0m');

const itemToBuy = initialInventory[0];
const stockInitial = itemToBuy.stock;

app.buy(itemToBuy.id);
assert(itemToBuy.stock === stockInitial - 1, 'CU-05: El stock disminuye en 1 al realizar la compra');

const invNumber = mockDOM.getElementById('inv-number').textContent;
const invCustomer = mockDOM.getElementById('inv-customer-name').textContent;
const invTotal = mockDOM.getElementById('inv-grand-total').textContent;

assert(invNumber.startsWith('FAC-2026-'), 'CU-05: Genera número de factura formal aleatorio (FAC-2026-XXXXX)');
assert(invCustomer === 'Constructora Andina', 'CU-05: La factura refleja el nombre del cliente autenticado');
assert(invTotal.includes('$'), 'CU-05: El monto total se formatea correctamente en moneda USD');

// Compra sin stock disponible
itemToBuy.stock = 0;
app.buy(itemToBuy.id);
assert(itemToBuy.stock === 0, 'CU-05: No permite compras si el stock es 0 (Sin Stock)');

// -----------------------------------------------------------
// TEST SUITE 4: Gestión de Inventario Administrador (CU-09)
// -----------------------------------------------------------
console.log('\n\x1b[36m▶ TEST SUITE 4: Agregar y Eliminar Maquinaria (CU-09)\x1b[0m');

// Agregar maquinaria
mockDOM.getElementById('new-machine-name').value = 'Motoniveladora Cat 140M';
mockDOM.getElementById('new-machine-price').value = '220000';
mockDOM.getElementById('new-machine-stock').value = '2';

const invLengthBefore = initialInventory.length;
app.addMachine();

assert(initialInventory.length === invLengthBefore + 1, 'CU-09: La nueva maquinaria se agrega al array inventory');
assert(initialInventory[0].name === 'Motoniveladora Cat 140M', 'CU-09: El nuevo ítem contiene el nombre ingresado');
assert(initialInventory[0].price === 220000, 'CU-09: El precio se guarda como número válido');
assert(initialInventory[0].stock === 2, 'CU-09: El stock se almacena correctamente');

// Validación de campos inválidos
mockDOM.getElementById('new-machine-name').value = '';
mockDOM.getElementById('new-machine-price').value = '-500';
mockDOM.getElementById('new-machine-stock').value = '-1';
const lengthBeforeInvalid = initialInventory.length;
app.addMachine();
assert(initialInventory.length === lengthBeforeInvalid, 'CU-09: Rechaza agregar maquinaria con datos inválidos');

// Eliminar maquinaria con confirmación
const addedId = initialInventory[0].id;
app.showConfirmDialog(({ onConfirm }) => onConfirm());
app.remove(addedId);
assert(initialInventory.some(i => i.id === addedId) === false, 'Elimina correctamente la maquinaria seleccionada');

// -----------------------------------------------------------
// TEST SUITE 5: Carrito de Compras (Gestión y Control de Stock)
// -----------------------------------------------------------
console.log('\n\x1b[36m▶ TEST SUITE 5: Carrito de Compras Multiproducto\x1b[0m');

// Asegurar stock para pruebas de carrito
const testItem1 = initialInventory.find(i => i.id === 2);
const testItem2 = initialInventory.find(i => i.id === 3);
testItem1.stock = 5;
testItem2.stock = 10;

app.clearCart();
assert(app.getCart().length === 0, 'El carrito inicia vacío tras clearCart()');

// Agregar productos al carrito
const stockItem1Init = testItem1.stock;
app.addToCart(testItem1.id, 2);
assert(app.getCart().length === 1, 'Agrega primer producto al carrito');
assert(app.getCart()[0].qty === 2, 'Registra cantidad seleccionada (2 unidades)');
assert(testItem1.stock === stockItem1Init - 2, 'Disminuye el stock del inventario en tiempo real al agregar al carrito');

// Agregar producto repetido incrementa cantidad y sigue disminuyendo stock
app.addToCart(testItem1.id, 1);
assert(app.getCart().length === 1 && app.getCart()[0].qty === 3, 'Sumar producto existente incrementa la cantidad acumulada');
assert(testItem1.stock === stockItem1Init - 3, 'Sigue reduciendo el stock físico disponible en el catálogo');

// Validar límite de stock
app.addToCart(testItem1.id, 999);
assert(app.getCart()[0].qty === 3, 'Bloquea adición al carrito si supera el stock disponible');

// Agregar segundo producto
const stockItem2Init = testItem2.stock;
app.addToCart(testItem2.id, 1);
assert(app.getCart().length === 2, 'Permite múltiples maquinarias distintas en el carrito');
assert(testItem2.stock === stockItem2Init - 1, 'Disminuye stock del segundo equipo añadido');

// Totales del carrito
const totals = app.getCartTotals();
const expectedSubtotal = (testItem1.price * 3) + (testItem2.price * 1);
assert(totals.subtotal === expectedSubtotal, `Calcula subtotal correctamente ($${totals.subtotal})`);
assert(totals.total === expectedSubtotal - totals.discount, 'Calcula total final aplicando descuentos');

// Remover del carrito y verificar restauración del stock
app.removeFromCart(testItem1.id);
assert(app.getCart().length === 1 && app.getCart()[0].id === testItem2.id, 'Elimina ítem específico del carrito');
assert(testItem1.stock === stockItem1Init, 'Restaura el stock al inventario al retirar producto del carrito');

// -----------------------------------------------------------
// TEST SUITE 6: Pasarela de Pagos Multimodal y Procesamiento
// -----------------------------------------------------------
console.log('\n\x1b[36m▶ TEST SUITE 6: Pasarela de Pagos Multimodal\x1b[0m');

// Intentar pagar con carrito vacío
app.clearCart();
const payEmptyResult = app.processPayment();
assert(payEmptyResult === false, 'Rechaza procesar pago si el carrito está vacío');

// Agregar ítem y pagar
const stockBeforeAdd = testItem2.stock;
app.addToCart(testItem2.id, 1);
assert(testItem2.stock === stockBeforeAdd - 1, 'Deduce stock en tiempo real al ingresar al carrito');
const historyCountBefore = app.getOrderHistory().length;

// Simular datos de pasarela en DOM mock
mockDOM.getElementById('card-number').value = '4532 8912 3456 7890';
mockDOM.getElementById('card-name').value = 'Constructora Andina SAS';
mockDOM.getElementById('card-exp').value = '12/28';
mockDOM.getElementById('card-cvv').value = '789';

app.processPayment();

assert(app.getCart().length === 0, 'Vacía el carrito de compras una vez completado el pago');
assert(app.getOrderHistory().length === historyCountBefore + 1, 'Registra la nueva orden en el historial de transacciones');

// -----------------------------------------------------------
// TEST SUITE 7: Trazabilidad e Historial Previo de Compras
// -----------------------------------------------------------
console.log('\n\x1b[36m▶ TEST SUITE 7: Trazabilidad e Historial Previo de Compras\x1b[0m');

const latestOrder = app.getOrderHistory()[0];
assert(latestOrder.orderId.startsWith('ORD-2026-'), 'La orden generada tiene identificador corporativo ORD-2026-XXXX');
assert(latestOrder.invoiceNumber.startsWith('FAC-2026-'), 'Vincula factura formal válida a la orden');
assert(latestOrder.items.length >= 1, 'El historial preserva el desglose de productos adquiridos');
assert(latestOrder.status === 'Aprobado y Despachado', 'El estado de la orden refleja aprobación financiera');

// -----------------------------------------------------------
// Resumen Final
// -----------------------------------------------------------
console.log('\n======================================================');
console.log(`  RESUMEN: ${passed} pruebas exitosas, ${failed} fallidas`);
console.log('======================================================\n');

if (failed > 0) {
    process.exit(1);
}
