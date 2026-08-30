# QA · Landing polishing responsive

**Fecha:** 29.08.2026
**Estado:** implementado y verificado en GitHub Pages; corrección móvil final validada el 30.08.2026.

## Alcance verificado

- Anatomía con sello circular amarillo/dorado, anillos concéntricos, pulso e índice; el conector de doble trazo permanece oculto hasta `hover`, foco o toque.
- Selección táctil corregida para que el clic no desactive el conector después del evento de foco.
- Aclarado y escala leve del roll durante la pausa anatómica, con retorno visual al fondo antes del cierre.
- Distancia de ScrollTrigger diferenciada: amplia en escritorio, reducida en tablet y comprimida en teléfono.
- Hero alineado con la exploración `la caja como portal editorial`: promesa recuperada, copy reducido y caja con jerarquía dominante.
- Vídeos precargados, seek agrupado con tolerancia de `33 ms` y despacho ligado al frame presentado; scrub corto por breakpoint sin snap de capítulos.
- Banda de ingredientes táctil con scroll horizontal, controles anterior/siguiente y actualización de conectores durante el desplazamiento.
- Cierre cinemático ligado al scroll: línea dorada descendente, dos paneles laterales con patrón RYŌ, reveal tipográfico `RYŌ · En casa` y salida hacia el bloque informativo.
- Sección `RYŌ en casa` en retícula bento con caja, modalidad, CTA de WhatsApp sin número visible e Instagram verificado.
- Footer navy con patrón RYŌ, banda dorada, `Desarrollo por VSU` enlazado a `meetvsu.dev` e Instagram `@ryomcbo`.
- Navegación curva en tablet y teléfono, con cierre por botón y tecla Escape, bloqueo de fondo y atributos accesibles.
- Composición móvil de borde a borde: hero bajo el navbar, roll anatómico protagonista en el tercio superior y controles distribuidos hasta el borde inferior.
- Anatomía móvil reducida a cuatro ingredientes prioritarios con rotación automática, ingredientes restantes en el resumen y selector directo de cuatro rolls.

## Evidencia técnica y visual

- `npm run check`: correcto; incluye TypeScript, export estático de Next.js y cinco pruebas de contenido, artifact y encuadre responsive.
- Next.js dev server: compilación correcta y respuesta `200` para `/`.
- Navegador local: comprobado a `1280 × 800`, `768 × 1024` y `390 × 844`.
- ScrollTrigger: `12` alturas de viewport en escritorio, `10` en tablet y `8.5` en teléfono.
- Una prueba de salto de `1200 px` tardaba cerca de `500 ms` en alcanzar el tiempo objetivo con el scrub anterior; después del ajuste se estabiliza en aproximadamente `100–150 ms`.
- En desplazamiento continuo de `100 px` cada `90 ms`, el objetivo de video avanza de forma monotónica y termina en `readyState 4`. Durante ese estrés el navegador todavía puede caer temporalmente en `readyState 1`: es un límite del patrón de keyframes del MP4, no un bloqueo de React o GSAP.
- Los checkpoints `0 / 1400 / 3000 / 6700 / 7900 px` validan, en orden, Entrada, Apertura, Anatomía, Cierre y Experiencia; los clips alcanzan sus endpoints y la anatomía no invade apertura o cierre.
- En `390 × 844`, el trigger mide exactamente `8.5` viewports y el documento completo queda en `10281 px`; botones, banda horizontal, resumen y navegación permanecen accesibles.
- Anatomía: el toque deja un callout y un grupo SVG activos; el estado inicial no muestra líneas ni puntos.
- En `390 × 844`, el control siguiente desplazó la banda de ingredientes de `0` a `253.5 px`; botones, resumen y navegación permanecen visibles.
- Navbar: el control curvo aparece solo por debajo de `1024 px`; la navegación lineal se conserva en escritorio.
- Alineación anatómica: marco de imagen, SVG de conectores y capa de sellos registran una diferencia de `0 px` en `360 × 800`, `390 × 844`, `412 × 915`, `430 × 932`, `768 × 1024` y `844 × 390`.
- Teléfonos estándar: sin overflow horizontal, cuatro callouts visibles y resumen a `16 px` del borde inferior. El recorte conserva `220vw` desde `320 × 568` hasta `430 × 932`, incluido el Samsung S24 Ultra de referencia a `412 × 915`; la altura del teléfono ya no activa un segundo zoom ni desplaza roll, caja, puntos o conectores.
- Selector móvil: el salto al roll 03 se estabiliza dentro de la pausa de `Koga Explosion`, no sobre el límite del crossfade.
- Handoff final: la línea aparece antes del movimiento de puertas; el título permanece oculto durante el cierre y se revela después de que ambos paneles alcanzan el centro. La misma timeline revierte la secuencia al subir.

## Riesgo residual y decisión pendiente

La programación ya no acumula seeks y la respuesta del gesto mejoró de forma medible. El techo restante depende de la codificación de los masters: para una sensación de scrub casi cuadro a cuadro conviene reexportar los tres clips con GOP corto o formato intra-frame y sustituirlos sin cambiar la arquitectura.

Continuar la revisión sobre hardware real con Victor. El menú interactivo sigue fuera del artifact público.
