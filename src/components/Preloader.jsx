import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './Preloader.css'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Preloader de marca: el logo "se conecta" (ondas de señal + línea que carga)
 * y la cortina se levanta revelando la página. Se muestra una vez por sesión.
 * `onReveal` monta el contenido justo cuando empieza la salida.
 */
export default function Preloader({ onReveal }) {
  const [show, setShow] = useState(true)
  const [enLinea, setEnLinea] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setEnLinea(true), 1050)
    const t2 = setTimeout(() => {
      sessionStorage.setItem('vc-intro', '1')
      onReveal()
      setShow(false)
    }, 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onReveal])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader"
          role="status"
          aria-label="Cargando"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <div className="loader-core">
            <div className="loader-mark">
              {/* ondas de señal emitiendo */}
              <span className="loader-ring" />
              <span className="loader-ring loader-ring--2" />
              {/* layoutId compartido: al salir, el logo "vuela" a su sitio en el navbar */}
              <motion.img
                src="/img/logo-icon.png"
                alt=""
                layoutId="brand-mark"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </div>

            <motion.p
              className="loader-name"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            >
              <em>Visual</em> Connections
            </motion.p>

            <div className="loader-track">
              <motion.span
                className="loader-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.95, delay: 0.15, ease: [0.3, 0.6, 0.3, 1] }}
              />
            </div>

            <p className={`loader-status mono ${enLinea ? 'loader-status--ok' : ''}`}>
              {enLinea ? 'En línea' : 'Conectando'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
