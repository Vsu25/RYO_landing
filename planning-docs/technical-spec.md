# Sushi Page — Especificación técnica

**Estado:** Next.js/React implementado y verificado en GitHub Pages mediante exportación estática · **Última actualización:** 29.08.2026

## Autoridad

Esta fuente define el stack, la arquitectura y los guardrails técnicos. El contenido factual pertenece al inventario; la experiencia, al blueprint; el avance, al roadmap.

## Decisión de arquitectura

La aplicación usa Next.js 16 App Router, React 19 y TypeScript. La salida sigue siendo completamente estática: `next build` produce `out/`, sin servidor de aplicación, backend, funciones ni costo recurrente. GitHub Pages continúa como hosting.

Next.js se adopta para ordenar componentes, metadata, tipado y evolución del diseño; no convierte la landing en una aplicación de datos. La interactividad se concentra en dos islas cliente:

1. `ScrollExperience`: timeline de videos, navegación por capítulos, anatomía y motion.
2. `MenuExperience`: switch `Explorar / Lista`, categorías, teclado, swipe y cartas responsive; solo se genera en desarrollo local.

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
| `src/components/menu/` | Menú React local. |
| `src/local-pages/MenuPage.tsx` | Página local que nunca se compila en producción. |
| `src/data/menu.json` | Diez platos; fuente única para ambas vistas y cuatro anatomías. |
| `public/media/` | Doce assets autorizados y publicables. |
| `scripts/local-menu-media.mjs` | Genera `/menu` y sus assets en dev; los borra en prebuild. |
| `tests/project.test.mjs` | Integridad editorial, allowlist y ausencia de filtraciones. |
| `out/` | Export generado; nunca es fuente. |

## Contrato audiovisual

La escena pinned usa una sola timeline virtual compacta, con `scrub` de `0.18`, `0.14` o `0.10` y recorridos de `12`, `10` u `8.5` alturas de viewport en escritorio, tablet o teléfono.

- 0–4.8 unidades: `ryo-scroll-intro-v2.mp4`.
- 4.8–10.2 unidades: `ryo-scroll-open-playboy-v2.mp4`.
- 10–25.4 unidades: capas de anatomía `Playboy → Yuzu → Koga → Sei`; solo los rolls usan crossfade.
- 25.2–30.2 unidades: `ryo-scroll-return-close-v2.mp4`.
- 30–32.7 unidades: experiencia editorial.
- 32.35–34.8 unidades: línea vertical, cierre de paneles laterales, reveal `RYŌ · En casa` y entrega por scroll a la sección informativa.
- Desde 36.65 s: escena editorial de Experiencia.

Los videos permanecen muted, inline y controlados por `currentTime`. La cámara y la caja provienen del video; no se simula su movimiento con fades. El seek se limita a `duration - 0.04`, omite diferencias inferiores a 33 ms y conserva solo el objetivo más reciente. Cuando termina un seek, el siguiente se despacha después de `requestVideoFrameCallback` —o `requestAnimationFrame` como fallback— para no acumular solicitudes más rápido de lo que el decodificador puede presentar cuadros. Para un scrubbing todavía más preciso, los masters deberán exportarse con keyframes frecuentes o GOP corto.

GSAP se inicializa dentro de `useGSAP`, con scope y cleanup. Se priorizan transforms y opacidad. `prefers-reduced-motion` elimina pin, scrub y stinger y muestra una narración estática equivalente.

El cierre usa elementos HTML existentes dentro de una sola timeline: la línea escala desde su origen superior, los dos paneles se trasladan únicamente con `xPercent` y el título entra dentro de una máscara. No usa timers, reproducción autónoma ni un segundo controlador de scroll, por lo que la secuencia también se revierte al subir.

En tablet y teléfono, `.story-media-frame`, `.scroll-connectors` y `.anatomy-marker-layer` conservan el mismo rectángulo responsivo para que las coordenadas normalizadas sigan apuntando al producto. El marco inicia ampliado y desplazado al centro del viewport, anima a escala `1` junto al navbar durante anatomía y recupera el acercamiento al cerrar. En teléfono, cada anatomía declara entre cuatro y cinco líneas destacadas; actualmente se muestran cuatro, se recorren automáticamente cada `2200 ms`, el resto se resume en la ficha inferior y el selector `01–04` salta al interior de cada pausa para evitar caer sobre un crossfade.

## Menú local y frontera de publicación

`npm run dev` copia seis WebP conceptuales desde `local-media/menu/` a `public/local-menu-media/` y genera temporalmente `src/app/menu/page.tsx`. Ambas rutas están ignoradas por Git.

`npm run build` ejecuta primero la limpieza y compila solo la landing. El menú no queda “oculto”: no existe ni como HTML ni como chunk de JavaScript público. La landing recibe del Server Component únicamente los cuatro registros anatómicos; los otros seis platos no se serializan.

La publicación del menú requiere una decisión independiente de permisos y vigencia.

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

- Tres videos autorizados, aproximadamente 12.5 MB en conjunto.
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

Una entrega técnica está cerrada cuando typecheck, export y pruebas pasan; no hay errores nuevos de consola; el flujo funciona hacia adelante y atrás en desktop, móvil y orientación horizontal; la alternativa reducida conserva todo el contenido; y el artifact contiene solo la allowlist pública.
