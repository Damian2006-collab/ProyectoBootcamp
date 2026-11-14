import { Card, Table, Text, Title } from '@mantine/core'
import { formatearPrecio } from '../catalogo'
import { usePedidos } from './usePedidos'

// Lista de los pedidos confirmados mientras la página siga abierta.
export function PedidosDeLaSesion() {
  const pedidos = usePedidos((estado) => estado.pedidos)
  if (pedidos.length === 0) return null

  return (
    <Card withBorder radius="md" p="lg" mt="xl">
      <Title order={2} size="h4" mb="xs">Pedidos recibidos en esta sesión</Title>
      <Text size="sm" c="dimmed" mb="sm">Se guardan solo mientras la página esté abierta.</Text>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>N.º</Table.Th>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Producto</Table.Th>
            <Table.Th>Cantidad</Table.Th>
            <Table.Th>Total</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {pedidos.map((p) => (
            <Table.Tr key={p.numero}>
              <Table.Td>{p.numero}</Table.Td>
              <Table.Td>{p.nombre}</Table.Td>
              <Table.Td>{p.hamburguesa.nombre}</Table.Td>
              <Table.Td>{p.cantidad}</Table.Td>
              <Table.Td>{formatearPrecio(p.total)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  )
}
