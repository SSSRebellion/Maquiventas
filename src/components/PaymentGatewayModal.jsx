import React, { useState } from 'react';

export default function PaymentGatewayModal({
    isOpen,
    cart,
    currentUser,
    onClose,
    onPaymentSuccess,
    onOpenHistory
}) {
    if (!isOpen) return null;

    const [activeTab, setActiveTab] = useState('card');
    const [cardNumber, setCardNumber] = useState('4532 8912 3456 7890');
    const [cardHolder, setCardHolder] = useState(currentUser ? currentUser.name : 'CONSTRUCTORA ANDINA SAS');
    const [cardExp, setCardExp] = useState('12/28');
    const [cardCvv, setCardCvv] = useState('789');
    const [pseBank, setPseBank] = useState('bancolombia');
    const [isProcessing, setIsProcessing] = useState(false);

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

    const handleCardNumberChange = (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
        setCardNumber(formatted);
    };

    const handleCardExpChange = (e) => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (val.length >= 2) {
            val = val.substring(0, 2) + '/' + val.substring(2);
        }
        setCardExp(val);
    };

    const handleProcessPayment = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            setIsProcessing(false);
            const paymentDetails = {
                method: activeTab === 'card' 
                    ? `Tarjeta de Crédito Corporativa (**** ${cardNumber.slice(-4)})`
                    : activeTab === 'pse' 
                        ? `Transferencia Débito PSE (${pseBank.toUpperCase()})` 
                        : 'Línea de Crédito Directo Leasing MaquiPro',
                authCode: `AUTH-${Math.floor(100000 + Math.random() * 900000)}`,
                total: total,
                subtotal: subtotal,
                discount: discount,
                items: [...cart]
            };
            onPaymentSuccess(paymentDetails);
        }, 1200);
    };

    return (
        <div className="modal-backdrop open" onClick={onClose}>
            <div className="modal-container modal-lg gateway-modal-box" onClick={(e) => e.stopPropagation()}>
                {/* Header de Pasarela */}
                <div className="modal-header">
                    <div>
                        <h3 className="modal-title">Pasarela de Pagos Segura</h3>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                            Transacción encriptada con cifrado bancario TLS 1.3 / 256-bit
                        </div>
                    </div>
                    <button type="button" className="btn-close" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body" style={{ padding: '1.5rem', position: 'relative' }}>
                    {/* Pantalla de Carga / Spinner de Transacción */}
                    {isProcessing && (
                        <div className="gateway-processing-overlay">
                            <div className="gateway-spinner"></div>
                            <h4 style={{ color: '#fff', margin: '1rem 0 0.3rem 0' }}>Conectando con la Red Financiera...</h4>
                            <p style={{ color: 'var(--gray-400)', fontSize: '0.85rem' }}>
                                Validando fondos y emitiendo certificado de compra segura. Por favor espere.
                            </p>
                        </div>
                    )}

                    <div className="gateway-grid">
                        {/* Columna Izquierda: Métodos de Pago */}
                        <div className="gateway-left-col">
                            {/* Selector de Métodos de Pago */}
                            <div className="payment-methods-tabs">
                                <button 
                                    type="button" 
                                    className={`pay-tab-btn ${activeTab === 'card' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('card')}
                                >
                                    Tarjeta Crédito / Débito
                                </button>
                                <button 
                                    type="button" 
                                    className={`pay-tab-btn ${activeTab === 'pse' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('pse')}
                                >
                                    Débito PSE
                                </button>
                                <button 
                                    type="button" 
                                    className={`pay-tab-btn ${activeTab === 'leasing' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('leasing')}
                                >
                                    Leasing MaquiPro
                                </button>
                            </div>

                            {/* Contenido Pestaña 1: Tarjeta */}
                            {activeTab === 'card' && (
                                <div className="tab-pane active">
                                    {/* Mockup Visual de Tarjeta de Crédito */}
                                    <div className="credit-card-mockup">
                                        <div className="card-mockup-chip"></div>
                                        <div className="card-mockup-brand">VISA PLATINUM BUSINESS</div>
                                        <div className="card-mockup-number">{cardNumber || '•••• •••• •••• ••••'}</div>
                                        <div className="card-mockup-row">
                                            <div>
                                                <div className="card-mockup-label">TITULAR</div>
                                                <div className="card-mockup-val">{cardHolder || 'NOMBRE TITULAR'}</div>
                                            </div>
                                            <div>
                                                <div className="card-mockup-label">VENCE</div>
                                                <div className="card-mockup-val">{cardExp || 'MM/AA'}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Formulario de Tarjeta */}
                                    <form onSubmit={handleProcessPayment} style={{ marginTop: '1.2rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Número de Tarjeta</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                                maxLength="19"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Nombre del Titular de la Empresa</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={cardHolder}
                                                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                                                required
                                            />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                            <div className="form-group">
                                                <label className="form-label">Vencimiento (MM/AA)</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={cardExp}
                                                    onChange={handleCardExpChange}
                                                    maxLength="5"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Código CVV / CVC</label>
                                                <input 
                                                    type="password" 
                                                    className="form-control" 
                                                    value={cardCvv}
                                                    onChange={(e) => setCardCvv(e.target.value.substring(0, 4))}
                                                    maxLength="4"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.9rem' }}>
                                            Confirmar Pago de {formatCurrency(total)}
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Contenido Pestaña 2: PSE */}
                            {activeTab === 'pse' && (
                                <div className="tab-pane active">
                                    <div style={{ background: 'var(--gray-900)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--gray-700)', marginBottom: '1rem' }}>
                                        <h4 style={{ color: '#fff', margin: '0 0 0.5rem 0' }}>Pago con Débito Bancario en Línea</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', margin: 0 }}>
                                            Realice el pago directamente desde su cuenta de ahorros o corriente de forma inmediata.
                                        </p>
                                    </div>

                                    <form onSubmit={handleProcessPayment}>
                                        <div className="form-group">
                                            <label className="form-label">Seleccione Entidad Bancaria</label>
                                            <select 
                                                className="form-control" 
                                                value={pseBank} 
                                                onChange={(e) => setPseBank(e.target.value)}
                                            >
                                                <option value="bancolombia">Bancolombia - Cuenta Empresarial</option>
                                                <option value="davivienda">Banco Davivienda</option>
                                                <option value="bogota">Banco de Bogotá</option>
                                                <option value="bbva">BBVA Colombia</option>
                                                <option value="occidente">Banco de Occidente</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Correo Registrado en PSE</label>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                defaultValue={currentUser ? currentUser.email : 'pagos@empresa.com'}
                                                required 
                                            />
                                        </div>

                                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}>
                                            Pagar con Débito PSE ({formatCurrency(total)})
                                        </button>
                                    </form>
                                </div>
                            )}

                            {/* Contenido Pestaña 3: Leasing */}
                            {activeTab === 'leasing' && (
                                <div className="tab-pane active">
                                    <div style={{ background: 'var(--gray-900)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--gray-700)', marginBottom: '1rem' }}>
                                        <h4 style={{ color: '#fff', margin: '0 0 0.5rem 0' }}>Crédito Comercial y Leasing MaquiPro</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--gray-400)', margin: 0 }}>
                                            Financiación estructurada a 24, 36 o 48 meses con tasa preferencial del 0.95% MV y deducibilidad fiscal total.
                                        </p>
                                    </div>

                                    <form onSubmit={handleProcessPayment}>
                                        <div className="form-group">
                                            <label className="form-label">NIT o RUT de la Compañía</label>
                                            <input type="text" className="form-control" defaultValue="901.458.922-3" required />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Plazo de Financiación Deseado</label>
                                            <select className="form-control">
                                                <option value="24">24 Cuotas Mensuales (Aprobación en 2 hrs)</option>
                                                <option value="36">36 Cuotas Mensuales (Cuota fija)</option>
                                                <option value="48">48 Cuotas Mensuales (Opción de compra al 1%)</option>
                                            </select>
                                        </div>

                                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}>
                                            Radicar Solicitud de Leasing
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Columna Derecha: Resumen de lo que está comprando + Historial previo */}
                        <div className="gateway-right-col">
                            <div className="order-summary-box">
                                <h4 style={{ margin: '0 0 0.8rem 0', color: '#fff', fontSize: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Resumen de la Orden</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>{totalItems} ítems</span>
                                </h4>

                                {/* Lista de ítems que está comprando en este momento */}
                                <div className="gateway-items-list">
                                    {cart.map(item => (
                                        <div className="gateway-item-row" key={item.id}>
                                            <img src={item.image} alt={item.name} className="gateway-item-thumb" />
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div className="gateway-item-title">{item.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                                                    Cant: {item.qty} × {formatCurrency(item.price)}
                                                </div>
                                            </div>
                                            <div className="gateway-item-total">
                                                {formatCurrency(item.price * item.qty)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Desglose financiero */}
                                <div className="gateway-financial-totals">
                                    <div className="fin-row">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(subtotal)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="fin-row discount" style={{ color: '#22c55e' }}>
                                            <span>Descuento Volumen Flota</span>
                                            <span>-{formatCurrency(discount)}</span>
                                        </div>
                                    )}
                                    <div className="fin-row">
                                        <span>Alistamiento Técnico Oficial</span>
                                        <span style={{ color: '#22c55e' }}>INCLUIDO (GRATIS)</span>
                                    </div>
                                    <div className="fin-row grand-total">
                                        <span>Total a Cancelar</span>
                                        <span className="total-val">{formatCurrency(total)}</span>
                                    </div>
                                </div>

                                {/* Botón para revisar historial antes de comprar */}
                                <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-700)' }}>
                                    <button 
                                        type="button" 
                                        className="btn btn-outline" 
                                        onClick={onOpenHistory}
                                        style={{ width: '100%', fontSize: '0.85rem' }}
                                    >
                                        Consultar Mi Historial Previo de Compras
                                    </button>
                                </div>

                                <div className="gateway-guarantees">
                                    <div className="guarantee-item">
                                        <span>Garantía de Satisfacción y Entrega</span>
                                    </div>
                                    <div className="guarantee-item">
                                        <span>Facturación Electrónica DIAN Inmediata</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
