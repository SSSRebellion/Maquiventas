import React, { useState, useEffect } from 'react';
import heroBg from '../assets/hero-bg.jpg';
import tractorJd from '../assets/tractor-john-deere.jpg';
import montacargasToyota from '../assets/montacargas-toyota.jpg';
import cargadorKomatsu from '../assets/cargador-komatsu.jpg';
import rodilloDynapac from '../assets/rodillo-dynapac.jpg';

export default function HeroBanner({ onExploreCatalog, onSelectCategory }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 15 });

    const slides = [
        {
            title: "EXCAVADORAS XCMG XE225U",
            badge: "Potencia Mundial con Respaldo Local",
            desc: "Respaldo Navitrans. Peso operativo de 22.5 Toneladas con motor de alta eficiencia para minería, canteras y megaproyectos viales.",
            image: heroBg,
            category: "Movimiento de Tierras",
            btnText: "Ver Línea de Excavación"
        },
        {
            title: "TRACTORES JOHN DEERE H165 & 8R",
            badge: "Alta Tecnología en el Campo",
            desc: "370 HP de potencia con tracción integral 4x4 y pala cargadora frontal H165. Máxima productividad agrícola certificada.",
            image: tractorJd,
            category: "Agrícola",
            btnText: "Ver Equipos Agrícolas"
        },
        {
            title: "MONTACARGAS TOYOTA 2.5 TONELADAS",
            badge: "Carga, Bodega y Almacenamiento",
            desc: "Mástil triplex de 4.8m y Sistema de Estabilidad Activa (SAS). Eficiencia energética a combustión GLP para operaciones continuas en bodega.",
            image: montacargasToyota,
            category: "Carga y Logística",
            btnText: "Ver Montacargas"
        },
        {
            title: "CARGADOR FRONTAL KOMATSU WA380",
            badge: "Carga Pesada de Alto Rendimiento",
            desc: "Balde de 3.8 m³ con capacidad de 21 toneladas operativas. Motor Komatsu SAA6D114E-6 de 213 HP con sistema de enfriamiento inteligente.",
            image: cargadorKomatsu,
            category: "Movimiento de Tierras",
            btnText: "Ver Cargadores"
        },
        {
            title: "RODILLO COMPACTADOR DYNAPAC CA250",
            badge: "Pavimentación y Vías",
            desc: "Compactación vibrante de alta frecuencia para subbases y capas asfálticas. Tambor de 1.68m y sistema de amortiguación doble con cabina ROPS.",
            image: rodilloDynapac,
            category: "Pavimentación y Vías",
            btnText: "Ver Compactadores"
        }
    ];

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(slideTimer);
    }, [slides.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        hours = hours > 0 ? hours - 1 : 24;
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatNum = (n) => String(n).padStart(2, '0');

    return (
        <div className="hero-interactive-wrapper">
            {/* 1. Hero Slider / Carousel Interactivo */}
            <section className="hero-slider-section">
                <div className="hero-slider-container">
                    {slides.map((slide, idx) => (
                        <div 
                            key={idx}
                            className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}
                            style={{
                                backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(10,10,10,0.80) 50%, rgba(10,10,10,0.35) 100%), url(${slide.image})`
                            }}
                        >
                            <div className="hero-slide-overlay"></div>
                            <div className="hero-slide-content">
                                <span className="hero-badge-pill">{slide.badge}</span>
                                <h2 className="hero-title">{slide.title}</h2>
                                <p className="hero-desc">{slide.desc}</p>
                                <div className="hero-actions">
                                    <button className="btn btn-primary" onClick={onExploreCatalog}>
                                        Explorar Catálogo ➔
                                    </button>
                                    <button 
                                        className="btn btn-outline" 
                                        style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}
                                        onClick={() => onSelectCategory && onSelectCategory(slide.category)}
                                    >
                                        {slide.btnText}
                                    </button>
                                </div>
                            </div>
                            <div 
                                className="hero-slide-graphic" 
                                onClick={() => onSelectCategory && onSelectCategory(slide.category)}
                                title={`Inspeccionar ${slide.title}`}
                            >
                                <img src={slide.image} alt={slide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    ))}

                    {/* Controles de Flecha */}
                    <button 
                        type="button"
                        className="slider-arrow prev" 
                        onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
                        title="Anterior"
                    >
                        ❮
                    </button>
                    <button 
                        type="button"
                        className="slider-arrow next" 
                        onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
                        title="Siguiente"
                    >
                        ❯
                    </button>

                    {/* Dots de navegación */}
                    <div className="slider-dots">
                        {slides.map((_, dotIdx) => (
                            <button 
                                key={dotIdx}
                                type="button"
                                className={`slider-dot ${dotIdx === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(dotIdx)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. Barra de Beneficios y Confianza de E-Commerce */}
            <div className="trust-badges-bar">
                <div className="trust-badge-card">
                    <div className="trust-badge-info">
                        <h4>Despacho en Cama Baja</h4>
                        <p>Transporte especializado y entrega directa en su obra o campamento.</p>
                    </div>
                </div>
                <div className="trust-badge-card">
                    <div className="trust-badge-info">
                        <h4>Garantía Certificada</h4>
                        <p>Cobertura integral de 12 a 36 meses con alistamiento técnico oficial.</p>
                    </div>
                </div>
                <div className="trust-badge-card">
                    <div className="trust-badge-info">
                        <h4>Facturación Inmediata</h4>
                        <p>Emisión electrónica instantánea con QR fiscal y reporte comercial.</p>
                    </div>
                </div>
                <div className="trust-badge-card">
                    <div className="trust-badge-info">
                        <h4>Soporte Técnico 24/7</h4>
                        <p>Red de mecánicos certificados y repuestos originales disponibles.</p>
                    </div>
                </div>
            </div>

            {/* 3. Sección Estilo GECOLSA CAT: "Tenemos lo que necesita" */}
            <section className="cat-needs-section">
                <div className="cat-needs-header-row">
                    <h2 className="cat-needs-title">Tenemos lo que necesita</h2>
                    <span className="cat-needs-sub">Seleccione una línea de maquinaria especializada</span>
                </div>
                <div className="cat-needs-grid">
                    <div className="cat-need-card" onClick={() => onSelectCategory && onSelectCategory('Movimiento de Tierras')}>
                        <img src={heroBg} alt="Excavadoras" className="cat-need-img" />
                        <div className="cat-need-overlay">
                            <span className="cat-need-name">Excavadoras</span>
                            <span className="cat-need-chevron">›</span>
                        </div>
                    </div>
                    <div className="cat-need-card" onClick={() => onSelectCategory && onSelectCategory('Agrícola')}>
                        <img src={tractorJd} alt="Línea Agrícola" className="cat-need-img" />
                        <div className="cat-need-overlay">
                            <span className="cat-need-name">Línea Agrícola</span>
                            <span className="cat-need-chevron">›</span>
                        </div>
                    </div>
                    <div className="cat-need-card" onClick={() => onSelectCategory && onSelectCategory('Carga y Logística')}>
                        <img src={montacargasToyota} alt="Carga y Almacén" className="cat-need-img" />
                        <div className="cat-need-overlay">
                            <span className="cat-need-name">Carga y Almacén</span>
                            <span className="cat-need-chevron">›</span>
                        </div>
                    </div>
                    <div className="cat-need-card" onClick={() => onSelectCategory && onSelectCategory('Movimiento de Tierras')}>
                        <img src={cargadorKomatsu} alt="Cargadores" className="cat-need-img" />
                        <div className="cat-need-overlay">
                            <span className="cat-need-name">Cargadores</span>
                            <span className="cat-need-chevron">›</span>
                        </div>
                    </div>
                    <div className="cat-need-card" onClick={() => onSelectCategory && onSelectCategory('Pavimentación y Vías')}>
                        <img src={rodilloDynapac} alt="Pavimentación" className="cat-need-img" />
                        <div className="cat-need-overlay">
                            <span className="cat-need-name">Pavimentación</span>
                            <span className="cat-need-chevron">›</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Cinta Interactiva de Oferta Flash */}
            <div className="flash-deal-ribbon">
                <div className="flash-deal-left">
                    <div>
                        <strong style={{ fontSize: '1.05rem' }}>OFERTA FLASH DE TEMPORADA:</strong>
                        <span style={{ fontSize: '0.9rem', color: '#cbd5e1', marginLeft: '6px' }}>
                            Hasta 15% de descuento en flotas de excavación y pavimentación.
                        </span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, color: '#94a3b8' }}>
                        Termina en:
                    </span>
                    <div className="countdown-box">
                        {formatNum(timeLeft.hours)}h : {formatNum(timeLeft.minutes)}m : {formatNum(timeLeft.seconds)}s
                    </div>
                </div>
            </div>
        </div>
    );
}
