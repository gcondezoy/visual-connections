import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import { FAQS } from '../data.js'
import './Faq.css'

export default function Faq() {
  const [abierta, setAbierta] = useState(0)

  return (
    <section id="preguntas" className="section faq">
      <div className="container faq-inner">
        <div className="faq-head">
          <h2 className="section-title">Preguntas frecuentes</h2>
          <p className="section-sub">
            Lo que todos nos preguntan antes de contratar, respondido sin letra chica.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((f, i) => {
            const open = abierta === i
            return (
              <div key={f.q} className={`faq-item ${open ? 'faq-item--open' : ''}`}>
                <button
                  className="faq-q"
                  aria-expanded={open}
                  onClick={() => setAbierta(open ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <CaretDown size={18} weight="bold" className="faq-caret" aria-hidden="true" />
                </button>
                <div className="faq-a-wrap">
                  <div className="faq-a-inner">
                    <p className="faq-a">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
