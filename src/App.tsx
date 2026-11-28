import { Route, Routes } from 'react-router'
import { Marco } from './diseno/Marco'
import { Login, Registro } from './paginas/Acceso'
import { Inicio } from './paginas/Inicio'
import { Menu } from './paginas/Menu'
import { NoEncontrado } from './paginas/NoEncontrado'
import { Nosotros } from './paginas/Nosotros'
import { PaginaPedido } from './paginas/PaginaPedido'
import { Recomendador } from './paginas/Recomendador'
import './App.css'

// Rutas declarativas con React Router (F3-D6).
function App() {
  return (
    <Routes>
      <Route element={<Marco />}>
        <Route index element={<Inicio />} />
        <Route path="menu" element={<Menu />} />
        <Route path="pedido" element={<PaginaPedido />} />
        <Route path="recomendador" element={<Recomendador />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}

export default App
