import {ScrollExperience} from "@/components/landing/ScrollExperience";
import {ContactFooter} from "@/components/shared/ContactFooter";
import {anatomyItems} from "@/data/menu";
import {sitePath} from "@/lib/site-path";

export default function HomePage() {
  return (
    <>
      <ScrollExperience items={anatomyItems} />
      <section className="continuation" aria-labelledby="continuation-title">
        <div className="wrap home-bento">
          <article className="home-bento__intro">
            <p className="eyebrow">Solo delivery &amp; pick up</p>
            <h2 id="continuation-title">La experiencia continúa cuando la caja se cierra.</h2>
            <p>El corte es nuestro; el momento y el toque final son tuyos.</p>
          </article>
          <figure className="home-bento__visual">
            <img src={sitePath("/media/box-closed.webp")} width="1672" height="940" loading="lazy" alt="Caja azul RYŌ cerrada sobre una mesa de estudio" />
            <figcaption>Preparada para disfrutarse donde tú elijas.</figcaption>
          </figure>
          <article className="home-bento__service"><span>Modalidad</span><h3>Solo delivery<br />y pick up.</h3></article>
          <a className="home-bento__contact home-bento__contact--whatsapp" href="https://wa.me/584220382261" target="_blank" rel="noopener noreferrer"><span>El toque final</span><strong>Pide por WhatsApp</strong><i aria-hidden="true">↗</i></a>
          <a className="home-bento__contact home-bento__contact--instagram" href="https://www.instagram.com/ryomcbo/" target="_blank" rel="noopener noreferrer"><span>Descubre más</span><strong>Instagram · @ryomcbo</strong><i aria-hidden="true">↗</i></a>
        </div>
      </section>
      <ContactFooter />
      <noscript><div className="noscript-note">Activa JavaScript para recorrer la experiencia audiovisual. El contacto de RYŌ permanece disponible al final de la página.</div></noscript>
    </>
  );
}
