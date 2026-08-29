# QA · Menú interactivo RYŌ

**Fecha:** 28.08.2026 · **Estado:** variante 02-B verificada localmente; polishing de Victor pendiente

## Alcance verificado

- Diez platos: siete rolls especiales y tres nigiris.
- Correspondencia `ID documental → ID técnico → nombre editorial → asset`.
- Equivalencia factual entre `Explorar` y `Lista`.
- Selección directa, anterior/siguiente, flechas de teclado y cambio de categoría.
- Layout de escritorio 1440 × 1024, tablet 834 × 1112 y teléfono 390 × 844.
- Categoría solapada en escritorio y cartas expandibles con un único estado activo en tablet/teléfono.
- GSAP Core activo para selección mediante transform/opacidad, con fallback de movimiento reducido.
- Carga de imágenes, texto alternativo y consola del navegador.

## Evidencia

| Área | Resultado |
|---|---|
| Datos | `node website/test-content.mjs` → `CONTENT_DATA_OK · 10 platos · 10 assets · 4 anatomías` |
| Sintaxis | `node --check` pasa para `app.js`, `menu-data.js` y `test-content.mjs` |
| Integridad de diff | `git diff --check` sin errores |
| Selección directa | Kamasutra conserva foco y muestra `6 piezas`, `14 REF`, posición 3 de 7 |
| Teclado | `ArrowRight` avanza de Kamasutra a Rendi y actualiza `04 / 07` |
| Categorías | Nigiris inicia en Nigiri Tuná y muestra `01 / 03` |
| Lista | La consulta rápida muestra los diez platos desde la misma fuente, sin depender del filtro de la vista Explorar |
| Responsive | En 1440, 834 y 390 px, `scrollWidth` coincide con `innerWidth`; no hay overflow horizontal de página |
| Tarjetas | Un único `aria-expanded=true`; al abrir Yuzu conserva foco, estado accesible, imagen, descripción, ingredientes, precio y piezas |
| Motion | El runtime informa `data-motion="gsap"`; GSAP se carga localmente y la selección usa tweens de 280–340 ms |
| Consola | Cero errores o warnings durante la navegación verificada |

## Riesgos residuales

- El gesto horizontal está implementado sobre la imagen con umbral de 48 px y `touch-action: pan-y`; falta repetirlo en hardware táctil real.
- `prefers-reduced-motion` está cubierto por CSS y evita la animación JavaScript del plato; falta repetir la inspección con emulación activa del navegador.
- Las imágenes son masters conceptuales aprobados para implementación local, no fotografía documental ni material autorizado para publicar el menú.
- Moneda y vigencia de precios continúan pendientes; la interfaz muestra `REF` de forma explícita.
- El menú sigue excluido del artifact de GitHub Pages.

## Próximo control

Polishing con Victor sobre recortes individuales y densidad de ingredientes; después, prueba en hardware táctil y reduced motion final antes de cualquier decisión de publicación.
