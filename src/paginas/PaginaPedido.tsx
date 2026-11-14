import { Container, Text, Title } from '@mantine/core'
import { PantallaPedido } from '../pedido/PantallaPedido'
import { PedidosDeLaSesion } from '../pedido/PedidosDeLaSesion'

// La pantalla de la consigna de la fase 4, sin cambios: catálogo de tres
// hamburguesas, formulario y cuadro de revisión.
export function PaginaPedido() {
  return (
    <Container size="lg" py="xl">
      <header className="hero hero--pedido">
        <Title order={1} className="hero-titulo">Elige tu hamburguesa favorita</Title>
        <Text mt="xs" mb="xl" className="texto-tenue">Arma tu pedido y retíralo en el local.</Text>
      </header>
      <PantallaPedido />
      <PedidosDeLaSesion />
    </Container>
  )
}
