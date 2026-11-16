import heroBg from '../assets/hero-bg.jpg';
import tractorJd from '../assets/tractor-john-deere.jpg';
import montacargasToyota from '../assets/montacargas-toyota.jpg';
import cargadorKomatsu from '../assets/cargador-komatsu.jpg';
import rodilloDynapac from '../assets/rodillo-dynapac.jpg';

export const initialUsers = [
    { name: 'Cliente Principal', email: 'cliente@maqui.com', pass: '1234', role: 'client' },
    { name: 'Administrador Demo', email: 'admin@maqui.com', pass: 'admin', role: 'admin' }
];

export const initialInventory = [
    { 
        id: 1, 
        name: 'Excavadora Caterpillar 320D / XCMG XE225U', 
        price: 150000, 
        stock: 5,
        category: 'Movimiento de Tierras',
        specs: '173 HP · Peso 22.5 Ton · Cazo 1.2 m³',
        details: {
            brand: 'XCMG / Caterpillar Navitrans',
            year: 2024,
            engineHours: '120 hrs',
            power: '173 HP (129 kW) Turbo Diesel Tier 3',
            operatingWeight: '22,500 kg',
            transmission: 'Hidráulica de alta presión',
            warranty: '24 Meses con Respaldo Navitrans Oficial'
        },
        imageType: 'excavator',
        image: heroBg,
        gallery: [heroBg, cargadorKomatsu],
        placeholderIcon: ''
    },
    { 
        id: 2, 
        name: 'Tractor John Deere 8R / H165', 
        price: 85000, 
        stock: 3,
        category: 'Agrícola',
        specs: '370 HP · Tracción 4x4 · Pala Cargadora H165',
        details: {
            brand: 'John Deere Oficial',
            year: 2023,
            engineHours: '340 hrs',
            power: '370 HP Motor PowerTech™ 9.0 L',
            operatingWeight: '14,200 kg',
            transmission: 'e23™ PowerShift con Efficiency Manager',
            warranty: '18 Meses Certificada Oficial'
        },
        imageType: 'tractor',
        image: tractorJd,
        gallery: [tractorJd, heroBg],
        placeholderIcon: ''
    },
    { 
        id: 3, 
        name: 'Montacargas Toyota 8FGU25 (2.5 Ton)', 
        price: 25000, 
        stock: 10,
        category: 'Carga y Logística',
        specs: 'Capacidad 2.5 Ton · Mástil Triplex 4.8m · GLP',
        details: {
            brand: 'Toyota Material Handling',
            year: 2024,
            engineHours: '15 hrs (Nueva en Bodega)',
            power: '58 HP Motor Toyota 4Y-ECS',
            operatingWeight: '3,850 kg',
            transmission: 'Automática Powershift SAS',
            warranty: '36 Meses Sistema de Estabilidad Activa'
        },
        imageType: 'forklift',
        image: montacargasToyota,
        gallery: [montacargasToyota, cargadorKomatsu],
        placeholderIcon: ''
    },
    { 
        id: 4, 
        name: 'Cargador Frontal Komatsu WA380', 
        price: 135000, 
        stock: 4,
        category: 'Movimiento de Tierras',
        specs: '191 HP · Balde 3.4 m³ · Transmisión Hidráulica',
        details: {
            brand: 'Komatsu Heavy Industries',
            year: 2023,
            engineHours: '560 hrs',
            power: '191 HP Komatsu SAA6D107E-1',
            operatingWeight: '18,500 kg',
            transmission: 'Powershift con convertidor de par',
            warranty: '12 Meses Garantía de Tren de Fuerza'
        },
        imageType: 'loader',
        image: cargadorKomatsu,
        gallery: [cargadorKomatsu, heroBg],
        placeholderIcon: ''
    },
    { 
        id: 5, 
        name: 'Rodillo Compactador Dynapac CA250', 
        price: 72000, 
        stock: 2,
        category: 'Pavimentación y Vías',
        specs: 'Tambor Liso 2.1m · Frecuencia Dual · Cabina Climatizada',
        details: {
            brand: 'Dynapac Road Construction',
            year: 2022,
            engineHours: '780 hrs',
            power: '130 HP Cummins 4BT Turbo',
            operatingWeight: '11,200 kg',
            transmission: 'Hidrostática continua',
            warranty: '12 Meses o 1,000 Horas'
        },
        imageType: 'roller',
        image: rodilloDynapac,
        gallery: [rodilloDynapac, cargadorKomatsu],
        placeholderIcon: ''
    }
];

export const initialOrderHistory = [
    {
        orderId: 'ORD-2026-8812',
        invoiceNumber: 'FAC-2026-38190',
        date: '10 de Noviembre, 2026 - 14:20',
        customerName: 'Cliente Principal',
        customerEmail: 'cliente@maqui.com',
        paymentMethod: 'Tarjeta de Crédito Corporativa (Visa **** 4812)',
        authCode: 'AUTH-948120',
        items: [
            { id: 3, name: 'Montacargas Toyota 8FGU25 (2.5 Ton)', price: 25000, qty: 1 }
        ],
        subtotal: 25000,
        discount: 0,
        total: 25000,
        status: 'Aprobado y Despachado'
    }
];
