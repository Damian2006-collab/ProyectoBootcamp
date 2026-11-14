import { Alert, Button, Container, SimpleGrid, Text, Title } from '@mantine/core'
import { Link } from 'react-router'
import { MENU_COMPLETO } from '../datos/menuCompleto'
import { TarjetaProducto } from '../diseno/TarjetaProducto'

export function Menu() {
  return (
    <>
      <section className="seccion" aria-labelledby="menu-hero-titulo">
        <Container size="lg">
          <header className="cabecera-seccion">
            <Title order={1} id="menu-hero-titulo" className="hero-titulo">Nuestro menú</Title>
            <Text className="texto-tenue">Hamburguesas, bebidas y complementos de la casa.</Text>
          </header>
          <Alert variant="light" color="orange" radius="md" maw={720} mx="auto" title="Pedidos en esta demostración">
            Por ahora se pide una sola hamburguesa por pedido, con retiro en el local.{' '}
            <Button component={Link} to="/pedido" size="compact-sm" variant="subtle">Hacer pedido →</Button>
          </Alert>
        </Container>
      </section>

      <section className="seccion seccion--crema" aria-label="Menú completo">
        <Container size="lg">
          {MENU_COMPLETO.map((categoria) => (
            <div key={categoria.titulo} className="categoria">
              <Title order={2} size="h3" mb="md" className="categoria__titulo">{categoria.titulo}</Title>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
                {categoria.productos.map((p) => <TarjetaProducto key={p.id} producto={p} />)}
              </SimpleGrid>
            </div>
          ))}
        </Container>
      </section>
    </>
  )
}
