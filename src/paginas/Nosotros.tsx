import { Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'

const VALORES = [
  ['🥬', 'Ingredientes frescos', 'Compramos a proveedores locales y renovamos el stock todos los días.'],
  ['🔥', 'Preparación al momento', 'Nada se precocina: tu pedido se arma cuando lo confirmas.'],
  ['❤️', 'Trato cercano', 'Conocemos a nuestros clientes habituales y sus pedidos favoritos.'],
  ['♻️', 'Compromiso local', 'Trabajamos con productores de la zona siempre que es posible.'],
]

const EQUIPO = [
  ['photo-1560250097-0b93528c311a', 'Fundadora y chef', 'Daniela "Dami" Torres', "Creó la receta original de la Clásica Dami's en su cocina, hace más de cinco años."],
  ['photo-1568602471122-7832951cc4c5', 'Parrillero principal', 'Carlos Medina', 'Responsable de que cada carne salga en su punto justo, todos los días.'],
  ['photo-1573496359142-b8d87734a5a2', 'Gerente de local', 'Valentina Ríos', 'Coordina el equipo y se asegura de que cada pedido llegue a tiempo.'],
]

export function Nosotros() {
  return (
    <>
      <section className="seccion" aria-labelledby="nosotros-hero-titulo">
        <Container size="lg">
          <header className="cabecera-seccion">
            <Title order={1} id="nosotros-hero-titulo" className="hero-titulo">Nuestra historia</Title>
            <Text className="texto-tenue">Cómo una idea sencilla se convirtió en Dami's Burguer.</Text>
          </header>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
            <img
              className="foto-redondeada"
              src="https://images.unsplash.com/photo-1550317138-10000687a72b?w=700&h=400&fit=crop&q=80"
              alt="Cocina de Dami's Burguer preparando hamburguesas artesanales"
              width={700}
              height={400}
            />
            <Stack gap="sm">
              <Text>
                Dami's Burguer nació en un pequeño local de barrio con una idea simple: servir hamburguesas honestas, hechas con
                ingredientes frescos y sin atajos. Desde el primer día, cada pan se hornea en casa y cada salsa se prepara desde cero.
              </Text>
              <Text>
                Lo que empezó como un puesto familiar de fin de semana se convirtió en el lugar al que vecinos y visitantes vuelven
                cada semana. Crecimos, pero no cambiamos lo esencial: recetas propias, porciones generosas y un trato cercano con cada
                cliente que cruza la puerta.
              </Text>
              <Text>Hoy seguimos con la misma filosofía del primer día — cocinar como si cada hamburguesa fuera para un amigo.</Text>
            </Stack>
          </SimpleGrid>
        </Container>
      </section>

      <section className="seccion seccion--crema" aria-labelledby="valores-titulo">
        <Container size="lg">
          <header className="cabecera-seccion">
            <Title order={2} id="valores-titulo">Lo que nos mueve</Title>
            <Text className="texto-tenue">Los principios detrás de cada hamburguesa que sale de nuestra cocina.</Text>
          </header>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
            {VALORES.map(([icono, titulo, texto]) => (
              <div key={titulo} className="tarjeta-valor">
                <div className="tarjeta-valor__icono" aria-hidden="true">{icono}</div>
                <Title order={3} size="h4" mt="xs">{titulo}</Title>
                <Text size="sm" className="texto-tenue" mt={4}>{texto}</Text>
              </div>
            ))}
          </SimpleGrid>
        </Container>
      </section>

      <section className="seccion" aria-labelledby="equipo-titulo">
        <Container size="lg">
          <header className="cabecera-seccion">
            <Title order={2} id="equipo-titulo">Nuestro equipo</Title>
            <Text className="texto-tenue">Las personas que hacen posible cada hamburguesa.</Text>
          </header>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
            {EQUIPO.map(([foto, rol, nombre, texto]) => (
              <div key={nombre} className="tarjeta-equipo">
                <img
                  className="tarjeta-equipo__foto"
                  src={`https://images.unsplash.com/${foto}?w=200&h=200&fit=crop&q=80`}
                  alt=""
                  width={120}
                  height={120}
                  loading="lazy"
                />
                <Text size="sm" fw={700} className="rol">{rol}</Text>
                <Title order={3} size="h4">{nombre}</Title>
                <Text size="sm" className="texto-tenue" mt={4}>{texto}</Text>
              </div>
            ))}
          </SimpleGrid>
        </Container>
      </section>
    </>
  )
}
