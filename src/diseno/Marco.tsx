import { useEffect, useState } from 'react'
import { ActionIcon, Anchor, Burger, Container, Group, Text, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { Link, NavLink, Outlet, useLocation } from 'react-router'

const ENLACES: [string, string][] = [
  ['/', 'Inicio'],
  ['/menu', 'Menú'],
  ['/pedido', 'Hacer pedido'],
  ['/nosotros', 'Nosotros'],
  ['/#contacto', 'Contacto'],
  ['/login', 'Iniciar sesión'],
]

// Al cambiar de página se vuelve arriba; si la dirección trae #ancla, se
// baja hasta esa sección (React Router no lo hace solo).
function useDesplazamiento() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const destino = document.getElementById(hash.slice(1))
      if (destino) { destino.scrollIntoView({ behavior: 'smooth' }); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}

export function Marco() {
  const [abierto, setAbierto] = useState(false)
  const { setColorScheme } = useMantineColorScheme()
  const esquema = useComputedColorScheme('light')
  const oscuro = esquema === 'dark'
  useDesplazamiento()

  // el menú del móvil se cierra al elegir un enlace o con Escape
  useEffect(() => {
    const alPulsar = (e: KeyboardEvent) => { if (e.key === 'Escape') setAbierto(false) }
    document.addEventListener('keydown', alPulsar)
    return () => document.removeEventListener('keydown', alPulsar)
  }, [])

  return (
    <>
      <a className="saltar" href="#contenido-principal">Saltar al contenido principal</a>
      <header className="site-header">
        <Container size="lg" py="sm">
          <Group justify="space-between" wrap="nowrap">
            <Link to="/" className="logo" aria-label="Dami's Burguer — Ir al inicio">
              Dami's <span>Burguer</span>
            </Link>
            <Group gap="xs" wrap="nowrap">
              <nav id="menu-principal" className={'nav-principal' + (abierto ? ' abierto' : '')} aria-label="Navegación principal">
                {ENLACES.map(([destino, texto]) => (
                  <NavLink
                    key={destino}
                    to={destino}
                    end
                    onClick={() => setAbierto(false)}
                    className={({ isActive }) => 'nav-enlace' + (isActive && !destino.includes('#') ? ' activo' : '')}
                  >
                    {texto}
                  </NavLink>
                ))}
              </nav>
              <ActionIcon
                variant="default"
                radius="xl"
                size="lg"
                onClick={() => setColorScheme(oscuro ? 'light' : 'dark')}
                aria-pressed={oscuro}
                aria-label={oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                <span aria-hidden="true">{oscuro ? '☀️' : '🌙'}</span>
              </ActionIcon>
              <Burger
                className="boton-menu"
                opened={abierto}
                onClick={() => setAbierto((a) => !a)}
                aria-expanded={abierto}
                aria-controls="menu-principal"
                aria-label="Menú"
                size="sm"
              />
            </Group>
          </Group>
        </Container>
      </header>

      <main id="contenido-principal">
        <Outlet />
      </main>

      <footer className="site-footer">
        <Container size="lg" py="lg">
          <Group justify="space-between" gap="md">
            <Text size="sm">&copy; 2026 Dami's Burguer. Todos los derechos reservados.</Text>
            <Group gap="md" component="nav" aria-label="Enlaces legales">
              <Anchor href="#" size="sm">Política de privacidad</Anchor>
              <Anchor href="#" size="sm">Términos de uso</Anchor>
            </Group>
            <Group gap="md" aria-label="Redes sociales">
              <Anchor href="#" size="sm" aria-label="Dami's Burguer en Instagram">Instagram</Anchor>
              <Anchor href="#" size="sm" aria-label="Dami's Burguer en Facebook">Facebook</Anchor>
            </Group>
          </Group>
        </Container>
      </footer>
    </>
  )
}
