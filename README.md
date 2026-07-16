# Visual Connections – Landing Page

Landing de captación de leads para Visual Connections (telecomunicaciones,
partner autorizado de WIN, Lima). React + Vite, CSS con tokens propios y
animaciones con [motion](https://motion.dev).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173 (o el puerto que asigne Vite)
npm run build    # build de producción en dist/
```

## Dónde editar los datos del cliente

| Qué | Archivo |
| --- | --- |
| WhatsApp, teléfono, email, dirección, RUC, redes | `src/config.js` (`NEGOCIO`) |
| Distritos con cobertura | `src/config.js` (`DISTRITOS`) |
| Textos del hero, servicios, pasos, FAQs | `src/data.js` |
| Planes y precios | `src/data.js` (`PLANES_HOGAR`, `PLAN_EMPRESA`) |
| Métricas de la franja de cifras | `src/data.js` (`METRICAS`) |
| Testimonios | `src/data.js` (`TESTIMONIOS`) |

## Pendientes antes de publicar (placeholders)

- Logo real del cliente (la marca del nav es un SVG provisional en `Navbar.jsx`)
- Número de WhatsApp y datos de contacto reales (`src/config.js`)
- Tarifario real (los precios actuales son referenciales)
- Cifras reales de la franja de métricas
- Lista real de distritos con cobertura
- Fotos reales (las de `public/img/` son placeholders con tratamiento duotono)
- Logo oficial de WIN para la franja de partner (`Metrics.jsx`)
- Testimonios reales
- URL del Libro de Reclamaciones

## Decisiones de diseño

- Tema oscuro bloqueado, un solo acento cian (`--accent`) sobre base azulada.
- Tipografías: Space Grotesk (titulares), Hanken Grotesk (cuerpo),
  JetBrains Mono (datos técnicos: velocidades, precios, cifras).
- Radios: botones píldora, tarjetas 16 px, inputs 10 px.
- Toggle global Hogar/Empresas (`src/segment.jsx`) que reescribe hero,
  servicios y planes.
- Todas las animaciones respetan `prefers-reduced-motion`.
