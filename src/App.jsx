import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import Catalog from './components/Catalog';
import CartDrawer from './components/CartDrawer';
import PaymentGatewayModal from './components/PaymentGatewayModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import InvoiceModal from './components/InvoiceModal';
import DetailModal from './components/DetailModal';
import AdminPanel from './components/AdminPanel';
import AuthModals from './components/AuthModals';
import ToastContainer from './components/ToastContainer';

import { initialUsers, initialInventory, initialOrderHistory } from './data/initialData';

export default function App() {
    const [users, setUsers] = useState(initialUsers);
    const [currentUser, setCurrentUser] = useState(null); // Inicia como invitado sin sesión
    const [inventory, setInventory] = useState(initialInventory);
    const [cart, setCart] = useState([]);
    const [orderHistory, setOrderHistory] = useState(initialOrderHistory);
    const [toasts, setToasts] = useState([]);

    const [activeTab, setActiveTab] = useState('catalog');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isGatewayOpen, setIsGatewayOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [detailMachine, setDetailMachine] = useState(null);
    const [invoiceData, setInvoiceData] = useState(null);

    // Sistema de Notificaciones Toast
    const showToast = (message, type = 'info', title = '') => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type, title }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    };

    const handleCloseToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // --- Carrito de Compras ---
    const handleAddToCart = (machine, qty = 1) => {
        if (!currentUser) {
            setIsLoginOpen(true);
            showToast('Debes iniciar sesión para agregar maquinaria al carrito y realizar compras.', 'warning', 'Inicio de Sesión Requerido');
            return;
        }

        const invItem = inventory.find(i => i.id === machine.id);
        if (!invItem || invItem.stock <= 0) {
            showToast(`"${machine.name}" se encuentra sin stock actualmente.`, 'warning', 'Sin Stock');
            return;
        }

        if (qty > invItem.stock) {
            showToast(`Solo quedan ${invItem.stock} unidades disponibles de "${machine.name}".`, 'warning', 'Límite de Stock');
            return;
        }

        // DISMINUIR STOCK EN TIEMPO REAL DEL INVENTARIO
        setInventory(prev => prev.map(i => 
            i.id === machine.id ? { ...i, stock: i.stock - qty } : i
        ));

        setCart(prev => {
            const existing = prev.find(item => item.id === machine.id);
            if (existing) {
                return prev.map(item => item.id === machine.id ? { ...item, qty: item.qty + qty } : item);
            } else {
                return [...prev, {
                    id: machine.id,
                    name: machine.name,
                    price: machine.price,
                    image: machine.image,
                    category: machine.category,
                    qty: qty
                }];
            }
        });

        setIsCartOpen(true);
        showToast(`"${machine.name}" añadido al carrito. Quedan ${invItem.stock - qty} unidades en stock.`, 'success', 'Equipo Añadido');
    };

    const handleUpdateCartQty = (id, delta) => {
        const cartItem = cart.find(i => i.id === id);
        if (!cartItem) return;

        if (delta > 0) {
            const invItem = inventory.find(i => i.id === id);
            if (!invItem || invItem.stock <= 0) {
                showToast(`No hay más unidades físicas disponibles de "${cartItem.name}".`, 'warning', 'Stock Agotado');
                return;
            }
            setInventory(prev => prev.map(i => i.id === id ? { ...i, stock: i.stock - 1 } : i));
            setCart(prev => prev.map(ci => ci.id === id ? { ...ci, qty: ci.qty + 1 } : ci));
        } else if (delta < 0) {
            if (cartItem.qty <= 1) {
                handleRemoveFromCart(id);
                return;
            }
            setInventory(prev => prev.map(i => i.id === id ? { ...i, stock: i.stock + 1 } : i));
            setCart(prev => prev.map(ci => ci.id === id ? { ...ci, qty: ci.qty - 1 } : ci));
        }
    };

    const handleRemoveFromCart = (id) => {
        const cartItem = cart.find(i => i.id === id);
        if (!cartItem) return;

        setInventory(prev => prev.map(i => i.id === id ? { ...i, stock: i.stock + cartItem.qty } : i));
        setCart(prev => prev.filter(i => i.id !== id));
        showToast(`"${cartItem.name}" fue retirado del carrito. Stock restaurado.`, 'info');
    };

    const handleClearCart = () => {
        setInventory(prev => prev.map(invItem => {
            const cartItem = cart.find(c => c.id === invItem.id);
            return cartItem ? { ...invItem, stock: invItem.stock + cartItem.qty } : invItem;
        }));
        setCart([]);
        showToast('El carrito de compras ha sido vaciado y el stock fue restaurado.', 'info');
    };

    // --- Compra Directa (CU-05) ---
    const handleDirectBuy = (machine) => {
        if (!currentUser) {
            setIsLoginOpen(true);
            showToast('Debes iniciar sesión para comprar y facturar maquinaria.', 'warning', 'Inicio de Sesión Requerido');
            return;
        }

        if (machine.stock <= 0) {
            showToast(`"${machine.name}" está agotada.`, 'warning', 'Sin Stock');
            return;
        }

        // Descontar inventario
        setInventory(prev => prev.map(i => 
            i.id === machine.id ? { ...i, stock: i.stock - 1 } : i
        ));

        const formattedDate = new Date().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const randomFacturaNum = 'FAC-2026-' + Math.floor(10000 + Math.random() * 90000);
        const randomOrderId = 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000);

        const newInvoice = {
            orderId: randomOrderId,
            invoiceNumber: randomFacturaNum,
            customerName: currentUser ? currentUser.name : 'Cliente Directo',
            customerEmail: currentUser ? currentUser.email : 'cliente@maqui.com',
            date: formattedDate,
            items: [
                { id: machine.id, name: machine.name, price: machine.price, qty: 1 }
            ],
            subtotal: machine.price,
            discount: 0,
            total: machine.price,
            paymentMethod: 'Facturación Directa Comercial MaquiPro',
            authCode: 'DIRECT-' + Math.floor(100000 + Math.random() * 900000),
            status: 'Aprobado y Despachado'
        };

        // Guardar en Historial de Órdenes
        setOrderHistory(prev => [newInvoice, ...prev]);
        setInvoiceData(newInvoice);
        showToast(`Compra realizada. Factura ${randomFacturaNum} generada.`, 'success', '¡Compra Exitosa!');
    };

    // --- Procesamiento de Pasarela de Pago ---
    const handlePaymentSuccess = (paymentDetails) => {
        // La compra se confirma. El stock ya fue reservado y deducido en tiempo real al agregar al carrito.
        const formattedDate = new Date().toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const randomFacturaNum = 'FAC-2026-' + Math.floor(10000 + Math.random() * 90000);
        const randomOrderId = 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000);

        const newOrder = {
            orderId: randomOrderId,
            invoiceNumber: randomFacturaNum,
            customerName: currentUser ? currentUser.name : 'Cliente Corporativo',
            customerEmail: currentUser ? currentUser.email : 'cliente@maqui.com',
            date: formattedDate,
            items: paymentDetails.items,
            subtotal: paymentDetails.subtotal,
            discount: paymentDetails.discount,
            total: paymentDetails.total,
            paymentMethod: paymentDetails.method,
            authCode: paymentDetails.authCode,
            status: 'Aprobado y Despachado'
        };

        // Registrar en historial
        setOrderHistory(prev => [newOrder, ...prev]);
        setCart([]);
        setIsGatewayOpen(false);
        setIsCartOpen(false);
        setInvoiceData(newOrder);

        showToast(`Pago aprobado por ${paymentDetails.method}. Factura ${randomFacturaNum} generada.`, 'success', '¡Transacción Exitosa!');
    };

    // --- Gestión de Inventario Administrador (CU-09) ---
    const handleAddMachine = ({ name, price, stock, category, desc, brand, year, image }) => {
        const newId = inventory.length > 0 ? Math.max(...inventory.map(i => i.id)) + 1 : 1;
        const photo = image || inventory[0].image;
        const newMachine = {
            id: newId,
            name,
            price,
            stock,
            category,
            specs: desc || 'Garantía 24 Meses · Alistamiento Incluido',
            details: {
                brand: brand || 'Maqui Pro Tech',
                year: year || 2024,
                engineHours: '0 hrs (Nueva)',
                power: 'Tier 4 Final Heavy Duty',
                operatingWeight: 'Alta capacidad operacional',
                transmission: 'Automática Inteligente',
                warranty: '24 Meses Oficial'
            },
            image: photo,
            gallery: [photo],
            placeholderIcon: ''
        };

        setInventory(prev => [newMachine, ...prev]);
        showToast(`Maquinaria "${name}" registrada exitosamente con su fotografía.`, 'success', 'Equipo Registrado');
    };

    const handleDeleteMachine = (id) => {
        const item = inventory.find(i => i.id === id);
        setInventory(prev => prev.filter(i => i.id !== id));
        if (item) {
            showToast(`"${item.name}" fue eliminada del inventario.`, 'info');
        }
    };

    const handleAdjustStock = (id, delta) => {
        setInventory(prev => prev.map(item => {
            if (item.id === id) {
                const newStock = item.stock + delta;
                if (newStock < 0) {
                    showToast('El stock no puede ser menor a cero.', 'warning');
                    return item;
                }
                return { ...item, stock: newStock };
            }
            return item;
        }));
    };

    // --- Autenticación ---
    const handleLogin = (email, pass) => {
        const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.pass === pass);
        if (found) {
            setCurrentUser(found);
            setIsLoginOpen(false);
            showToast(`Bienvenido de nuevo, ${found.name}.`, 'success', 'Sesión Iniciada');
            if (found.role === 'admin') {
                setActiveTab('admin');
            }
        } else {
            showToast('Credenciales incorrectas. Verifique su correo o contraseña.', 'error', 'Error de Autenticación');
        }
    };

    const handleRegister = (name, email, pass) => {
        if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
            showToast('Ya existe una cuenta registrada con este correo electrónico.', 'warning', 'Correo Duplicado');
            return;
        }

        const newUser = { name, email, pass, role: 'client' };
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        setIsRegisterOpen(false);
        showToast(`Cuenta para "${name}" creada exitosamente.`, 'success', 'Registro Exitoso');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setActiveTab('catalog');
        showToast('Sesión cerrada correctamente.', 'info');
    };

    const cartCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

    return (
        <div className="app-container">
            <div className="industrial-ribbon"></div>

            {/* Barra de Navegación Estilo Caterpillar */}
            <Navbar 
                currentUser={currentUser}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                cartCount={cartCount}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenHistory={() => setIsHistoryOpen(true)}
                onOpenLogin={() => setIsLoginOpen(true)}
                onOpenRegister={() => setIsRegisterOpen(true)}
                onLogout={handleLogout}
            />

            {/* Vista Principal */}
            <main className="container">
                {activeTab === 'catalog' ? (
                    <>
                        <HeroBanner onExploreCatalog={() => {
                            const el = document.getElementById('catalog-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }} />
                        <Catalog 
                            inventory={inventory}
                            onAddToCart={(item) => handleAddToCart(item, 1)}
                            onDirectBuy={handleDirectBuy}
                            onOpenDetail={(item) => setDetailMachine(item)}
                        />
                    </>
                ) : (
                    <AdminPanel 
                        inventory={inventory}
                        onAddMachine={handleAddMachine}
                        onDeleteMachine={handleDeleteMachine}
                        onAdjustStock={handleAdjustStock}
                    />
                )}

                {/* BANNER OFICIAL CAT DE ASISTENCIA TÉCNICA */}
                <div className="cat-bottom-help-banner">
                    <div className="cat-help-container">
                        <div className="cat-help-text-group">
                            <h3 className="cat-help-title">¿Necesita ayuda para encontrar maquinaria o piezas?</h3>
                            <p className="cat-help-subtitle">
                                Conozca más detalles, planes de financiación Leasing y asesoría con nuestros especialistas certificados.
                            </p>
                        </div>
                        <div className="cat-help-btn-group">
                            <button 
                                type="button" 
                                className="cat-help-white-btn" 
                                onClick={() => {
                                    setActiveTab('catalog');
                                    const el = document.getElementById('catalog-section');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Ver Catálogo de Maquinaria
                            </button>
                            <button 
                                type="button" 
                                className="cat-help-yellow-btn" 
                                onClick={() => setIsHistoryOpen(true)}
                            >
                                Historial de Pedidos
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* ==================== FOOTER CORPORATIVO MAQUI VENTAS ==================== */}
            <footer className="cat-footer">
                <div className="cat-footer-container">
                    <div className="cat-footer-brand">
                        <div className="cat-footer-brand-name">Maqui Ventas</div>
                        <p>Distribuidora autorizada de maquinaria pesada industrial. Respaldo técnico, garantía certificada y financiación empresarial.</p>
                        <p style={{ fontSize: '0.78rem', color: '#666' }}>NIT: 900.584.219-4 · Régimen Común</p>
                    </div>
                    <div className="cat-footer-col">
                        <h4>Líneas</h4>
                        <ul>
                            <li><span>Excavadoras</span></li>
                            <li><span>Línea Agrícola</span></li>
                            <li><span>Montacargas</span></li>
                            <li><span>Pavimentación</span></li>
                        </ul>
                    </div>
                    <div className="cat-footer-col">
                        <h4>Servicios</h4>
                        <ul>
                            <li><span>Garantía Certificada</span></li>
                            <li><span>Soporte Técnico 24/7</span></li>
                            <li><span>Financiación Leasing</span></li>
                            <li><span>Despacho en Cama Baja</span></li>
                        </ul>
                    </div>
                    <div className="cat-footer-col">
                        <h4>Contacto</h4>
                        <ul>
                            <li><span>Bogotá, Colombia</span></li>
                            <li><span>+57 (601) 742-0000</span></li>
                            <li><span>ventas@maqui.com</span></li>
                            <li><span>Lun - Vie 7:00 - 18:00</span></li>
                        </ul>
                    </div>
                </div>
                <div className="cat-footer-bottom">
                    <span>© 2026 Maqui Ventas S.A.S. Todos los derechos reservados.</span>
                    <span>Distribución y respaldo para la industria colombiana</span>
                </div>
            </footer>

            {/* Slide-over Carrito de Compras */}
            <CartDrawer 
                isOpen={isCartOpen}
                cart={cart}
                onClose={() => setIsCartOpen(false)}
                onUpdateQty={handleUpdateCartQty}
                onRemoveItem={handleRemoveFromCart}
                onClearCart={handleClearCart}
                onCheckout={() => {
                    setIsCartOpen(false);
                    setIsGatewayOpen(true);
                }}
                onOpenHistory={() => {
                    setIsCartOpen(false);
                    setIsHistoryOpen(true);
                }}
            />

            {/* Modal Pasarela de Pagos Multimodal */}
            <PaymentGatewayModal 
                isOpen={isGatewayOpen}
                cart={cart}
                currentUser={currentUser}
                onClose={() => setIsGatewayOpen(false)}
                onPaymentSuccess={handlePaymentSuccess}
                onOpenHistory={() => {
                    setIsGatewayOpen(false);
                    setIsHistoryOpen(true);
                }}
            />

            {/* Modal Historial Previo de Compras */}
            <OrderHistoryModal 
                isOpen={isHistoryOpen}
                orderHistory={orderHistory}
                onClose={() => setIsHistoryOpen(false)}
                onViewInvoice={(order) => {
                    setInvoiceData(order);
                }}
            />

            {/* Modal Ficha Técnica Detallada */}
            <DetailModal 
                isOpen={Boolean(detailMachine)}
                machine={detailMachine}
                onClose={() => setDetailMachine(null)}
                onAddToCart={(item) => handleAddToCart(item, 1)}
                onDirectBuy={handleDirectBuy}
            />

            {/* Modal Factura Formal (CU-05) */}
            <InvoiceModal 
                isOpen={Boolean(invoiceData)}
                invoiceData={invoiceData}
                onClose={() => setInvoiceData(null)}
            />

            {/* Modales de Autenticación */}
            <AuthModals 
                loginModalOpen={isLoginOpen}
                registerModalOpen={isRegisterOpen}
                onCloseLogin={() => setIsLoginOpen(false)}
                onCloseRegister={() => setIsRegisterOpen(false)}
                onLogin={handleLogin}
                onRegister={handleRegister}
                onSwitchToRegister={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                }}
                onSwitchToLogin={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                }}
            />

            {/* Notificaciones Flotantes Toast */}
            <ToastContainer toasts={toasts} onCloseToast={handleCloseToast} />
        </div>
    );
}
