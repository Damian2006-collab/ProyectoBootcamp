export interface Hamburguesa {
  id: 'clasica' | 'queso' | 'doble'
  nombre: string
  descripcion: string
  precio: number
  imagen: string
  alt: string
}

const foto = (id: string) => `https://images.unsplash.com/${id}?w=500&h=375&fit=crop&q=80`

// Catálogo fijo de la demostración: tres hamburguesas con precio fijo.
// Fotos y descripciones tomadas de la página anterior (pag_burguer/menu.html).
export const HAMBURGUESAS: readonly Hamburguesa[] = [
  {
    id: 'clasica',
    nombre: 'Clásica',
    descripcion: 'Carne 180 g, lechuga, tomate y salsa especial.',
    precio: 5,
    imagen: foto('photo-1550547660-d9450f859349'),
    alt: 'Hamburguesa clásica con queso cheddar y vegetales frescos',
  },
  {
    id: 'queso',
    nombre: 'Queso',
    descripcion: 'Carne 180 g con queso cheddar derretido y pepinillos.',
    precio: 6,
    imagen: foto('photo-1586190848861-99aa4a171e90'),
    alt: 'Hamburguesa con queso cheddar y cebolla morada',
  },
  {
    id: 'doble',
    nombre: 'Doble',
    descripcion: 'Dos medallones de carne, doble queso y cebolla caramelizada.',
    precio: 7,
    imagen: foto('photo-1553979459-d2229ba7433b'),
    alt: 'Hamburguesa doble con cebolla caramelizada',
  },
]

export const IDS_HAMBURGUESAS = ['clasica', 'queso', 'doble'] as const

export function buscarHamburguesa(id: string): Hamburguesa | undefined {
  return HAMBURGUESAS.find((h) => h.id === id)
}

export function formatearPrecio(monto: number): string {
  return Number.isInteger(monto) ? `$${monto}` : `$${monto.toFixed(2)}`
}
