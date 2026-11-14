import { Text } from '@mantine/core'
import { formatearUSD, type Producto } from '../datos/menuCompleto'

const CLASE_ETIQUETA: Record<Producto['etiqueta'], string> = {
  Clásica: 'clasica',
  BBQ: 'bbq',
  Veggie: 'veggie',
  Bebida: 'bebida',
  Complemento: 'complemento',
}

// La tarjeta del menú de la página anterior, solo para mirar.
export function TarjetaProducto({ producto }: { producto: Producto }) {
  return (
    <article className="menu-card menu-card--estatica" aria-labelledby={`item-${producto.id}`}>
      <div className="menu-card__imagen">
        <img src={producto.imagen} alt={producto.alt} width={500} height={375} loading="lazy" />
      </div>
      <div className="menu-card__cuerpo">
        <span className={`etiqueta etiqueta--${CLASE_ETIQUETA[producto.etiqueta]}`}>{producto.etiqueta}</span>
        <Text component="h3" fw={800} fz="lg" id={`item-${producto.id}`} mt={6}>{producto.nombre}</Text>
        <Text size="sm" className="texto-tenue" mt={4} mb="sm">{producto.descripcion}</Text>
        <Text className="precio">{formatearUSD(producto.precio)} <span>USD</span></Text>
      </div>
    </article>
  )
}
