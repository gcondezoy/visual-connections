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

function Counter({ activo, valor, sufijo = '', decimales = 0 }) {
  const reduce = useReducedMotion()
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) =>
    v.toLocaleString('es-PE', {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    }),
  )

  useEffect(() => {
    if (!activo) return
    if (reduce) {
      mv.set(valor)
      return
    }
    const controls = animate(mv, valor, { duration: 1.4, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [activo, valor, reduce, mv])

  return (
    <span className="metric-num mono">
      <motion.span>{text}</motion.span>
      {sufijo}
    </span>
  )
}

export default function Metrics() {
  // Un solo observador para toda la franja: los 4 contadores
  // arrancan juntos y no dependen de márgenes de viewport frágiles.
  const listRef = useRef(null)
  const activo = useInView(listRef, { once: true, amount: 0.3 })

  return (
    <section className="metrics" aria-label="Cifras de la empresa">
      <div className="container metrics-inner">
        <div className="metrics-partner">
          <span className="partner-label">Partner autorizado de</span>
          {/* TODO: reemplazar por el logo oficial de WIN cuando el cliente lo facilite */}
          <span className="partner-mark mono">WIN</span>
        </div>

        <dl className="metrics-list" ref={listRef}>
          {METRICAS.map((m) => (
            <div key={m.texto} className="metric">
              <dt className="metric-label">{m.texto}</dt>
              <dd className="metric-value">
                <Counter activo={activo} valor={m.valor} sufijo={m.sufijo} decimales={m.decimales} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
