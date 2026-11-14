import Seo from '../components/Seo';
import MenuCard from '../components/MenuCard';
import CartSummary from '../components/CartSummary';
import { MENU } from '../data/menu';
import type { MenuItem } from '../data/menu';
import { useCart } from '../hooks/useCart';

export default function MenuPage() {
  const cart = useCart();

  function handleAdd(item: MenuItem, quantity: number) {
    cart.addToCart(item.id, item.name, item.price, quantity);
  }

  return (
    <>
      <Seo
        title="Menú — Dami's Burguer"
        description="Dami's Burguer — Menú completo de hamburguesas artesanales, acompañamientos y bebidas, hechos con ingredientes frescos."
        socialDescription="Menú completo de hamburguesas artesanales, acompañamientos y bebidas, hechos con ingredientes frescos."
      />

      <section aria-labelledby="menu-hero-titulo">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h1 id="menu-hero-titulo">Elige tu hamburguesa favorita</h1>
            <p>Arma tu pedido: elige la cantidad y agrega hamburguesas, acompañamientos y bebidas a tu carrito.</p>
          </header>
        </div>
      </section>

      <section className="section--cream" id="menu-completo" aria-labelledby="menu-completo-titulo">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 id="menu-completo-titulo">Nuestro menú</h2>
            <p>Hamburguesas, bebidas y complementos, preparados al momento.</p>
          </header>

          {MENU.map((category) => (
            <div className="menu-category animate-on-scroll" key={category.title}>
              <h3 className="menu-category__title">{category.title}</h3>
              <ul className="menu-grid" role="list">
                {category.items.map((item) => (
                  <li key={item.id}>
                    <MenuCard item={item} onAdd={handleAdd} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="tu-pedido" aria-labelledby="tu-pedido-titulo">
        <div className="container">
          <header className="section-header animate-on-scroll">
            <h2 id="tu-pedido-titulo">Tu pedido</h2>
            <p>Revisa lo que llevas antes de continuar.</p>
          </header>

          <CartSummary
            items={cart.items}
            total={cart.total}
            onRemove={cart.removeFromCart}
            onClear={cart.clearCart}
          />
        </div>
      </section>
    </>
  );
}
