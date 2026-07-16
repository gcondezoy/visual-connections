import { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'motion/react'
import { ArrowDown, ArrowUp, Timer } from '@phosphor-icons/react'

const MAX = 1000 // escala del medidor en Mbps
const R = 118
const CIRC = 2 * Math.PI * R
const SWEEP = 0.75 // arco de 270°

/**
 * Medidor de velocidad interactivo estilo speedtest:
 * el visitante puede tocar cada velocidad y ver el arco animarse.
 */
export default function Gauge({ velocidades, inicial, ping, etiqueta }) {
  const reduce = useReducedMotion()
  const [sel, setSel] = useState(inicial)
  const value = useMotionValue(0)

  const display = useTransform(value, (v) => Math.round(v))
  const dash = useTransform(value, (v) => CIRC * SWEEP * (1 - v / MAX))

  // al cambiar de segmento (hogar/empresa) vuelve a la velocidad por defecto
  useEffect(() => {
    setSel(inicial)
  }, [inicial])

  useEffect(() => {
    if (reduce) {
      value.set(sel)
      return
    }
    const controls = animate(value, sel, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [sel, reduce, value])

  return (
    <div className="gauge">
      <div
        className="gauge-dial"
        role="img"
        aria-label={`Velocidad de ${sel} megabits por segundo`}
      >
        <svg viewBox="0 0 300 300" className="gauge-svg">
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
          </defs>

          {/* riel del arco */}
          <circle
            cx="150"
            cy="150"
            r={R}
            fill="none"
            stroke="var(--line)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${CIRC * SWEEP} ${CIRC}`}
            transform="rotate(135 150 150)"
          />
          {/* arco de valor */}
          <motion.circle
            cx="150"
            cy="150"
            r={R}
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${CIRC * SWEEP} ${CIRC}`}
            style={{ strokeDashoffset: dash }}
            transform="rotate(135 150 150)"
          />
          {/* marcas */}
          {Array.from({ length: 11 }).map((_, i) => {
            const a = ((135 + i * 27) * Math.PI) / 180
            const x1 = 150 + Math.cos(a) * 98
            const y1 = 150 + Math.sin(a) * 98
            const x2 = 150 + Math.cos(a) * 90
            const y2 = 150 + Math.sin(a) * 90
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--line-strong)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )
          })}
        </svg>

        <div className="gauge-center">
          <motion.span className="gauge-value mono">{display}</motion.span>
          <span className="gauge-unit mono">Mbps</span>
        </div>

        <div className="gauge-readouts mono">
          <span className="readout">
            <ArrowDown size={13} weight="bold" aria-hidden="true" />
            {sel}
          </span>
          <span className="readout">
            <ArrowUp size={13} weight="bold" aria-hidden="true" />
            {sel}
          </span>
          <span className="readout">
            <Timer size={13} weight="bold" aria-hidden="true" />
            {ping} ms
          </span>
        </div>
      </div>

      <div className="gauge-panel">
        <div className="gauge-chips" role="group" aria-label="Elige una velocidad">
          {velocidades.map((v) => (
            <button
              key={v}
              className={`gauge-chip mono ${sel === v ? 'gauge-chip--on' : ''}`}
              aria-pressed={sel === v}
              onClick={() => setSel(v)}
            >
              {v}
            </button>
          ))}
        </div>
        <p className="gauge-tag mono">{etiqueta(sel)}</p>
      </div>
    </div>
  )
}
