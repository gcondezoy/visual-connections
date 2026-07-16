import { motion, useReducedMotion } from 'motion/react'
import { XCircle, CheckCircle } from '@phosphor-icons/react'
import { VERSUS } from '../data.js'
import './Versus.css'

const EASE = [0.16, 1, 0.3, 1]

// Contraste directo: operador típico vs Visual Connections
export default function Versus() {
  const reduce = useReducedMotion()

  return (
    <section className="section versus" aria-label="Comparación con un operador típico">
      <div className="container">
        <h2 className="section-title">La diferencia se nota desde el primer día</h2>

        <div className="versus-grid">
          <motion.div
            className="versus-panel versus-panel--them"
            initial={reduce ? false : { opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h3 className="versus-head">Con un operador típico</h3>
            <ul className="versus-list">
              {VERSUS.ellos.map((t) => (
                <li key={t}>
                  <XCircle size={20} weight="fill" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="versus-panel versus-panel--us"
            initial={reduce ? false : { opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            <h3 className="versus-head versus-head--us">Con Visual Connections</h3>
            <ul className="versus-list versus-list--us">
              {VERSUS.nosotros.map((t) => (
                <li key={t}>
                  <CheckCircle size={20} weight="fill" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
