import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import {
  WifiHigh,
  Broadcast,
  MonitorPlay,
  SecurityCamera,
  ChatCircleDots,
  Buildings,
  TreeStructure,
  ShieldCheck,
  Headset,
} from '@phosphor-icons/react'
import { useSegment } from '../segment.jsx'
import { SERVICIOS } from '../data.js'
import './Services.css'

const ICONS = {
  WifiHigh,
  Broadcast,
  MonitorPlay,
  SecurityCamera,
  ChatCircleDots,
  Buildings,
  TreeStructure,
  ShieldCheck,
  Headset,
}

const EASE = [0.16, 1, 0.3, 1]

/* Barras de velocidad animadas para la celda grande del segmento hogar */
function SpeedBars() {
  const reduce = useReducedMotion()
  const bars = [0.35, 0.55, 0.42, 0.7, 0.5, 0.85, 0.62, 1]
  return (
    <div className="speed-bars" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="speed-bar"
          initial={reduce ? { scaleY: h } : { scaleY: 0.1 }}
          whileInView={{ scaleY: h }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: i * 0.06, ease: EASE }}
        />
      ))}
    </div>
  )
}

/* Spotlight sutil que sigue el cursor sin re-renderizar React */
function handleSpotlight(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export default function Services() {
  const { segment } = useSegment()
  const reduce = useReducedMotion()
  const items = SERVICIOS[segment]

  return (
    <section id="servicios" className="section services">
      <div className="container">
        <span className="kicker">Servicios</span>
        <h2 className="section-title">
          {segment === 'hogar' ? 'Todo lo que tu casa necesita para estar conectada' : 'Infraestructura de red para tu empresa'}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={segment}
            className="bento"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {items.map((s, i) => {
              const Icon = ICONS[s.icono]
              return (
                <motion.article
                  key={s.titulo}
                  className={[
                    'cell',
                    s.grande ? 'cell--lg' : '',
                    s.tinte ? 'cell--tint' : '',
                    s.visual === 'imagen' ? 'cell--img' : '',
                  ].join(' ')}
                  onMouseMove={handleSpotlight}
                  initial={reduce ? false : { opacity: 0, y: 22, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.65, delay: i * 0.07, ease: EASE }}
                >
                  {s.visual === 'imagen' && (
                    <div className="cell-photo" aria-hidden="true">
                      {/* TODO: reemplazar por foto real de instalación corporativa */}
                      <img src={s.imagen} alt="" loading="lazy" />
                    </div>
                  )}
                  <div className="cell-body">
                    <Icon size={26} weight="duotone" className="cell-icon" />
                    <h3 className="cell-title">{s.titulo}</h3>
                    <p className="cell-text">{s.texto}</p>
                    {s.visual === 'velocidad' && <SpeedBars />}
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
