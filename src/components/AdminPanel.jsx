import React, { useState } from 'react';

export default function AdminPanel({
    inventory,
    onAddMachine,
    onDeleteMachine,
    onAdjustStock
}) {
    const [searchFilter, setSearchFilter] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('Movimiento de Tierras');
    const [desc, setDesc] = useState('');
    const [brand, setBrand] = useState('');
    const [year, setYear] = useState('2024');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageFileName, setImageFileName] = useState('');
    const [imageFileSize, setImageFileSize] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const totalModels = inventory.length;
    const totalStock = inventory.reduce((acc, curr) => acc + (parseInt(curr.stock) || 0), 0);
    const totalValue = inventory.reduce((acc, curr) => acc + ((curr.price || 0) * (curr.stock || 0)), 0);

    const filteredInventory = inventory.filter(i => 
        i.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        (i.category && i.category.toLowerCase().includes(searchFilter.toLowerCase())) ||
        i.id.toString() === searchFilter.trim()
    );

    const handleFileSelect = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen (JPG, PNG, WebP).');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target.result);
            setImageFileName(file.name);
            setImageFileSize(`${(file.size / 1024).toFixed(1)} KB`);
        };
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMachine({
            name,
            price: parseFloat(price),
            stock: parseInt(stock),
            category,
            desc: desc || 'Garantía 24 Meses · Alistamiento Técnico Oficial',
            brand: brand || 'Maqui Pro Tech',
            year: parseInt(year) || 2024,
            image: uploadedImage
        });

        // Limpiar estado
        setName('');
        setPrice('');
        setStock('');
        setDesc('');
        setBrand('');
        setUploadedImage(null);
        setImageFileName('');
        setIsAddModalOpen(false);
    };

    return (
        <section className="admin-section" id="admin-section">
            <div className="section-header-box">
                <div>
                    <h2 className="section-title">Panel de Control de Inventario</h2>
                    <p className="section-subtitle">Gestión de catálogo, control de stock disponible y registro de nuevos lotes de maquinaria (CU-09).</p>
                </div>
            </div>

            {/* Tarjetas de Estadísticas Rápidas */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="stat-label">Modelos Registrados</div>
                    <div className="stat-value" id="admin-stat-models">{totalModels}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label">Unidades en Stock Físico</div>
                    <div className="stat-value" id="admin-stat-stock">{totalStock}</div>
                </div>
                <div className="admin-stat-card">
                    <div className="stat-label">Valoración Total Inventario</div>
                    <div className="stat-value" id="admin-stat-value">{formatCurrency(totalValue)}</div>
                </div>
            </div>

            {/* Barra de Herramientas con Buscador y Botón 'Agregar Producto' */}
            <div className="admin-toolbar-row">
                <input 
                    type="text" 
                    id="admin-table-search"
                    className="form-control" 
                    placeholder="Filtrar inventario por nombre, categoría o ID..." 
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    style={{ maxWidth: '380px' }}
                />

                <button 
                    type="button" 
                    id="btn-open-add-machine"
                    className="btn btn-primary" 
                    onClick={() => setIsAddModalOpen(true)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, padding: '0.65rem 1.4rem' }}
                >
                    <span>Agregar maquinaria</span>
                </button>
            </div>

            {/* Modal Desplegable para Agregar Producto (CU-09) */}
            {isAddModalOpen && (
                <div className="modal-backdrop open" onClick={() => setIsAddModalOpen(false)}>
                    <div className="modal-container modal-lg" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
                        <div className="modal-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <h3 className="modal-title">Agregar Producto al Inventario</h3>
                            </div>
                            <button type="button" className="btn-close" onClick={() => setIsAddModalOpen(false)}>&times;</button>
                        </div>

                        <form id="add-machine-form" onSubmit={handleSubmit}>
                            <div className="modal-body" style={{ padding: '1.5rem', maxHeight: '72vh', overflowY: 'auto' }}>
                                {/* Zona de Subida de Fotos con Drag & Drop y Previsualización */}
                                <div className="form-group">
                                    <label className="form-label" style={{ fontWeight: 700 }}>
                                        Fotografía del Producto (Sube fotos desde tu equipo)
                                    </label>
                                    <div 
                                        className={`dropzone-box ${isDragOver ? 'drag-active' : ''}`}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                        onDragLeave={() => setIsDragOver(false)}
                                        onDrop={handleDrop}
                                        onClick={() => document.getElementById('new-machine-image-file').click()}
                                    >
                                        <input 
                                            type="file" 
                                            id="new-machine-image-file" 
                                            accept="image/*" 
                                            style={{ display: 'none' }} 
                                            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                                        />

                                        {!uploadedImage ? (
                                            <div className="dropzone-content">
                                                <div className="dropzone-title">Haz clic para subir o arrastra una foto aquí</div>
                                                <div className="dropzone-subtitle">Formatos admitidos: JPG, PNG, WEBP (Hasta 10 MB)</div>
                                            </div>
                                        ) : (
                                            <div className="image-preview-container" style={{ display: 'flex' }} onClick={(e) => e.stopPropagation()}>
                                                <img src={uploadedImage} alt="Previsualización" className="image-preview-thumb" />
                                                <div className="image-preview-info">
                                                    <div className="image-preview-name">{imageFileName || 'foto-maquinaria.jpg'}</div>
                                                    <div className="image-preview-meta">{imageFileSize} · Foto lista para publicar</div>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-outline btn-sm" 
                                                    onClick={() => { setUploadedImage(null); setImageFileName(''); }}
                                                    style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.4)' }}
                                                >
                                                    Cambiar Foto
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Nombre del Producto / Modelo</label>
                                        <input 
                                            type="text" 
                                            id="new-machine-name"
                                            className="form-control" 
                                            placeholder="Ej. Retroexcavadora Case 580N" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Categoría Especializada</label>
                                        <select 
                                            id="new-machine-category"
                                            className="form-control" 
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="Movimiento de Tierras">Movimiento de Tierras</option>
                                            <option value="Agrícola">Agrícola</option>
                                            <option value="Carga y Logística">Carga y Logística</option>
                                            <option value="Pavimentación y Vías">Pavimentación y Vías</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Valor de Venta (USD)</label>
                                        <input 
                                            type="number" 
                                            id="new-machine-price"
                                            className="form-control" 
                                            placeholder="Ej. 115000" 
                                            min="1" 
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Stock Físico Inicial</label>
                                        <input 
                                            type="number" 
                                            id="new-machine-stock"
                                            className="form-control" 
                                            placeholder="Ej. 3" 
                                            min="0" 
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Descripción y Especificaciones Técnicas</label>
                                    <textarea 
                                        id="new-machine-desc"
                                        className="form-control" 
                                        rows="3" 
                                        placeholder="Ej. Motor Turbo Diesel Tier 4 · Tracción 4x4 · Brazo extensible de 4.5m · Incluye garantía técnica y alistamiento oficial."
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                    ></textarea>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label">Marca / Fabricante (Opcional)</label>
                                        <input 
                                            type="text" 
                                            id="new-machine-brand"
                                            className="form-control" 
                                            placeholder="Ej. Case CE" 
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label className="form-label">Año Modelo (Opcional)</label>
                                        <input 
                                            type="number" 
                                            id="new-machine-year"
                                            className="form-control" 
                                            placeholder="2024" 
                                            min="1990" 
                                            max="2027" 
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                                <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary" id="btn-add-machine" style={{ padding: '0.65rem 1.5rem', fontWeight: 700 }}>
                                    Guardar y Publicar Producto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Tabla de Inventario de Administrador */}
            <div className="admin-table-wrapper">
                <div className="admin-table-toolbar">
                    <h3 style={{ margin: 0, color: '#fff', fontSize: '1rem' }}>Inventario Físico en Patio</h3>
                </div>

                <table className="admin-table" id="inventory-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Foto</th>
                            <th>Maquinaria y Modelo</th>
                            <th>Categoría</th>
                            <th style={{ textAlign: 'right' }}>Precio Unitario</th>
                            <th style={{ textAlign: 'center' }}>Stock</th>
                            <th style={{ textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInventory.map(item => (
                            <tr key={item.id}>
                                <td style={{ color: 'var(--gray-400)', fontFamily: 'JetBrains Mono, monospace' }}>#{item.id}</td>
                                <td>
                                    <img src={item.image} alt={item.name} className="admin-table-thumb" />
                                </td>
                                <td>
                                    <strong style={{ color: '#fff' }}>{item.name}</strong>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{item.specs}</div>
                                </td>
                                <td>
                                    <span className="category-pill-table">{item.category}</span>
                                </td>
                                <td style={{ textAlign: 'right', fontWeight: 600, color: '#fff' }}>
                                    {formatCurrency(item.price)}
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <button 
                                            type="button" 
                                            className="admin-qty-btn" 
                                            onClick={() => onAdjustStock(item.id, -1)}
                                            title="Disminuir stock"
                                        >
                                            -
                                        </button>
                                        <span style={{ minWidth: '24px', fontWeight: 700, color: item.stock === 0 ? '#ef4444' : '#22c55e' }}>
                                            {item.stock}
                                        </span>
                                        <button 
                                            type="button" 
                                            className="admin-qty-btn" 
                                            onClick={() => onAdjustStock(item.id, 1)}
                                            title="Aumentar stock"
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger-sm" 
                                        onClick={() => setConfirmDeleteId(item.id)}
                                        title="Eliminar de inventario"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Confirmación de Eliminación */}
            {confirmDeleteId && (
                <div className="modal-backdrop open" onClick={() => setConfirmDeleteId(null)}>
                    <div className="modal-container modal-sm" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title" style={{ color: '#ef4444' }}>¿Eliminar Maquinaria?</h3>
                            <button type="button" className="btn-close" onClick={() => setConfirmDeleteId(null)}>&times;</button>
                        </div>
                        <div className="modal-body" style={{ padding: '1.2rem' }}>
                            <p style={{ margin: 0, color: 'var(--gray-300)' }}>
                                ¿Está seguro de que desea eliminar este equipo del inventario? Esta acción removerá el producto de las cotizaciones y catálogo de venta.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline" onClick={() => setConfirmDeleteId(null)}>
                                Cancelar
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={() => {
                                    onDeleteMachine(confirmDeleteId);
                                    setConfirmDeleteId(null);
                                }}
                            >
                                Sí, Eliminar Permanentemente
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
