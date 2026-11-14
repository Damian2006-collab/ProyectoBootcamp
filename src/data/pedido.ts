// Catálogo de la pantalla de pedido: tres hamburguesas con precio fijo.
// Cada pedido lleva un solo tipo de hamburguesa.

export interface OrderBurger {
  id: string;
  name: string;
  price: number;
  description: string;
  /** Miniatura cuadrada del catálogo del menú. */
  image: string;
  /** Foto grande para las tarjetas de la portada. */
  cardImage: string;
}

const photo = (photoId: string) => ({
  image: `https://images.unsplash.com/photo-${photoId}?w=160&h=160&fit=crop&q=80`,
  cardImage: `https://images.unsplash.com/photo-${photoId}?w=500&h=375&fit=crop&q=80`,
});

export const ORDER_BURGERS: OrderBurger[] = [
  {
    id: 'clasica',
    name: 'Clásica',
    price: 5,
    description: 'Carne, queso cheddar, lechuga y tomate.',
    ...photo('1550547660-d9450f859349'),
  },
  {
    id: 'queso',
    name: 'Queso',
    price: 6,
    description: 'Carne con doble cheddar fundido y cebolla.',
    ...photo('1586190848861-99aa4a171e90'),
  },
  {
    id: 'doble',
    name: 'Doble',
    price: 7,
    description: 'Dos medallones de carne con queso y salsa especial.',
    ...photo('1553979459-d2229ba7433b'),
  },
];

export const MIN_QTY = 1;
export const MAX_QTY = 5;
export const MIN_NAME_LENGTH = 2;
export const PICKUP_LABEL = 'Retiro en el local';

/** Precios enteros: "$10". */
export function formatOrderPrice(value: number): string {
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}

export function burgerError(id: string): string {
  return ORDER_BURGERS.some((b) => b.id === id) ? '' : 'Elige una hamburguesa.';
}

export function nameError(value: string): string {
  const name = value.trim();
  if (!name) return 'Escribe tu nombre.';
  if (name.length < MIN_NAME_LENGTH) return `El nombre debe tener al menos ${MIN_NAME_LENGTH} caracteres.`;
  return '';
}

/** La cantidad viene como texto del input: tiene que ser un entero de 1 a 5. */
export function parseQty(value: string): number | null {
  const text = value.trim();
  if (!/^\d+$/.test(text)) return null;
  const qty = Number(text);
  return qty >= MIN_QTY && qty <= MAX_QTY ? qty : null;
}

export function qtyError(value: string): string {
  return parseQty(value) === null ? `Elige una cantidad entera entre ${MIN_QTY} y ${MAX_QTY}.` : '';
}
