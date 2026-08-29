"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import type {Anatomy, MenuItem} from "@/data/menu";

type AnatomyItem = MenuItem & {anatomy: Anatomy};

type AnatomyOverlayProps = {
  item: AnatomyItem;
  index: number;
  active: boolean;
};

export function AnatomyOverlay({item, index, active}: AnatomyOverlayProps) {
  const root = useRef<HTMLElement>(null);
  const connectors = useRef<SVGSVGElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeConnector, setActiveConnector] = useState(-1);
  const [paths, setPaths] = useState(() => item.anatomy.points.map(([x, y]) => `M ${x} ${y} L ${x} ${y}`));

  const updatePaths = useCallback(() => {
    const svg = connectors.current;
    if (!svg) return;
    const svgRect = svg.getBoundingClientRect();
    if (!svgRect.width || !svgRect.height) return;
    setPaths(item.anatomy.points.map(([x, y], lineIndex) => {
      const button = buttons.current[lineIndex];
      if (!button) return `M ${x} ${y} L ${x} ${y}`;
      const buttonRect = button.getBoundingClientRect();
      const targetBelow = buttonRect.top > svgRect.bottom;
      const endX = ((targetBelow ? buttonRect.left + buttonRect.width / 2 : buttonRect.left) - svgRect.left) / svgRect.width * 100;
      const endY = ((targetBelow ? buttonRect.top : buttonRect.top + buttonRect.height / 2) - svgRect.top) / svgRect.height * 100;
      return `M ${x} ${y} Q ${x + (endX - x) * 0.62} ${y + (endY - y) * 0.35} ${endX} ${endY}`;
    }));
  }, [item]);

  useEffect(() => {
    const frame = requestAnimationFrame(updatePaths);
    const observer = new ResizeObserver(updatePaths);
    if (connectors.current) observer.observe(connectors.current);
    window.addEventListener("resize", updatePaths);
    document.fonts?.ready.then(updatePaths);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updatePaths);
    };
  }, [updatePaths]);

  useGSAP(() => {
    if (!active || !root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const title = root.current.querySelector("h2");
    const callouts = root.current.querySelectorAll("button");
    const summary = root.current.querySelector(".anatomy-overlay__summary");
    gsap.fromTo(title, {autoAlpha: 0, y: 34}, {autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out", overwrite: true});
    gsap.fromTo(callouts, {autoAlpha: 0, x: 34}, {autoAlpha: 1, x: 0, duration: 0.55, stagger: 0.055, ease: "power2.out", overwrite: true});
    gsap.fromTo(summary, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out", overwrite: true});
  }, {scope: root, dependencies: [item.id, active], revertOnUpdate: true});

  const select = (lineIndex: number) => {
    setActiveConnector(lineIndex);
    requestAnimationFrame(updatePaths);
  };

  return (
    <section ref={root} className={`anatomy-overlay${active ? " is-active" : ""}`} aria-labelledby="anatomy-name" aria-hidden={!active} inert={!active}>
      <div className="anatomy-overlay__heading">
        <p className="eyebrow"><span>{String(index + 1).padStart(2, "0")}</span> · Anatomía del roll</p>
        <h2 id="anatomy-name" className={item.name.length > 12 ? "is-long" : undefined}>{item.name}</h2>
      </div>
      <svg ref={connectors} className="scroll-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {item.anatomy.points.map(([x, y], lineIndex) => (
          <g key={lineIndex} className={activeConnector === lineIndex ? "is-active" : undefined}>
            <path d={paths[lineIndex] ?? `M ${x} ${y} L ${x} ${y}`} />
            <circle cx={x} cy={y} r=".62" />
          </g>
        ))}
      </svg>
      <ul className="scroll-ingredients" aria-label="Ingredientes confirmados">
        {item.anatomy.order.map((ingredientIndex, lineIndex) => (
          <li key={lineIndex}>
            <button
              ref={(node) => { buttons.current[lineIndex] = node; }}
              className={`ingredient-callout${lineIndex === item.anatomy.main ? " ingredient-callout--main" : ""}${activeConnector === lineIndex ? " is-active" : ""}`}
              type="button"
              aria-pressed={activeConnector === lineIndex}
              onPointerEnter={() => select(lineIndex)}
              onPointerLeave={() => setActiveConnector(-1)}
              onFocus={() => select(lineIndex)}
              onBlur={() => setActiveConnector(-1)}
              onClick={() => select(activeConnector === lineIndex ? -1 : lineIndex)}
            >
              <span>{item.ingredients[ingredientIndex]}</span>
              {lineIndex === item.anatomy.main && <small>Principal</small>}
            </button>
          </li>
        ))}
      </ul>
      <div className="anatomy-overlay__summary">
        <span>Descripción general</span>
        <p>{item.description}</p>
      </div>
    </section>
  );
}
