import { useEffect, useRef, useState } from 'react';

export type ToastVariant = 'success' | 'error';

export interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

const TOAST_DURATION_MS = 4000;
const MAX_VISIBLE_TOASTS = 3;

// Cola de toasts: como mucho 3 visibles (al llegar un cuarto se va el más
// antiguo) y cada uno nuevo desaparece solo a los 4 segundos.
export function useToasts(initial: Toast[] = []) {
  const [toasts, setToasts] = useState<Toast[]>(initial);
  const nextId = useRef(initial.length + 1);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  function showToast(message: string, variant: ToastVariant) {
    const id = nextId.current++;
    setToasts((current) => {
      const kept = current.length >= MAX_VISIBLE_TOASTS ? current.slice(1) : current;
      return [...kept, { id, message, variant }];
    });
    timers.current.push(
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, TOAST_DURATION_MS),
    );
  }

  return { toasts, showToast };
}
