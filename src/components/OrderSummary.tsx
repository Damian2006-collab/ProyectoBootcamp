import { formatOrderPrice, PICKUP_LABEL } from '../data/pedido';
import type { OrderBurger } from '../data/pedido';

export interface Order {
  burger: OrderBurger;
  quantity: number;
  total: number;
  name: string;
}

// El resumen que se ve al revisar el pedido y, de nuevo, al confirmarlo.
export default function OrderSummary({ order }: { order: Order }) {
  return (
    <dl className="order-summary">
      <dt>Producto</dt>
      <dd>{order.burger.name} ({formatOrderPrice(order.burger.price)} c/u)</dd>
      <dt>Cantidad</dt>
      <dd>{order.quantity}</dd>
      <dt>Total</dt>
      <dd>{formatOrderPrice(order.total)}</dd>
      <dt>Nombre</dt>
      <dd>{order.name}</dd>
      <dt>Entrega</dt>
      <dd>{PICKUP_LABEL}</dd>
    </dl>
  );
}
