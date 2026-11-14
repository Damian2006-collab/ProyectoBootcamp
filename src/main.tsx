import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider, type MantineColorsTuple } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import { BrowserRouter } from 'react-router'
import App from './App.tsx'

// Rojo de marca de la página anterior (#c0392b en el tono 6).
const rojoDami: MantineColorsTuple = [
  '#fdeeec', '#f8dad6', '#efb3ab', '#e6897e', '#de6658',
  '#d24c3d', '#c0392b', '#a83123', '#96281b', '#7a1f14',
]

const tema = createTheme({
  primaryColor: 'dami',
  primaryShade: { light: 6, dark: 5 },
  colors: { dami: rojoDami },
  fontFamily: "'Nunito', system-ui, sans-serif",
  headings: { fontFamily: "'Nunito', system-ui, sans-serif", fontWeight: '800' },
  defaultRadius: 'md',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={tema} defaultColorScheme="light">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
