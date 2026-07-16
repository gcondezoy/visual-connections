import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

/**
 * Botón magnético: el contenido se inclina suavemente hacia el cursor
 * con físicas de resorte. En táctil o con movimiento reducido, no hace nada.
 */
export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [fine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches,
  )

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.25 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.25 })

  if (reduce || !fine) return children

  function move(e) {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * (strength + 0.08))
  }

  function leave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </motion.span>
  )
}
