import {ScrollExperience} from "@/components/landing/ScrollExperience";
import {ContactFooter} from "@/components/shared/ContactFooter";
import {anatomyItems} from "@/data/menu";

export default function HomePage() {
  return (
    <>
      <ScrollExperience items={anatomyItems} />
      <section className="continuation" aria-labelledby="continuation-title">
        <div className="wrap continuation__intro">
          <p className="eyebrow">RYŌ en casa</p>
          <h2 id="continuation-title">La sutileza del buen gusto,<br />desde la caja hasta el último bocado.</h2>
        </div>
        <div className="wrap contact-grid">
          <article className="contact-card"><span>01</span><p>Modalidad</p><h3>Solo delivery<br />y pick up.</h3></article>
          <a className="contact-card contact-card--action" href="https://wa.me/584220382261" target="_blank" rel="noopener"><span>02</span><p>WhatsApp</p><h3>+58 422<br />0382261</h3><i aria-hidden="true">↗</i></a>
          <a className="contact-card contact-card--action" href="https://www.instagram.com/ryomcbo/" target="_blank" rel="noopener"><span>03</span><p>Instagram</p><h3>@ryomcbo</h3><i aria-hidden="true">↗</i></a>
        </div>
      </section>
      <ContactFooter />
      <noscript><div className="noscript-note">Activa JavaScript para recorrer la experiencia audiovisual. El contacto de RYŌ permanece disponible al final de la página.</div></noscript>
    </>
  );
}
