import { useCallback, useEffect, useRef } from 'react';
import type { FocusEvent, MouseEvent } from 'react';

// La "píldora" que se desliza debajo del enlace del menú sobre el que está el
// mouse o el foco, y vuelve al enlace de la página actual (aria-current).
// Se posiciona con transform calculado desde getBoundingClientRect(), así
// sirve igual para el menú horizontal de escritorio y el desplegable móvil.
export function useNavPill(remeasureKeys: unknown[]) {
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLLIElement>(null);

  const movePillTo = useCallback((target: HTMLElement) => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;

    const listRect = list.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // Si el <nav> está oculto (menú móvil cerrado) todo mide 0: no tiene
    // sentido moverla ahí, se recalcula cuando el menú se abra.
    if (targetRect.width === 0 && targetRect.height === 0) return;

    pill.style.width = `${targetRect.width}px`;
    pill.style.height = `${targetRect.height}px`;
    pill.style.transform = `translate(${targetRect.left - listRect.left}px, ${targetRect.top - listRect.top}px)`;
    pill.style.opacity = '1';
  }, []);

  const showActivePill = useCallback(() => {
    const active = listRef.current?.querySelector<HTMLAnchorElement>('a[aria-current="page"]');
    if (active) {
      movePillTo(active);
    } else if (pillRef.current) {
      pillRef.current.style.opacity = '0';
    }
  }, [movePillTo]);

  // Recoloca sin animación: solo los movimientos del usuario se animan.
  const placeInstantly = useCallback(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const previousTransition = pill.style.transition;
    pill.style.transition = 'none';
    showActivePill();
    void pill.offsetWidth; // fuerza el reflow antes de reactivar la transición
    pill.style.transition = previousTransition;
  }, [showActivePill]);

  useEffect(() => {
    window.addEventListener('resize', placeInstantly);
    window.addEventListener('load', placeInstantly);
    document.fonts?.ready.then(placeInstantly);
    return () => {
      window.removeEventListener('resize', placeInstantly);
      window.removeEventListener('load', placeInstantly);
    };
  }, [placeInstantly]);

  // Al cambiar de página o abrir el menú móvil hay que volver a medir.
  useEffect(() => {
    const frame = requestAnimationFrame(placeInstantly);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeInstantly, ...remeasureKeys]);

  const linkHandlers = {
    onMouseEnter: (e: MouseEvent<HTMLAnchorElement>) => movePillTo(e.currentTarget),
    onFocus: (e: FocusEvent<HTMLAnchorElement>) => movePillTo(e.currentTarget),
    onClick: (e: MouseEvent<HTMLAnchorElement>) => movePillTo(e.currentTarget),
  };

  const onNavBlur = (e: FocusEvent<HTMLElement>) => {
    const related = e.relatedTarget;
    if (!(related instanceof Node) || !e.currentTarget.contains(related)) {
      showActivePill();
    }
  };

  return { listRef, pillRef, linkHandlers, onListMouseLeave: showActivePill, onNavBlur };
}
