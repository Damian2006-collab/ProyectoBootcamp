import { useRef } from 'react';

type FieldElement = HTMLInputElement & HTMLTextAreaElement;

// Guarda una referencia a cada campo del formulario para poder enfocar
// el primero que tenga error al enviar.
export function useFieldRefs<K extends string>() {
  const refs = useRef<Partial<Record<K, FieldElement | null>>>({});

  function refFor(key: K) {
    return (el: FieldElement | null) => {
      refs.current[key] = el;
    };
  }

  function focus(key: K | undefined) {
    if (key) refs.current[key]?.focus();
  }

  return { refFor, focus };
}
