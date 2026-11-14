import { useEffect, useRef } from 'react';

interface AccountMenuProps {
  id: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  /** Texto visible del botón; si es un ícono, se pasa `ariaLabel`. */
  triggerLabel: string;
  ariaLabel?: string;
  iconOnly?: boolean;
}

// Menú desplegable "Cuenta". Quién está abierto lo decide el padre, así abrir
// uno cierra el otro. Escape lo cierra y devuelve el foco al botón; un clic
// afuera lo cierra sin mover el foco.
export default function AccountMenu({
  id,
  isOpen,
  onToggle,
  onClose,
  triggerLabel,
  ariaLabel,
  iconOnly = false,
}: AccountMenuProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const triggerId = `menu-trigger-${id}`;
  const menuId = `menu-cuenta-${id}`;

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
    }
    function onClick(event: MouseEvent) {
      if (event.target instanceof Node && !wrapperRef.current?.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, [isOpen, onClose]);

  return (
    <div className="menu-demo" ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`c-btn ${iconOnly ? 'c-btn--icon' : 'c-btn--secondary'} c-menu-account-toggle`}
        id={triggerId}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={ariaLabel}
        onClick={onToggle}
      >
        {triggerLabel}
      </button>
      <ul className="c-menu-account" id={menuId} role="menu" aria-labelledby={triggerId} hidden={!isOpen}>
        <li role="none"><a role="menuitem" href="#">Perfil</a></li>
        <li role="none"><a role="menuitem" href="#">Configuración</a></li>
        <li role="none"><button type="button" role="menuitem">Cerrar sesión</button></li>
      </ul>
    </div>
  );
}
