# Sushi Page — Especificación técnica

**Estado:** landing y preview del menú integradas en Next.js/React mediante una sola exportación estática · **Última actualización:** 30.08.2026

## Autoridad

Esta fuente define el stack, la arquitectura y los guardrails técnicos. El contenido factual pertenece al inventario; la experiencia, al blueprint; el avance, al roadmap.

## Decisión de arquitectura

La aplicación usa Next.js 16 App Router, React 19 y TypeScript. La salida sigue siendo completamente estática: `next build` produce `out/`, sin servidor de aplicación, backend, funciones ni costo recurrente. GitHub Pages continúa como hosting.

Next.js se adopta para ordenar componentes, metadata, tipado y evolución del diseño; no convierte la landing en una aplicación de datos. La interactividad se concentra en dos islas cliente:

1. `ScrollExperience`: timeline de videos, navegación por capítulos, anatomía y motion.
2. `MenuExperience`: switch `Explorar / Lista`, categorías, teclado, swipe y cartas responsive en la ruta pública `/menu/`.

Layout, metadata, contacto y contenido estable se prerenderizan. No se usa estado React por frame; GSAP actualiza tiempo de video, transforms y opacidad directamente, y React cambia únicamente estados semánticos discretos.

## Stack aprobado

| Capa | Tecnología | Uso |
|---|---|---|
| Framework | Next.js 16 App Router | Rutas, metadata y exportación estática. |
| UI | React 19 | Componentes interactivos y estados discretos. |
| Lenguaje | TypeScript estricto | Contratos y QA de implementación. |
| Motion | GSAP + ScrollTrigger + `@gsap/react` | Timeline reversible, pin, scrub y cleanup. |
| Estilos | CSS propio | Identidad, responsive, foco y reduced motion. |
| Datos | JSON local tipado | Fuente única del menú y anatomías. |
| Hosting | GitHub Pages | Artifact estático gratuito. |
| CI | GitHub Actions | Instalación reproducible, check, export y deploy. |

No se incorpora Vercel, backend, CMS, base de datos, autenticación, analytics, WebGL ni librería de componentes.

## Estructura ejecutable

| Ruta | Contrato |
|---|---|
| `src/app/layout.tsx` | Metadata global, viewport y tokens de assets. |
| `src/app/page.tsx` | Composición prerenderizada de la landing. |
| `src/components/landing/` | Stinger, scroll audiovisual y anatomía. |
| `src/app/menu/page.tsx` | Ruta prerenderizada, metadata propia y límite de indexación del menú. |
| `src/components/menu/` | Menú React compartido por las vistas `Explorar / Lista`. |
| `src/data/menu.json` | Diez platos; fuente única para ambas vistas y cuatro anatomías. |
| `public/media/` | Quince assets autorizados y publicables, incluidos tres derivados móviles. |
| `public/menu-media/` | Seis derivados conceptuales seleccionados para la preview del menú. |
| `tests/project.test.mjs` | Integridad editorial, correspondencia de media y presencia de ambas rutas en el artifact. |
| `out/` | Export generado; nunca es fuente. |

## Contrato audiovisual

La escena pinned usa una sola timeline virtual compacta. Escritorio y tablet conservan `scrub` amortiguado de `0.18` y `0.14`; teléfono usa `scrub: true` para correspondencia lineal 1:1. Los recorridos son de `12`, `10` u `8.5` alturas de viewport respectivamente.

- 0–4.8 unidades: `ryo-scroll-intro-v2.mp4`.
- 4.8–10.2 unidades: `ryo-scroll-open-playboy-v2.mp4`.
- 10–25.4 unidades: capas de anatomía `Playboy → Yuzu → Koga → Sei`; solo los rolls usan crossfade.
- 25.2–30.2 unidades: `ryo-scroll-return-close-v2.mp4`.
- 30–32.7 unidades: experiencia editorial.
- 32.35–34.8 unidades: línea vertical, cierre de paneles laterales, reveal `RYŌ · En casa` y entrega por scroll a la sección informativa.
- Desde 36.65 s: escena editorial de Experiencia.

Los videos permanecen muted, inline y controlados por `currentTime`. La cámara y la caja provienen del video; no se simula su movimiento con fades. El seek se limita a `duration - 0.04`, omite diferencias inferiores a 33 ms y conserva solo el objetivo más reciente. Cuando termina un seek, el siguiente se despacha después de `requestVideoFrameCallback` —o `requestAnimationFrame` como fallback— para no acumular solicitudes más rápido de lo que el decodificador puede presentar cuadros. En teléfonos, cada `<video>` selecciona primero un derivado H.264 de 960 × 540 px con GOP 6 y `faststart`; los V2 originales quedan como fuente de escritorio/tablet y fallback.

GSAP se inicializa dentro de `useGSAP`, con scope y cleanup. Se priorizan transforms y opacidad. `prefers-reduced-motion` elimina pin, scrub y stinger y muestra una narración estática equivalente.

El cierre usa elementos HTML existentes dentro de una sola timeline: la línea escala desde su origen superior, los dos paneles se trasladan únicamente con `xPercent` y el título entra dentro de una máscara. No usa timers, reproducción autónoma ni un segundo controlador de scroll, por lo que la secuencia también se revierte al subir.

En tablet y teléfono, `.story-media-frame`, `.scroll-connectors` y `.anatomy-marker-layer` conservan el mismo rectángulo responsivo para que las coordenadas normalizadas sigan apuntando al producto. El marco inicia ampliado y desplazado al centro del viewport, anima a escala `1` junto al navbar durante anatomía y recupera el acercamiento al cerrar. En teléfono, cada anatomía declara entre cuatro y cinco líneas destacadas; actualmente se muestran cuatro, se recorren automáticamente cada `2200 ms`, el resto se resume en la ficha inferior y el selector `01–04` salta al interior de cada pausa para evitar caer sobre un crossfade.

## Menú integrado y frontera editorial

`src/app/menu/page.tsx` y los seis WebP seleccionados forman parte permanente del mismo proyecto y del mismo export estático que la landing. No existe un segundo build ni una copia de datos: landing, `Explorar` y `Lista` consumen `src/data/menu.json`.

La ruta se publica como preview conceptual, conserva etiquetas visibles sobre las imágenes y declara los valores como REF. Su metadata usa `robots: noindex` hasta confirmar vigencia editorial y aprobación externa; esto no impide acceder mediante la sección 06 o una URL directa.

El selector sincroniza `?view=explore|list` con el estado visible para que los dos enlaces de la landing sean reproducibles y compartibles.

## GitHub Pages

`next.config.ts` usa `output: "export"`, `trailingSlash: true`, imágenes sin optimizador de servidor y `basePath` desde `NEXT_PUBLIC_BASE_PATH`.

El workflow:

1. configura Pages y obtiene su `base_path`;
2. instala Node 20 y dependencias con `npm ci`;
3. ejecuta `npm run check` con ese `basePath`;
4. sube `out/`;
5. despliega mediante el action oficial de Pages.

No se usa `assetPrefix`; todos los assets de aplicación pasan por `sitePath()`.

## Presupuesto y accesibilidad

- Tres videos V2 autorizados para escritorio/tablet y tres derivados móviles de scrubbing; cada viewport descarga únicamente una variante por clip.
- Dimensiones explícitas y posters para media crítica.
- Imágenes del menú con lazy loading salvo selección activa.
- Landmarks, headings, controles nativos, skip link, foco visible y estados `aria-live`.
- Anatomía operable por hover, foco y toque; línea y punto aparecen solo al activar una casilla.
- Teléfono sin desplazamiento horizontal a `360 × 800`, `390 × 844` y `430 × 932`; cuatro ingredientes prioritarios y resumen completo permanecen dentro del viewport.
- Menú navegable con flechas y gesto horizontal dominante de al menos 48 px.
- Sin cookies, tracking ni transmisión de datos; WhatsApp e Instagram son enlaces externos.

## Comandos y Definition of Done

```bash
npm run dev
npm run typecheck
npm run build
npm test
npm run check
```

Una entrega técnica está cerrada cuando typecheck, export y pruebas pasan; no hay errores nuevos de consola; el flujo funciona hacia adelante y atrás en desktop, móvil y orientación horizontal; la alternativa reducida conserva todo el contenido; y el artifact contiene las dos rutas y únicamente la media registrada.
