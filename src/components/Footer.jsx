import { FacebookLogo, InstagramLogo, TiktokLogo } from '@phosphor-icons/react'
import { NEGOCIO } from '../config.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-lockup">
            <img src="/img/logo-icon.png" alt="" className="footer-mark" />
            <span>
              <span className="footer-corp">Corporación</span>
              <span className="footer-name">
                <em>Visual</em> Connections
              </span>
            </span>
          </span>
          <p className="footer-about">
            Partner autorizado de WIN. Internet de fibra óptica y redes empresariales en Lima.
          </p>
          <div className="footer-social">
            <a href={NEGOCIO.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookLogo size={20} weight="fill" />
            </a>
            <a href={NEGOCIO.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramLogo size={20} weight="fill" />
            </a>
            <a href={NEGOCIO.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <TiktokLogo size={20} weight="fill" />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Mapa del sitio">
          <p className="footer-col-title">Secciones</p>
          <a href="#servicios">Servicios</a>
          <a href="#proceso">Cómo funciona</a>
          <a href="#cobertura">Cobertura</a>
          <a href="#planes">Planes</a>
          <a href="#preguntas">Preguntas frecuentes</a>
        </nav>

        <div className="footer-col">
          <p className="footer-col-title">Contacto</p>
          <p>{NEGOCIO.telefonoVisible}</p>
          <p>{NEGOCIO.email}</p>
          <p>{NEGOCIO.direccion}</p>
          <p>{NEGOCIO.horario}</p>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Legal</p>
          <p>{NEGOCIO.ruc}</p>
          <a href={NEGOCIO.libroReclamaciones} target="_blank" rel="noopener noreferrer">
            Libro de Reclamaciones
          </a>
        </div>
      </div>

      <div className="footer-base">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {NEGOCIO.nombreCorporativo}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
