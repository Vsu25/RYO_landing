type ContactFooterProps = {
  menu?: boolean;
};

export function ContactFooter({menu = false}: ContactFooterProps) {
  return (
    <footer className="site-footer" id="contacto">
      <div className="site-footer__pattern" aria-hidden="true" />
      <div className="wrap site-footer__main">
        <div className="site-footer__intro">
          <p className="eyebrow">Contacto</p>
          <h2>{menu ? "¿Ya elegiste?" : "Una última pieza del ritual."}</h2>
          <p>Alta cocina japonesa para disfrutar en casa.</p>
        </div>
        <div className="site-footer__contact">
          <p><strong>Solo delivery y pick up.</strong></p>
          <a className="button button--solid magnetic-button" href="https://wa.me/584220382261" target="_blank" rel="noopener noreferrer">
            <span>Comunícate por WhatsApp</span><i aria-hidden="true">↗</i>
          </a>
          <a className="site-footer__social" href="https://www.instagram.com/ryomcbo/" target="_blank" rel="noopener noreferrer">Instagram · @ryomcbo ↗</a>
        </div>
      </div>
      <div className="site-footer__gold-band">
        <div className="wrap site-footer__bottom">
          <a href="https://meetvsu.dev" target="_blank" rel="noopener noreferrer">Desarrollo por VSU ↗</a>
          <a href="https://www.instagram.com/ryomcbo/" target="_blank" rel="noopener noreferrer">RYŌ · @ryomcbo ↗</a>
          <span>{menu ? "Menú" : "Delivery y pick up"}</span>
        </div>
      </div>
    </footer>
  );
}
