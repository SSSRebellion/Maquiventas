import React from 'react';

export default function Navbar({
    currentUser,
    activeTab,
    setActiveTab,
    cartCount,
    onOpenCart,
    onOpenHistory,
    onOpenLogin,
    onOpenRegister,
    onLogout,
    onSearchChange,
    onCategorySelect
}) {
    return (
        <header className="navbar cat-navbar">
            {/* Fila Superior: Marca CAT + Buscador Dual + Metadatos y Acciones */}
            <div className="cat-nav-top-row">
                {/* Logo Oficial Dealer CAT */}
                <a 
                    href="#catalog" 
                    className="cat-brand-wrapper" 
                    onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }}
                    title="Maqui Ventas - Distribuidor Autorizado"
                >
                    <div className="cat-brand-dealer">MAQUI VENTAS</div>
                    <div className="cat-brand-emblem">CAT<span className="cat-triangle">▲</span></div>
                </a>

                {/* Barra de Búsqueda Dual Estilo GECOLSA CAT */}
                <div className="cat-search-dual-bar">
                    <button 
                        type="button" 
                        className="cat-search-addon-btn"
                        onClick={() => setActiveTab('catalog')}
                    >
                        <span>Agregar equipo</span>
                        <span style={{ fontSize: '0.65rem', marginLeft: '4px' }}>▼</span>
                    </button>
                    <input 
                        type="text" 
                        className="cat-search-field" 
                        placeholder="Buscar por número o nombre de maquinaria..." 
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    />
                    <button 
                        type="button" 
                        className="cat-search-btn-submit"
                        onClick={() => setActiveTab('catalog')}
                        title="Buscar maquinaria"
                    >
                        Buscar
                    </button>
                </div>

                {/* Acciones de Cabecera Derecha */}
                <div className="cat-nav-right">
                    <div className="cat-nav-meta-item">
                        <div style={{ fontSize: '0.75rem', lineHeight: 1.2 }}>
                            <div style={{ fontWeight: 700, color: '#fff' }}>Sede Central Bogotá</div>
                            <div style={{ color: '#94a3b8' }}>Bogotá, Cundinamarca</div>
                        </div>
                    </div>

                    {/* Botón Historial de Órdenes */}
                    <button 
                        type="button" 
                        className="cat-nav-link-btn" 
                        onClick={onOpenHistory}
                        title="Ver Historial Previo de Compras"
                    >
                        <span>Historial</span>
                    </button>

                    {/* Botón Carrito de Compras */}
                    <button 
                        type="button" 
                        className="cart-nav-btn cat-cart-btn" 
                        onClick={onOpenCart}
                        title="Ver carrito de compras"
                    >
                        <span>Carrito</span>
                        {cartCount > 0 && (
                            <span className="cart-count-badge">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Estado de Usuario / Admin */}
                    {currentUser ? (
                        <div className="user-nav-profile" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div className="user-pill cat-user-pill">
                                <span style={{ fontWeight: 700 }}>{currentUser.name}</span>
                                <span className={`role-badge ${currentUser.role}`}>
                                    {currentUser.role === 'admin' ? 'Admin' : 'Cliente'}
                                </span>
                            </div>
                            {currentUser.role === 'admin' && (
                                <button 
                                    className={`btn btn-sm ${activeTab === 'admin' ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setActiveTab(activeTab === 'admin' ? 'catalog' : 'admin')}
                                    style={{ color: '#fff', borderColor: '#ffcd00' }}
                                >
                                    {activeTab === 'admin' ? 'Ver Catálogo' : 'Panel Admin'}
                                </button>
                            )}
                            <button 
                                className="btn btn-outline btn-sm cat-logout-btn" 
                                onClick={onLogout}
                                title="Cerrar sesión"
                            >
                                <span>Salir</span>
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <button className="btn btn-outline btn-sm cat-nav-link-btn" onClick={onOpenLogin}>
                                Iniciar sesión
                            </button>
                            <button className="btn btn-primary btn-sm" onClick={onOpenRegister}>
                                Registrarse
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Sub-barra de Navegación CAT */}
            <div className="cat-nav-sub-row">
                <div className="cat-sub-left">
                    <span 
                        className="cat-sub-item active" 
                        onClick={() => onCategorySelect && onCategorySelect('all')}
                    >
                        Categorías <small>▼</small>
                    </span>
                    <span 
                        className="cat-sub-item" 
                        onClick={() => onCategorySelect && onCategorySelect('Movimiento de Tierras')}
                    >
                        Movimiento de Tierras
                    </span>
                    <span 
                        className="cat-sub-item" 
                        onClick={() => onCategorySelect && onCategorySelect('Agrícola')}
                    >
                        Agrícola
                    </span>
                    <span 
                        className="cat-sub-item" 
                        onClick={() => onCategorySelect && onCategorySelect('Carga y Logística')}
                    >
                        Carga & Bodega
                    </span>
                    <span 
                        className="cat-sub-item" 
                        onClick={() => onCategorySelect && onCategorySelect('Pavimentación y Vías')}
                    >
                        Pavimentación
                    </span>
                </div>
                <div className="cat-sub-right">
                    <span className="cat-sub-link" onClick={() => setActiveTab('catalog')}>
                        Equipos en Patio
                    </span>
                    <span className="cat-sub-link" onClick={onOpenHistory}>
                        Historial de pedidos
                    </span>
                    <span className="cat-sub-link" onClick={onOpenHistory}>
                        Centro de ayuda
                    </span>
                </div>
            </div>
        </header>
    );
}
