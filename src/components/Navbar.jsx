import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { List, X, Sun, MoonStars } from '@phosphor-icons/react'
import { useScrollSpy } from '../hooks.js'
import './Navbar.css'

function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'dark',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('vc-theme', theme)
  }, [theme])

  const oscuro = theme === 'dark'

  return (
    <button
      className="theme-toggle"
      aria-label={oscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={oscuro ? 'Tema claro' : 'Tema oscuro'}
      onClick={() => setTheme(oscuro ? 'light' : 'dark')}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'grid', placeItems: 'center' }}
        >
          {oscuro ? <Sun size={19} weight="bold" /> : <MoonStars size={19} weight="bold" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#planes', label: 'Planes' },
  { href: '#preguntas', label: 'Preguntas' },
]

const SECTION_IDS = ['servicios', 'cobertura', 'planes', 'preguntas']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const active = useScrollSpy(SECTION_IDS)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open)
    return () => document.body.classList.remove('no-scroll')
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#inicio" className="nav-brand" aria-label="Corporación Visual Connections, inicio">
          <span className="nav-markwrap">
            <span className="nav-ring" aria-hidden="true" />
            <span className="nav-ring nav-ring--2" aria-hidden="true" />
            <motion.img
              src="/img/logo-icon.png"
              alt=""
              className="nav-mark"
              layoutId="brand-mark"
              transition={{ type: 'spring', stiffness: 200, damping: 26 }}
            />
          </span>
          <span className="nav-lockup">
            <span className="nav-corp">Corporación</span>
            <span className="nav-name">
              <em>Visual</em> Connections
            </span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Secciones">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link ${active === l.href ? 'nav-link--on' : ''}`}
              aria-current={active === l.href ? 'true' : undefined}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <ThemeToggle />

        <a href="#contacto" className="btn btn-primary nav-cta">
          Cotiza gratis
        </a>

        <button
          className="nav-burger"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav-drawer"
            aria-label="Menú móvil"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="drawer-link" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#contacto" className="btn btn-primary drawer-cta" onClick={() => setOpen(false)}>
              Cotiza gratis
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
