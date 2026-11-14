import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import NosotrosPage from './pages/NosotrosPage';
import PedidoPage from './pages/PedidoPage';
import LoginPage from './pages/LoginPage';
import RegistroPage from './pages/RegistroPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="nosotros" element={<NosotrosPage />} />
        <Route path="pedido" element={<PedidoPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegistroPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
