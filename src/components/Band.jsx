import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import './Band.css'

/**
 * Banda full-bleed con parallax de imagen:
 * la foto se desplaza más lento que el scroll (profundidad real).
 */
export default function Band() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <section className="band" ref={ref}>
      <motion.div className="band-media" style={reduce ? undefined : { y }} aria-hidden="true">
        {/* TODO: reemplazar por foto real (ciudad / instalación nocturna) */}
        <img src="/img/ciudad.webp" alt="" loading="lazy" />
      </motion.div>
      <div className="band-scrim" aria-hidden="true" />

      <div className="container band-content">
        <motion.p
          className="band-figure mono"
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          600 Mbps simétricos
        </motion.p>
        <motion.p
          className="band-line"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          La misma velocidad para subir y bajar. En tu casa o en tu empresa.
        </motion.p>
      </div>
    </section>
  )
}
