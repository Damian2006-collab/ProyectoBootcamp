import { Table } from '@mantine/core'
import { formatearPrecio } from '../catalogo'
import type { ResumenPedido } from './esquema'

export function TablaResumen({ resumen }: { resumen: ResumenPedido }) {
  const filas: [string, string][] = [
    ['Producto', `${resumen.hamburguesa.nombre} (${formatearPrecio(resumen.hamburguesa.precio)} c/u)`],
    ['Cantidad', String(resumen.cantidad)],
    ['Total', formatearPrecio(resumen.total)],
    ['Nombre', resumen.nombre],
    ['Entrega', resumen.entrega],
  ]

  return (
    <Table withRowBorders variant="vertical" layout="fixed" data-testid="resumen">
      <Table.Tbody>
        {filas.map(([etiqueta, valor]) => (
          <Table.Tr key={etiqueta}>
            <Table.Th w={110}>{etiqueta}</Table.Th>
            <Table.Td>{valor}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
