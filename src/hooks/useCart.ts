import { useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Pedido simulado: no hay backend, el carrito se guarda en el navegador.
const STORAGE_KEY = 'damisburguer_carrito';
export const MAX_QTY = 20;

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(readCart);

  // Cada vez que cambia el carrito, se guarda en localStorage.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(id: string, name: string, price: number, quantity: number) {
    setItems((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.min(MAX_QTY, item.quantity + quantity) }
            : item,
        );
      }
      return [...current, { id, name, price, quantity }];
    });
  }

  function removeFromCart(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return { items, total, addToCart, removeFromCart, clearCart };
}
