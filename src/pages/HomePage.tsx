import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import MenuCard from '../components/MenuCard';
import ContactForm from '../components/ContactForm';
import { findMenuItem } from '../data/menu';

const FEATURED = [
  { id: 'clasica-damis', headingId: 'burger-clasica' },
  { id: 'bbq-smoke', headingId: 'burger-bbq' },
  { id: 'veggie-garden', headingId: 'burger-veggie' },
];

const TESTIMONIALS = [
  {
    photo: '1494790108377-be9c29b29330',
    quote: '"La Clásica Dami\'s es la mejor hamburguesa que he probado. El pan está increíble y el servicio es rapidísimo."',
    author: '— María González, cliente frecuente',
  },
  {
    photo: '1500648767791-00dcc994a43e',
    quote: '"Pedí la BBQ Smoke para llevar y llegó calientita, con el pan perfecto. Ya es mi lugar favorito del barrio."',
    author: '— Andrés Paredes, cliente frecuente',
  },
  {
    photo: '1544005313-94ddf0286df2',
    quote: '"La Veggie Garden me sorprendió — no extrañé la carne para nada. Atención súper amable también."',
    author: '— Camila Ortiz, primera visita',
  },
];

export default function HomePage() {
  return (
    <>
      <Seo
        title="Dami's Burguer — Hamburguesas artesanales"
        description="Dami's Burguer — Hamburguesas artesanales hechas con ingredientes frescos. Conoce nuestro menú y haz tu pedido."
        socialDescription="Hamburguesas artesanales hechas con ingredientes frescos. Conoce nuestro menú y haz tu pedido."
      />

      <section className="hero" id="inicio" aria-labelledby="hero-titulo">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">🔥 Recién hechas al momento</span>
            <h1 id="hero-titulo">Las mejores <em>hamburguesas</em> artesanales</h1>
            <p>Ingredientes frescos, pan recién horneado y recetas hechas con pasión. Bienvenido a Dami's Burguer.</p>
            <div className="hero-actions">
              <Link className="btn" to="/#menu">Ver menú</Link>
              <Link className="btn btn--outline" to="/#contacto">Hacer pedido</Link>
            </div>
          </div>

          <div className="hero-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=600&fit=crop&q=80"
              alt="Hamburguesa artesanal con queso derretido, lechuga y tomate en pan brioche"
              width={600}
              height={600}
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="section--cream" id="menu" aria-labelledby="menu-titulo">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 id="menu-titulo">Menú destacado</h2>
            <p>Nuestras hamburguesas más populares, preparadas al momento.</p>
          </header>

          <ul className="menu-grid" role="list">
            {FEATURED.map(({ id, headingId }) => (
              <li className="animate-on-scroll" key={id}>
                <MenuCard item={findMenuItem(id)} headingId={headingId} />
              </li>
            ))}
          </ul>

          <p className="section-cta">
            <Link className="btn btn--outline" to="/menu">Ver menú completo</Link>
          </p>
        </div>
      </section>

      <section className="section--warm" id="nosotros-testimonios" aria-label="Nosotros y testimonios">
        <div className="container two-columns">
          <article className="animate-on-scroll" id="nosotros" aria-labelledby="nosotros-titulo">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&h=400&fit=crop&q=80"
                alt="Interior acogedor de restaurante con ambiente cálido"
                width={700}
                height={400}
                loading="lazy"
              />
            </div>
            <h2 id="nosotros-titulo">Nosotros</h2>
            <p>
              Dami's Burguer nació con la idea de servir hamburguesas honestas:
              buenos ingredientes, porciones generosas y un trato cercano.
            </p>
            <ul className="about-list" aria-label="Nuestros valores">
              <li>Ingredientes frescos y locales</li>
              <li>Preparación al momento</li>
              <li>Ambiente familiar y acogedor</li>
            </ul>
            <Link className="inline-link" to="/nosotros">Conoce nuestra historia completa →</Link>
          </article>

          <article className="animate-on-scroll" id="testimonios" aria-labelledby="testimonios-titulo">
            <h2 id="testimonios-titulo">Testimonios</h2>
            <ul className="testimonial-list" role="list">
              {TESTIMONIALS.map((t) => (
                <li key={t.author}>
                  <div className="testimonial-card">
                    <figure>
                      <img
                        className="testimonial-avatar"
                        src={`https://images.unsplash.com/photo-${t.photo}?w=120&h=120&fit=crop&q=80`}
                        alt=""
                        width={56}
                        height={56}
                        loading="lazy"
                      />
                      <blockquote cite="#">
                        <p>{t.quote}</p>
                      </blockquote>
                      <figcaption>
                        <footer>{t.author}</footer>
                      </figcaption>
                    </figure>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section id="contacto" aria-labelledby="contacto-titulo">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 id="contacto-titulo">Contacto</h2>
            <p>Visítanos, llámanos o escríbenos. Estamos listos para atenderte.</p>
          </header>

          <div className="contact-layout">
            <div className="contact-info animate-on-scroll">
              <div className="contact-map">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=300&fit=crop&q=80"
                  alt="Vista del local de Dami's Burguer con mesas y ambiente acogedor"
                  width={600}
                  height={300}
                  loading="lazy"
                />
              </div>
              <h3 className="visually-hidden" id="info-contacto">Información de contacto</h3>
              <address aria-labelledby="info-contacto">
                Av. Principal 123<br />
                Ciudad, País
              </address>

              <dl>
                <dt>Teléfono</dt>
                <dd><a href="tel:+1234567890">+1 (234) 567-890</a></dd>
                <dt>Horario</dt>
                <dd>Lun – Vie: 11:00 – 22:00<br />Sáb – Dom: 12:00 – 23:00</dd>
                <dt>Correo</dt>
                <dd><a href="mailto:info@damisburguer.com">info@damisburguer.com</a></dd>
              </dl>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
