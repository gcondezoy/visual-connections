import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import { House, Buildings, ArrowUpRight } from '@phosphor-icons/react'
import { useSegment } from '../segment.jsx'
import { HERO } from '../data.js'
import Gauge from './Gauge.jsx'
import Magnetic from './Magnetic.jsx'
import './Hero.css'

const EASE = [0.16, 1, 0.3, 1]

export default function Hero() {
  const { segment, setSegment } = useSegment()
  const reduce = useReducedMotion()
  const data = HERO[segment]

  // Parallax: capas de fondo a velocidades distintas al scrollear
  const { scrollY } = useScroll()
  const mediaY = useTransform(scrollY, [0, 900], [0, 130])
  const glowY = useTransform(scrollY, [0, 900], [0, 180])
  const gridY = useTransform(scrollY, [0, 900], [0, -90])

  return (
    <section id="inicio" className="hero">
      {/* Fondo con parallax: imagen, rejilla y glows a velocidades distintas */}
      <motion.div
        className="hero-media"
        style={reduce ? undefined : { y: mediaY }}
        aria-hidden="true"
      >
        {/* TODO: reemplazar por foto real de la ciudad / instalación del cliente */}
        <img src="/img/hero.webp" alt="" fetchPriority="high" />
      </motion.div>
      <div className="hero-scrim" aria-hidden="true" />
      <motion.div
        className="hero-grid-bg"
        style={reduce ? undefined : { y: gridY }}
        aria-hidden="true"
      />
      <motion.div
        className="hero-glow hero-glow--a"
        style={reduce ? undefined : { y: glowY }}
        aria-hidden="true"
      />

      <div className="container hero-inner">
        <div className="hero-copy">
          {/* Toggle de audiencia: reescribe hero, servicios y planes */}
          <div className="seg-toggle" role="tablist" aria-label="Tipo de cliente">
            {[
              { id: 'hogar', label: 'Para tu casa', Icon: House },
              { id: 'empresa', label: 'Para tu empresa', Icon: Buildings },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={segment === id}
                className={`seg-btn ${segment === id ? 'seg-btn--on' : ''}`}
                onClick={() => setSegment(id)}
              >
                {segment === id && (
                  <motion.span
                    layoutId="seg-pill"
                    className="seg-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon size={16} weight="bold" aria-hidden="true" />
                <span className="seg-label">{label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={segment}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -14 }}
              transition={{ duration: 0.32, ease: EASE }}
            >
              {/* Reveal enmascarado por líneas: también al cambiar de segmento */}
              <h1 className="hero-title">
                {data.titulo.map((linea, i) => (
                  <span className="line-mask" key={linea}>
                    <motion.span
                      className={`line ${i === 1 ? 'hero-title-accent' : ''}`}
                      initial={reduce ? false : { y: '112%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
                    >
                      {linea}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.p
                className="hero-sub"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
              >
                {data.sub}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="hero-ctas"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
          >
            <Magnetic>
              <a href="#contacto" className="btn btn-primary">
                Cotiza gratis
                <span className="btn-orb" aria-hidden="true">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a href="#planes" className="btn btn-ghost">
                Ver planes
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
        >
          <Gauge
            velocidades={data.velocidades}
            inicial={data.velocidad}
            ping={data.ping}
            etiqueta={data.etiqueta}
          />
        </motion.div>
      </div>
    </section>
  )
}
