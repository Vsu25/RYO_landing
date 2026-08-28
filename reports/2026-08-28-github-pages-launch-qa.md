# QA · Lanzamiento de landing en GitHub Pages

**Fecha:** 28.08.2026 · **Estado:** verificación local aprobada; despliegue remoto pendiente

## Alcance

- README raíz convertido en portada pública del proyecto.
- Navegación operativa trasladada a `planning-docs/README.md`.
- Landing cerrada en cuatro actos; se retiró el teaser de menú incompleto.
- Metadata social, canonical, favicon, robots y sitemap incorporados.
- Workflow de GitHub Pages limitado por allowlist a los archivos de la landing.
- `menu.html` excluido del artifact público mientras el menú permanece congelado.
- Autorización de publicación de la landing registrada en proyecto, identidad e inventario.

## Verificación local

- Sintaxis JavaScript y fuente única: `CONTENT_DATA_OK · 10 platos · 4 anatomías`.
- YAML del workflow válido y artifact de allowlist sin `menu.html`.
- HTML, anchors y referencias locales válidos.
- Sei Exclusive conserva ingredientes y descripción directamente en HTML antes de la mejora con JavaScript.
- Desktop 1440 × 1000 y móvil 390 × 844 revisados sin overflow horizontal.
- Seleccionar Koga Explosion actualiza `aria-pressed` y el encabezado anatómico.
- Teclado y movimiento reducido ya verificados en la pasada anterior.

## Verificación remota pendiente

- Workflow de Pages completado.
- URL pública sin errores de consola o recursos faltantes.

## Pendiente de producto

- Registrar observaciones de Victor sobre la versión pública.
- Ajustar coordenadas anatómicas cuando se aprueben los masters definitivos.
- Mantener fuera de producción el menú hasta aprobar sus imágenes.
- Definir una licencia explícita antes de permitir redistribución externa.
