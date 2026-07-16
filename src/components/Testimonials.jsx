import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate, useReducedMotion } from 'motion/react'
import { Quotes, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { TESTIMONIOS } from '../data.js'
import './Testimonials.css'

const EASE = [0.16, 1, 0.3, 1]

// Carrusel arrastrable con snap por tarjeta y flechas
export default function Testimonials() {
  const reduce = useReducedMotion()
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const x = useMotionValue(0)

  const [idx, setIdx] = useState(0)
  const [medidas, setMedidas] = useState({ step: 0, maxDrag: 0, maxIdx: 0 })

  // mide paso entre tarjetas y límite de arrastre; se recalcula al redimensionar
  useEffect(() => {
    function medir() {
      const track = trackRef.current
      const viewport = viewportRef.current
      if (!track || !viewport || track.children.length < 2) return
      const step = track.children[1].offsetLeft - track.children[0].offsetLeft
      const maxDrag = Math.max(0, track.scrollWidth - viewport.offsetWidth)
      setMedidas({ step, maxDrag, maxIdx: step ? Math.ceil(maxDrag / step) : 0 })
    }
    medir()
    const ro = new ResizeObserver(medir)
    if (viewportRef.current) ro.observe(viewportRef.current)
    return () => ro.disconnect()
  }, [])

  function irA(i) {
    const destino = Math.max(0, Math.min(i, medidas.maxIdx))
    setIdx(destino)
    const targetX = Math.max(-medidas.maxDrag, -destino * medidas.step)
    animate(x, targetX, reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 })
  }

  function onDragEnd(_, info) {
    const proyectado = x.get() + info.velocity.x * 0.18
    irA(Math.round(-proyectado / medidas.step))
  }

  return (
    <section className="section testimonials" aria-label="Testimonios de clientes">
      <div className="container">
        <div className="tst-head">
          <h2 className="section-title">Lo que dicen quienes ya se cambiaron</h2>
          <div className="tst-arrows">
            <button
              className="tst-arrow"
              aria-label="Testimonios anteriores"
              disabled={idx <= 0}
              onClick={() => irA(idx - 1)}
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              className="tst-arrow"
              aria-label="Siguientes testimonios"
              disabled={idx >= medidas.maxIdx}
              onClick={() => irA(idx + 1)}
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </div>

        <motion.div
          className="tst-viewport"
          ref={viewportRef}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <motion.div
            className="tst-track"
            ref={trackRef}
            style={{ x, touchAction: 'pan-y' }}
            drag="x"
            dragConstraints={{ left: -medidas.maxDrag, right: 0 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
          >
            {TESTIMONIOS.map((t) => (
              <blockquote key={t.nombre} className="quote">
                <Quotes size={26} weight="fill" className="quote-mark" aria-hidden="true" />
                <p className="quote-text">{t.texto}</p>
                <footer className="quote-by">
                  <span className="by-name">{t.nombre}</span>
                  <span className="by-detail">{t.detalle}</span>
                </footer>
              </blockquote>
            ))}
          </motion.div>
        </motion.div>

        <p className="tst-hint mono" aria-hidden="true">
          Arrastra para ver más
        </p>
      </div>
    </section>
  )
}
