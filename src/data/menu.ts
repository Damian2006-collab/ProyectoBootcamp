export type TagVariant = 'classic' | 'bbq' | 'veggie' | 'drinks' | 'sides';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  alt: string;
  tag: { label: string; variant: TagVariant };
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const img = (photoId: string) =>
  `https://images.unsplash.com/photo-${photoId}?w=500&h=375&fit=crop&q=80`;

const CLASSIC = { label: 'Clásica', variant: 'classic' } as const;
const BBQ = { label: 'BBQ', variant: 'bbq' } as const;
const VEGGIE = { label: 'Veggie', variant: 'veggie' } as const;
const DRINK = { label: 'Bebida', variant: 'drinks' } as const;
const SIDE = { label: 'Complemento', variant: 'sides' } as const;

// Todo el menú vive acá: las tarjetas se generan a partir de estos datos.
export const MENU: MenuCategory[] = [
  {
    title: 'Hamburguesas',
    items: [
      {
        id: 'clasica-damis',
        name: "Clásica Dami's",
        description: 'Carne 180 g, queso cheddar, lechuga, tomate y salsa especial.',
        price: 12.99,
        image: img('1550547660-d9450f859349'),
        alt: 'Hamburguesa clásica con queso cheddar y vegetales frescos',
        tag: CLASSIC,
      },
      {
        id: 'doble-queso',
        name: 'Doble Queso',
        description: 'Dos medallones de carne, doble queso cheddar, cebolla morada y pepinillos.',
        price: 15.99,
        image: img('1586190848861-99aa4a171e90'),
        alt: 'Hamburguesa doble con doble queso cheddar y cebolla morada',
        tag: CLASSIC,
      },
      {
        id: 'bbq-smoke',
        name: 'BBQ Smoke',
        description: 'Carne ahumada, cebolla caramelizada, bacon crujiente y salsa BBQ.',
        price: 14.99,
        image: img('1553979459-d2229ba7433b'),
        alt: 'Hamburguesa BBQ con bacon crujiente y cebolla caramelizada',
        tag: BBQ,
      },
      {
        id: 'bacon-especial',
        name: 'Bacon Especial',
        description: 'Doble bacon, queso gouda ahumado, aros de cebolla crocantes y salsa chipotle.',
        price: 16.49,
        image: img('1607013251379-e6eecfffe234'),
        alt: 'Hamburguesa con doble bacon y aros de cebolla crocantes',
        tag: BBQ,
      },
      {
        id: 'veggie-garden',
        name: 'Veggie Garden',
        description: 'Medallón de garbanzo, aguacate, rúcula y mayonesa de limón.',
        price: 11.99,
        image: img('1520072959219-c595dc870360'),
        alt: 'Hamburguesa vegetariana con aguacate y vegetales verdes',
        tag: VEGGIE,
      },
      {
        id: 'portobello-grill',
        name: 'Portobello Grill',
        description: 'Portobello a la parrilla, queso de cabra, rúcula y pesto.',
        price: 12.49,
        image: img('1551782450-a2132b4ba21d'),
        alt: 'Hamburguesa vegetariana de portobello a la parrilla',
        tag: VEGGIE,
      },
    ],
  },
  {
    title: 'Bebidas',
    items: [
      {
        id: 'gaseosa',
        name: 'Gaseosa',
        description: 'Coca-Cola, Sprite o Fanta, 355 ml.',
        price: 2.5,
        image: img('1554866585-cd94860890b7'),
        alt: 'Vaso de gaseosa con hielo',
        tag: DRINK,
      },
      {
        id: 'limonada',
        name: 'Limonada Natural',
        description: 'Limonada casera recién exprimida.',
        price: 3.25,
        image: img('1621263764928-df1444c5e859'),
        alt: 'Limonada natural recién exprimida',
        tag: DRINK,
      },
      {
        id: 'malteada-damis',
        name: "Malteada Dami's",
        description: 'Vainilla, chocolate o fresa, coronada con crema.',
        price: 5.5,
        image: img('1572490122747-3968b75cc699'),
        alt: 'Malteada coronada con crema batida',
        tag: DRINK,
      },
    ],
  },
  {
    title: 'Complementos',
    items: [
      {
        id: 'papas-fritas',
        name: 'Papas Fritas',
        description: 'Papas crocantes con sal marina, porción individual.',
        price: 4.99,
        image: img('1573080496219-bb080dd4f877'),
        alt: 'Porción de papas fritas crocantes',
        tag: SIDE,
      },
      {
        id: 'aros-cebolla',
        name: 'Aros de Cebolla',
        description: 'Aros de cebolla empanizados y crujientes.',
        price: 5.49,
        image: img('1585109649139-366815a0d713'),
        alt: 'Aros de cebolla empanizados y crujientes',
        tag: SIDE,
      },
      {
        id: 'nachos-damis',
        name: "Nachos Dami's",
        description: 'Nachos con queso derretido, jalapeños y guacamole.',
        price: 6.99,
        image: img('1513456852971-30c0b8199d4d'),
        alt: 'Nachos con queso derretido, jalapeños y guacamole',
        tag: SIDE,
      },
    ],
  },
];

/** Busca un producto por id (lo usa la portada para el menú destacado). */
export function findMenuItem(id: string): MenuItem {
  for (const category of MENU) {
    const item = category.items.find((i) => i.id === id);
    if (item) return item;
  }
  throw new Error(`Producto de menú desconocido: ${id}`);
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

/** "Precio: 12 dólares con 99 centavos", para lectores de pantalla. */
export function priceLabel(value: number): string {
  const [dollars, cents] = value.toFixed(2).split('.');
  return `Precio: ${dollars} dólares con ${cents} centavos`;
}
