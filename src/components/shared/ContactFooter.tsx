type ContactFooterProps = {
  menu?: boolean;
};

export function ContactFooter({menu = false}: ContactFooterProps) {
  return (
    <footer className="site-footer" id="contacto">
      <div className="site-footer__pattern" aria-hidden="true" />
      <div className="wrap site-footer__main">
        <div className="site-footer__intro">
          <p className="eyebrow">El toque final</p>
          <h2>¿Ya elegiste?</h2>
          <p>Lleva el arte del sushi de autor directo a tu mesa.</p>
        </div>
        <div className="site-footer__contact">
          <p><strong>Solo delivery y pick up.</strong></p>
          <a className="button button--solid magnetic-button" href="https://wa.me/584220382261" target="_blank" rel="noopener noreferrer">
            <span>Pide por WhatsApp</span><i aria-hidden="true">↗</i>
          </a>
          <a className="site-footer__social" href="https://www.instagram.com/ryomcbo/" target="_blank" rel="noopener noreferrer">Descubre más en Instagram ↗</a>
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
