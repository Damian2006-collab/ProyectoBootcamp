import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useNavPill } from '../hooks/useNavPill';

// Enlaces del menú principal. Los que son páginas usan NavLink (pone
// aria-current="page" solo en la activa); los que son secciones de la
// portada (#testimonios, #contacto) usan Link, para no marcarse como activos.
const NAV_ITEMS = [
  { to: '/', label: 'Inicio', isPage: true },
  { to: '/#testimonios', label: 'Testimonios', isPage: false },
  { to: '/menu', label: 'Menú', isPage: true },
  { to: '/nosotros', label: 'Nosotros', isPage: true },
  { to: '/#contacto', label: 'Contacto', isPage: false },
  { to: '/login', label: 'Iniciar sesión', isPage: true },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const pill = useNavPill([pathname, isOpen]);

  // Escape cierra el menú móvil y devuelve el foco al botón.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <Link className="logo" to="/" aria-label="Dami's Burguer — Ir al inicio">
          Dami's <span>Burguer</span>
        </Link>

        <ThemeToggle />

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="menu-principal"
          id="btn-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          Menú
        </button>

        <nav
          className={isOpen ? 'main-nav is-open' : 'main-nav'}
          id="menu-principal"
          aria-label="Navegación principal"
          onBlur={pill.onNavBlur}
        >
          <ul role="list" ref={pill.listRef} onMouseLeave={pill.onListMouseLeave}>
            {/* Posición absoluta: no ocupa lugar en la lista. Es <li> porque un <ul> solo admite <li>. */}
            <li className="nav-pill" role="presentation" aria-hidden="true" ref={pill.pillRef} />
            {NAV_ITEMS.map((item) => {
              const props = {
                to: item.to,
                onMouseEnter: pill.linkHandlers.onMouseEnter,
                onFocus: pill.linkHandlers.onFocus,
                onClick: (e: MouseEvent<HTMLAnchorElement>) => {
                  pill.linkHandlers.onClick(e);
                  setIsOpen(false);
                },
              };
              return (
                <li key={item.to}>
                  {item.isPage ? (
                    <NavLink {...props} end className="">
                      {item.label}
                    </NavLink>
                  ) : (
                    <Link {...props}>{item.label}</Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
