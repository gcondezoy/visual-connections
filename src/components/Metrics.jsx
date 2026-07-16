import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useInView,
  animate,
  useReducedMotion,
} from 'motion/react'
import { METRICAS } from '../data.js'
import './Metrics.css'

function Counter({ valor, sufijo = '', decimales = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) =>
    v.toLocaleString('es-PE', {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    }),
  )

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      mv.set(valor)
      return
    }
    const controls = animate(mv, valor, { duration: 1.4, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, valor, reduce, mv])

  return (
    <span ref={ref} className="metric-num mono">
      <motion.span>{text}</motion.span>
      {sufijo}
    </span>
  )
}

export default function Metrics() {
  return (
    <section className="metrics" aria-label="Cifras de la empresa">
      <div className="container metrics-inner">
        <div className="metrics-partner">
          <span className="partner-label">Partner autorizado de</span>
          {/* TODO: reemplazar por el logo oficial de WIN cuando el cliente lo facilite */}
          <span className="partner-mark mono">WIN</span>
        </div>

        <dl className="metrics-list">
          {METRICAS.map((m) => (
            <div key={m.texto} className="metric">
              <dt className="metric-label">{m.texto}</dt>
              <dd className="metric-value">
                <Counter valor={m.valor} sufijo={m.sufijo} decimales={m.decimales} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
