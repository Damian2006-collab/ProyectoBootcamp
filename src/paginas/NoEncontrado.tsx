import { Button, Container, Text, Title } from '@mantine/core'
import { Link } from 'react-router'

export function NoEncontrado() {
  return (
    <Container size="sm" py={80} ta="center">
      <Title order={1}>No encontrado</Title>
      <Text className="texto-tenue" mt="sm" mb="lg">Esta página no existe en Dami's Burguer.</Text>
      <Button component={Link} to="/" className="boton-dami">Volver al inicio</Button>
    </Container>
  )
}
