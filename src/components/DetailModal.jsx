import React, { useState } from 'react';

export default function DetailModal({
    isOpen,
    machine,
    onClose,
    onAddToCart,
    onDirectBuy
}) {
    if (!isOpen || !machine) return null;

    const [activeImg, setActiveImg] = useState(machine.image);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const details = machine.details || {
        brand: 'Maqui Pro Tech',
        year: 2024,
        engineHours: '0 hrs (Nueva)',
        power: 'Alta potencia Tier 4',
        operatingWeight: 'Capacidad de alto tonelaje',
        transmission: 'Automática Inteligente',
        warranty: '24 Meses Oficial'
    };

    return (
        <div className="modal-backdrop open" id="detail-modal" onClick={onClose}>
            <div className="modal-container modal-lg" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div>
                        <h3 className="modal-title">{machine.name}</h3>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>
                            Categoría: <strong style={{ color: 'var(--yellow-400)' }}>{machine.category}</strong> · Código: #{machine.id}
                        </div>
                    </div>
                    <button type="button" className="btn-close" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body" style={{ padding: '1.5rem' }}>
                    <div className="detail-modal-grid">
                        {/* Galería y Foto Principal */}
                        <div>
                            <div className="detail-main-img-box">
                                <img src={activeImg || machine.image} alt={machine.name} className="detail-main-img" />
                            </div>
                            {machine.gallery && machine.gallery.length > 1 && (
                                <div className="detail-thumbnails-row">
                                    {machine.gallery.map((thumb, idx) => (
                                        <img 
                                            key={idx}
                                            src={thumb} 
                                            alt={`Vista ${idx + 1}`} 
                                            className={`detail-thumb-item ${activeImg === thumb ? 'active' : ''}`}
                                            onClick={() => setActiveImg(thumb)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Ficha Técnica y Acciones */}
                        <div>
                            <div className="detail-price-box">
                                <span className="detail-price-label">Precio de Adquisición / Leasing</span>
                                <div className="detail-price-val">{formatCurrency(machine.price)}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.2rem' }}>
                                    Disponibilidad inmediata: <strong>{machine.stock} unidades en patio</strong>
                                </div>
                            </div>

                            <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: '1rem 0 0.5rem 0' }}>
                                Especificaciones de Fábrica
                            </h4>

                            <div className="specs-table-grid">
                                <div className="spec-row">
                                    <span className="spec-label">Fabricante / Marca:</span>
                                    <span className="spec-val">{details.brand}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Año Modelo:</span>
                                    <span className="spec-val">{details.year}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Horas de Operación:</span>
                                    <span className="spec-val">{details.engineHours}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Potencia Motor:</span>
                                    <span className="spec-val">{details.power}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Peso Operativo:</span>
                                    <span className="spec-val">{details.operatingWeight}</span>
                                </div>
                                <div className="spec-row">
                                    <span className="spec-label">Garantía Certificada:</span>
                                    <span className="spec-val" style={{ color: '#22c55e', fontWeight: 600 }}>{details.warranty}</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                                <button 
                                    type="button" 
                                    className="btn btn-outline" 
                                    onClick={() => { onAddToCart(machine); onClose(); }}
                                    disabled={machine.stock === 0}
                                    style={{ flex: 1 }}
                                >
                                    Agregar al Carrito
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={() => { onDirectBuy(machine); onClose(); }}
                                    disabled={machine.stock === 0}
                                    style={{ flex: 1.3 }}
                                >
                                    Comprar y Facturar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
