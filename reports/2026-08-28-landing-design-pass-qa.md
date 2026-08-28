# QA · Landing design pass

**Fecha:** 28.08.2026 · **Estado:** implementado localmente; revisión de Victor pendiente

## Alcance

- Hero editorial con caja cerrada y CTA hacia el recorrido.
- Apertura de caja mediante transición nativa entre masters.
- Nueva escena de Sei Exclusive, Koga Explosion, Yuzu y Playboy.
- Anatomía conectada desde cada tarjeta y adaptada a lectura lineal antes de 980 px.
- Experiencia reducida a modalidad, WhatsApp e Instagram verificados.
- Teaser del menú marcado como preparación; interacción del menú congelada.

## Verificación

- HTML y JavaScript válidos; autoverificación de contenido aprobada.
- Desktop 1440 × 1000, tablet 900 × 900 y móvil 390 × 844 revisados en navegador.
- Sin overflow horizontal ni mensajes de consola.
- En desktop, foco de ingrediente activa una sola línea anatómica.
- En tablet y móvil, conectores ocultos y elementos informativos fuera del orden de tabulación.
- Cada tarjeta de roll selecciona la anatomía correspondiente.
- `prefers-reduced-motion` mantiene contenido final sin depender de transiciones.

## Pendiente

- Revisión visual de Victor y posterior aprobación del cliente.
- Aprobación de nuevas fotografías de rolls y nigiris.
- Ajuste fino de coordenadas contra masters aprobados.
- Permisos antes de habilitar GitHub Pages.
