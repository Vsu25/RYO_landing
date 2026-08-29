# QA · Reconstrucción GSAP del recorrido RYŌ

**Fecha:** 28.08.2026

**Estado:** implementado y verificado localmente; publicación pendiente.

## Causa del defecto

La versión `d8e3569` calculaba opacidades con ventanas porcentuales muy estrechas. Un gesto normal de rueda avanzaba aproximadamente 720 px y podía saltar por completo una transición: el hero desaparecía y la caja lateral aparecía ya detenida. Los videos existían y cargaban, pero su intervalo era fácil de omitir, por lo que la experiencia se percibía estática.

## Corrección

- Se reemplazó el controlador manual por una única timeline GSAP con ScrollTrigger, `pin` de la escena completa y `scrub: 1.35`.
- La duración física del recorrido es de trece viewports. Cada gesto conserva el movimiento intermedio en vez de resolverlo como un cambio de estado.
- GSAP y ScrollTrigger se publican desde `website/vendor/`; la página no depende de un CDN.
- La apertura recorre el clip fiel de 2.15 s mediante seek proporcional al scroll.
- El cierre reutiliza ese mismo clip en reversa después del still de retorno; luego enlaza con el asentamiento final de 1.5 s. Así se obtiene apertura y cierre legibles sin publicar los frames deformados del master Veo.
- Sei Exclusive, Koga Explosion, Yuzu y Playboy conservan pose, orden y anatomía; cada transición combina crossfade, escala y desplazamiento leve.
- Hero, título final, anatomías, tarjetas de continuación y footer reciben entradas tipográficas GSAP.
- El fondo incorpora un foco navy/dorado que cambia de posición con la timeline y líneas ambientales lentas.
- Footer y contenido de contacto no se rediseñaron en esta pasada; solo reciben motion de entrada.

## Evidencia local

- Un gesto manual de 720 px produjo mezcla progresiva entre caja frontal y lateral; el scroll avanzó correctamente con la sección fijada.
- Apertura verificada en cinco posiciones: el video pasó de 0 a 2.10 s antes de enlazar con caja abierta y toma del roll.
- Rolls verificados en ambos sentidos: `Sei → Koga → Yuzu → Playboy` y retorno directo desde el final hacia Koga.
- Retorno, cierre inverso, asentamiento de caja y escena final verificados en cinco posiciones.
- Pin corregido sobre la sección completa: el contenido posterior permanece fuera del viewport hasta terminar el recorrido.
- Consola local sin errores.
- `node --check website/scroll-story.js`: aprobado.
- `node website/test-content.mjs`: `CONTENT_DATA_OK · 10 platos · 10 assets · 4 anatomías`.
- `git diff --check`: aprobado.

## Accesibilidad y rendimiento

- `gsap.matchMedia()` mantiene fuera de la timeline a quienes prefieren movimiento reducido; se conserva el recorrido lineal completo.
- Las animaciones principales usan transform y opacidad.
- Solo existe un ScrollTrigger para la historia; las entradas inferiores se agrupan con `ScrollTrigger.batch()`.
- Puntos y líneas anatómicas continúan disponibles por hover, foco o toque, con una transcripción expandible independiente de la animación.
