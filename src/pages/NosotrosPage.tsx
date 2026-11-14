import Seo from '../components/Seo';

const VALUES = [
  { icon: '🥬', title: 'Ingredientes frescos', text: 'Compramos a proveedores locales y renovamos el stock todos los días.' },
  { icon: '🔥', title: 'Preparación al momento', text: 'Nada se precocina: tu pedido se arma cuando lo confirmas.' },
  { icon: '❤️', title: 'Trato cercano', text: 'Conocemos a nuestros clientes habituales y sus pedidos favoritos.' },
  { icon: '♻️', title: 'Compromiso local', text: 'Trabajamos con productores de la zona siempre que es posible.' },
];

const TEAM = [
  {
    photo: '1560250097-0b93528c311a',
    role: 'Fundadora y chef',
    name: 'Daniela "Dami" Torres',
    bio: "Creó la receta original de la Clásica Dami's en su cocina, hace más de cinco años.",
  },
  {
    photo: '1568602471122-7832951cc4c5',
    role: 'Parrillero principal',
    name: 'Carlos Medina',
    bio: 'Responsable de que cada carne salga en su punto justo, todos los días.',
  },
  {
    photo: '1573496359142-b8d87734a5a2',
    role: 'Gerente de local',
    name: 'Valentina Ríos',
    bio: 'Coordina el equipo y se asegura de que cada pedido llegue a tiempo.',
  },
];

export default function NosotrosPage() {
  return (
    <>
      <Seo
        title="Sobre nosotros — Dami's Burguer"
        description="Dami's Burguer — Conoce nuestra historia, valores e ingredientes frescos detrás de cada hamburguesa artesanal."
        socialDescription="Conoce nuestra historia, valores e ingredientes frescos detrás de cada hamburguesa artesanal."
      />

      <section aria-labelledby="nosotros-hero-titulo">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h1 id="nosotros-hero-titulo">Nuestra historia</h1>
            <p>Cómo una idea sencilla se convirtió en Dami's Burguer.</p>
          </header>

          <div className="two-columns">
            <article className="animate-on-scroll">
              <div className="about-image">
                <img
                  src="https://images.unsplash.com/photo-1550317138-10000687a72b?w=700&h=400&fit=crop&q=80"
                  alt="Cocina de Dami's Burguer preparando hamburguesas artesanales"
                  width={700}
                  height={400}
                  loading="lazy"
                />
              </div>
              <p>
                Dami's Burguer nació en un pequeño local de barrio con una idea simple:
                servir hamburguesas honestas, hechas con ingredientes frescos y sin atajos.
                Desde el primer día, cada pan se hornea en casa y cada salsa se prepara
                desde cero.
              </p>
            </article>

            <article className="animate-on-scroll">
              <p>
                Lo que empezó como un puesto familiar de fin de semana se convirtió en el
                lugar al que vecinos y visitantes vuelven cada semana. Crecimos, pero no
                cambiamos lo esencial: recetas propias, porciones generosas y un trato
                cercano con cada cliente que cruza la puerta.
              </p>
              <p>
                Hoy seguimos con la misma filosofía del primer día — cocinar como si cada
                hamburguesa fuera para un amigo.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section--cream" aria-labelledby="valores-titulo">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 id="valores-titulo">Lo que nos mueve</h2>
            <p>Los principios detrás de cada hamburguesa que sale de nuestra cocina.</p>
          </header>

          <ul className="value-grid animate-on-scroll" role="list">
            {VALUES.map((v) => (
              <li className="value-card" key={v.title}>
                <div className="value-card__icon" aria-hidden="true">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="equipo-titulo">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 id="equipo-titulo">Nuestro equipo</h2>
            <p>Las personas que hacen posible cada hamburguesa.</p>
          </header>

          <ul className="team-grid animate-on-scroll" role="list">
            {TEAM.map((person) => (
              <li className="team-card" key={person.name}>
                <img
                  className="team-card__photo"
                  src={`https://images.unsplash.com/photo-${person.photo}?w=200&h=200&fit=crop&q=80`}
                  alt=""
                  width={96}
                  height={96}
                  loading="lazy"
                />
                <p className="team-card__role">{person.role}</p>
                <h3>{person.name}</h3>
                <p>{person.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
