type ContactFooterProps = {
  menu?: boolean;
};

export function ContactFooter({menu = false}: ContactFooterProps) {
  return (
    <footer className="site-footer" id="contacto">
      <div className="wrap site-footer__main">
        <div>
          <p className="eyebrow">Contacto</p>
          <h2>{menu ? "¿Ya elegiste?" : "¿Listo para disfrutar RYŌ?"}</h2>
        </div>
        <div className="site-footer__contact">
          <p>Alta cocina japonesa para disfrutar en casa.</p>
          <p><strong>Solo delivery y pick up.</strong></p>
          <a className="button button--solid magnetic-button" href="https://wa.me/584220382261" target="_blank" rel="noopener noreferrer">
            <span>Escribir por WhatsApp</span><i aria-hidden="true">↗</i>
          </a>
          <a href="https://www.instagram.com/ryomcbo/" target="_blank" rel="noopener noreferrer">Instagram · @ryomcbo</a>
        </div>
      </div>
      <div className="wrap site-footer__bottom">
        <span>RYŌ Sushi · {menu ? "Menú" : "Delivery y pick up"}</span>
        <span>{menu ? "Delivery y pick up" : "Instagram · WhatsApp"}</span>
      </div>
    </footer>
  );
}
