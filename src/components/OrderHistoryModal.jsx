import React from 'react';

export default function OrderHistoryModal({
    isOpen,
    orderHistory,
    onClose,
    onViewInvoice
}) {
    if (!isOpen) return null;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="modal-backdrop open" onClick={onClose}>
            <div className="modal-container modal-lg" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h3 className="modal-title">Historial de Compras y Pedidos</h3>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                            Trazabilidad de adquisiciones, contratos de maquinaria y facturación emitida
                        </div>
                    </div>
                    <button type="button" className="btn-close" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto', padding: '1.5rem' }}>
                    {orderHistory.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--cat-gray-400)', marginBottom: '0.75rem' }}>[ HISTORIAL VACÍO ]</div>
                            <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>No tienes compras registradas aún</h4>
                            <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 1.5rem auto' }}>
                                Cuando realices una compra directa o a través de la pasarela de pagos con el carrito, tus órdenes y facturas aparecerán aquí.
                            </p>
                            <button type="button" className="btn btn-primary" onClick={onClose}>
                                Explorar Maquinaria
                            </button>
                        </div>
                    ) : (
                        <div className="history-orders-list">
                            {orderHistory.map((order, idx) => (
                                <div className="history-order-card" key={order.orderId || idx}>
                                    <div className="history-order-header">
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                                                <span className="order-id-badge">{order.orderId}</span>
                                                <span className="invoice-tag">{order.invoiceNumber}</span>
                                                <span className="order-status-badge approved">{order.status || 'Aprobado y Despachado'}</span>
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.4rem' }}>
                                                Fecha: <strong>{order.date}</strong> · Cliente: <strong>{order.customerName}</strong>
                                            </div>
                                        </div>

                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Monto Total</div>
                                            <div className="order-total-price">{formatCurrency(order.total)}</div>
                                        </div>
                                    </div>

                                    {/* Desglose de ítems comprados */}
                                    <div className="history-items-table-wrapper">
                                        <table className="history-items-table">
                                            <thead>
                                                <tr>
                                                    <th>Maquinaria Adquirida</th>
                                                    <th style={{ textAlign: 'center' }}>Cantidad</th>
                                                    <th style={{ textAlign: 'right' }}>Valor Unitario</th>
                                                    <th style={{ textAlign: 'right' }}>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item, itemIdx) => (
                                                    <tr key={itemIdx}>
                                                        <td>
                                                            <strong>{item.name}</strong>
                                                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Garantía oficial y alistamiento incluido</div>
                                                        </td>
                                                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.qty || 1}</td>
                                                        <td style={{ textAlign: 'right' }}>{formatCurrency(item.price)}</td>
                                                        <td style={{ textAlign: 'right', fontWeight: 700 }}>{formatCurrency(item.price * (item.qty || 1))}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Footer de la tarjeta con método de pago y botón ver factura */}
                                    <div className="history-order-footer">
                                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>
                                            Método: <strong style={{ color: '#fff' }}>{order.paymentMethod}</strong>
                                            {order.authCode && <span style={{ marginLeft: '0.5rem', color: 'var(--gray-400)' }}>· Cód: {order.authCode}</span>}
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn btn-outline" 
                                            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                                            onClick={() => onViewInvoice(order)}
                                        >
                                            Ver Factura Formal
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-outline" onClick={onClose}>
                        Cerrar Historial
                    </button>
                </div>
            </div>
        </div>
    );
}
