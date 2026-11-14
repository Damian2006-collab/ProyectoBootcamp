import { formatPrice } from '../data/menu';
import type { CartItem } from '../hooks/useCart';

interface CartSummaryProps {
  items: CartItem[];
  total: number;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function CartSummary({ items, total, onRemove, onClear }: CartSummaryProps) {
  const isEmpty = items.length === 0;

  return (
    <div className="cart-summary animate-on-scroll">
      <h2 className="visually-hidden">Resumen del carrito</h2>
      {isEmpty && (
        <p className="cart-summary__empty" id="carrito-vacio">
          Todavía no agregaste nada. Elige tus hamburguesas, acompañamientos o bebidas de arriba.
        </p>
      )}
      <ul className="cart-summary__list" id="carrito-lista" role="list">
        {items.map((item) => (
          <li className="cart-summary__item" key={item.id}>
            <span className="cart-summary__item-name">{item.name} × {item.quantity}</span>
            <span className="cart-summary__item-price">{formatPrice(item.price * item.quantity)}</span>
            <button
              type="button"
              className="cart-summary__remove"
              aria-label={`Quitar ${item.name} del pedido`}
              onClick={() => onRemove(item.id)}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>
      <p className="cart-summary__total" id="carrito-total" aria-live="polite">
        {isEmpty ? '' : `Total: ${formatPrice(total)}`}
      </p>
      {/* Se renderiza solo si hay algo: con el atributo hidden no alcanza,
          porque el display de .btn en el CSS lo vuelve a mostrar. */}
      {!isEmpty && (
        <button
          type="button"
          className="btn btn--outline cart-summary__clear"
          id="carrito-vaciar"
          onClick={onClear}
        >
          Vaciar pedido
        </button>
      )}
    </div>
  );
}
