import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'motion/react'
import { Gauge as GaugeIcon, Timer, WhatsappLogo, ArrowClockwise } from '@phosphor-icons/react'
import { whatsappLink, MENSAJES } from '../config.js'
import './SpeedTest.css'

const EASE = [0.16, 1, 0.3, 1]

// Fuentes de medición (con respaldo si la primera no responde)
const FUENTES = {
  ping: [
    'https://speed.cloudflare.com/__down?bytes=0',
    'https://cdn.jsdelivr.net/npm/react@18.3.1/package.json',
  ],
  descarga: [
    'https://speed.cloudflare.com/__down?bytes=120000000',
    'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm',
  ],
}

function conCacheBuster(url) {
  return `${url}${url.includes('?') ? '&' : '?'}r=${Math.random().toString(36).slice(2)}`
}

async function medirPing(senal) {
  for (const base of FUENTES.ping) {
    try {
      let mejor = Infinity
      for (let i = 0; i < 4; i++) {
        const t0 = performance.now()
        const res = await fetch(conCacheBuster(base), { cache: 'no-store', signal: senal })
        await res.arrayBuffer()
        mejor = Math.min(mejor, performance.now() - t0)
      }
      return Math.round(mejor)
    } catch {
      // probar la siguiente fuente
    }
  }
  return null
}

async function medirDescarga(senal, onProgreso) {
  for (const base of FUENTES.descarga) {
    const ctrl = new AbortController()
    const timeout = setTimeout(() => ctrl.abort(), 6500) // presupuesto por fuente
    const alAbortar = () => ctrl.abort()
    senal.addEventListener('abort', alAbortar)
    try {
      const t0 = performance.now()
      const res = await fetch(conCacheBuster(base), { cache: 'no-store', signal: ctrl.signal })
      const reader = res.body.getReader()
      let bytes = 0
      try {
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          bytes += value.length
          const s = (performance.now() - t0) / 1000
          if (s > 0.25) onProgreso((bytes * 8) / s / 1e6)
        }
      } catch {
        // corte por presupuesto de tiempo: medimos con lo recibido
      }
      const s = (performance.now() - t0) / 1000
      if (bytes > 300000 && s > 0.4) return (bytes * 8) / s / 1e6
    } catch {
      // fuente no disponible, probar la siguiente
    } finally {
      clearTimeout(timeout)
      senal.removeEventListener('abort', alAbortar)
    }
  }
  return null
}

function formatear(mbps) {
  return mbps >= 100 ? Math.round(mbps).toString() : mbps.toFixed(1)
}

export default function SpeedTest() {
  const reduce = useReducedMotion()
  // fase: 'idle' | 'ping' | 'descarga' | 'listo' | 'error'
  const [fase, setFase] = useState('idle')
  const [ping, setPing] = useState(null)
  const [resultado, setResultado] = useState(0)
  const abortRef = useRef(null)

  const vivo = useMotionValue(0)
  const vivoTexto = useTransform(vivo, (v) => formatear(v))

  useEffect(() => () => abortRef.current?.abort(), [])

  async function medir() {
    abortRef.current?.abort()
    const ctrl = new AbortController()
    abortRef.current = ctrl
    vivo.set(0)
    setPing(null)

    setFase('ping')
    const ms = await medirPing(ctrl.signal)
    if (ctrl.signal.aborted) return
    setPing(ms)

    setFase('descarga')
    const mbps = await medirDescarga(ctrl.signal, (v) => vivo.set(v))
    if (ctrl.signal.aborted) return

    if (!mbps) {
      setFase('error')
      return
    }
    setResultado(mbps)
    animate(vivo, mbps, reduce ? { duration: 0 } : { duration: 0.6, ease: EASE })
    setFase('listo')
  }

  const midiendo = fase === 'ping' || fase === 'descarga'
  const ratio = resultado > 0 ? 600 / resultado : 0

  return (
    <section className="section stest" aria-label="Prueba de velocidad">
      <div className="container stest-inner">
        <h2 className="section-title">¿Cuánto te da tu internet hoy?</h2>
        <p className="section-sub">
          Mídelo aquí mismo, sin instalar nada, y compáralo con lo que tendrías con fibra.
        </p>

        <motion.div
          className="stest-panel"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {fase === 'idle' && (
            <div className="stest-idle">
              <button className="btn btn-primary stest-btn" onClick={medir}>
                <GaugeIcon size={20} weight="bold" />
                Medir mi velocidad
              </button>
              <p className="stest-nota">La prueba dura unos segundos, consume ~30 MB de datos y es referencial.</p>
            </div>
          )}

          {(midiendo || fase === 'listo') && (
            <div className="stest-medidor">
              <p className="stest-num mono">
                <motion.span>{vivoTexto}</motion.span>
                <span className="stest-unidad">Mbps</span>
              </p>

              {midiendo && (
                <>
                  <div className="stest-barra" aria-hidden="true">
                    <span className="stest-barra-luz" />
                  </div>
                  <p className="stest-fase mono" aria-live="polite">
                    {fase === 'ping' ? 'Midiendo respuesta' : 'Midiendo descarga'}
                  </p>
                </>
              )}

              {fase === 'listo' && (
                <motion.div
                  className="stest-result"
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {ping != null && (
                    <p className="stest-ping mono">
                      <Timer size={14} weight="bold" aria-hidden="true" />
                      respuesta {ping} ms
                    </p>
                  )}

                  <p className="stest-veredicto">
                    {resultado < 400 ? (
                      <>
                        Con <strong>Fibra 600</strong> tendrías{' '}
                        <strong>{ratio >= 10 ? Math.round(ratio) : ratio.toFixed(1)}× esa velocidad</strong>, con
                        subida igual de rápida.
                      </>
                    ) : (
                      <>
                        Vas bien de bajada. Con fibra simétrica tu <strong>subida</strong> sería igual de rápida
                        que tu bajada.
                      </>
                    )}
                  </p>

                  <div className="stest-acciones">
                    <a
                      href={whatsappLink(MENSAJES.speedtest(formatear(resultado)))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                      Cotiza gratis
                    </a>
                    <button className="btn btn-ghost" onClick={medir}>
                      <ArrowClockwise size={17} weight="bold" />
                      Medir de nuevo
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {fase === 'error' && (
            <div className="stest-idle">
              <p className="stest-veredicto">
                No pudimos medir desde tu red en este momento. Igual te ayudamos por WhatsApp.
              </p>
              <div className="stest-acciones">
                <a
                  href={whatsappLink(MENSAJES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  Cotiza gratis
                </a>
                <button className="btn btn-ghost" onClick={medir}>
                  <ArrowClockwise size={17} weight="bold" />
                  Intentar de nuevo
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
