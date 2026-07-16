import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react'
import './SignalLine.css'

/**
 * Firma visual del sitio: una fibra vertical fija que se "enciende" con el
 * scroll, con un pulso de luz en la punta. Hace de indicador de progreso.
 */
export default function SignalLine() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [alto, setAlto] = useState(0)

  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const headY = useTransform(p, (v) => v * alto)

  useEffect(() => {
    function medir() {
      if (ref.current) setAlto(ref.current.offsetHeight)
    }
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])

  if (reduce) return null

  return (
    <div className="sline" ref={ref} aria-hidden="true">
      <motion.span className="sline-fill" style={{ scaleY: p }} />
      <motion.span className="sline-head" style={{ y: headY }} />
    </div>
  )
}
