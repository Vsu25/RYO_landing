import Link from "next/link";
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
      <section className="menu-invitation" id="menu" aria-labelledby="menu-invitation-title">
        <div className="wrap menu-invitation__grid">
          <header className="menu-invitation__intro">
            <p className="eyebrow">06 · Explora el menú</p>
            <h2 id="menu-invitation-title">Ya viste el detalle. Ahora descubre el resto.</h2>
            <p>Explora la carta como una experiencia visual o consúltala de forma directa. Son los mismos platos; cambia la manera de encontrarlos. Elige tu versión favorita y cuéntanos cuál prefieres.</p>
          </header>
          <div className="menu-invitation__modes">
            <article className="menu-invitation__mode menu-invitation__mode--interactive">
              <span>01 · Una experiencia</span>
              <div><small>Modo</small><h3>Menú interactivo</h3><p>Recorre cada plato a gran escala, cambia de categoría y descubre sus ingredientes, presentación y detalle.</p></div>
              <Link href="/menu/?view=explore#menu-content" prefetch={false}>Abrir menú interactivo <i aria-hidden="true">↗</i></Link>
            </article>
            <article className="menu-invitation__mode menu-invitation__mode--traditional">
              <span>02 · Una consulta</span>
              <div><small>Modo</small><h3>Menú tradicional</h3><p>Consulta toda la selección en una lista clara y rápida, pensada para comparar y elegir sin detenerte.</p></div>
              <Link href="/menu/?view=list#menu-content" prefetch={false}>Ver menú tradicional <i aria-hidden="true">↗</i></Link>
            </article>
          </div>
          <p className="menu-invitation__note">Dos maneras de explorar RYŌ. Una misma carta.</p>
        </div>
      </section>
      <ContactFooter />
      <noscript><div className="noscript-note">Activa JavaScript para recorrer la experiencia audiovisual. El contacto de RYŌ permanece disponible al final de la página.</div></noscript>
    </>
  );
}
