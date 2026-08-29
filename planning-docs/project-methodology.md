# Sushi Page — Metodología de trabajo

**Estado:** adoptada · **Última actualización:** 26.08.2026

## Compromiso

No empezamos por una plantilla o una herramienta. Empezamos por entender qué debe conseguir la experiencia, qué material real existe y qué puede publicarse.

La metodología combina cuatro principios:

| Base | Aplicación |
|---|---|
| Design Thinking | Comprender negocio, audiencia y contexto antes de decidir. |
| Double Diamond | Explorar posibilidades y cerrar una dirección explícita. |
| Lean | Construir primero la menor versión que demuestre el concepto completo. |
| Agile | Avanzar mediante entregas visibles, feedback y ajustes controlados. |

## Recorrido

`Descubrir → Priorizar → Diseñar → Implementar → Mejorar`

Cada etapa termina con un entregable revisable y una decisión de avance.

## Formato de las entregas

- Los archivos Markdown documentan operación, fuentes, decisiones, alcance, especificaciones y QA.
- Los entregables de diseño se presentan como HTML navegable en `deliverables/design/`.
- Los entregables de estructura se presentan como HTML navegable en `deliverables/structure/`.
- La implementación vive en `src/`, se exporta estáticamente a `out/` y debe tener una superficie HTML verificable en navegador.
- CSS y JavaScript acompañan al HTML únicamente cuando el resultado visual o interactivo los necesita.

## 1 · Descubrir

**Propósito:** comprender el negocio, su material, audiencia, necesidad y restricciones.

- **Victor aporta:** visión, URLs, imágenes, menú, referencias, objetivos y cualquier permiso disponible.
- **Trabajamos en:** inventario, diagnóstico, procedencia, preguntas abiertas y criterios de éxito.
- **Entregable:** brief e inventario de fuentes.
- **Gate:** existe una necesidad clara, una audiencia identificada, material suficiente y un objetivo verificable.

## 2 · Priorizar

**Propósito:** separar lo esencial de lo accesorio y fijar una primera versión alcanzable.

- **Victor decide:** objetivo principal, contenido prioritario, CTA, nivel de fidelidad, presupuesto y fecha relevante.
- **Trabajamos en:** alcance, arquitectura de información, riesgos, exclusiones y dependencias.
- **Entregable:** product brief y mapa de alcance aprobados.
- **Gate:** están claros resultado, límites, responsabilidades, permisos pendientes y criterio de cierre.

## 3 · Diseñar

**Propósito:** convertir la dirección en una experiencia visible antes de construirla completa.

- **Victor aporta:** feedback consolidado y aprobación de decisiones de negocio y contenido.
- **Trabajamos en:** narrativa, sitemap, wireframes, dirección visual, responsive, motion e interacción clave.
- **Entregable:** dirección, blueprint visual y vertical slice revisables en HTML.
- **Gate:** estructura, ritmo, comportamiento y dirección visual están aprobados para implementación.

## 4 · Implementar

**Propósito:** construir por etapas, integrar contenido real y validar en condiciones representativas.

- **Victor facilita:** contenido final, permisos, accesos necesarios y decisiones que bloquean.
- **Trabajamos en:** código, responsive, accesibilidad, rendimiento, integración y QA.
- **Entregable:** sitio HTML funcional en entorno local o preview privada.
- **Gate:** la solución supera las pruebas acordadas y está autorizada para publicación.

## 5 · Mejorar

**Propósito:** publicar, transferir el conocimiento y decidir la evolución con evidencia.

- **Victor confirma:** aprobación final, propiedad de cuentas y recepción de accesos.
- **Trabajamos en:** lanzamiento, verificación, documentación y backlog real.
- **Entregable:** sitio publicado, reporte e inventario operativo.
- **Gate:** el alcance original está aceptado y cualquier evolución comienza como una nueva prioridad.

## Reglas de colaboración

1. **Una voz:** el feedback llega consolidado por Victor.
2. **Revisiones con propósito:** cada cambio se relaciona con objetivo, audiencia o requisito aprobado.
3. **Cambios visibles:** una nueva página, función o dirección se evalúa por alcance, costo y calendario.
4. **Aprobación por gate:** reabrir una decisión obliga a revisar el trabajo dependiente.
5. **Tecnología proporcional:** se elige la solución más sencilla que preserve el resultado.
6. **Mejora con evidencia:** las ideas futuras se registran; no se implementan por inercia.

## Evidencia mínima por fase

- Descubrimiento: fuentes, fechas, permisos y preguntas.
- Diseño: blueprint, estados, breakpoints y aprobación.
- Implementación: lint, build, consola y recorrido funcional.
- QA: capturas, viewports, teclado, reduced motion, contenido y defectos.
- Lanzamiento: URL, HTTPS, enlaces, metadata, rollback y aceptación.
