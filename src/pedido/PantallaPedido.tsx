import { useState } from 'react'
import {
  Alert,
  SimpleGrid,
  Button,
  Card,
  Grid,
  Group,
  Modal,
  NumberInput,
  Radio,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { buscarHamburguesa, formatearPrecio, HAMBURGUESAS } from '../catalogo'
import {
  armarResumen,
  CANTIDAD_MAXIMA,
  CANTIDAD_MINIMA,
  esquemaPedido,
  VALORES_INICIALES,
  type ResumenPedido,
  type ValoresPedido,
} from './esquema'
import { TablaResumen } from './TablaResumen'
import { usePedidos, type PedidoRecibido } from './usePedidos'

type Paso = { tipo: 'formulario' } | { tipo: 'revision'; resumen: ResumenPedido } | { tipo: 'recibido'; pedido: PedidoRecibido }

export function PantallaPedido() {
  const [paso, setPaso] = useState<Paso>({ tipo: 'formulario' })
  const registrar = usePedidos((estado) => estado.registrar)

  const form = useForm<ValoresPedido>({
    initialValues: VALORES_INICIALES,
    validate: schemaResolver(esquemaPedido, { sync: true }),
    validateInputOnBlur: true,
  })

  const seleccion = buscarHamburguesa(form.values.hamburguesa)
  const cantidad = form.values.cantidad
  const cantidadValida =
    typeof cantidad === 'number' && Number.isInteger(cantidad) && cantidad >= CANTIDAD_MINIMA && cantidad <= CANTIDAD_MAXIMA

  const revisar = form.onSubmit((valores) => {
    const resumen = armarResumen(valores)
    if (resumen) setPaso({ tipo: 'revision', resumen })
  })

  // Volver (o cerrar el cuadro) durante la revisión conserva los datos.
  const volver = () => setPaso({ tipo: 'formulario' })

  const confirmar = () => {
    const resumen = armarResumen(form.getValues())
    if (form.validate().hasErrors || !resumen) {
      setPaso({ tipo: 'formulario' })
      return
    }
    setPaso({ tipo: 'recibido', pedido: registrar(resumen) })
  }

  const nuevoPedido = () => {
    form.reset()
    setPaso({ tipo: 'formulario' })
  }

  return (
    <>
      <form onSubmit={revisar} noValidate>
        <Grid gap="xl">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Radio.Group
              label={<Title order={2} size="h3">Nuestro menú</Title>}
              description="Elige una hamburguesa. Cada pedido lleva un solo tipo."
              {...form.getInputProps('hamburguesa')}
            >
              <SimpleGrid mt="sm" cols={{ base: 1, sm: 3 }} spacing="md">
                {HAMBURGUESAS.map((h) => (
                  <Radio.Card key={h.id} value={h.id} radius={12} className="menu-card">
                    <div className="menu-card__imagen">
                      <img src={h.imagen} alt={h.alt} width={500} height={375} loading="lazy" />
                    </div>
                    <Stack gap={6} p="md">
                      <Group justify="space-between" wrap="nowrap">
                        <Text fw={800} fz="lg">{h.nombre}</Text>
                        <Radio.Indicator />
                      </Group>
                      <Text size="sm" c="var(--dami-tenue)">{h.descripcion}</Text>
                      <Text className="precio">{formatearPrecio(h.precio)} <span>USD</span></Text>
                    </Stack>
                  </Radio.Card>
                ))}
              </SimpleGrid>
            </Radio.Group>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card withBorder radius={12} p="lg" className="tarjeta-pedido">
              <Stack>
                <Title order={2} size="h3">Tu pedido</Title>
                <TextInput
                  label="Nombre"
                  placeholder="¿A nombre de quién?"
                  withAsterisk
                  autoComplete="given-name"
                  {...form.getInputProps('nombre')}
                />
                <NumberInput
                  label="Cantidad"
                  description={`De ${CANTIDAD_MINIMA} a ${CANTIDAD_MAXIMA}`}
                  withAsterisk
                  min={CANTIDAD_MINIMA}
                  max={CANTIDAD_MAXIMA}
                  allowDecimal={false}
                  allowNegative={false}
                  clampBehavior="none"
                  {...form.getInputProps('cantidad')}
                />
                <Group justify="space-between" align="baseline">
                  <Text c="dimmed">Total</Text>
                  {seleccion && cantidadValida ? (
                    <Text fw={700} fz="xl" data-testid="total">
                      {formatearPrecio(seleccion.precio * cantidad)}
                      <Text span c="dimmed" fz="sm" fw={400}>
                        {' '}({cantidad} × {formatearPrecio(seleccion.precio)})
                      </Text>
                    </Text>
                  ) : (
                    <Text c="dimmed" data-testid="total">—</Text>
                  )}
                </Group>
                <Text size="sm" c="dimmed">Entrega: Retiro en el local</Text>
                <Button type="submit" size="md" className="boton-dami">Realizar pedido</Button>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </form>

      <Modal
        opened={paso.tipo !== 'formulario'}
        onClose={paso.tipo === 'recibido' ? nuevoPedido : volver}
        title={paso.tipo === 'recibido' ? 'Pedido recibido' : 'Revisa tu pedido'}
        centered
      >
        {paso.tipo === 'revision' && (
          <Stack>
            <TablaResumen resumen={paso.resumen} />
            <Group justify="flex-end">
              <Button variant="default" onClick={volver}>Volver</Button>
              <Button onClick={confirmar} className="boton-dami">Confirmar pedido</Button>
            </Group>
          </Stack>
        )}
        {paso.tipo === 'recibido' && (
          <Stack>
            <Alert color="green" variant="light" title="Pedido recibido en esta demostración">
              Pedido n.º {paso.pedido.numero}. No se cobró nada: es una demostración.
            </Alert>
            <TablaResumen resumen={paso.pedido} />
            <Group justify="flex-end">
              <Button onClick={nuevoPedido}>Hacer otro pedido</Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </>
  )
}
