"use client";

import {useCallback, useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {AnatomyOverlay} from "@/components/landing/AnatomyOverlay";
import {BrandStinger} from "@/components/landing/BrandStinger";
import type {Anatomy, MenuItem} from "@/data/menu";
import {sitePath} from "@/lib/site-path";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const chapters = [
  {id: "inicio", number: "01", label: "Entrada", progress: 0.04},
  {id: "caja", number: "02", label: "Apertura", progress: 0.21},
  {id: "rolls", number: "03", label: "Rolls", progress: 0.46},
  {id: "cierre", number: "04", label: "Cierre", progress: 0.79},
  {id: "experiencia", number: "05", label: "RYŌ", progress: 0.96},
] as const;

const chapterStatus = [
  "Entrada de la caja",
  "Apertura de la caja",
  "Anatomía de los rolls",
  "Retorno y cierre",
  "Experiencia RYŌ",
];

const rollStarts = [15.55, 19.35, 23.15, 26.95];
const rollEnds = [19.9, 23.7, 27.5, 31.1];
type AnatomyItem = MenuItem & {anatomy: Anatomy};

function RollCopy({item, index, transcript = false}: {item: AnatomyItem; index: number; transcript?: boolean}) {
  return (
    <article className={transcript ? "story-transcript__card" : "reduced-roll"}>
      {!transcript && (
        <img
          src={sitePath(item.image)}
          width="1672"
          height="940"
          loading={index ? "lazy" : "eager"}
          decoding="async"
          alt={item.imageAlt || `${item.name} frente a la caja RYŌ`}
        />
      )}
      <div className="reduced-roll__copy">
        <p className="eyebrow">{String(index + 1).padStart(2, "0")} · Anatomía del roll</p>
        <h2>{item.name}</h2>
        <ul>{item.anatomy.order.map((ingredientIndex) => <li key={ingredientIndex}>{item.ingredients[ingredientIndex]}</li>)}</ul>
        <p>{item.description}</p>
      </div>
    </article>
  );
}

export function ScrollExperience({items}: {items: AnatomyItem[]}) {
  const root = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const introVideo = useRef<HTMLVideoElement>(null);
  const openingVideo = useRef<HTMLVideoElement>(null);
  const closingVideo = useRef<HTMLVideoElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const [replayToken, setReplayToken] = useState(0);
  const [activeRoll, setActiveRoll] = useState(0);
  const [anatomyActive, setAnatomyActive] = useState(false);
  const [experienceActive, setExperienceActive] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);

  const jumpTo = useCallback((progress: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const target = progress < 0.2 ? "#reduced-inicio" : progress < 0.8 ? "#reduced-anatomia" : "#continuation-title";
      document.querySelector(target)?.scrollIntoView({block: "start"});
      return;
    }
    const trigger = ScrollTrigger.getById("ryo-scroll-story");
    if (!trigger) return;
    const clamped = gsap.utils.clamp(0, 1, progress);
    window.scrollTo({top: trigger.start + (trigger.end - trigger.start) * clamped, behavior: "smooth"});
  }, []);

  useGSAP(() => {
    const container = root.current;
    const storyElement = story.current;
    const stageElement = stage.current;
    if (!container || !storyElement || !stageElement) return;

    const media = {
      intro: introVideo.current,
      opening: openingVideo.current,
      closing: closingVideo.current,
    };
    const hero = container.querySelector<HTMLElement>("[data-story-hero]");
    const anatomy = container.querySelector<HTMLElement>(".anatomy-overlay");
    const experience = container.querySelector<HTMLElement>("[data-experience-overlay]");
    const chapterRail = container.querySelector<HTMLElement>(".chapter-rail");
    const nav = container.querySelector<HTMLElement>(".story-nav");
    const storyStatus = container.querySelector<HTMLElement>("[data-story-status]");
    const rollStatus = container.querySelector<HTMLElement>("[data-roll-status]");
    const rollLayers = items.map((item) => container.querySelector<HTMLElement>(`[data-roll-layer="${item.id}"]`));
    const allMedia = [...Object.values(media), ...rollLayers].filter(Boolean);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!hero || !anatomy || !experience || !chapterRail) return;
      let rollIndex = -1;
      let chapterIndex = -1;
      let anatomyIsActive = false;
      let experienceIsActive = false;

      const seek = (video: HTMLVideoElement | null, ratio: number) => {
        if (!video || video.readyState < 1 || !Number.isFinite(video.duration)) return;
        const next = gsap.utils.clamp(0, 1, ratio) * Math.max(0, video.duration - 0.04);
        if (Math.abs(video.currentTime - next) > 0.035) video.currentTime = next;
      };

      const timeline = gsap.timeline({defaults: {ease: "none"}, paused: true});

      const syncSemantics = () => {
        const time = timeline.time();
        seek(media.intro, time / 8);
        seek(media.opening, (time - 8) / 8);
        seek(media.closing, (time - 30.7) / 6);

        const nextRoll = time < 19.35 ? 0 : time < 23.15 ? 1 : time < 26.95 ? 2 : 3;
        const nextAnatomy = time >= 15.55 && time < 30.75;
        const nextExperience = time >= 36.65;
        const nextChapter = time < 8 ? 0 : time < 15.55 ? 1 : time < 30.75 ? 2 : time < 36.65 ? 3 : 4;

        if (nextRoll !== rollIndex) {
          rollIndex = nextRoll;
          setActiveRoll(nextRoll);
          if (rollStatus) rollStatus.textContent = `Anatomía: ${items[nextRoll]?.name ?? ""}`;
        }
        if (nextAnatomy !== anatomyIsActive) {
          anatomyIsActive = nextAnatomy;
          setAnatomyActive(nextAnatomy);
        }
        if (nextExperience !== experienceIsActive) {
          experienceIsActive = nextExperience;
          setExperienceActive(nextExperience);
        }
        if (nextChapter !== chapterIndex) {
          chapterIndex = nextChapter;
          setCurrentChapter(nextChapter);
          if (storyStatus) storyStatus.textContent = chapterStatus[nextChapter] ?? "";
        }
        stageElement.style.setProperty("--story-progress", timeline.progress().toFixed(4));
      };

      gsap.set(allMedia, {autoAlpha: 0, scale: 1, transformOrigin: "50% 50%"});
      gsap.set(media.intro, {autoAlpha: 1});
      gsap.set([anatomy, experience, chapterRail], {autoAlpha: 0});
      gsap.set(stageElement, {"--glow-x": "72%", "--glow-y": "52%"});

      timeline
        .addLabel("intro", 0)
        .to({}, {duration: 8}, "intro")
        .to(hero, {autoAlpha: 0, y: -26, duration: 1.15, ease: "power2.inOut"}, 5.25)
        .to(chapterRail, {autoAlpha: 0.78, duration: 0.65, ease: "power2.out"}, 4.8)
        .to(stageElement, {"--glow-x": "59%", "--glow-y": "57%", duration: 5.8}, 2.2)
        .addLabel("open", 8)
        .set(media.opening, {autoAlpha: 1}, "open")
        .set(media.intro, {autoAlpha: 0}, "open+=.02")
        .to({}, {duration: 8}, "open")
        .to(stageElement, {"--glow-x": "48%", "--glow-y": "50%", duration: 6.5}, "open+=1")
        .to(anatomy, {autoAlpha: 1, duration: 0.6, ease: "power2.out"}, 15.55);

      items.forEach((_, index) => {
        const layer = rollLayers[index];
        if (!layer) return;
        timeline
          .fromTo(layer, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.55, ease: "power2.inOut", immediateRender: false}, rollStarts[index])
          .to(layer, {autoAlpha: 0, duration: 0.55, ease: "power2.inOut"}, rollEnds[index] - 0.55);
      });

      timeline
        .to(media.opening, {autoAlpha: 0, duration: 0.55, ease: "power2.inOut"}, 15.55)
        .to(anatomy, {autoAlpha: 0, duration: 0.55, ease: "power2.inOut"}, 30.55)
        .addLabel("close", 30.7)
        .fromTo(media.closing, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.55, ease: "power2.inOut", immediateRender: false}, "close")
        .to({}, {duration: 6}, "close")
        .to(stageElement, {"--glow-x": "61%", "--glow-y": "59%", duration: 5.2}, "close+=.4")
        .addLabel("finale", 36.65)
        .fromTo(experience, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.75, ease: "power2.out", immediateRender: false}, "finale+=.3")
        .fromTo(experience.querySelectorAll(".eyebrow,.type-line > span,p,.experience-overlay__actions"), {autoAlpha: 0, y: 38}, {autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.11, ease: "power3.out", immediateRender: false}, "finale+=.35")
        .to(chapterRail, {autoAlpha: 0, duration: 0.45}, "finale")
        .to(stageElement, {"--glow-x": "48%", "--glow-y": "50%", duration: 2.1}, "finale+=.4");

      timeline.eventCallback("onUpdate", syncSemantics);

      const ambientLoop = gsap.to(container.querySelectorAll(".story-ambient i"), {
        x: () => window.innerWidth * 0.16,
        rotation: "+=12",
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.8,
      });

      ScrollTrigger.create({
        id: "ryo-scroll-story",
        trigger: storyElement,
        animation: timeline,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * (window.innerWidth < 1024 ? 18 : 20))}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.65,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBar.current) gsap.set(progressBar.current, {scaleX: self.progress, transformOrigin: "left center"});
          nav?.classList.toggle("is-scrolled", self.progress > 0.015);
        },
        onEnter: () => ambientLoop.resume(),
        onEnterBack: () => ambientLoop.resume(),
        onLeave: () => ambientLoop.pause(),
        onLeaveBack: () => ambientLoop.pause(0),
      });

      gsap.fromTo(hero.querySelectorAll(".type-line > span"), {autoAlpha: 0, yPercent: 115}, {autoAlpha: 1, yPercent: 0, duration: 1.05, stagger: 0.12, ease: "power3.out", delay: 0.72});
      gsap.fromTo(hero.querySelectorAll(".eyebrow,p,.scroll-cue"), {autoAlpha: 0, y: 22}, {autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power2.out", delay: 0.9});

      const revealTargets = document.querySelectorAll(".continuation .eyebrow,.continuation h2,.contact-card,.site-footer__main > *");
      ScrollTrigger.batch(revealTargets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => gsap.fromTo(batch, {autoAlpha: 0, y: 42}, {autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out", overwrite: true}),
      });

      const magneticCleanups: Array<() => void> = [];
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.querySelectorAll<HTMLElement>(".magnetic-button").forEach((button) => {
          const xTo = gsap.quickTo(button, "x", {duration: 0.35, ease: "power3.out"});
          const yTo = gsap.quickTo(button, "y", {duration: 0.35, ease: "power3.out"});
          const move = (event: PointerEvent) => {
            const rect = button.getBoundingClientRect();
            xTo((event.clientX - rect.left - rect.width / 2) / rect.width * 7);
            yTo((event.clientY - rect.top - rect.height / 2) / rect.height * 5);
          };
          const leave = () => { xTo(0); yTo(0); };
          button.addEventListener("pointermove", move);
          button.addEventListener("pointerleave", leave);
          magneticCleanups.push(() => {
            button.removeEventListener("pointermove", move);
            button.removeEventListener("pointerleave", leave);
          });
        });
      }

      const videoCleanups: Array<() => void> = [];
      Object.values(media).forEach((video) => {
        if (!video) return;
        const ready = () => {
          syncSemantics();
          ScrollTrigger.refresh();
        };
        if (video.readyState >= 1) ready();
        else {
          video.addEventListener("loadedmetadata", ready, {once: true});
          videoCleanups.push(() => video.removeEventListener("loadedmetadata", ready));
        }
      });
      void document.fonts?.ready.then(() => ScrollTrigger.refresh());
      syncSemantics();

      return () => {
        magneticCleanups.forEach((cleanup) => cleanup());
        videoCleanups.forEach((cleanup) => cleanup());
        ambientLoop.kill();
        timeline.kill();
      };
    });

    return () => mm.revert();
  }, {scope: root});

  const currentItem = items[activeRoll] ?? items[0]!;

  return (
    <div ref={root}>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <BrandStinger replayToken={replayToken} />
      <div ref={progressBar} className="scroll-progress" aria-hidden="true" />

      <nav className="site-nav story-nav" aria-label="Navegación principal">
        <a className="site-nav__logo" href="#inicio" onClick={(event) => { event.preventDefault(); jumpTo(0); }} aria-label="RYŌ Sushi · Inicio">
          <img src={sitePath("/media/ryo-wordmark-gold.png")} width="480" height="178" alt="RYŌ" />
        </a>
        <div className="site-nav__links">
          <a href="#objeto" onClick={(event) => { event.preventDefault(); jumpTo(0.2); }}>La caja</a>
          <a href="#anatomia" onClick={(event) => { event.preventDefault(); jumpTo(0.4); }}>Anatomía</a>
          <a href="#experiencia" onClick={(event) => { event.preventDefault(); jumpTo(0.96); }}>Experiencia</a>
          <button className="icon-button" type="button" onClick={() => setReplayToken((token) => token + 1)} aria-label="Repetir animación de entrada"><span aria-hidden="true">↻</span></button>
          <a className="button button--solid magnetic-button" href="https://wa.me/584220382261" target="_blank" rel="noopener"><span>WhatsApp</span><i aria-hidden="true">↗</i></a>
        </div>
      </nav>

      <main id="contenido">
        <section ref={story} className="scroll-story" id="inicio" aria-label="RYŌ Unboxed: recorrido audiovisual">
          <span className="story-anchor" id="objeto" style={{top: "12%"}} aria-hidden="true" />
          <span className="story-anchor" id="rolls" style={{top: "27%"}} aria-hidden="true" />
          <span className="story-anchor" id="anatomia" style={{top: "29%"}} aria-hidden="true" />
          <span className="story-anchor" id="experiencia" style={{top: "82%"}} aria-hidden="true" />

          <div ref={stage} className="story-stage">
            <div className="story-ambient" aria-hidden="true"><i /><i /></div>
            <div className="story-media-frame" aria-hidden="true">
              <video ref={introVideo} className="story-media story-media--intro" muted playsInline preload="auto" poster={sitePath("/media/box-front.jpg")}>
                <source src={sitePath("/media/ryo-scroll-intro-v2.mp4")} type="video/mp4" />
              </video>
              <video ref={openingVideo} className="story-media story-media--opening" muted playsInline preload="metadata" poster={sitePath("/media/box-closed.webp")}>
                <source src={sitePath("/media/ryo-scroll-open-playboy-v2.mp4")} type="video/mp4" />
              </video>
              {items.map((item) => (
                <img key={item.id} className="story-media story-media--roll" data-roll-layer={item.id} src={sitePath(item.image)} width="1672" height="940" alt="" loading="eager" decoding="async" />
              ))}
              <video ref={closingVideo} className="story-media story-media--closing" muted playsInline preload="metadata" poster={sitePath("/media/box-open.webp")}>
                <source src={sitePath("/media/ryo-scroll-return-close-v2.mp4")} type="video/mp4" />
              </video>
              <div className="story-media-shade" />
            </div>

            <header className="story-hero" data-story-hero>
              <p className="eyebrow">RYŌ · Unboxed</p>
              <h1 aria-label="La experiencia empieza en la caja."><span className="type-line"><span>La experiencia</span></span><span className="type-line"><span>empieza en la caja.</span></span></h1>
              <p>Haz scroll. El empaque entra, gira y revela cuatro rolls protagonistas en una sola toma continua.</p>
              <a className="scroll-cue" href="#objeto" onClick={(event) => { event.preventDefault(); jumpTo(0.2); }}><span>Descubrir</span><i aria-hidden="true" /></a>
            </header>

            <AnatomyOverlay item={currentItem} index={activeRoll} active={anatomyActive} />

            <section className={`experience-overlay${experienceActive ? " is-active" : ""}`} data-experience-overlay aria-labelledby="experience-title" aria-hidden={!experienceActive} inert={!experienceActive}>
              <p className="eyebrow">La experiencia RYŌ</p>
              <h2 id="experience-title" aria-label="Alta cocina japonesa. Para disfrutar en casa."><span className="type-line"><span>Alta cocina japonesa.</span></span><span className="type-line"><span><em>Para disfrutar en casa.</em></span></span></h2>
              <p>Una presentación pensada para que delivery y pick up sigan sintiéndose como una ocasión.</p>
              <div className="experience-overlay__actions">
                <a className="button button--solid magnetic-button" href="https://wa.me/584220382261" target="_blank" rel="noopener"><span>Escribir por WhatsApp</span><i aria-hidden="true">↗</i></a>
                <a className="text-link" href="https://www.instagram.com/ryomcbo/" target="_blank" rel="noopener">Instagram · @ryomcbo</a>
              </div>
            </section>

            <div className="chapter-rail" aria-label="Progreso del recorrido">
              {chapters.map((chapter, index) => (
                <button key={chapter.id} type="button" onClick={() => jumpTo(chapter.progress)} className={currentChapter === index ? "is-current" : undefined} aria-current={currentChapter === index ? "step" : undefined}>
                  <span>{chapter.number}</span><b>{chapter.label}</b>
                </button>
              ))}
            </div>

            <div className="story-counter" aria-hidden="true"><span>{String(currentChapter + 1).padStart(2, "0")}</span><i /><span>05</span></div>
            <p className="story-status sr-only" data-story-status aria-live="polite" />
            <p className="story-status sr-only" data-roll-status aria-live="polite" />
          </div>
        </section>

        <section className="story-transcript wrap" aria-labelledby="story-transcript-title">
          <details><summary id="story-transcript-title">Ver descripción sin animación</summary><div className="story-transcript__content">{items.map((item, index) => <RollCopy key={item.id} item={item} index={index} transcript />)}</div></details>
        </section>

        <section className="reduced-story" aria-label="Recorrido RYŌ sin movimiento">
          <header className="reduced-story__intro" id="reduced-inicio">
            <img src={sitePath("/media/box-front.jpg")} width="1672" height="940" alt="Caja azul RYŌ cerrada y centrada en una escena de estudio oscura" />
            <div className="reduced-roll__copy"><p className="eyebrow">RYŌ · Unboxed</p><h1>La experiencia empieza en la caja.</h1><p>Un recorrido por cuatro rolls protagonistas y sus ingredientes confirmados.</p></div>
          </header>
          <div id="reduced-anatomia">{items.map((item, index) => <RollCopy key={item.id} item={item} index={index} />)}</div>
        </section>
      </main>
    </div>
  );
}
