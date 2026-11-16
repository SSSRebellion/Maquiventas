import React, { useState } from 'react';

export default function Catalog({
    inventory,
    onAddToCart,
    onDirectBuy,
    onOpenDetail
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const categories = [
        { id: 'all', label: 'Todos los Equipos' },
        { id: 'Movimiento de Tierras', label: 'Movimiento de Tierras' },
        { id: 'Carga y Logística', label: 'Carga y Logística' },
        { id: 'Pavimentación y Vías', label: 'Pavimentación' },
        { id: 'Agrícola', label: 'Agrícola' }
    ];

    let filteredInventory = inventory.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.specs.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
        filteredInventory.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredInventory.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'stock-desc') {
        filteredInventory.sort((a, b) => b.stock - a.stock);
    }

    return (
        <section className="catalog-section" id="catalog-section" style={{ marginTop: '2rem' }}>
            {/* Header de Sección */}
            <div className="section-header">
                <div>
                    <h1 className="section-title">Catálogo Oficial de Maquinaria Pesada</h1>
                    <p className="section-desc">
                        Seleccione cualquier equipo para agregar al carrito, inspeccionar su ficha técnica 360° o procesar su compra directa.
                    </p>
                </div>
            </div>

            {/* Grid de Maquinaria Estilo CAT */}
            <div className="catalog-grid" id="catalog">
                {filteredInventory.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: '#fff', border: '1px solid var(--cat-gray-200)', borderRadius: '2px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--cat-gray-500)', marginBottom: '0.75rem' }}>[ SIN COINCIDENCIAS ]</div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', textTransform: 'uppercase' }}>
                            No se encontraron maquinarias
                        </h3>
                        <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            Intente con otro término de búsqueda o seleccione otra categoría.
                        </p>
                    </div>
                ) : (
                    filteredInventory.map(item => {
                        const isOutOfStock = item.stock <= 0;
                        const isLowStock = item.stock > 0 && item.stock <= 2;
                        const stockClass = isOutOfStock ? 'stock-out' : (isLowStock ? 'stock-low' : 'stock-available');
                        const stockText = isOutOfStock ? 'Agotado' : (isLowStock ? `¡Solo ${item.stock} en patio!` : `${item.stock} disponibles`);

                        return (
                            <article className="machine-card" key={item.id} id={`card-machine-${item.id}`}>
                                <div 
                                    className="card-img-wrapper" 
                                    onClick={() => onOpenDetail(item)}
                                    title="Click para ver ficha técnica detallada 360°"
                                >
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="card-img"
                                        loading="lazy"
                                    />
                                    <div className="card-img-overlay-tag">{item.category}</div>
                                    <div className={`card-stock-badge ${stockClass}`}>
                                        <span className="pulse-dot"></span>
                                        <span>{stockText}</span>
                                    </div>
                                    <div className="card-img-interactive-hint">
                                        <span>Ver Ficha 360°</span>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <h3 
                                        className="machine-name" 
                                        onClick={() => onOpenDetail(item)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {item.name}
                                    </h3>
                                    <div className="machine-specs">
                                        <span className="spec-chip">ID: #{item.id}</span>
                                        <span>{item.specs}</span>
                                    </div>

                                    <div className="card-footer">
                                        <div className="price-container">
                                            <span className="price-label">Precio Contado / Leasing</span>
                                            <span className="price-amount">{formatCurrency(item.price)}</span>
                                        </div>

                                        <div className="card-action-group">
                                            <button 
                                                type="button" 
                                                className="btn btn-outline btn-sm" 
                                                onClick={() => onAddToCart(item)}
                                                disabled={isOutOfStock}
                                                title={isOutOfStock ? 'Sin stock disponible' : 'Añadir al carrito de compras'}
                                            >
                                                Añadir
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-primary btn-sm" 
                                                onClick={() => onDirectBuy(item)}
                                                disabled={isOutOfStock}
                                                title={isOutOfStock ? 'Sin stock' : 'Comprar inmediatamente'}
                                            >
                                                {isOutOfStock ? 'Agotado' : 'Comprar ➔'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })
                )}
            </div>
        </section>
    );
}
