import React from 'react';

export default function CartDrawer({
    isOpen,
    cart,
    onClose,
    onUpdateQty,
    onRemoveItem,
    onClearCart,
    onCheckout,
    onOpenHistory
}) {
    if (!isOpen) return null;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    const discount = totalItems >= 2 ? Math.round(subtotal * 0.05) : 0;
    const total = subtotal - discount;

    return (
        <div className="cart-drawer-overlay open" onClick={onClose}>
            <div className="cart-drawer open" onClick={(e) => e.stopPropagation()}>
                {/* Header del Carrito */}
                <div className="cart-header">
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#fff' }}>Carrito de Compras</h3>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                            {totalItems} {totalItems === 1 ? 'maquinaria' : 'maquinarias'} en orden
                        </div>
                    </div>
                    <button type="button" className="cart-close-btn" onClick={onClose} title="Cerrar Carrito">
                        ✕
                    </button>
                </div>

                {/* Lista de Maquinarias en Carrito */}
                <div className="cart-items-container">
                    {cart.length === 0 ? (
                        <div className="cart-empty-state">
                            <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--cat-gray-400)', marginBottom: '0.75rem' }}>[ CARRITO VACÍO ]</div>
                            <h4 style={{ color: '#fff', margin: '0 0 0.5rem 0' }}>Tu carrito está vacío</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', maxWidth: '240px', margin: '0 auto 1.2rem auto' }}>
                                Explora nuestro catálogo y agrega excavadoras, tractores o montacargas para cotizar o comprar.
                            </p>
                            <button type="button" className="btn btn-outline" onClick={onClose}>
                                Explorar Catálogo
                            </button>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div className="cart-item-card" key={item.id}>
                                <img src={item.image} alt={item.name} className="cart-item-thumb" />
                                <div className="cart-item-info">
                                    <h5 className="cart-item-name">{item.name}</h5>
                                    <div className="cart-item-price-unit">{formatCurrency(item.price)} c/u</div>
                                    <div className="cart-item-controls">
                                        <div className="qty-control-box">
                                            <button 
                                                type="button" 
                                                className="qty-btn" 
                                                onClick={() => onUpdateQty(item.id, -1)}
                                            >
                                                -
                                            </button>
                                            <span className="qty-value">{item.qty}</span>
                                            <button 
                                                type="button" 
                                                className="qty-btn" 
                                                onClick={() => onUpdateQty(item.id, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            type="button" 
                                            className="cart-item-remove-btn" 
                                            onClick={() => onRemoveItem(item.id)}
                                            title="Eliminar del Carrito"
                                            style={{ fontSize: '0.75rem', fontWeight: 700 }}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-item-total-col">
                                    {formatCurrency(item.price * item.qty)}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer y Totales */}
                {cart.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary-card">
                            <div className="cart-summary-row">
                                <span>Subtotal Equipos ({totalItems} uds)</span>
                                <span>{formatCurrency(subtotal)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="cart-summary-row discount-row" style={{ color: '#22c55e' }}>
                                    <span>Descuento Corporativo Flota (5%)</span>
                                    <span>-{formatCurrency(discount)}</span>
                                </div>
                            )}
                            <div className="cart-summary-row total-row">
                                <span>Total Inversión</span>
                                <span className="cart-total-highlight">{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            <button 
                                type="button" 
                                className="btn btn-primary" 
                                onClick={onCheckout}
                                style={{ width: '100%', padding: '0.85rem' }}
                            >
                                Proceder a la Pasarela de Pago
                            </button>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button 
                                    type="button" 
                                    className="btn btn-outline" 
                                    onClick={onOpenHistory}
                                    style={{ flex: 1, fontSize: '0.8rem' }}
                                >
                                    Ver Historial Previo
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-outline" 
                                    onClick={onClearCart}
                                    style={{ flex: 1, fontSize: '0.8rem', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.4)' }}
                                >
                                    Vaciar Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
