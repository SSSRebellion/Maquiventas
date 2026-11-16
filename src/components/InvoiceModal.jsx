import React from 'react';

export default function InvoiceModal({
    isOpen,
    invoiceData,
    onClose
}) {
    if (!isOpen || !invoiceData) return null;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const firstItem = invoiceData.items && invoiceData.items[0] 
        ? invoiceData.items[0] 
        : { name: 'Maquinaria Pesada', price: invoiceData.total, qty: 1 };

    return (
        <div className="modal-backdrop open" id="invoice-modal" onClick={onClose}>
            <div className="modal-container modal-lg printable-invoice-box" onClick={(e) => e.stopPropagation()}>
                {/* Header Factura */}
                <div className="invoice-header-strip">
                    <div className="invoice-brand">
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.3rem', color: '#111827', fontFamily: 'Chakra Petch, sans-serif' }}>
                                MAQUI VENTAS S.A.S.
                            </h2>
                            <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>NIT: 900.548.129-4 · Gran Contribuyente Resolución DIAN 0024</div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div className="invoice-doc-type">FACTURA ELECTRÓNICA DE VENTA</div>
                        <div className="invoice-number-tag" id="inv-number">{invoiceData.invoiceNumber}</div>
                    </div>
                </div>

                <div className="invoice-body-area">
                    {/* Datos de cliente y factura */}
                    <div className="invoice-meta-grid">
                        <div className="meta-box">
                            <span className="meta-label">ADQUIRIENTE / CLIENTE:</span>
                            <div className="meta-val" id="inv-customer-name">{invoiceData.customerName}</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }} id="inv-customer-email">{invoiceData.customerEmail}</div>
                        </div>
                        <div className="meta-box">
                            <span className="meta-label">FECHA DE EMISIÓN:</span>
                            <div className="meta-val" id="inv-date">{invoiceData.date}</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Estado: <strong>Pagada y Verificada</strong></div>
                        </div>
                        <div className="meta-box">
                            <span className="meta-label">FORMA DE PAGO:</span>
                            <div className="meta-val">{invoiceData.paymentMethod}</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Aut: {invoiceData.authCode || 'ONLINE-DIAN'}</div>
                        </div>
                    </div>

                    {/* Tabla de ítems */}
                    <div className="invoice-item-table-container">
                        <table className="invoice-item-table">
                            <thead>
                                <tr>
                                    <th>Descripción de Equipo</th>
                                    <th style={{ textAlign: 'center' }}>Cant</th>
                                    <th style={{ textAlign: 'right' }}>Valor Unitario</th>
                                    <th style={{ textAlign: 'right' }}>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoiceData.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <strong id="inv-item-name">{item.name}</strong>
                                            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                                Garantía de fábrica certificada + Alistamiento Técnico Oficial
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.qty || 1}</td>
                                        <td style={{ textAlign: 'right' }} id="inv-item-unit-price">{formatCurrency(item.price)}</td>
                                        <td style={{ textAlign: 'right', fontWeight: 700 }} id="inv-item-total">
                                            {formatCurrency(item.price * (item.qty || 1))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Totales y notas */}
                    <div className="invoice-bottom-grid">
                        <div className="invoice-notes-box">
                            <div style={{ fontWeight: 600, fontSize: '0.8rem', color: '#374151', marginBottom: '0.2rem' }}>
                                CERTIFICADO DE GARANTÍA Y ORIGEN
                            </div>
                            <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', lineHeight: 1.4 }}>
                                Maqui Ventas S.A.S. certifica que todos los equipos cumplen con las especificaciones técnicas OEM del fabricante. Garantía técnica por 24 meses o 2,000 horas de operación.
                            </p>
                        </div>

                        <div className="invoice-totals-box">
                            <div className="inv-tot-row">
                                <span>Subtotal Bruto:</span>
                                <span>{formatCurrency(invoiceData.subtotal || invoiceData.total)}</span>
                            </div>
                            {invoiceData.discount > 0 && (
                                <div className="inv-tot-row" style={{ color: '#16a34a' }}>
                                    <span>Descuento Aplicado:</span>
                                    <span>-{formatCurrency(invoiceData.discount)}</span>
                                </div>
                            )}
                            <div className="inv-tot-row inv-grand-total-row">
                                <span>VALOR TOTAL (USD):</span>
                                <span id="inv-grand-total">{formatCurrency(invoiceData.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botones de acción modal */}
                <div className="modal-footer" style={{ background: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
                    <button type="button" className="btn btn-outline" style={{ color: '#374151', borderColor: '#d1d5db' }} onClick={() => window.print()}>
                        Imprimir / Guardar PDF
                    </button>
                    <button type="button" className="btn btn-primary" onClick={onClose}>
                        Aceptar y Continuar
                    </button>
                </div>
            </div>
        </div>
    );
}
