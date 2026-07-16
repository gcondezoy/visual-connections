import { useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'
import { ChatCircleDots, MapPinArea, Wrench, Headset } from '@phosphor-icons/react'
import { PASOS } from '../data.js'
import './Process.css'

const ICONS = { ChatCircleDots, MapPinArea, Wrench, Headset }
const EASE = [0.16, 1, 0.3, 1]

export default function Process() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  // La línea "de señal" se dibuja conforme avanza el scroll:
  // narra el recorrido desde la cotización hasta el soporte.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.72', 'end 0.5'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.5 })

  return (
    <section id="proceso" className="section process">
      <div className="container">
        <h2 className="section-title">De la cotización a estar en línea</h2>
        <p className="section-sub">
          Sin trámites eternos ni esperas de semanas. Así funciona con nosotros:
        </p>

        <div className="timeline" ref={ref}>
          <div className="timeline-rail" aria-hidden="true">
            <motion.div
              className="timeline-fill"
              style={reduce ? { scaleY: 1 } : { scaleY }}
            />
          </div>

          <ol className="timeline-steps">
            {PASOS.map((p, i) => {
              const Icon = ICONS[p.icono]
              return (
                <motion.li
                  key={p.titulo}
                  className="step"
                  initial={reduce ? false : { opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                >
                  <span className="step-node" aria-hidden="true">
                    <Icon size={20} weight="bold" />
                  </span>
                  <div className="step-body">
                    <h3 className="step-title">{p.titulo}</h3>
                    <p className="step-text">{p.texto}</p>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
