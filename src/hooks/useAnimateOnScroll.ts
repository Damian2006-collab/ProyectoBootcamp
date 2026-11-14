import { useEffect } from 'react';

// Hace aparecer con animación los elementos .animate-on-scroll cuando entran
// en pantalla. Se vuelve a ejecutar en cada cambio de página (`pageKey`).
export function useAnimateOnScroll(pageKey: string): void {
  useEffect(() => {
    const animated = Array.from(
      document.querySelectorAll<HTMLElement>('.animate-on-scroll:not(.is-visible)'),
    );

    if (!('IntersectionObserver' in window)) {
      animated.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    animated.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 0.1}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pageKey]);
}
