# QA · Integración de los tres videos del scroll

**Fecha:** 29.08.2026 · **Estado:** publicado y verificado · **Superficie:** <https://vsu25.github.io/RYO_landing/>

## Alcance

Se sustituyó la simulación de movimiento basada en stills por tres clips H.264 aportados y autorizados por Victor. GSAP/ScrollTrigger controla el tiempo de cada video de forma reversible según el progreso del scroll; la caja y la cámara ya no se desplazan mediante fades. Las disoluciones quedan reservadas para el cambio de roll y el empalme de producto hacia el cierre.

## Secuencia implementada

1. `ryo-scroll-intro-v2.mp4` · 8 s · caja centrada a diagonal.
2. `ryo-scroll-open-playboy-v2.mp4` · 8 s · apertura y toma de K17 / Playboy.
3. Anatomía HTML con imágenes: `Playboy → Yuzu → Koga → Sei`.
4. `ryo-scroll-return-close-v2.mp4` · 6 s · retorno y cierre.
5. Hold final del propio video cerrado con la capa editorial de Experiencia.

Los originales permanecen en `references/ryo-sushi/video/`; las copias publicables están en `website/public/media/`. El workflow de Pages conserva una allowlist explícita y no incorpora los assets locales del menú.

## Evidencia técnica

- Códecs de los tres originales: H.264 + AAC.
- Duraciones: 8 s, 8 s y 6 s.
- Resoluciones: 1920 × 1080, 1280 × 720 y 1920 × 1080.
- Tamaño conjunto de publicación: 12.5 MB aproximadamente.
- `node --check website/scroll-story.js`: aprobado.
- Carga local en `http://127.0.0.1:4173/index.html`: completa, sin errores ni warnings de consola.
- El intro inició en `0.00 s`; a progreso `0.2801` la apertura alcanzó `2.92 s`.
- Las pausas anatómicas resolvieron, en orden, Playboy (`0.4443`), Yuzu (`0.5137`), Koga (`0.6102`) y Sei (`0.7073`), con una sola imagen de roll visible en cada pausa.
- A progreso `0.8332` el cierre alcanzó `1.89 s`; a `0.9583` llegó a `5.96 s` y activó Experiencia.
- Los saltos de capítulo, estados `aria-hidden`, transcripción y navegación semántica continuaron operativos.
- `prefers-reduced-motion` conserva la versión lineal estática y hereda el mismo orden de rolls.
- Commit publicado: `fdd7c80`.
- En GitHub Pages se confirmaron los tres URLs MP4, la apertura en `3.02 s` a progreso `0.2826` y Playboy como única capa visible a progreso `0.4444`; la consola permaneció sin errores ni warnings.

## Riesgo residual visible

El original de cierre comienza con K17 / Playboy, mientras la última anatomía ahora es Sei. La implementación respeta la corrección solicitada para la exploración y usa una disolución breve entre Sei y el clip de retorno. Si el cliente exige continuidad factual exacta durante el gesto de guardar, se reemplaza únicamente el tramo inicial de ese clip por una versión con Sei; el resto de la landing y el cierre no cambian.
