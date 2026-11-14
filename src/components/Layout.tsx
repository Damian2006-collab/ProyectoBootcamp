import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

// Estructura común de todas las páginas del sitio: enlace para saltar al
// contenido, cabecera, la página actual (<Outlet />) y el pie.
export default function Layout() {
  const location = useLocation();

  // Al cambiar de ruta: si la URL trae #ancla, baja hasta esa sección
  // (ej. /#contacto); si no, vuelve arriba como haría una página nueva.
  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash, location.key]);

  useAnimateOnScroll(location.pathname);

  return (
    <>
      <a className="skip-link" href="#contenido-principal">Saltar al contenido principal</a>
      <Header />
      <main id="contenido-principal">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
