import { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react'
import { WhatsappLogo, CaretUp } from '@phosphor-icons/react'
import { whatsappLink, MENSAJES } from '../config.js'
import './FloatingWhatsApp.css'

export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()
  const reduce = useReducedMotion()

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 500))

  function volverArriba() {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="float-stack">
      <AnimatePresence>
        {visible && (
          <motion.button
            key="top"
            className="to-top"
            aria-label="Volver arriba"
            onClick={volverArriba}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.08 }}
          >
            <CaretUp size={20} weight="bold" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.a
            key="wa"
            href={whatsappLink(MENSAJES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-float"
            aria-label="Escribir por WhatsApp"
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.05 }}
            whileHover={{ scale: 1.08 }}
          >
            <WhatsappLogo size={28} weight="fill" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  )
}
