# QA · Foundation vertical slice

**Fecha:** 28.08.2026 · **Estado:** base interna aceptada por Victor; aprobación del cliente y producción pendientes

## Alcance verificado

- `website/index.html`: landing, caja, cuatro anatomías, Experiencia, acceso al menú y footer.
- `website/menu.html`: stinger, categorías, navegación por plato y switch `Explorar / Lista`.
- `website/menu-data.js`: diez platos verificados desde SRC-002 usados por ambas presentaciones.
- `website/app.js`: comportamiento común de landing, anatomía y menú.
- `website/styles.css`: desktop, tablet, móvil y `prefers-reduced-motion`.
- `website/public/media/`: logo transparente, patrón y seis masters WebP optimizados.

## Evidencia

- Anidamiento HTML válido en ambas rutas.
- Sintaxis JavaScript válida mediante `node --check`.
- Autoverificación de contenido válida: diez platos, identificadores únicos, dos categorías y cuatro anatomías coherentes.
- Enlaces y assets locales resueltos.
- Diez registros en una sola fuente; `Explorar` y `Lista` no mantienen copias.
- Landing, menú, módulos JavaScript y logo responden HTTP 200 en preview local.
- Revisión visual en navegador completada a 1440 × 1000 y 390 × 844 px.
- Cambio de categoría, flechas de teclado, selección anatómica por foco y switch `Explorar / Lista` comprobados.
- Consola sin errores o advertencias durante la revisión y titular móvil corregido para no exceder 390 px.
- Victor aceptó la Foundation como base para continuar el diseño; no constituye aprobación final del cliente.
- Logo final: PNG RGBA 1774 × 887 con canal alfa real.
- Masters PNG de 1.6–1.7 MB convertidos a WebP de 82–115 KB para el prototipo.

## Pendiente antes de producción G4

- Revisión adicional de tablet, orientación y lector de pantalla.
- Ajuste fino de coordenadas anatómicas contra fotografía final.
- Confirmación posterior de vigencia, moneda y precios para rolls y nigiris; las demás categorías quedan fuera de esta etapa.
- Permisos de publicación, wordmark vectorial y clips físicos.

No se ejecutó despliegue público.
