---
name: sushi-experience-director
description: Dirige producto, identidad, contenido gastronómico, recorrido de scroll, menú, interacción y media de Sushi Page. Se activa cuando el trabajo afecta narrativa, platos, imágenes, anotaciones, motion, arquitectura de secciones o las vistas dinámica y estática del menú.
---

# Sushi Page Experience Director

Protege la coherencia de la experiencia y la exactitud del producto sin convertir la landing en una secuencia de efectos desconectados.

## Fuentes

Antes de decidir o implementar, lee:

1. `PROJECT.md` para estado, alcance y autorización.
2. `planning-docs/product-brief.md` para resultado, audiencias y límites.
3. `planning-docs/content-and-source-inventory.md` para platos, precios, ingredientes, canales, procedencia y permisos.
4. `planning-docs/experience-blueprint.md` para recorrido, jerarquía, responsive y motion.
5. `brand/README.md` y el futuro design system para identidad aprobada.
6. `planning-docs/development-roadmap.md` cuando cambie una fase o gate.

## Invariantes

- El producto real es protagonista; la interfaz lo explica y eleva.
- No inventes platos, ingredientes, técnicas, precios, promociones, handles, horarios, ubicaciones o testimonios.
- Las líneas, puntos y etiquetas sobre una fotografía corresponden a componentes confirmados y siguen siendo legibles sin movimiento.
- El menú dinámico y el estático consumen la misma fuente de datos y ofrecen contenido equivalente.
- El switch cambia presentación, no disponibilidad, orden factual o precio.
- La landing puede ser cinematográfica, pero siempre conserva salida directa hacia menú y contacto.
- Móvil se traduce a un recorrido táctil propio; no se limita a reducir desktop.
- Conserva teclado, foco, `prefers-reduced-motion`, pausa de loops y ausencia de strobing.
- Instagram y WhatsApp son enlaces externos en v1; no simules estados live, disponibilidad o pedidos.
- No publiques assets de terceros sin permiso documentado.

## Dirección

Compara como máximo cuatro enfoques por coherencia con el material real, diferenciación, legibilidad, capacidad editorial, costo de media, rendimiento y accesibilidad. Recomienda una dirección principal; conserva las demás como exploraciones, no como estilos simultáneos.

Cada sección debe justificar su existencia mediante una de estas funciones:

1. identificar el negocio;
2. construir deseo por el producto;
3. explicar ingredientes, técnica o variedad;
4. facilitar consulta del menú;
5. dirigir a contacto.

Si una escena no cumple una función, se retira o combina.

## Menú

Antes de diseñar una escena, confirma nombre, categoría, descripción, ingredientes, precio, moneda, foto y fuente. Define primero el comportamiento del plato con menor y mayor cantidad de contenido para evitar una composición que solo funcione con el ejemplo ideal.

La vista dinámica debe probarse con scroll hacia ambos sentidos, selección directa, teclado, táctil, cambio de viewport y reduced motion. La vista estática debe poder consultarse con rapidez sin ejecutar la experiencia dinámica.

## Entrega

Para una fase de concepto, entrega decisiones, placeholders explícitos y un prototipo revisable. Para implementación, aplica Ponytail, reutiliza el stack, prueba un vertical slice y verifica desktop, tablet, teléfono, teclado y movimiento reducido antes de escalar. Actualiza solo las fuentes cuyo estado cambió.

