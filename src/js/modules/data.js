/**
 * MAQUI VENTAS - Data Module
 * Catálogo Inicial de Maquinaria Pesada & Definiciones
 */

const initialUsers = [
    { id: 1, name: 'Constructora Bolívar S.A.', email: 'cliente@maqui.com', password: '123', role: 'client' },
    { id: 2, name: 'Ingeniero Administrador', email: 'admin@maqui.com', password: '123', role: 'admin' }
];

const initialInventory = [
    {
        id: 1,
        name: 'Excavadora Hidráulica XCMG XE225U',
        category: 'Movimiento de Tierras',
        price: 185000,
        stock: 3,
        description: 'Excavadora sobre orugas de 22.5 toneladas. Motor Cummins QSB6.7 de 173 HP con certificación Tier 4 Final. Balde reforzado de servicio pesado de 1.2 m³. Sistema telemático satelital y cabina presurizada ROPS/FOPS con climatización digital.',
        image: 'assets/hero-bg.jpg',
        specs: {
            'Potencia Motor': '173 HP @ 2,000 RPM (Cummins 6.7L)',
            'Peso Operativo': '22,500 kg',
            'Capacidad Balde': '1.20 m³ Heavy Duty',
            'Profundidad Excavación': '6,680 mm',
            'Alcance Máximo': '9,880 mm',
            'Presión sobre Suelo': '46.5 kPa',
            'Año de Fabricación': '2025 (Nueva 0 km)',
            'Garantía Oficial': '3 Años o 5,000 horas'
        },
        brand: 'XCMG / Navitrans',
        year: 2025,
        rating: 4.9,
        reviews: 28,
        discountPercent: 5
    },
    {
        id: 2,
        name: 'Tractor Agrícola John Deere 8R 370',
        category: 'Agrícola',
        price: 245000,
        stock: 2,
        description: 'Tractor de alta potencia y tiro pesado. Motor John Deere PowerTech PVS de 9.0 L y 370 HP nominales con tecnología Intelligent Power Management. Transmisión e23 o AutoPowr IVT. Compatible con guiado satelital autónomo AutoTrac y telemetría JDLink.',
        image: 'assets/tractor-john-deere.jpg',
        specs: {
            'Potencia Nominal': '370 HP (Max 407 HP IPM)',
            'Cilindrada Motor': '9.0 Litros (6 Cilindros)',
            'Transmisión': 'AutoPowr IVT Infinitamente Variable',
            'Capacidad Levante Trasero': '12,124 kg',
            'Caudal Hidráulico': '318 L/min bomba doble',
            'Neumáticos': 'Rodado Dual Trasero 710/70R42',
            'Año de Fabricación': '2024',
            'Garantía Oficial': '2 Años de fábrica'
        },
        brand: 'John Deere',
        year: 2024,
        rating: 5.0,
        reviews: 19,
        discountPercent: 0
    },
    {
        id: 3,
        name: 'Montacargas Industrial Toyota 8FGU25',
        category: 'Carga y Logística',
        price: 34000,
        stock: 5,
        description: 'Montacargas a combustión GLP/Gasolina de 2.5 toneladas. Reconocido por el exclusivo Sistema de Estabilidad Activa (SAS) de Toyota que previene vuelcos. Mástil triplex de alta visibilidad con elevación de hasta 4.8 metros y desplazador lateral integrado.',
        image: 'assets/montacargas-toyota.jpg',
        specs: {
            'Capacidad Carga': '2,500 kg (5,000 lbs)',
            'Altura de Elevación': '4,800 mm (Mástil Triplex)',
            'Motor': 'Toyota 4Y Industrial 2.2L GLP',
            'Sistema Seguridad': 'SAS (System of Active Stability)',
            'Tipo de Llantas': 'Neumáticas / Macizas Cushion',
            'Largo Horquillas': '1,220 mm con side-shift',
            'Año de Fabricación': '2025',
            'Garantía Oficial': '2 Años o 3,000 horas'
        },
        brand: 'Toyota Material Handling',
        year: 2025,
        rating: 4.8,
        reviews: 42,
        discountPercent: 8
    },
    {
        id: 4,
        name: 'Cargador Frontal Komatsu WA380-6',
        category: 'Movimiento de Tierras',
        price: 165000,
        stock: 2,
        description: 'Cargador sobre ruedas de alto rendimiento. Motor Komatsu SAA6D107E-1 de 191 HP de bajo consumo de combustible. Balde para roca de 3.3 m³ con cuchilla atornillable. Transmisión automática con modulador de tracción variable y cabina insonorizada SpaceCab.',
        image: 'assets/cargador-komatsu.jpg',
        specs: {
            'Potencia Motor': '191 HP @ 2,100 RPM',
            'Peso Operativo': '17,800 kg',
            'Capacidad Cuchara': '3.3 m³',
            'Carga Límite Estática': '14,350 kg (recto)',
            'Altura de Descarga': '3,000 mm a 45°',
            'Frenos': 'Discos múltiples húmedos',
            'Año de Fabricación': '2023',
            'Garantía Oficial': '1 Año o 2,500 horas'
        },
        brand: 'Komatsu',
        year: 2023,
        rating: 4.7,
        reviews: 15,
        discountPercent: 10
    },
    {
        id: 5,
        name: 'Rodillo Compactador Dynapac CA250',
        category: 'Pavimentación y Vías',
        price: 98000,
        stock: 4,
        description: 'Compactador vibratorio monocilíndrico de 12 toneladas para sub-bases y pavimentos asfálticos. Motor Cummins de 125 HP de inyección directa. Doble amplitud y frecuencia ajustable para máxima densidad de compactación en menos pasadas.',
        image: 'assets/rodillo-dynapac.jpg',
        specs: {
            'Peso de Operación': '12,150 kg',
            'Ancho de Tambor': '2,130 mm (84 in)',
            'Frecuencia Vibración': '33 / 48 Hz',
            'Fuerza Centrífuga': '246 / 150 kN',
            'Motor': 'Cummins Tier 3 de 125 HP',
            'Velocidad de Trabajo': '0 - 12 km/h',
            'Año de Fabricación': '2024',
            'Garantía Oficial': '2 Años oficial'
        },
        brand: 'Dynapac / Fayat Group',
        year: 2024,
        rating: 4.9,
        reviews: 21,
        discountPercent: 0
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initialUsers, initialInventory };
}
