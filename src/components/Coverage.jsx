import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { MagnifyingGlass, CheckCircle, ClockCountdown, WhatsappLogo } from '@phosphor-icons/react'
import { DISTRITOS, whatsappLink, MENSAJES } from '../config.js'
import './Coverage.css'

const EASE = [0.16, 1, 0.3, 1]

/** Quita tildes y normaliza para comparar distritos. */
function normalizar(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

/** Nivel de señal decorativo por distrito (determinístico, 3 o 4 barras). */
function nivelSenal(nombre) {
  return 3 + (nombre.length % 2)
}

export default function Coverage() {
  const reduce = useReducedMotion()
  const [query, setQuery] = useState('')
  // estado: 'idle' | 'found' | 'notfound'
  const [resultado, setResultado] = useState({ estado: 'idle', distrito: '' })

  function verificar(texto) {
    const q = normalizar(texto)
    if (!q) {
      setResultado({ estado: 'idle', distrito: '' })
      return
    }
    const match = DISTRITOS.find(
      (d) => normalizar(d).includes(q) || q.includes(normalizar(d)),
    )
    setResultado(
      match
        ? { estado: 'found', distrito: match }
        : { estado: 'notfound', distrito: texto.trim() },
    )
  }

  function onSubmit(e) {
    e.preventDefault()
    verificar(query)
  }

  function elegirDistrito(d) {
    setQuery(d)
    setResultado({ estado: 'found', distrito: d })
  }

  return (
    <section id="cobertura" className="section coverage">
      <div className="container coverage-inner">
        <div className="coverage-copy">
          <span className="kicker">Cobertura</span>
          <h2 className="section-title">¿Llegamos a tu zona?</h2>
          <p className="section-sub">
            Escribe tu distrito o tócalo en el panel, y te lo decimos al instante. Sin dejar tus datos ni esperar a que te llamen.
          </p>

          <form className="checker" onSubmit={onSubmit}>
            <label htmlFor="distrito" className="checker-label">
              Tu distrito
            </label>
            <div className="checker-row">
              <input
                id="distrito"
                type="text"
                className="checker-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Por ejemplo: Los Olivos"
                autoComplete="off"
              />
              <button type="submit" className="btn btn-primary checker-btn" aria-label="Verificar cobertura">
                <MagnifyingGlass size={18} weight="bold" />
                Verificar
              </button>
            </div>
          </form>

          <div aria-live="polite">
            <AnimatePresence mode="wait">
              {resultado.estado === 'found' && (
                <motion.div
                  key="found"
                  className="checker-result checker-result--ok"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <CheckCircle size={26} weight="fill" className="result-icon result-icon--ok" />
                  <div>
                    <p className="result-title">¡Sí! Llegamos a {resultado.distrito}.</p>
                    <p className="result-text">Podemos instalarte en 24 a 48 horas.</p>
                    <a
                      href={whatsappLink(MENSAJES.cobertura(resultado.distrito))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary result-cta"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      Cotiza gratis
                    </a>
                  </div>
                </motion.div>
              )}

              {resultado.estado === 'notfound' && (
                <motion.div
                  key="notfound"
                  className="checker-result"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <ClockCountdown size={26} weight="fill" className="result-icon" />
                  <div>
                    <p className="result-title">Aún no llegamos ahí.</p>
                    <p className="result-text">
                      Estamos creciendo por zonas. Déjanos tu contacto y te avisamos apenas haya cobertura.
                    </p>
                    <a
                      href={whatsappLink(MENSAJES.sinCobertura(resultado.distrito))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost result-cta"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      Avísenme cuando lleguen
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Panel de estado de red: los distritos cubiertos son el visual */}
        <motion.div
          className="net-panel"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <header className="net-head">
            <span className="net-title mono">Estado de red · Lima</span>
            <span className="net-live">
              <span className="net-dot" aria-hidden="true" />
              Operativa
            </span>
          </header>

          <ul className="net-grid">
            {DISTRITOS.map((d, i) => {
              const seleccionado = resultado.estado === 'found' && resultado.distrito === d
              return (
                <motion.li
                  key={d}
                  initial={reduce ? false : { opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                >
                  <button
                    className={`net-row ${seleccionado ? 'net-row--sel' : ''}`}
                    onClick={() => elegirDistrito(d)}
                    aria-pressed={seleccionado}
                  >
                    <span className="net-name">{d}</span>
                    <span className="net-bars" aria-hidden="true">
                      {[1, 2, 3, 4].map((n) => (
                        <i key={n} className={n <= nivelSenal(d) ? 'net-bar--on' : ''} />
                      ))}
                    </span>
                  </button>
                </motion.li>
              )
            })}
          </ul>

          <footer className="net-foot mono">
            {DISTRITOS.length} distritos con cobertura · uptime 99.6%
          </footer>
        </motion.div>
      </div>
    </section>
  )
}
