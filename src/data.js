// ============================================================
// CONTENIDO EDITORIAL DE LA LANDING
// Cifras, planes y testimonios son REFERENCIALES (placeholder).
// TODO: reemplazar con datos reales del cliente antes de publicar.
// ============================================================

export const HERO = {
  hogar: {
    titulo: ['Fibra que llega a la', 'velocidad que pagas.'],
    sub: 'Internet simétrico sobre la red de WIN, instalación en 48 horas y soporte real por WhatsApp.',
    velocidades: [200, 400, 600],
    velocidad: 600,
    ping: 9,
    etiqueta: (v) => `Plan Fibra ${v} · hogar`,
  },
  empresa: {
    titulo: ['Conectividad dedicada', 'que no se detiene.'],
    sub: 'Enlaces dedicados, redes empresariales y soporte prioritario con SLA para tu operación.',
    velocidades: [500, 1000],
    velocidad: 1000,
    ping: 5,
    etiqueta: () => 'Enlace dedicado · empresa',
  },
}

// Cifras referenciales, reemplazar con datos reales
export const METRICAS = [
  { valor: 2400, sufijo: '+', texto: 'hogares y negocios conectados' },
  { valor: 99.6, sufijo: '%', decimales: 1, texto: 'de uptime mensual' },
  { valor: 48, sufijo: ' h', texto: 'de instalación promedio' },
  { valor: 12, sufijo: '', texto: 'distritos de Lima con cobertura' },
]

export const SERVICIOS = {
  hogar: [
    {
      icono: 'WifiHigh',
      titulo: 'Fibra óptica simétrica',
      texto:
        'La misma velocidad para subir y bajar. Planes de 200 a 600 Mbps sobre la red de WIN.',
      grande: true,
      visual: 'velocidad',
    },
    {
      icono: 'Broadcast',
      titulo: 'Router Wi-Fi 6 incluido',
      texto: 'Señal estable en toda tu casa, sin equipos alquilados a sobreprecio.',
      tinte: true,
    },
    {
      icono: 'MonitorPlay',
      titulo: 'TV y streaming',
      texto: 'Agrega televisión y tus apps favoritas al mismo plan.',
    },
    {
      icono: 'SecurityCamera',
      titulo: 'Cámaras de seguridad',
      texto: 'Vigila tu casa desde el celular, estés donde estés.',
    },
    {
      icono: 'ChatCircleDots',
      titulo: 'Soporte por WhatsApp',
      texto: 'Personas reales que responden en minutos, no un bot que te hace esperar.',
    },
  ],
  empresa: [
    {
      icono: 'Buildings',
      titulo: 'Enlace dedicado a internet',
      texto:
        'Ancho de banda garantizado 1:1 con SLA. Tu operación no compite con nadie por la señal.',
      grande: true,
      visual: 'imagen',
      imagen: '/img/corporativo.webp',
    },
    {
      icono: 'TreeStructure',
      titulo: 'Redes y cableado estructurado',
      texto: 'Diseño, instalación y certificación de la red interna de tu empresa.',
      tinte: true,
    },
    {
      icono: 'ShieldCheck',
      titulo: 'IP fija y VPN',
      texto: 'Acceso remoto seguro a tus sistemas y servidores.',
    },
    {
      icono: 'SecurityCamera',
      titulo: 'CCTV empresarial',
      texto: 'Monitoreo para locales, oficinas y almacenes.',
    },
    {
      icono: 'Headset',
      titulo: 'Soporte prioritario',
      texto: 'Atención técnica con tiempos de respuesta pactados por contrato.',
    },
  ],
}

export const PASOS = [
  {
    icono: 'ChatCircleDots',
    titulo: 'Cotiza por WhatsApp',
    texto: 'Cuéntanos qué necesitas y te respondemos el mismo día con una propuesta clara.',
  },
  {
    icono: 'MapPinArea',
    titulo: 'Visita técnica gratuita',
    texto: 'Evaluamos tu zona y confirmamos la factibilidad sin ningún costo.',
  },
  {
    icono: 'Wrench',
    titulo: 'Instalación en 24 a 48 h',
    texto: 'Equipo propio, instalación limpia y probada antes de irnos.',
  },
  {
    icono: 'Headset',
    titulo: 'Soporte que responde',
    texto: 'Después de instalar seguimos ahí: monitoreo y atención continua.',
  },
]

// Precios referenciales, reemplazar con tarifario real
export const PLANES_HOGAR = [
  {
    nombre: 'Fibra 200',
    mbps: 200,
    precio: 69,
    detalles: ['200 Mbps simétricos', 'Router Wi-Fi 6 incluido', 'Instalación gratis', 'Soporte por WhatsApp'],
  },
  {
    nombre: 'Fibra 400',
    mbps: 400,
    precio: 89,
    destacado: true,
    etiqueta: 'El más elegido',
    detalles: ['400 Mbps simétricos', 'Router Wi-Fi 6 incluido', 'Instalación gratis', 'TV y streaming opcional'],
  },
  {
    nombre: 'Fibra 600',
    mbps: 600,
    precio: 109,
    detalles: ['600 Mbps simétricos', 'Router Wi-Fi 6 incluido', 'Instalación gratis', 'Prioridad en soporte'],
  },
]

export const PLAN_EMPRESA = {
  titulo: 'Conectividad a la medida de tu operación',
  texto:
    'Cada empresa es distinta. Dinos cuántas sedes, usuarios y sistemas manejas y armamos una propuesta con SLA real.',
  puntos: [
    { icono: 'Gauge', titulo: 'Enlace dedicado', texto: 'Ancho de banda garantizado 1:1' },
    { icono: 'ShieldCheck', titulo: 'SLA por contrato', texto: 'Disponibilidad y tiempos de respuesta pactados' },
    { icono: 'TreeStructure', titulo: 'Red interna', texto: 'Cableado estructurado certificado' },
    { icono: 'Headset', titulo: 'Soporte prioritario', texto: 'Canal directo con nuestro equipo técnico' },
  ],
}

// Comparación con un operador típico (sección Versus)
export const VERSUS = {
  ellos: [
    'Central telefónica que te deja en espera',
    'Velocidad "hasta" que nunca llega completa',
    'Instalación cuando el técnico pueda',
    'Contratos con letra chica y sorpresas',
  ],
  nosotros: [
    'WhatsApp directo con personas reales',
    'Simétrico de verdad: subes igual que bajas',
    'Instalación coordinada en 24 a 48 horas',
    'Condiciones por escrito antes de firmar',
  ],
}

// Testimonios placeholder, reemplazar con reales del cliente
export const TESTIMONIOS = [
  {
    texto:
      'Contraté un lunes y el miércoles ya tenía internet en casa. Hice la prueba de velocidad y sí es la que ofrecen.',
    nombre: 'Rosa Huamán',
    detalle: 'Hogar en Los Olivos',
  },
  {
    texto: 'Nos instalaron el enlace dedicado y el cableado de toda la oficina. Cero caídas en seis meses.',
    nombre: 'Jorge Salazar',
    detalle: 'Estudio contable, Independencia',
  },
  {
    texto: 'El soporte responde por WhatsApp en minutos. Con mi operador anterior esperaba días.',
    nombre: 'María Fernanda Quispe',
    detalle: 'Bodega en Comas',
  },
  {
    texto: 'Puse cámaras y el plan de 400 para la casa. Todo quedó instalado y probado en una sola visita.',
    nombre: 'Víctor Paredes',
    detalle: 'Hogar en Puente Piedra',
  },
  {
    texto: 'Mi minimarket depende del POS y de las cámaras. Desde el cambio no he perdido ventas por caídas.',
    nombre: 'Carmen Auccasi',
    detalle: 'Minimarket en San Juan de Lurigancho',
  },
]

export const FAQS = [
  {
    q: '¿Qué relación tienen con WIN?',
    a: 'Somos partner autorizado de WIN: vendemos e instalamos el servicio sobre su red de fibra óptica, con atención y soporte local de nuestro propio equipo. Tienes la red de un operador grande con el trato cercano de una empresa de tu zona.',
  },
  {
    q: '¿La instalación tiene costo?',
    a: 'No. En zonas con cobertura la visita técnica y la instalación son gratuitas. Primero confirmamos factibilidad y recién ahí se firma el contrato.',
  },
  {
    q: '¿Cuánto demora la instalación?',
    a: 'Entre 24 y 48 horas después de la visita técnica, según la zona. Te confirmamos la fecha exacta por WhatsApp antes de ir.',
  },
  {
    q: '¿La velocidad es simétrica de verdad?',
    a: 'Sí. Con fibra óptica la velocidad de subida es igual a la de bajada. Eso importa para videollamadas, subir archivos, jugar en línea y cámaras de seguridad.',
  },
  {
    q: '¿Hay contrato de permanencia?',
    a: 'Depende de la promoción vigente. Te lo dejamos claro por escrito antes de contratar, sin letra chica.',
  },
  {
    q: '¿Qué pasa si tengo un problema con el servicio?',
    a: 'Nos escribes por WhatsApp y nuestro equipo local lo atiende. Si hace falta visita técnica, la coordinamos de inmediato en lugar de dejarte en una cola de llamadas.',
  },
]
