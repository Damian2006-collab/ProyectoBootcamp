import { Button, Container, Group, List, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { Link } from 'react-router'
import { DESTACADOS } from '../datos/menuCompleto'
import { TarjetaProducto } from '../diseno/TarjetaProducto'
import { Contacto } from './Contacto'

const TESTIMONIOS = [
  { foto: 'photo-1494790108377-be9c29b29330', texto: 'La Clásica Dami\'s es la mejor hamburguesa que he probado. El pan está increíble y el servicio es rapidísimo.', autor: 'María González, cliente frecuente' },
  { foto: 'photo-1500648767791-00dcc994a43e', texto: 'Pedí la BBQ Smoke para llevar y llegó calientita, con el pan perfecto. Ya es mi lugar favorito del barrio.', autor: 'Andrés Paredes, cliente frecuente' },
  { foto: 'photo-1544005313-94ddf0286df2', texto: 'La Veggie Garden me sorprendió — no extrañé la carne para nada. Atención súper amable también.', autor: 'Camila Ortiz, primera visita' },
// ERROR INTENCIONAL: falta el corchete de cierre del arreglo

export function Inicio() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-titulo">
        <Container size="lg" py={56}>
          <div className="hero-rejilla">
            <Stack gap="md">
              <span className="hero-insignia">🔥 Recién hechas al momento</span>
              <Title order={1} id="hero-titulo" className="hero-titulo">
                Las mejores <em>hamburguesas</em> artesanales
              </Title>
              <Text size="lg" className="texto-tenue">
                Ingredientes frescos, pan recién horneado y recetas hechas con pasión. Bienvenido a Dami's Burguer.
              </Text>
              <Group>
                <Button component={Link} to="/menu" size="md" className="boton-dami">Ver menú</Button>
                <Button component={Link} to="/pedido" size="md" variant="outline" radius="xl">Hacer pedido</Button>
              </Group>
            </Stack>
            <div className="hero-imagen">
              <img
                src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=600&fit=crop&q=80"
                alt="Hamburguesa artesanal con queso derretido, lechuga y tomate en pan brioche"
                width={600}
                height={600}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="seccion seccion--crema" aria-labelledby="menu-titulo">
        <Container size="lg">
          <header className="cabecera-seccion">
            <Title order={2} id="menu-titulo">Menú destacado</Title>
            <Text className="texto-tenue">Nuestras hamburguesas más populares, preparadas al momento.</Text>
          </header>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
            {DESTACADOS.map((p) => <TarjetaProducto key={p.id} producto={p} />)}
          </SimpleGrid>
          <Group justify="center" mt="xl">
            <Button component={Link} to="/menu" variant="outline" radius="xl">Ver menú completo</Button>
          </Group>
        </Container>
      </section>

      <section className="seccion seccion--calida" aria-label="Nosotros y testimonios">
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
            <article id="nosotros" aria-labelledby="nosotros-titulo">
              <img
                className="foto-redondeada"
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&h=400&fit=crop&q=80"
                alt="Interior acogedor de restaurante con ambiente cálido"
                width={700}
                height={400}
                loading="lazy"
              />
              <Title order={2} id="nosotros-titulo" mt="md">Nosotros</Title>
              <Text mt="xs">
                Dami's Burguer nació con la idea de servir hamburguesas honestas: buenos ingredientes, porciones generosas y un trato cercano.
              </Text>
              <List mt="sm" spacing={4}>
                <List.Item>Ingredientes frescos y locales</List.Item>
                <List.Item>Preparación al momento</List.Item>
                <List.Item>Ambiente familiar y acogedor</List.Item>
              </List>
              <Text mt="sm"><Link to="/nosotros" className="enlace">Conoce nuestra historia completa →</Link></Text>
            </article>

            <article id="testimonios" aria-labelledby="testimonios-titulo">
              <Title order={2} id="testimonios-titulo">Testimonios</Title>
              <Stack mt="md" gap="md">
                {TESTIMONIOS.map((t) => (
                  <figure key={t.autor} className="testimonio">
                    <img
                      className="testimonio__avatar"
                      src={`https://images.unsplash.com/${t.foto}?w=120&h=120&fit=crop&q=80`}
                      alt=""
                      width={56}
                      height={56}
                      loading="lazy"
                    />
                    <div>
                      <blockquote><Text>"{t.texto}"</Text></blockquote>
                      <figcaption><Text size="sm" className="texto-tenue">— {t.autor}</Text></figcaption>
                    </div>
                  </figure>
                ))}
              </Stack>
            </article>
          </SimpleGrid>
        </Container>
      </section>

      <Contacto />
    </>
  )
}
