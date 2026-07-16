import { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { Check, Gauge, ShieldCheck, TreeStructure, Headset, WhatsappLogo } from '@phosphor-icons/react'
import { useSegment } from '../segment.jsx'
import { PLANES_HOGAR, PLAN_EMPRESA } from '../data.js'
import { whatsappLink, MENSAJES } from '../config.js'
import './Plans.css'

const ICONS = { Gauge, ShieldCheck, TreeStructure, Headset }
const EASE = [0.16, 1, 0.3, 1]

/* Card con tilt 3D que sigue el cursor.
   Solo en dispositivos con hover real: en táctil el tap dejaría
   la card inclinada porque mouseleave nunca dispara. */
function TiltCard({ className, children, ...motionProps }) {
  const reduce = useReducedMotion()
  const [fine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches,
  )
  const inactivo = reduce || !fine

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 18 })
  const sry = useSpring(ry, { stiffness: 180, damping: 18 })

  function move(e) {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 7)
    rx.set(-py * 7)
  }

  function leave() {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.article
      className={className}
      onMouseMove={inactivo ? undefined : move}
      onMouseLeave={inactivo ? undefined : leave}
      style={inactivo ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      whileHover={inactivo ? undefined : { y: -6 }}
      {...motionProps}
    >
      {children}
    </motion.article>
  )
}

function PlanesHogar({ reduce }) {
  return (
    <div className="plans-grid">
      {PLANES_HOGAR.map((p, i) => (
        <TiltCard
          key={p.nombre}
          className={`plan ${p.destacado ? 'plan--star' : ''}`}
          initial={reduce ? false : { opacity: 0, y: 26, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
        >
          {p.destacado && <span className="plan-flag">{p.etiqueta}</span>}
          <h3 className="plan-name">{p.nombre}</h3>
          <p className="plan-speed mono">
            {p.mbps} <span>Mbps</span>
          </p>
          <p className="plan-price">
            <span className="mono price-num">S/ {p.precio}</span>
            <span className="price-per">al mes</span>
          </p>
          <ul className="plan-list">
            {p.detalles.map((d) => (
              <li key={d}>
                <Check size={16} weight="bold" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink(MENSAJES.plan(p.nombre))}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn ${p.destacado ? 'btn-primary' : 'btn-ghost'} plan-cta`}
          >
            <WhatsappLogo size={18} weight="fill" />
            Cotiza gratis
          </a>
        </TiltCard>
      ))}
    </div>
  )
}

function PanelEmpresa({ reduce }) {
  return (
    <motion.article
      className="biz-panel"
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div className="biz-copy">
        <h3 className="biz-title">{PLAN_EMPRESA.titulo}</h3>
        <p className="biz-text">{PLAN_EMPRESA.texto}</p>
        <a
          href={whatsappLink(MENSAJES.empresa)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <WhatsappLogo size={18} weight="fill" />
          Cotiza gratis
        </a>
      </div>
      <ul className="biz-points">
        {PLAN_EMPRESA.puntos.map((pt) => {
          const Icon = ICONS[pt.icono]
          return (
            <li key={pt.titulo} className="biz-point">
              <Icon size={22} weight="duotone" aria-hidden="true" />
              <div>
                <p className="point-title">{pt.titulo}</p>
                <p className="point-text">{pt.texto}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </motion.article>
  )
}

export default function Plans() {
  const { segment } = useSegment()
  const reduce = useReducedMotion()

  return (
    <section id="planes" className="section plans">
      <div className="container">
        <span className="kicker">Planes</span>
        <h2 className="section-title">
          {segment === 'hogar' ? 'Elige tu velocidad' : 'Una propuesta a tu medida'}
        </h2>
        <p className="section-sub">
          {segment === 'hogar'
            ? 'Precios referenciales sujetos a promoción vigente. Sin costos ocultos: lo que ves es lo que pagas.'
            : 'Sin tarifario genérico: cada operación necesita un diseño distinto de red y ancho de banda.'}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={segment}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {segment === 'hogar' ? <PlanesHogar reduce={reduce} /> : <PanelEmpresa reduce={reduce} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
