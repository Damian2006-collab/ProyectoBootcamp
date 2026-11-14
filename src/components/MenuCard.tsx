import { useEffect, useRef, useState } from 'react';
import { formatPrice, priceLabel } from '../data/menu';
import type { MenuItem } from '../data/menu';
import { MAX_QTY } from '../hooks/useCart';

interface MenuCardProps {
  item: MenuItem;
  /** id del <h3>, para el aria-labelledby de la tarjeta. */
  headingId?: string;
  /** Si viene, la tarjeta muestra cantidad y "Agregar al pedido". */
  onAdd?: (item: MenuItem, quantity: number) => void;
}

function clampQty(value: number): number {
  if (!value || value < 1) return 1;
  return Math.min(MAX_QTY, value);
}

export default function MenuCard({ item, headingId = `item-${item.id}`, onAdd }: MenuCardProps) {
  // Texto del input: se deja escribir libremente y se corrige al salir (onBlur).
  const [qtyText, setQtyText] = useState('1');
  const [justAdded, setJustAdded] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const qty = clampQty(parseInt(qtyText, 10));

  function handleAdd() {
    if (!onAdd) return;
    onAdd(item, qty);
    setQtyText('1');
    setJustAdded(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <article className="menu-card" aria-labelledby={headingId}>
      <div className="menu-card__image">
        <img src={item.image} alt={item.alt} width={500} height={375} loading="lazy" />
      </div>
      <div className="menu-card__body">
        <span className={`menu-card__tag menu-card__tag--${item.tag.variant}`}>{item.tag.label}</span>
        <h3 id={headingId}>{item.name}</h3>
        <p>{item.description}</p>
        <p className="price" aria-label={priceLabel(item.price)}>
          {formatPrice(item.price)} <span>USD</span>
        </p>

        {onAdd && (
          <>
            <div className="menu-card__qty">
              <button
                type="button"
                className="qty-btn qty-btn--minus"
                aria-label={`Restar una unidad de ${item.name}`}
                onClick={() => setQtyText(String(Math.max(1, qty - 1)))}
              >
                −
              </button>
              <input
                type="number"
                className="qty-input"
                value={qtyText}
                min={1}
                max={MAX_QTY}
                inputMode="numeric"
                aria-label={`Cantidad de ${item.name}`}
                onChange={(e) => setQtyText(e.target.value)}
                onBlur={() => setQtyText(String(qty))}
              />
              <button
                type="button"
                className="qty-btn qty-btn--plus"
                aria-label={`Sumar una unidad de ${item.name}`}
                onClick={() => setQtyText(String(Math.min(MAX_QTY, qty + 1)))}
              >
                +
              </button>
            </div>
            <button type="button" className="btn btn--add-to-cart" onClick={handleAdd}>
              {justAdded ? 'Agregado ✓' : 'Agregar al pedido'}
            </button>
          </>
        )}
      </div>
    </article>
  );
}
