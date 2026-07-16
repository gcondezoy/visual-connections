import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { WhatsappLogo, Phone, Clock, EnvelopeSimple } from '@phosphor-icons/react'
import { useSegment } from '../segment.jsx'
import { NEGOCIO, DISTRITOS, whatsappLink } from '../config.js'
import './Contact.css'

const EASE = [0.16, 1, 0.3, 1]

export default function Contact() {
  const { segment, setSegment } = useSegment()
  const reduce = useReducedMotion()
  const [form, setForm] = useState({ nombre: '', telefono: '', distrito: '', mensaje: '' })
  const [errores, setErrores] = useState({})
  // micro-celebración tras armar el mensaje
  const [enviado, setEnviado] = useState(null) // null | link de WhatsApp
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  function set(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }))
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: null }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const err = {}
    if (!form.nombre.trim()) err.nombre = 'Escribe tu nombre para poder atenderte.'
    if (!form.telefono.trim()) err.telefono = 'Necesitamos un número para responderte.'
    setErrores(err)
    if (Object.keys(err).length > 0) return

    const tipo = segment === 'hogar' ? 'para mi casa' : 'para mi empresa'
    const partes = [
      `Hola Visual Connections, soy ${form.nombre.trim()}.`,
      `Quiero una cotización ${tipo}.`,
      form.distrito && `Estoy en ${form.distrito}.`,
      form.mensaje.trim() && `Detalle: ${form.mensaje.trim()}`,
      `Mi número: ${form.telefono.trim()}`,
    ].filter(Boolean)

    const link = whatsappLink(partes.join(' '))
    window.open(link, '_blank', 'noopener,noreferrer')
    setEnviado(link)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setEnviado(null), 9000)
  }

  return (
    <section id="contacto" className="section contact">
      <div className="container contact-inner">
        <motion.div
          className="contact-copy"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <h2 className="section-title">Hablemos de tu conexión</h2>
          <p className="section-sub">
            Completa el formulario y tu mensaje nos llega directo al WhatsApp. Respondemos el mismo día.
          </p>

          <ul className="contact-data">
            <li>
              <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
              <span className="mono">{NEGOCIO.telefonoVisible}</span>
            </li>
            <li>
              <Phone size={20} weight="fill" aria-hidden="true" />
              <span>Llamadas y WhatsApp</span>
            </li>
            <li>
              <EnvelopeSimple size={20} weight="fill" aria-hidden="true" />
              <span>{NEGOCIO.email}</span>
            </li>
            <li>
              <Clock size={20} weight="fill" aria-hidden="true" />
              <span>{NEGOCIO.horario}</span>
            </li>
          </ul>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={onSubmit}
          noValidate
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
        >
          <fieldset className="form-seg">
            <legend className="field-label">La cotización es</legend>
            <div className="form-seg-row" role="radiogroup" aria-label="Tipo de cotización">
              {[
                { id: 'hogar', label: 'Para mi casa' },
                { id: 'empresa', label: 'Para mi empresa' },
              ].map((o) => (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={segment === o.id}
                  className={`seg-chip ${segment === o.id ? 'seg-chip--on' : ''}`}
                  onClick={() => setSegment(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="f-nombre" className="field-label">
              Nombre
            </label>
            <input
              id="f-nombre"
              type="text"
              className={`field-input ${errores.nombre ? 'field-input--err' : ''}`}
              value={form.nombre}
              onChange={(e) => set('nombre', e.target.value)}
              autoComplete="name"
            />
            {errores.nombre && <p className="field-error">{errores.nombre}</p>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="f-telefono" className="field-label">
                Teléfono o WhatsApp
              </label>
              <input
                id="f-telefono"
                type="tel"
                className={`field-input ${errores.telefono ? 'field-input--err' : ''}`}
                value={form.telefono}
                onChange={(e) => set('telefono', e.target.value)}
                autoComplete="tel"
              />
              {errores.telefono && <p className="field-error">{errores.telefono}</p>}
            </div>

            <div className="field">
              <label htmlFor="f-distrito" className="field-label">
                Distrito
              </label>
              <select
                id="f-distrito"
                className="field-input"
                value={form.distrito}
                onChange={(e) => set('distrito', e.target.value)}
              >
                <option value="">Elige tu distrito</option>
                {DISTRITOS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
                <option value="Otro distrito">Otro distrito</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="f-mensaje" className="field-label">
              Cuéntanos qué necesitas <span className="field-opt">(opcional)</span>
            </label>
            <textarea
              id="f-mensaje"
              rows="3"
              className="field-input"
              value={form.mensaje}
              onChange={(e) => set('mensaje', e.target.value)}
            />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {enviado ? (
              <motion.div
                key="ok"
                className="form-ok"
                initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                aria-live="polite"
              >
                <svg viewBox="0 0 52 52" className="ok-svg" aria-hidden="true">
                  <circle cx="26" cy="26" r="24" fill="none" stroke="var(--ok)" strokeWidth="2" opacity="0.35" />
                  <motion.path
                    d="M15 27 L23 34 L37 19"
                    fill="none"
                    stroke="var(--ok)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
                  />
                </svg>
                <p className="ok-title">Tu mensaje está listo en WhatsApp</p>
                <a href={enviado} target="_blank" rel="noopener noreferrer" className="ok-link">
                  ¿No se abrió? Tócalo aquí
                </a>
              </motion.div>
            ) : (
              <motion.div
                key="btn"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button type="submit" className="btn btn-primary form-submit">
                  <WhatsappLogo size={20} weight="fill" />
                  Enviar por WhatsApp
                </button>
                <p className="form-note">Se abre WhatsApp con tu mensaje listo. No guardamos tus datos.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}
