import { useState, type ReactNode } from 'react'
import { Alert, Button, Card, Container, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { Link } from 'react-router'
import { CONTRASENA_MINIMA, esquemaLogin, esquemaRegistro, fuerzaContrasena, NOMBRE_FUERZA } from '../formularios/esquemas'

// Las cuentas de verdad llegan en una fase posterior: aquí solo se validan los
// datos, igual que en la página anterior, y no se guarda nada.

type Aviso = 'ok' | 'error' | null

function Tarjeta({ id, titulo, bajada, children, pie }: { id: string; titulo: string; bajada: string; children: ReactNode; pie: ReactNode }) {
  return (
    <section className="seccion" aria-labelledby={id}>
      <Container size={460}>
        <Card withBorder radius={12} p="xl" className="tarjeta-formulario">
          <Title order={1} size="h2" id={id}>{titulo}</Title>
          <Text className="texto-tenue" mt={4} mb="lg">{bajada}</Text>
          {children}
          <Text size="sm" ta="center" mt="lg">{pie}</Text>
        </Card>
      </Container>
    </section>
  )
}

function Mensaje({ aviso, bien }: { aviso: Aviso; bien: string }) {
  return (
    <div role="status" aria-live="polite">
      {aviso === 'ok' && <Alert color="green" variant="light">{bien}</Alert>}
      {aviso === 'error' && <Alert color="red" variant="light">Revisa los campos marcados en rojo.</Alert>}
    </div>
  )
}

export function Login() {
  const [aviso, setAviso] = useState<Aviso>(null)
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: schemaResolver(esquemaLogin, { sync: true }),
  })
  return (
    <Tarjeta
      id="login-titulo"
      titulo="Iniciar sesión"
      bajada="Accede a tu cuenta de Dami's Burguer para agilizar tus pedidos."
      pie={<>¿No tienes cuenta? <Link to="/registro" className="enlace">Regístrate</Link></>}
    >
      <form noValidate aria-labelledby="login-titulo" onSubmit={form.onSubmit(() => setAviso('ok'), () => setAviso('error'))}>
        <Stack>
          <TextInput label="Correo electrónico" type="email" autoComplete="email" withAsterisk {...form.getInputProps('email')} />
          <PasswordInput label="Contraseña" autoComplete="current-password" withAsterisk {...form.getInputProps('password')} />
          <Button type="submit" className="boton-dami">Iniciar sesión</Button>
          <Mensaje aviso={aviso} bien="¡Bienvenido de vuelta! Iniciando sesión..." />
        </Stack>
      </form>
    </Tarjeta>
  )
}

export function Registro() {
  const [aviso, setAviso] = useState<Aviso>(null)
  const form = useForm({
    initialValues: { nombre: '', email: '', nacimiento: '', password: '', confirmar: '' },
    validate: schemaResolver(esquemaRegistro, { sync: true }),
  })
  const clave = form.values.password
  const fuerza = clave ? fuerzaContrasena(clave) : null

  return (
    <Tarjeta
      id="registro-titulo"
      titulo="Crear cuenta"
      bajada="Regístrate para hacer pedidos más rápido y guardar tus hamburguesas favoritas."
      pie={<>¿Ya tienes cuenta? <Link to="/login" className="enlace">Inicia sesión</Link></>}
    >
      <form
        noValidate
        aria-labelledby="registro-titulo"
        onSubmit={form.onSubmit(() => { setAviso('ok'); form.reset() }, () => setAviso('error'))}
      >
        <Stack>
          <TextInput label="Nombre" autoComplete="name" withAsterisk {...form.getInputProps('nombre')} />
          <TextInput label="Correo electrónico" type="email" autoComplete="email" withAsterisk {...form.getInputProps('email')} />
          <TextInput label="Fecha de nacimiento" type="date" withAsterisk {...form.getInputProps('nacimiento')} />
          <div>
            <PasswordInput
              label="Contraseña"
              description={`Mínimo ${CONTRASENA_MINIMA} caracteres, combinando mayúsculas, minúsculas, números y símbolos.`}
              autoComplete="new-password"
              withAsterisk
              {...form.getInputProps('password')}
            />
            {fuerza && (
              <Text size="xs" mt={4} className={`fuerza fuerza--${fuerza}`} aria-live="polite">{NOMBRE_FUERZA[fuerza]}</Text>
            )}
          </div>
          <PasswordInput label="Confirmar contraseña" autoComplete="new-password" withAsterisk {...form.getInputProps('confirmar')} />
          <Button type="submit" className="boton-dami">Crear cuenta</Button>
          <Mensaje aviso={aviso} bien="¡Cuenta creada correctamente! Ya puedes iniciar sesión." />
        </Stack>
      </form>
    </Tarjeta>
  )
}
