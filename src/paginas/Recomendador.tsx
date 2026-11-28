import { useState, type FormEvent } from 'react'
import { Alert, Badge, Button, Card, Checkbox, Container, Group, NumberInput, Progress, SimpleGrid, Stack, Text, Textarea, Title } from '@mantine/core'
import { formatearUSD } from '../datos/menuCompleto'
import { GUSTOS_MAX, PRESUPUESTO_MAX, PRESUPUESTO_MIN, PRODUCTOS, esquemaEntradaIA } from '../ia/esquemas'
import { MODO_IA, pedirRecomendacion, type ResultadoIA } from '../ia/servicio'

type Errores = Partial<Record<'gustos' | 'presupuesto', string>>

export function Recomendador() {
  const [gustos, setGustos] = useState('')
  const [presupuesto, setPresupuesto] = useState<number | string>(15)
  const [sinCarne, setSinCarne] = useState(false)
  const [errores, setErrores] = useState<Errores>({})
  const [cargando, setCargando] = useState(false)
  const [resultado, setResultado] = useState<ResultadoIA | null>(null)

  async function enviar(e: FormEvent) {
    e.preventDefault()
    const entrada = { gustos, presupuesto: typeof presupuesto === 'number' ? presupuesto : Number.NaN, sinCarne }
    const validacion = esquemaEntradaIA.safeParse(entrada)
    if (!validacion.success) {
      const nuevos: Errores = {}
      for (const issue of validacion.error.issues) {
        const campo = issue.path[0]
        if ((campo === 'gustos' || campo === 'presupuesto') && !nuevos[campo]) nuevos[campo] = issue.message
      }
      setErrores(nuevos)
      return
    }
    setErrores({})
    setCargando(true)
    setResultado(null)
    setResultado(await pedirRecomendacion(validacion.data))
    setCargando(false)
  }

  return (
    <section className="seccion" aria-labelledby="recomendador-titulo">
      <Container size="lg">
        <header className="cabecera-seccion">
          <Title order={1} id="recomendador-titulo" className="hero-titulo">Recomendador con IA</Title>
          <Text className="texto-tenue">Cuéntanos qué te apetece y la IA elige del menú lo que mejor te va.</Text>
        </header>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={32}>
          <form onSubmit={enviar} noValidate aria-label="Preferencias para la recomendación">
            <Stack gap="md">
              <Textarea
                label="¿Qué se te antoja?"
                description="Por ejemplo: algo con bacon y un toque picante, para compartir."
                placeholder="Escribe tus gustos"
                autosize
                minRows={3}
                maxLength={GUSTOS_MAX}
                value={gustos}
                onChange={(e) => setGustos(e.currentTarget.value)}
                error={errores.gustos}
              />
              <NumberInput
                label="Presupuesto por persona (USD)"
                min={PRESUPUESTO_MIN}
                max={PRESUPUESTO_MAX}
                prefix="$"
                decimalScale={2}
                value={presupuesto}
                onChange={setPresupuesto}
                error={errores.presupuesto}
              />
              <Checkbox label="Sin carne (vegetariano)" checked={sinCarne} onChange={(e) => setSinCarne(e.currentTarget.checked)} />
              <Group>
                <Button type="submit" className="boton-dami" loading={cargando}>Pedir recomendación</Button>
                <Badge variant="light" color={MODO_IA === 'api' ? 'green' : 'gray'}>
                  {MODO_IA === 'api' ? 'Servicio: Gemini (backend)' : 'Servicio: simulador (mock)'}
                </Badge>
              </Group>
            </Stack>
          </form>

          <div aria-live="polite">
            {!resultado && !cargando && (
              <Text className="texto-tenue">Aquí aparecerá el análisis de la IA con hasta tres productos del menú.</Text>
            )}
            {resultado && !resultado.ok && (
              <Alert color="red" variant="light" title="No pudimos generar la recomendación" role="alert">
                {resultado.mensaje}
              </Alert>
            )}
            {resultado?.ok && (
              <Stack gap="sm">
                <Group justify="space-between">
                  <Title order={2} size="h3">Tu recomendación</Title>
                  <Badge variant="light" color={resultado.origen === 'gemini' ? 'green' : 'gray'}>
                    {resultado.origen === 'gemini' ? 'Generado por Gemini' : 'Generado por el simulador'}
                  </Badge>
                </Group>
                <Text>{resultado.datos.resumen}</Text>
                {resultado.datos.recomendaciones.map((r) => {
                  const producto = PRODUCTOS.find((p) => p.id === r.productoId)
                  if (!producto) return null
                  return (
                    <Card key={r.productoId} withBorder radius="md" padding="sm">
                      <Group justify="space-between" wrap="nowrap">
                        <Text fw={700}>{producto.nombre}</Text>
                        <Text fw={700}>{formatearUSD(producto.precio)}</Text>
                      </Group>
                      <Text size="sm" mt={4}>{r.motivo}</Text>
                      <Group gap="xs" mt="xs" wrap="nowrap">
                        <Progress value={r.coincidencia} color="dami" style={{ flex: 1 }} aria-label={`Coincidencia ${r.coincidencia}%`} />
                        <Text size="xs" className="texto-tenue">{r.coincidencia}%</Text>
                      </Group>
                    </Card>
                  )
                })}
                <Text size="sm" className="texto-tenue">Consejo: {resultado.datos.consejo}</Text>
              </Stack>
            )}
          </div>
        </SimpleGrid>
      </Container>
    </section>
  )
}
