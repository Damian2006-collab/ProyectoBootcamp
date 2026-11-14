export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <p><small>&copy; 2026 Dami's Burguer. Todos los derechos reservados.</small></p>

        <nav className="footer-nav" aria-label="Enlaces legales">
          <ul role="list">
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Términos de uso</a></li>
          </ul>
        </nav>

        <ul className="social-links" role="list" aria-label="Redes sociales">
          <li><a href="#" aria-label="Dami's Burguer en Instagram">Instagram</a></li>
          <li><a href="#" aria-label="Dami's Burguer en Facebook">Facebook</a></li>
        </ul>
      </div>
    </footer>
  );
}
