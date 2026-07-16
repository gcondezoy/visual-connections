// ============================================================
// DATOS DEL CLIENTE - Visual Connections
// Este es el ÚNICO archivo que hay que tocar para personalizar
// los datos de contacto. TODO: reemplazar placeholders.
// ============================================================

export const NEGOCIO = {
  nombre: 'Visual Connections',
  nombreCorporativo: 'Corporación Visual Connections',
  // TODO: número real de WhatsApp (formato internacional sin +)
  whatsapp: '51999999999',
  telefonoVisible: '+51 999 999 999', // TODO
  email: 'ventas@visualconnections.pe', // TODO
  direccion: 'Av. Placeholder 123, Los Olivos, Lima', // TODO
  horario: 'Lunes a sábado, 9:00 a. m. a 7:00 p. m.',
  ruc: 'RUC 20XXXXXXXXX', // TODO
  // TODO: URLs reales de redes sociales
  facebook: 'https://facebook.com/',
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/',
  // TODO: URL real del Libro de Reclamaciones
  libroReclamaciones: '#',
}

// Distritos con cobertura (TODO: confirmar lista real con el cliente)
export const DISTRITOS = [
  'Los Olivos',
  'San Martín de Porres',
  'Comas',
  'Independencia',
  'Puente Piedra',
  'Carabayllo',
  'Rímac',
  'Cercado de Lima',
  'San Juan de Lurigancho',
  'Callao',
  'Ventanilla',
  'Ancón',
]

/** Construye un enlace de WhatsApp con mensaje precargado. */
export function whatsappLink(mensaje) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`
}

export const MENSAJES = {
  general:
    'Hola Visual Connections, quiero cotizar el servicio de internet. ¿Me pueden ayudar?',
  plan: (plan) =>
    `Hola Visual Connections, quiero cotizar el plan ${plan}. ¿Me pueden dar más información?`,
  empresa:
    'Hola Visual Connections, necesito una cotización de conectividad para mi empresa.',
  cobertura: (distrito) =>
    `Hola Visual Connections, vivo en ${distrito} y quiero cotizar la instalación de fibra.`,
  sinCobertura: (zona) =>
    `Hola Visual Connections, estoy en ${zona}. ¿Me avisan cuando tengan cobertura en mi zona?`,
  speedtest: (mbps) =>
    `Hola Visual Connections, medí mi conexión actual en su web: ${mbps} Mbps. Quiero cotizar un plan de fibra.`,
}
