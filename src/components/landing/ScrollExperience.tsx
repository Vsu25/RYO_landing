"use client";

import {useCallback, useRef, useState} from "react";
import ReactDOM from "react-dom";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {AnatomyOverlay} from "@/components/landing/AnatomyOverlay";
import {BrandStinger} from "@/components/landing/BrandStinger";
import {CurvedNav} from "@/components/shared/CurvedNav";
import type {Anatomy, MenuItem} from "@/data/menu";
import {sitePath} from "@/lib/site-path";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const storyTiming = {
  intro: {start: 0, end: 4.8},
  opening: {start: 4.8, end: 10.2},
  anatomy: {start: 10, end: 25.4},
  closing: {start: 25.2, end: 30.2},
  experience: {start: 30, end: 32.7},
  handoff: {start: 32.35, end: 34.8},
} as const;

const chapters = [
  {id: "inicio", number: "01", label: "Entrada", progress: 0.03},
  {id: "caja", number: "02", label: "Apertura", progress: 0.16},
  {id: "rolls", number: "03", label: "Rolls", progress: 0.32},
  {id: "cierre", number: "04", label: "Cierre", progress: 0.77},
  {id: "experiencia", number: "05", label: "RYŌ", progress: 0.91},
] as const;

const chapterStatus = [
  "Entrada de la caja",
  "Apertura de la caja",
  "Presentación de los rolls",
  "Retorno y cierre",
  "Experiencia RYŌ",
];

const rollStarts = [10, 13.8, 17.6, 21.4];
const rollEnds = [14.15, 17.95, 21.75, 25.55];
type AnatomyItem = MenuItem & {anatomy: Anatomy};

function RollCopy({item, index, transcript = false}: {item: AnatomyItem; index: number; transcript?: boolean}) {
  return (
    <article className={transcript ? "story-transcript__card" : "reduced-roll"}>
      {!transcript && (
        <img
          src={sitePath(item.image)}
          width="1672"
          height="940"
          loading="lazy"
          decoding="async"
          alt={item.imageAlt || `${item.name} frente a la caja RYŌ`}
        />
      )}
      <div className="reduced-roll__copy">
        <p className="eyebrow">{String(index + 1).padStart(2, "0")} · Presentación del roll</p>
        <h2>{item.name}</h2>
        <ul>{item.anatomy.order.map((ingredientIndex) => <li key={ingredientIndex}>{item.ingredients[ingredientIndex]}</li>)}</ul>
        <p>{item.description}</p>
      </div>
    </article>
  );
}

export function ScrollExperience({items}: {items: AnatomyItem[]}) {
  ReactDOM.preload(sitePath("/media/box-front-web.webp"), {as: "image", fetchPriority: "high"});
  const root = useRef<HTMLDivElement>(null);
  const story = useRef<HTMLElement>(null);
  const introVideo = useRef<HTMLVideoElement>(null);
  const openingVideo = useRef<HTMLVideoElement>(null);
  const closingVideo = useRef<HTMLVideoElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const storyCounterProgress = useRef<HTMLSpanElement>(null);
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
    if (!container || !storyElement) return;

    const media = {
      intro: introVideo.current,
      opening: openingVideo.current,
      closing: closingVideo.current,
    };
    const hero = container.querySelector<HTMLElement>("[data-story-hero]");
    const anatomy = container.querySelector<HTMLElement>(".anatomy-overlay");
    const experience = container.querySelector<HTMLElement>("[data-experience-overlay]");
    const handoff = container.querySelector<HTMLElement>(".story-handoff");
    const handoffLabel = handoff?.querySelector<HTMLElement>(".story-handoff__title");
    const handoffLine = handoff?.querySelector<HTMLElement>(".story-handoff__line");
    const handoffDoors = handoff?.querySelectorAll<HTMLElement>(".story-handoff__door");
    const mediaShade = container.querySelector<HTMLElement>(".story-media-shade");
    const rollGlow = container.querySelector<HTMLElement>(".story-roll-glow");
    const mediaFrame = container.querySelector<HTMLElement>(".story-media-frame");
    if (!mediaShade || !rollGlow || !mediaFrame || !handoff || !handoffLabel || !handoffLine || !handoffDoors?.length) return;
    const chapterRail = container.querySelector<HTMLElement>(".chapter-rail");
    const nav = container.querySelector<HTMLElement>(".story-nav");
    const storyStatus = container.querySelector<HTMLElement>("[data-story-status]");
    const rollStatus = container.querySelector<HTMLElement>("[data-roll-status]");
    const rollLayers = items.map((item) => container.querySelector<HTMLImageElement>(`[data-roll-layer="${item.id}"]`));
    const allMedia = [...Object.values(media), ...rollLayers].filter(Boolean);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (!hero || !anatomy || !experience || !chapterRail || !handoff || !mediaShade || !rollGlow) return;
      const phoneViewport = window.matchMedia("(max-width: 599px)").matches;
      const tabletViewport = window.matchMedia("(min-width: 600px) and (max-width: 1023px)").matches;
      const compactViewport = phoneViewport || tabletViewport;
      const focusScale = phoneViewport ? 2.25 : tabletViewport ? 2.1 : 1;
      const focusShift = phoneViewport ? window.innerHeight * 0.19 : tabletViewport ? window.innerHeight * 0.15 : 0;
      const anatomyShiftX = phoneViewport ? window.innerWidth * 0.08 : 0;
      const closingScale = phoneViewport ? 1.85 : tabletViewport ? 1.55 : 1;
      let rollIndex = -1;
      let chapterIndex = -1;
      let anatomyIsActive = false;
      let experienceIsActive = false;
      let openingMediaPrimed = false;
      let closingMediaPrimed = false;
      let navIsScrolled = false;
      const seekTargets = new WeakMap<HTMLVideoElement, number>();

      const primeOpeningMedia = () => {
        if (openingMediaPrimed) return;
        openingMediaPrimed = true;
        rollLayers.forEach((layer) => {
          if (layer && !layer.hasAttribute("src") && layer.dataset.src) layer.src = layer.dataset.src;
        });
        if (media.opening) {
          media.opening.poster = media.opening.dataset.poster ?? "";
          media.opening.preload = "auto";
          media.opening.load();
        }
      };

      const primeClosingMedia = () => {
        if (closingMediaPrimed) return;
        closingMediaPrimed = true;
        if (media.closing) {
          media.closing.poster = media.closing.dataset.poster ?? "";
          media.closing.preload = "auto";
          media.closing.load();
        }
      };

      const flushSeek = (video: HTMLVideoElement) => {
        const next = seekTargets.get(video);
        if (next === undefined || video.seeking || Math.abs(video.currentTime - next) <= 0.033) return;
        video.currentTime = next;
      };

      const seek = (video: HTMLVideoElement | null, ratio: number) => {
        if (!video || video.readyState < 1 || !Number.isFinite(video.duration)) return;
        const next = gsap.utils.clamp(0, 1, ratio) * Math.max(0, video.duration - 0.04);
        seekTargets.set(video, next);
        flushSeek(video);
      };

      const timeline = gsap.timeline({defaults: {ease: "none"}, paused: true});

      const syncSemantics = () => {
        const time = timeline.time();
        seek(media.intro, (time - storyTiming.intro.start) / (storyTiming.intro.end - storyTiming.intro.start));
        seek(media.opening, (time - storyTiming.opening.start) / (storyTiming.opening.end - storyTiming.opening.start));
        seek(media.closing, (time - storyTiming.closing.start) / (storyTiming.closing.end - storyTiming.closing.start));

        const nextRoll = time < rollStarts[1] ? 0 : time < rollStarts[2] ? 1 : time < rollStarts[3] ? 2 : 3;
        const nextAnatomy = time >= storyTiming.anatomy.start && time < storyTiming.anatomy.end;
        const nextExperience = time >= storyTiming.experience.start && time < storyTiming.experience.end;
        const nextChapter = time < storyTiming.intro.end ? 0 : time < storyTiming.anatomy.start ? 1 : time < storyTiming.anatomy.end ? 2 : time < storyTiming.experience.start ? 3 : 4;

        if (nextRoll !== rollIndex) {
          rollIndex = nextRoll;
          setActiveRoll(nextRoll);
          if (rollStatus) rollStatus.textContent = `Presentación: ${items[nextRoll]?.name ?? ""}`;
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
      };

      gsap.set(allMedia, {autoAlpha: 0, scale: 1, transformOrigin: "50% 50%"});
      gsap.set(media.intro, {autoAlpha: 1});
      gsap.set([anatomy, experience, chapterRail], {autoAlpha: 0});
      gsap.set(rollGlow, {autoAlpha: 0});
      gsap.set(handoff, {autoAlpha: 0});
      gsap.set(handoffDoors[0], {xPercent: -100});
      gsap.set(handoffDoors[1], {xPercent: 100});
      gsap.set(handoffLine, {scaleY: 0, transformOrigin: "top center"});
      gsap.set(handoffLabel, {autoAlpha: 0, yPercent: 30});
      gsap.set(mediaFrame, {xPercent: -50, yPercent: -50, x: 0, scale: focusScale, y: focusShift, transformOrigin: "50% 50%"});

      timeline
        .addLabel("intro", 0)
        .to({}, {duration: storyTiming.intro.end - storyTiming.intro.start}, "intro")
        .to(hero, {autoAlpha: 0, y: -26, duration: 0.7, ease: "power2.inOut"}, 3.65)
        .to(chapterRail, {autoAlpha: 0.78, duration: 0.45, ease: "power2.out"}, 3.4)
        .to(mediaFrame, compactViewport ? {scale: focusScale * 0.97, duration: 3.5, ease: "sine.inOut"} : {duration: 3.5}, 0.6)
        .addLabel("open", storyTiming.opening.start)
        .set(media.opening, {autoAlpha: 1}, "open")
        .set(media.intro, {autoAlpha: 0}, "open+=.02")
        .to({}, {duration: storyTiming.opening.end - storyTiming.opening.start}, "open")
        .to(mediaFrame, compactViewport ? {scale: 1, y: 0, duration: storyTiming.opening.end - storyTiming.opening.start, ease: "power2.inOut"} : {duration: storyTiming.opening.end - storyTiming.opening.start}, "open")
        .to(mediaFrame, {x: anatomyShiftX, duration: 0.75, ease: "power2.inOut"}, storyTiming.anatomy.start - 0.7)
        .to(anatomy, {autoAlpha: 1, duration: 0.38, ease: "power2.out"}, storyTiming.anatomy.start)
        .to(mediaShade, {autoAlpha: 0.24, duration: 0.42, ease: "power2.out"}, storyTiming.anatomy.start - 0.1)
        .to(rollGlow, {autoAlpha: 1, duration: 0.48, ease: "power2.out"}, storyTiming.anatomy.start - 0.1);

      items.forEach((_, index) => {
        const layer = rollLayers[index];
        if (!layer) return;
        timeline
          .fromTo(layer, {autoAlpha: 0, scale: 1.025}, {autoAlpha: 1, scale: 1, duration: 0.38, ease: "power2.inOut", immediateRender: false}, rollStarts[index])
          .to(layer, {autoAlpha: 0, scale: 0.99, duration: 0.34, ease: "power2.inOut"}, rollEnds[index] - 0.34);
      });

      timeline
        .to(media.opening, {autoAlpha: 0, duration: 0.34, ease: "power2.inOut"}, storyTiming.anatomy.start)
        .to(anatomy, {autoAlpha: 0, duration: 0.38, ease: "power2.inOut"}, storyTiming.anatomy.end - 0.2)
        .to(mediaShade, {autoAlpha: 1, duration: 0.4, ease: "power2.inOut"}, storyTiming.anatomy.end - 0.35)
        .to(rollGlow, {autoAlpha: 0, duration: 0.4, ease: "power2.inOut"}, storyTiming.anatomy.end - 0.35)
        .addLabel("close", storyTiming.closing.start)
        .fromTo(media.closing, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.32, ease: "power2.inOut", immediateRender: false}, "close")
        .to({}, {duration: storyTiming.closing.end - storyTiming.closing.start}, "close")
        .to(mediaFrame, compactViewport ? {scale: closingScale, x: 0, y: focusShift, duration: storyTiming.closing.end - storyTiming.closing.start, ease: "power2.inOut"} : {duration: storyTiming.closing.end - storyTiming.closing.start}, "close")
        .addLabel("finale", storyTiming.experience.start)
        .fromTo(experience, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.48, ease: "power2.out", immediateRender: false}, "finale+=.18")
        .fromTo(experience.querySelectorAll(".eyebrow,.type-line > span,p,.experience-overlay__actions"), {autoAlpha: 0, y: 32}, {autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.07, ease: "power3.out", immediateRender: false}, "finale+=.22")
        .to(chapterRail, {autoAlpha: 0, duration: 0.3}, "finale")
        .to(experience, {autoAlpha: 0, y: -16, duration: 0.32, ease: "power2.in"}, storyTiming.experience.end - 0.2)
        .set(handoff, {autoAlpha: 1}, storyTiming.handoff.start)
        .to(handoffLine, {scaleY: 1, duration: 0.55, ease: "power2.inOut"}, storyTiming.handoff.start)
        .to(handoffDoors, {xPercent: 0, duration: 0.82, ease: "power3.inOut"}, storyTiming.handoff.start + 0.42)
        .to(handoffLabel, {autoAlpha: 1, yPercent: -50, duration: 0.58, ease: "power3.out"}, storyTiming.handoff.start + 1.08)
        .to({}, {duration: storyTiming.handoff.end - storyTiming.handoff.start}, storyTiming.handoff.start);

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
        end: () => `+=${Math.round(window.innerHeight * (phoneViewport ? 8.5 : tabletViewport ? 10 : 12))}`,
        pin: true,
        pinSpacing: true,
        scrub: phoneViewport ? true : tabletViewport ? 0.14 : 0.18,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (self.progress > 0.02) primeOpeningMedia();
          if (self.progress > 0.38) primeClosingMedia();
          if (progressBar.current) gsap.set(progressBar.current, {scaleX: self.progress, transformOrigin: "left center"});
          if (storyCounterProgress.current) gsap.set(storyCounterProgress.current, {scaleX: self.progress, transformOrigin: "left center"});
          const nextNavState = self.progress > 0.015;
          if (nextNavState !== navIsScrolled) {
            navIsScrolled = nextNavState;
            nav?.classList.toggle("is-scrolled", nextNavState);
          }
        },
        onEnter: () => ambientLoop.resume(),
        onEnterBack: () => ambientLoop.resume(),
        onLeave: () => ambientLoop.pause(),
        onLeaveBack: () => ambientLoop.pause(0),
      });

      gsap.fromTo(hero.querySelectorAll(".type-line > span"), {autoAlpha: 0, yPercent: 115}, {autoAlpha: 1, yPercent: 0, duration: 1.05, stagger: 0.12, ease: "power3.out", delay: 0.72});
      gsap.fromTo(hero.querySelectorAll(".eyebrow,p,.scroll-cue"), {autoAlpha: 0, y: 22}, {autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power2.out", delay: 0.9});

      const revealTargets = document.querySelectorAll(".home-bento > *,.site-footer__main > *");
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
          let rect = button.getBoundingClientRect();
          const enter = () => { rect = button.getBoundingClientRect(); };
          const move = (event: PointerEvent) => {
            xTo((event.clientX - rect.left - rect.width / 2) / rect.width * 7);
            yTo((event.clientY - rect.top - rect.height / 2) / rect.height * 5);
          };
          const leave = () => { xTo(0); yTo(0); };
          button.addEventListener("pointerenter", enter);
          button.addEventListener("pointermove", move);
          button.addEventListener("pointerleave", leave);
          magneticCleanups.push(() => {
            button.removeEventListener("pointerenter", enter);
            button.removeEventListener("pointermove", move);
            button.removeEventListener("pointerleave", leave);
          });
        });
      }

      const primeOnIntent = () => primeOpeningMedia();
      window.addEventListener("wheel", primeOnIntent, {once: true, passive: true});
      window.addEventListener("touchstart", primeOnIntent, {once: true, passive: true});
      window.addEventListener("pointerdown", primeOnIntent, {once: true, passive: true});
      window.addEventListener("keydown", primeOnIntent, {once: true});

      const videoCleanups: Array<() => void> = [];
      Object.values(media).forEach((video) => {
        if (!video) return;
        let videoFrame = 0;
        let animationFrame = 0;
        const followTarget = () => {
          if (typeof video.requestVideoFrameCallback === "function") videoFrame = video.requestVideoFrameCallback(() => flushSeek(video));
          else animationFrame = requestAnimationFrame(() => flushSeek(video));
        };
        const ready = () => {
          syncSemantics();
        };
        video.addEventListener("seeked", followTarget);
        video.addEventListener("loadedmetadata", ready);
        video.addEventListener("loadeddata", ready);
        videoCleanups.push(() => {
          video.removeEventListener("seeked", followTarget);
          video.removeEventListener("loadedmetadata", ready);
          video.removeEventListener("loadeddata", ready);
          if (videoFrame && typeof video.cancelVideoFrameCallback === "function") video.cancelVideoFrameCallback(videoFrame);
          if (animationFrame) cancelAnimationFrame(animationFrame);
        });
        if (video.readyState >= 1) ready();
      });
      syncSemantics();

      return () => {
        magneticCleanups.forEach((cleanup) => cleanup());
        videoCleanups.forEach((cleanup) => cleanup());
        window.removeEventListener("wheel", primeOnIntent);
        window.removeEventListener("touchstart", primeOnIntent);
        window.removeEventListener("pointerdown", primeOnIntent);
        window.removeEventListener("keydown", primeOnIntent);
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
          <img src={sitePath("/media/ryo-wordmark-gold-web.webp")} width="480" height="240" alt="RYŌ" fetchPriority="high" />
        </a>
        <div className="site-nav__links">
          <a href="#objeto" onClick={(event) => { event.preventDefault(); jumpTo(0.16); }}>La caja</a>
          <a href="#anatomia" onClick={(event) => { event.preventDefault(); jumpTo(0.32); }}>Presentación</a>
          <a href="#experiencia" onClick={(event) => { event.preventDefault(); jumpTo(0.91); }}>Experiencia</a>
          <a href="#menu">Menú</a>
          <button className="icon-button" type="button" onClick={() => setReplayToken((token) => token + 1)} aria-label="Repetir animación de entrada"><span aria-hidden="true">↻</span></button>
          <a className="button button--solid magnetic-button" href="https://wa.me/584220382261" target="_blank" rel="noopener"><span>Pide por WhatsApp</span><i aria-hidden="true">↗</i></a>
        </div>
        <CurvedNav label="Abrir navegación RYŌ" items={[
          {label: "Inicio", href: "#inicio", description: "Entrada de la caja", onSelect: () => jumpTo(0)},
          {label: "La caja", href: "#objeto", description: "Giro y apertura", onSelect: () => jumpTo(0.16)},
          {label: "Presentación", href: "#anatomia", description: "Ingredientes y equilibrio", onSelect: () => jumpTo(0.32)},
          {label: "RYŌ en casa", href: "#experiencia", description: "Delivery y contacto", onSelect: () => jumpTo(0.91)},
          {label: "Menú", href: "#menu", description: "Interactivo o tradicional"},
          {label: "Instagram", href: "https://www.instagram.com/ryomcbo/", description: "@ryomcbo", external: true},
        ]} />
      </nav>

      <main id="contenido">
        <section ref={story} className="scroll-story" id="inicio" aria-label="RYŌ: El toque final, recorrido audiovisual">
          <span className="story-anchor" id="objeto" style={{top: "12%"}} aria-hidden="true" />
          <span className="story-anchor" id="rolls" style={{top: "27%"}} aria-hidden="true" />
          <span className="story-anchor" id="anatomia" style={{top: "29%"}} aria-hidden="true" />
          <span className="story-anchor" id="experiencia" style={{top: "82%"}} aria-hidden="true" />

          <div className="story-stage">
            <div className="story-ambient" aria-hidden="true"><i /><i /></div>
            <div className="story-media-frame" aria-hidden="true">
              <video ref={introVideo} className="story-media story-media--intro" muted playsInline preload="auto" poster={sitePath("/media/box-front-web.webp")}>
                <source media="(max-width: 599px)" src={sitePath("/media/ryo-scroll-intro-mobile-v3.mp4")} type="video/mp4" />
                <source src={sitePath("/media/ryo-scroll-intro-v2.mp4")} type="video/mp4" />
              </video>
              <video ref={openingVideo} className="story-media story-media--opening" muted playsInline preload="none" data-poster={sitePath("/media/box-closed.webp")}>
                <source media="(max-width: 599px)" src={sitePath("/media/ryo-scroll-open-playboy-mobile-v3.mp4")} type="video/mp4" />
                <source src={sitePath("/media/ryo-scroll-open-playboy-v2.mp4")} type="video/mp4" />
              </video>
              {items.map((item) => (
                <img key={item.id} className="story-media story-media--roll" data-roll-layer={item.id} data-src={sitePath(item.image)} width="1672" height="940" alt="" decoding="async" />
              ))}
              <video ref={closingVideo} className="story-media story-media--closing" muted playsInline preload="none" data-poster={sitePath("/media/box-open.webp")}>
                <source media="(max-width: 599px)" src={sitePath("/media/ryo-scroll-return-close-mobile-v3.mp4")} type="video/mp4" />
                <source src={sitePath("/media/ryo-scroll-return-close-v2.mp4")} type="video/mp4" />
              </video>
              <div className="story-media-shade" />
              <div className="story-roll-glow" />
            </div>

            <header className="story-hero" data-story-hero>
              <p className="eyebrow">Sushi de autor · Delivery &amp; pick up</p>
              <h1 aria-label="El corte es nuestro. El toque final es tuyo."><span className="type-line"><span>El corte es nuestro.</span></span><span className="type-line"><span>El toque final</span></span><span className="type-line"><span>es tuyo.</span></span></h1>
              <p>Alta cocina japonesa, preparada para disfrutarse donde tú elijas.</p>
              <a className="scroll-cue" href="#objeto" onClick={(event) => { event.preventDefault(); jumpTo(0.16); }}><span>Desliza para abrir</span><i aria-hidden="true" /></a>
            </header>

            <AnatomyOverlay item={currentItem} index={activeRoll} active={anatomyActive} />

            <nav className={`roll-preview-nav${anatomyActive ? " is-active" : ""}`} aria-label="Previsualizar los rolls destacados" aria-hidden={!anatomyActive} inert={!anatomyActive}>
              <span>Rolls</span>
              <div>{items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={activeRoll === index ? "is-current" : undefined}
                  aria-current={activeRoll === index ? "true" : undefined}
                  aria-label={`Ver roll ${index + 1}: ${item.name}`}
                  onClick={() => jumpTo((rollStarts[index]! + 0.45) / storyTiming.handoff.end)}
                >{String(index + 1).padStart(2, "0")}</button>
              ))}</div>
            </nav>

            <section className={`experience-overlay${experienceActive ? " is-active" : ""}`} data-experience-overlay aria-labelledby="experience-title" aria-hidden={!experienceActive} inert={!experienceActive}>
              <p className="eyebrow">RYŌ en casa</p>
              <h2 id="experience-title" aria-label="Alta cocina japonesa, directo a tu mesa."><span className="type-line"><span>Alta cocina japonesa,</span></span><span className="type-line"><span><em>directo a tu mesa.</em></span></span></h2>
              <p>Preparada en nuestra cocina para disfrutarse donde tú elijas.</p>
              <div className="experience-overlay__actions">
                <a className="button button--solid magnetic-button" href="https://wa.me/584220382261" target="_blank" rel="noopener"><span>Pide por WhatsApp</span><i aria-hidden="true">↗</i></a>
                <a className="text-link" href="https://www.instagram.com/ryomcbo/" target="_blank" rel="noopener">Descubre más en Instagram</a>
              </div>
            </section>

            <div className="chapter-rail" aria-label="Progreso del recorrido">
              {chapters.map((chapter, index) => (
                <button key={chapter.id} type="button" onClick={() => jumpTo(chapter.progress)} className={currentChapter === index ? "is-current" : undefined} aria-current={currentChapter === index ? "step" : undefined}>
                  <span>{chapter.number}</span><b>{chapter.label}</b>
                </button>
              ))}
            </div>

            <div className="story-counter" aria-hidden="true"><span>{String(currentChapter + 1).padStart(2, "0")}</span><i><span ref={storyCounterProgress} /></i><span>05</span></div>
            <div className="story-handoff" aria-hidden="true">
              <div className="story-handoff__door story-handoff__door--left" />
              <div className="story-handoff__door story-handoff__door--right" />
              <i className="story-handoff__line" />
              <span className="story-handoff__title"><b>RYŌ</b><em>En casa</em></span>
            </div>
            <p className="story-status sr-only" data-story-status aria-live="polite" />
            <p className="story-status sr-only" data-roll-status aria-live="polite" />
          </div>
        </section>

        <section className="story-transcript wrap" aria-labelledby="story-transcript-title">
          <details><summary id="story-transcript-title">Ver descripción sin animación</summary><div className="story-transcript__content">{items.map((item, index) => <RollCopy key={item.id} item={item} index={index} transcript />)}</div></details>
        </section>

        <section className="reduced-story" aria-label="Recorrido RYŌ sin movimiento">
          <header className="reduced-story__intro" id="reduced-inicio">
            <img src={sitePath("/media/box-front-web.webp")} width="1672" height="941" loading="lazy" alt="Caja azul RYŌ cerrada y centrada en una escena de estudio oscura" />
            <div className="reduced-roll__copy"><p className="eyebrow">Sushi de autor · Delivery &amp; pick up</p><h1>El corte es nuestro. El toque final es tuyo.</h1><p>Alta cocina japonesa, preparada para disfrutarse donde tú elijas.</p></div>
          </header>
          <div id="reduced-anatomia">{items.map((item, index) => <RollCopy key={item.id} item={item} index={index} />)}</div>
        </section>
      </main>
    </div>
  );
}
