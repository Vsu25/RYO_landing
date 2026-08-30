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
            <p className="eyebrow">05 · RYŌ en casa</p>
            <h2 id="continuation-title">La sutileza del buen gusto, desde la caja hasta el último bocado.</h2>
            <p>Alta cocina japonesa para disfrutar en casa.</p>
          </article>
          <figure className="home-bento__visual">
            <img src={sitePath("/media/box-closed.webp")} width="1672" height="940" loading="lazy" alt="Caja azul RYŌ cerrada sobre una mesa de estudio" />
            <figcaption>La experiencia continúa en casa.</figcaption>
          </figure>
          <article className="home-bento__service"><span>Modalidad</span><h3>Solo delivery<br />y pick up.</h3></article>
          <a className="home-bento__contact home-bento__contact--whatsapp" href="https://wa.me/584220382261" target="_blank" rel="noopener noreferrer"><span>Contacto directo</span><strong>Comunícate por WhatsApp</strong><i aria-hidden="true">↗</i></a>
          <a className="home-bento__contact home-bento__contact--instagram" href="https://www.instagram.com/ryomcbo/" target="_blank" rel="noopener noreferrer"><span>Instagram</span><strong>@ryomcbo</strong><i aria-hidden="true">↗</i></a>
        </div>
      </section>
      <ContactFooter />
      <noscript><div className="noscript-note">Activa JavaScript para recorrer la experiencia audiovisual. El contacto de RYŌ permanece disponible al final de la página.</div></noscript>
    </>
  );
}
