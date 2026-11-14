import { useState } from 'react'
import { Alert, Anchor, Button, Card, Container, SimpleGrid, Stack, Text, Textarea, TextInput, Title } from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { esquemaContacto } from '../formularios/esquemas'

export function Contacto() {
  const [aviso, setAviso] = useState<'ok' | 'error' | null>(null)
  const form = useForm({
    initialValues: { nombre: '', email: '', mensaje: '' },
    validate: schemaResolver(esquemaContacto, { sync: true }),
  })

  return (
    <section id="contacto" className="seccion" aria-labelledby="contacto-titulo">
      <Container size="lg">
        <header className="cabecera-seccion">
          <Title order={2} id="contacto-titulo">Contacto</Title>
          <Text className="texto-tenue">Visítanos, llámanos o escríbenos. Estamos listos para atenderte.</Text>
        </header>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={40}>
          <Stack>
            <img
              className="foto-redondeada"
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=300&fit=crop&q=80"
              alt="Vista del local de Dami's Burguer con mesas y ambiente acogedor"
              width={600}
              height={300}
              loading="lazy"
            />
            <address className="direccion">Av. Principal 123<br />Ciudad, País</address>
            <dl className="datos-contacto">
              <dt>Teléfono</dt>
              <dd><Anchor href="tel:+1234567890">+1 (234) 567-890</Anchor></dd>
              <dt>Horario</dt>
              <dd>Lun – Vie: 11:00 – 22:00<br />Sáb – Dom: 12:00 – 23:00</dd>
              <dt>Correo</dt>
              <dd><Anchor href="mailto:info@damisburguer.com">info@damisburguer.com</Anchor></dd>
            </dl>
          </Stack>

          <Card withBorder radius={12} p="lg" className="tarjeta-formulario">
            <form
              noValidate
              aria-labelledby="formulario-titulo"
              onSubmit={form.onSubmit(
                () => { setAviso('ok'); form.reset() },
                () => setAviso('error'),
              )}
            >
              <Stack>
                <Title order={3} id="formulario-titulo">Envíanos un mensaje</Title>
                <TextInput label="Nombre" autoComplete="name" withAsterisk {...form.getInputProps('nombre')} />
                <TextInput label="Correo electrónico" type="email" autoComplete="email" withAsterisk {...form.getInputProps('email')} />
                <Textarea label="Mensaje" description="Cuéntanos tu pedido o consulta." minRows={4} autosize withAsterisk {...form.getInputProps('mensaje')} />
                <Button type="submit" className="boton-dami">Enviar mensaje</Button>
                <div role="status" aria-live="polite">
                  {aviso === 'ok' && <Alert color="green" variant="light">¡Gracias! Tu mensaje fue enviado correctamente.</Alert>}
                  {aviso === 'error' && <Alert color="red" variant="light">Revisa los campos marcados en rojo.</Alert>}
                </div>
              </Stack>
            </form>
          </Card>
        </SimpleGrid>
      </Container>
    </section>
  )
}
