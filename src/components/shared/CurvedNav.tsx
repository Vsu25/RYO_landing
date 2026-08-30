"use client";

import {useEffect, useId, useRef, useState} from "react";

export type CurvedNavItem = {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
  onSelect?: () => void;
};

export function CurvedNav({items, label = "Abrir navegación"}: {items: CurvedNavItem[]; label?: string}) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      toggle.current?.focus({preventScroll: true});
    };
  }, [open]);

  return (
    <div className={`curved-nav-shell${open ? " is-open" : ""}`}>
      <button ref={toggle} className="curved-nav-toggle" type="button" aria-expanded={open} aria-controls={panelId} aria-label={open ? "Cerrar navegación" : label} onClick={() => setOpen((value) => !value)}>
        <span /><span /><span />
      </button>
      <button className="curved-nav-scrim" type="button" aria-label="Cerrar navegación" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} />
      <aside ref={panel} className="curved-nav-panel" id={panelId} aria-hidden={!open} inert={!open}>
        <svg className="curved-nav-panel__curve" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M100 0V100Q2 50 100 0Z" /></svg>
        <div className="curved-nav-panel__inner">
          <p>RYŌ · Navegación</p>
          <nav aria-label="Navegación expandida">
            {items.map((item, index) => (
              <a key={`${item.href}-${item.label}`} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined} onClick={(event) => {
                if (item.onSelect) {
                  event.preventDefault();
                  item.onSelect();
                }
                setOpen(false);
              }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                {item.description && <small>{item.description}</small>}
              </a>
            ))}
          </nav>
          <div className="curved-nav-panel__footer"><span>Alta cocina japonesa</span><span>Delivery · Pick up</span></div>
        </div>
      </aside>
    </div>
  );
}
