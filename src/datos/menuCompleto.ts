// Menú completo de la página anterior (pag_burguer/menu.html), para mirar.
// El pedido de la demostración usa su propio catálogo de tres hamburguesas
// (src/catalogo.ts); estos productos y precios no entran en el pedido.

export type Etiqueta = 'Clásica' | 'BBQ' | 'Veggie' | 'Bebida' | 'Complemento'

export interface Producto {
  id: string
  nombre: string
  descripcion: string
  precio: number
  etiqueta: Etiqueta
  imagen: string
  alt: string
}

export interface Categoria {
  titulo: string
  productos: Producto[]
}

const foto = (id: string) => `https://images.unsplash.com/${id}?w=500&h=375&fit=crop&q=80`

export const MENU_COMPLETO: Categoria[] = [
  {
    titulo: 'Hamburguesas',
    productos: [
      { id: 'clasica-damis', nombre: "Clásica Dami's", descripcion: 'Carne 180 g, queso cheddar, lechuga, tomate y salsa especial.', precio: 12.99, etiqueta: 'Clásica', imagen: foto('photo-1550547660-d9450f859349'), alt: 'Hamburguesa clásica con queso cheddar y vegetales frescos' },
      { id: 'doble-queso', nombre: 'Doble Queso', descripcion: 'Dos medallones de carne, doble queso cheddar, cebolla morada y pepinillos.', precio: 15.99, etiqueta: 'Clásica', imagen: foto('photo-1586190848861-99aa4a171e90'), alt: 'Hamburguesa doble con doble queso cheddar y cebolla morada' },
      { id: 'bbq-smoke', nombre: 'BBQ Smoke', descripcion: 'Carne ahumada, cebolla caramelizada, bacon crujiente y salsa BBQ.', precio: 14.99, etiqueta: 'BBQ', imagen: foto('photo-1553979459-d2229ba7433b'), alt: 'Hamburguesa BBQ con bacon crujiente y cebolla caramelizada' },
      { id: 'bacon-especial', nombre: 'Bacon Especial', descripcion: 'Doble bacon, queso gouda ahumado, aros de cebolla crocantes y salsa chipotle.', precio: 16.49, etiqueta: 'BBQ', imagen: foto('photo-1607013251379-e6eecfffe234'), alt: 'Hamburguesa con doble bacon y aros de cebolla' },
      { id: 'veggie-garden', nombre: 'Veggie Garden', descripcion: 'Medallón de garbanzo, aguacate, rúcula y mayonesa de limón.', precio: 11.99, etiqueta: 'Veggie', imagen: foto('photo-1520072959219-c595dc870360'), alt: 'Hamburguesa vegetariana con aguacate y vegetales verdes' },
      { id: 'portobello-grill', nombre: 'Portobello Grill', descripcion: 'Portobello a la parrilla, queso de cabra, rúcula y pesto.', precio: 12.49, etiqueta: 'Veggie', imagen: foto('photo-1551782450-a2132b4ba21d'), alt: 'Hamburguesa de portobello a la parrilla' },
    ],
  },
  {
    titulo: 'Bebidas',
    productos: [
      { id: 'gaseosa', nombre: 'Gaseosa', descripcion: 'Coca-Cola, Sprite o Fanta, 355 ml.', precio: 2.5, etiqueta: 'Bebida', imagen: foto('photo-1554866585-cd94860890b7'), alt: 'Lata de gaseosa fría' },
      { id: 'limonada', nombre: 'Limonada Natural', descripcion: 'Limonada casera recién exprimida.', precio: 3.25, etiqueta: 'Bebida', imagen: foto('photo-1621263764928-df1444c5e859'), alt: 'Vaso de limonada natural' },
      { id: 'malteada', nombre: "Malteada Dami's", descripcion: 'Vainilla, chocolate o fresa, coronada con crema.', precio: 5.5, etiqueta: 'Bebida', imagen: foto('photo-1572490122747-3968b75cc699'), alt: 'Malteada coronada con crema' },
    ],
  },
  {
    titulo: 'Complementos',
    productos: [
      { id: 'papas-fritas', nombre: 'Papas Fritas', descripcion: 'Papas crocantes con sal marina, porción individual.', precio: 4.99, etiqueta: 'Complemento', imagen: foto('photo-1573080496219-bb080dd4f877'), alt: 'Porción de papas fritas' },
      { id: 'aros-cebolla', nombre: 'Aros de Cebolla', descripcion: 'Aros de cebolla empanizados y crujientes.', precio: 5.49, etiqueta: 'Complemento', imagen: foto('photo-1585109649139-366815a0d713'), alt: 'Aros de cebolla empanizados' },
      { id: 'nachos-damis', nombre: "Nachos Dami's", descripcion: 'Nachos con queso derretido, jalapeños y guacamole.', precio: 6.99, etiqueta: 'Complemento', imagen: foto('photo-1513456852971-30c0b8199d4d'), alt: 'Nachos con queso y guacamole' },
    ],
  },
]

// Los tres que la portada muestra como destacados.
export const DESTACADOS = ['clasica-damis', 'bbq-smoke', 'veggie-garden']
  .map((id) => MENU_COMPLETO.flatMap((c) => c.productos).find((p) => p.id === id))
  .filter((p): p is Producto => Boolean(p))

export function formatearUSD(monto: number) {
  return '$' + monto.toFixed(2)
}
