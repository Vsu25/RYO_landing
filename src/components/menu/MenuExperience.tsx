"use client";

import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {BrandStinger} from "@/components/landing/BrandStinger";
import {CurvedNav} from "@/components/shared/CurvedNav";
import {menuItems, type MenuItem} from "@/data/menu";
import {sitePath} from "@/lib/site-path";

gsap.registerPlugin(useGSAP);
const categories = [...new Set(menuItems.map((item) => item.category))];

function DishVisual({item, priority = false}: {item: MenuItem; priority?: boolean}) {
  const [failed, setFailed] = useState(false);

  if (!item.image || failed) {
    return <span className="dish-placeholder"><span>{item.name}</span><small>Visual no disponible</small></span>;
  }

  return (
    <>
      <img src={sitePath(item.image)} alt={item.imageAlt} width="1672" height="940" loading={priority ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />
      {item.imageStatus === "conceptual" && <span className="visual-caption">Visual conceptual</span>}
    </>
  );
}

export function MenuExperience() {
  const root = useRef<HTMLDivElement>(null);
  const explorer = useRef<HTMLElement>(null);
  const pickerButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const pointerStart = useRef<{x: number; y: number} | null>(null);
  const [view, setView] = useState<"explore" | "list">("explore");
  const [category, setCategory] = useState(categories[0]);
  const [current, setCurrent] = useState(0);
  const [replayToken, setReplayToken] = useState(0);
  const filtered = menuItems.filter((item) => item.category === category);
  const item = filtered[current] ?? filtered[0];

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "list") setView("list");
  }, []);

  useGSAP(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const visual = root.current.querySelector(".dish-visual img");
    const copy = root.current.querySelectorAll(".dish-copy > :not(.explorer-controls)");
    const activeCategory = root.current.querySelector('.category-nav [aria-pressed="true"]');
    const activeCard = root.current.querySelector(".menu-card.is-open");
    if (visual) gsap.fromTo(visual, {autoAlpha: 0.58, x: 18, scale: 1.025}, {autoAlpha: 1, x: 0, scale: 1, duration: 0.34, ease: "power2.out", clearProps: "transform,opacity,visibility"});
    gsap.fromTo(copy, {autoAlpha: 0, y: 10}, {autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out", stagger: 0.025, clearProps: "transform,opacity,visibility"});
    if (activeCategory) gsap.fromTo(activeCategory, {y: 9}, {y: 0, duration: 0.28, ease: "power2.out", clearProps: "transform"});
    if (activeCard) gsap.fromTo(activeCard, {autoAlpha: 0.72, y: 8}, {autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out", clearProps: "transform,opacity,visibility"});
  }, {scope: root, dependencies: [item?.id, category, view], revertOnUpdate: true});

  const move = (step: number, focusPicker = false) => {
    if (!filtered.length) return;
    const next = (current + step + filtered.length) % filtered.length;
    setCurrent(next);
    if (focusPicker) requestAnimationFrame(() => pickerButtons.current[next]?.focus());
  };

  const selectCategory = (next: typeof category) => {
    setCategory(next);
    setCurrent(0);
  };

  if (!item) return null;

  return (
    <div ref={root} className="menu-page">
      <a className="skip-link" href="#menu-content">Saltar al menú</a>
      <BrandStinger replayToken={replayToken} />
      <nav className="site-nav" aria-label="Navegación del menú">
        <Link className="site-nav__logo" href="/" aria-label="Volver a RYŌ Sushi"><Image src={sitePath("/media/ryo-wordmark-gold.png")} width={480} height={178} alt="RYŌ" /></Link>
        <div className="site-nav__links"><Link href="/">Experiencia</Link><a href="#menu-content">Platos</a><a className="button button--solid" href="https://wa.me/584220382261" target="_blank" rel="noopener">Pide por WhatsApp</a></div>
        <CurvedNav label="Abrir navegación del menú" items={[
          {label: "Experiencia", href: sitePath("/"), description: "Volver a la landing"},
          {label: "Platos", href: "#menu-content", description: "Explorar o consultar"},
          {label: "WhatsApp", href: "https://wa.me/584220382261", description: "Contacto directo", external: true},
          {label: "Instagram", href: "https://www.instagram.com/ryomcbo/", description: "@ryomcbo", external: true},
        ]} />
      </nav>

      <header className="menu-hero">
        <div className="wrap menu-hero__content">
          <div><p className="eyebrow">Menú RYŌ</p><h1>Una decisión. Tu próxima experiencia.</h1></div>
          <button className="button" type="button" onClick={() => setReplayToken((token) => token + 1)}>Repetir stinger</button>
        </div>
      </header>

      <main className="menu-main" id="menu-content">
        <div className="wrap">
          <div className="menu-heading">
            <div><p className="eyebrow">Dos formas de elegir</p><h2>Explora el detalle. Consulta lo esencial.</h2></div>
            <div className="view-switch" role="group" aria-label="Cambiar presentación del menú">
              <button type="button" onClick={() => setView("explore")} aria-pressed={view === "explore"} aria-controls="menu-explorer">Explorar</button>
              <button type="button" onClick={() => setView("list")} aria-pressed={view === "list"} aria-controls="menu-catalogue">Lista</button>
            </div>
          </div>
          <p className="prototype-note"><strong>Selección aprobada para el prototipo:</strong> esta etapa trabaja únicamente con rolls especiales y nigiris. Los valores son referencias del PDF; moneda y vigencia se consolidarán después de la aprobación del cliente.</p>
          <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{view === "explore" ? `${item.name}, ${current + 1} de ${filtered.length}, ${item.category}.` : "Vista Lista activa."}</p>

          <section
            ref={explorer}
            className="menu-explorer"
            id="menu-explorer"
            tabIndex={0}
            aria-label="Explorar platos. Usa los botones, las flechas izquierda y derecha o desliza la imagen."
            hidden={view !== "explore"}
            onKeyDown={(event) => {
              const pickerFocused = (event.target as HTMLElement).closest(".dish-picker");
              if (event.key === "ArrowLeft") { event.preventDefault(); move(-1, Boolean(pickerFocused)); }
              if (event.key === "ArrowRight") { event.preventDefault(); move(1, Boolean(pickerFocused)); }
            }}
          >
            <div className="menu-stage">
              <figure
                className="dish-visual"
                onPointerDown={(event) => { pointerStart.current = {x: event.clientX, y: event.clientY}; }}
                onPointerUp={(event) => {
                  if (!pointerStart.current) return;
                  const deltaX = event.clientX - pointerStart.current.x;
                  const deltaY = event.clientY - pointerStart.current.y;
                  pointerStart.current = null;
                  if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) move(deltaX < 0 ? 1 : -1);
                }}
                onPointerCancel={() => { pointerStart.current = null; }}
              ><DishVisual key={item.id} item={item} priority /></figure>
              <div className="category-nav" role="group" aria-label="Filtrar por categoría">
                {categories.map((categoryName, index) => {
                  const count = menuItems.filter((dish) => dish.category === categoryName).length;
                  return (
                    <button key={categoryName} type="button" onClick={() => selectCategory(categoryName)} aria-pressed={category === categoryName}>
                      <small>{String(index + 1).padStart(2, "0")} · {String(count).padStart(2, "0")} platos</small>
                      <strong>{categoryName}</strong>
                      <span>{categoryName === "Nigiris" ? "Dos piezas por selección" : "Selección de autor"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <article className="dish-copy">
              <div className="dish-index"><span>{item.category}</span><span>{String(current + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}</span></div>
              <div className="dish-title-row"><h2>{item.name}</h2><strong>{item.price} {item.currency}</strong></div>
              <p className="dish-description">{item.description}</p>
              <ul className="ingredient-chips" aria-label="Ingredientes confirmados">{item.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>
              <div className="dish-meta"><div><span>Presentación</span><strong>{item.pieces}</strong></div></div>
              <div className="explorer-controls">
                <button className="button" onClick={() => move(-1)} type="button" disabled={filtered.length < 2}>← Anterior</button>
                <div className="dish-picker" aria-label="Seleccionar plato">
                  {filtered.map((dish, index) => (
                    <button key={dish.id} ref={(node) => { pickerButtons.current[index] = node; }} type="button" onClick={() => setCurrent(index)} aria-current={index === current} tabIndex={index === current ? 0 : -1}>{dish.name}</button>
                  ))}
                </div>
                <button className="button" onClick={() => move(1)} type="button" disabled={filtered.length < 2}>Siguiente →</button>
              </div>
            </article>

            <div className="menu-card-list" aria-label="Cartas de platos">
              {filtered.map((dish, index) => {
                const open = index === current;
                return (
                  <article key={dish.id} className={`menu-card${open ? " is-open" : ""}`} data-card-category={dish.category}>
                    <button className="menu-card__trigger" type="button" onClick={() => setCurrent(index)} aria-expanded={open} aria-controls={`menu-card-detail-${dish.id}`}>
                      <span className="menu-card__figure"><DishVisual item={dish} priority={open} /></span>
                      <span className="menu-card__action"><small>{String(index + 1).padStart(2, "0")} · {dish.category}</small><strong>{dish.name}</strong><em>{open ? "Selección activa" : "Ver plato"}</em></span>
                    </button>
                    <div className="menu-card__detail" id={`menu-card-detail-${dish.id}`} aria-hidden={!open}>
                      <div><p>{dish.description}</p><ul className="ingredient-chips" aria-label="Ingredientes confirmados">{dish.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul><div className="menu-card__meta"><strong>{dish.price} {dish.currency}</strong><span>{dish.pieces}</span></div></div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="menu-catalogue" id="menu-catalogue" aria-label="Lista de platos" hidden={view !== "list"}>
            {menuItems.map((dish) => (
              <article key={dish.id}>
                <figure><DishVisual item={dish} /></figure>
                <div className="catalogue-copy"><small>{dish.documentId} · {dish.source}</small><h2>{dish.name}</h2><p>{dish.description}</p><ul className="ingredient-chips" aria-label="Ingredientes confirmados">{dish.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul><small>{dish.pieces}</small></div>
                <div className="catalogue-price"><strong>{dish.price}</strong><span>{dish.currency}</span></div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
