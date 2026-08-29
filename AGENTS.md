# Reglas del proyecto Sushi Page

## Dirección operativa

`PROJECT.md` es el punto de entrada y el registro de estado del proyecto. Todo agente debe consultarlo antes de iniciar una fase, incorporar una funcionalidad, modificar la estructura del repositorio o tomar una decisión que afecte alcance, costo, arquitectura, contenido, marca o más de un entregable.

La skill `sushi-project-manager` es obligatoria cuando el trabajo implique:

1. Iniciar o cerrar una fase o gate.
2. Incorporar una funcionalidad, dependencia, servicio, documento rector o área nueva.
3. Elegir entre enfoques con efectos distintos en alcance, costo, mantenimiento o calendario.
4. Reorganizar, mover, consolidar o retirar archivos.
5. Resolver contradicciones entre fuentes, contenido o decisiones existentes.

La skill `sushi-experience-director` es obligatoria cuando el trabajo afecte identidad, narrativa, arquitectura de la landing, menú, contenido gastronómico, motion, interacción, imágenes o dirección visual.

No hace falta activar estas skills para cambios pequeños, locales y reversibles cuyo alcance y aceptación ya estén claros.

Los agentes organizan y recomiendan; no amplían el alcance ni sustituyen la aprobación de Victor cuando una decisión introduce costos, compromisos externos, uso público de material de terceros, cambios de marca o una dirección de producto nueva.

## Fuentes y documentación

1. Cada tema tiene una sola fuente oficial; enlaza esa fuente en vez de duplicarla.
2. `PROJECT.md` resume estado, prioridades y decisiones, pero no reemplaza las especificaciones.
3. Usa `planning-docs/` para decisiones y especificaciones, `references/` para consulta externa, `reports/` para resultados fechados y `brand/` para identidad aprobada.
4. Amplía un documento existente cuando la responsabilidad no cambie. Crea otro archivo solo si tendrá una responsabilidad estable y diferente.
5. Distingue siempre entre `propuesto`, `en revisión`, `aprobado`, `implementado`, `verificado` y `descartado`.
6. Registra decisiones duraderas y evidencia; no conviertas conversaciones o detalles pasajeros en documentación permanente.
7. Los reportes usan fecha ISO al inicio: `YYYY-MM-DD-tema-qa.md`.
8. Una afirmación sobre ingredientes, precios, tamaños, promociones, horarios, ubicación o canales debe apuntar a una fuente verificable y llevar fecha de consulta.

## Grafo de conocimiento

Graphify es un índice derivado para navegar relaciones entre código, documentación y contenido; no reemplaza `PROJECT.md` ni las fuentes oficiales.

1. Usa la skill `graphify` cuando la solicitud trate sobre arquitectura, relaciones entre archivos, dependencias o contenido transversal del proyecto.
2. Si existe `graphify-out/graph.json`, consulta primero `graphify query "<pregunta>"`; usa `graphify path "<A>" "<B>"` para relaciones y `graphify explain "<concepto>"` para un elemento concreto.
3. Usa `graphify-out/GRAPH_REPORT.md` solo para revisiones amplias cuando una consulta acotada no sea suficiente.
4. Si el grafo existe, ejecuta `graphify update .` después de cambios materiales en código, documentación o estructura que alteren sus relaciones.
5. Si el grafo contradice una fuente oficial, prevalece la fuente; registra la corrección y actualiza el grafo en vez de tratar la inferencia como verdad.

## Formato de entregables

Markdown se reserva para control operativo: reglas, estado, metodología, inventarios, decisiones, especificaciones y reportes.

Los entregables que Victor debe experimentar o aprobar visualmente se presentan en HTML y deben poder abrirse en el navegador:

1. Dirección y exploraciones de diseño en `deliverables/design/`.
2. Arquitectura visible, wireframes y prototipos estructurales en `deliverables/structure/`.
3. Implementaciones funcionales en `website/`, con HTML como superficie entregable y CSS o JavaScript solo cuando sean necesarios.

Un Markdown puede indexar un entregable HTML o registrar su estado, pero no sustituirlo ni duplicar su contenido visual.

## Material de Ryo Sushi y derechos de uso

El material de Instagram, menú y otras fuentes externas se archiva primero en `references/ryo-sushi/` con URL, fecha, tipo, contexto y estado de permiso.

1. No inventes platos, ingredientes, precios, promociones, handles, teléfonos, ubicación ni horarios.
2. No alteres un precio o descripción sin registrar su fuente y fecha.
3. No publiques imágenes, logos, textos o piezas gráficas de terceros hasta confirmar autorización, licencia o una base de uso válida para el portfolio.
4. Conserva el original como referencia y produce derivados web en `brand/` o `public/media/` solo después de su aprobación.
5. La inspiración puede aportar estructura, atmósfera o comportamiento; la interfaz final debe tener una dirección propia y no presentarse como una afiliación no confirmada.

## Integridad del menú

El menú dinámico y el menú estático deben consumir una misma fuente de datos. El switch cambia la presentación, no duplica ni contradice contenido.

- Cada plato necesita nombre, categoría, descripción literal o aprobada, precio, moneda, fuente y estado.
- Los componentes visuales o llamadas sobre el roll deben corresponder a ingredientes confirmados.
- Si falta información, usa un estado pendiente explícito; no completes con suposiciones.
- La experiencia dinámica debe conservar acceso por teclado, lectura clara y una alternativa equivalente con movimiento reducido.

## Disciplina de costos

El proyecto empieza como pieza de portfolio y debe minimizar costos recurrentes.

1. Prefiere hosting estático, planes gratuitos y servicios sin costo recurrente mientras cubran el uso real.
2. No añadas dependencia, SaaS, base de datos, CMS, servicio de correo, analytics o plan de pago sin una necesidad actual y aprobación explícita.
3. La landing y el menú deben permanecer desplegables sin backend mientras no exista un requisito real de administración, pedidos o datos en vivo.
4. WhatsApp e Instagram comienzan como enlaces externos verificables; no se integran APIs sin necesidad.
5. Documenta el límite de cualquier servicio gratuito y el punto concreto en el que tendría sentido pagar.

## Ponytail automático para implementación

Ponytail es obligatorio en modalidad `full` al inicio de cualquier tarea que implique código o una decisión técnica de implementación.

Antes de proponer arquitectura, seleccionar librerías, crear componentes, definir frontend, implementar animaciones, editar archivos de aplicación o escribir código:

1. Carga y aplica la skill `ponytail`.
2. Comprende el requisito y revisa el flujo y los archivos afectados.
3. Reutiliza lo existente antes de crear algo nuevo.
4. Prefiere HTML, CSS y APIs nativas del navegador antes que abstracciones o dependencias.
5. Escribe la solución mínima que preserve por completo el resultado visual solicitado.

Ponytail simplifica la implementación, no la intención de diseño. No elimina motion, interacción, video, accesibilidad, responsive, seguridad, validación ni características solicitadas. No se activa durante exploración creativa pura; si una tarea combina creatividad e implementación, se aplica desde la primera decisión técnica.

Al finalizar cambios importantes, usa `ponytail-review`. Usa `ponytail-audit` solo cuando se solicite una auditoría completa o al cerrar un hito relevante.

## Motion técnico y GSAP

Las skills oficiales de GSAP están disponibles como referencia de implementación; su presencia no convierte GSAP en dependencia aprobada del sitio.

1. Empieza por `gsap-core` para cualquier propuesta o revisión con GSAP y carga solo las skills complementarias que correspondan: `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-react`, `gsap-frameworks` o `gsap-performance`.
2. Conserva CSS y APIs nativas para transiciones simples. Evalúa GSAP cuando hagan falta secuencias coordinadas, control de reproducción, scroll ligado al progreso o valores dinámicos que reduzcan complejidad neta.
3. Toda implementación debe incluir comportamiento responsive, alternativa equivalente para `prefers-reduced-motion`, selectores acotados y cleanup de tweens, timelines y ScrollTriggers.
4. Prioriza transforms y opacidad; evita animar propiedades de layout cuando exista una equivalencia visual y verifica el resultado en dispositivos de menor capacidad.
5. No instales el paquete `gsap` ni un plugin en la aplicación antes de que el vertical slice demuestre la necesidad y se apruebe la dependencia técnica.

## Criterio general de cierre

Una acción está cerrada cuando el resultado solicitado existe, fue verificado en proporción a su riesgo, respeta las fuentes oficiales y deja actualizado `PROJECT.md` solo si cambió estado, alcance, prioridad o una decisión material.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
