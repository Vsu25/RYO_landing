# Sushi Page — Project Control

> Punto de entrada operativo. Resume el estado y enlaza las fuentes oficiales; no sustituye sus especificaciones.

## Estado actual

- **Fase:** 4 · Reconstrucción audiovisual de la landing.
- **Estado:** la landing fue rediseñada y verificada localmente como una escena sticky continua controlada por scroll: entrada y giro editorial de la caja, apertura audiovisual, cuatro anatomías en orden, retorno, cierre y experiencia final. Se generaron dos clips Veo 3.1 y se publican solo sus tramos visualmente fieles.
- **Objetivo inmediato:** publicar la nueva landing mediante un allowlist de GitHub Pages sin exponer los assets conceptuales del menú y revisar el ritmo final con Victor en la URL pública.
- **Bloqueo actual:** ninguno para continuar la implementación local. La publicación del menú todavía depende de aprobación externa, vigencia editorial y permiso de uso de sus masters conceptuales.
- **Última actualización:** 28.08.2026.

## Próxima decisión

Revisar con Victor el ritmo, la fidelidad y la densidad informativa de la landing scroll-reactive ya publicada; el menú se retoma después de aprobar sus imágenes.

**Salida esperada:** landing audiovisual estable en producción y lista corta de ajustes de polishing; el menú permanece local hasta su revisión específica.

## Fuentes oficiales

| Área | Fuente | Autoridad |
|---|---|---|
| Reglas del repositorio | [`AGENTS.md`](AGENTS.md) | Obligatoria para todo trabajo. |
| Estado, alcance y decisiones | [`PROJECT.md`](PROJECT.md) | Panel central. |
| Entregable creativo | [`deliverables/design/ryo-unboxed-creative-direction.html`](deliverables/design/ryo-unboxed-creative-direction.html) | Dirección de arte, storyboard y producción audiovisual revisables. |
| Sistema visual V1 | [`deliverables/design/ryo-unboxed-visual-system-v1.html`](deliverables/design/ryo-unboxed-visual-system-v1.html) | Keyframes, endpoints, continuidad y contrato de clips en revisión. |
| Transición, menú y footer V1 | [`deliverables/design/ryo-stinger-footer-menu-v1.html`](deliverables/design/ryo-stinger-footer-menu-v1.html) | Stinger, vertical slice con fuente única y cierre de contacto en revisión. |
| Landing pública | [`website/index.html`](website/index.html) · <https://vsu25.github.io/RYO_landing/> | Producción estática de cuatro actos; el menú permanece congelado hasta aprobar fotografías. |
| Plan audiovisual vigente | [`reports/2026-08-28-ryo-box-studio-and-audiovisual-plan.md`](reports/2026-08-28-ryo-box-studio-and-audiovisual-plan.md) | Secuencia lateral, masters actuales y contrato simplificado de video/imagen. |
| Guía fotográfica | [`deliverables/design/ryo-photo-capture-guide.html`](deliverables/design/ryo-photo-capture-guide.html) | Shot list, mediciones, logo lock, rolls, nigiris y video test. |
| Índice de diseño | [`RealizeDesign.md`](RealizeDesign.md) | Estado y decisiones duraderas del entregable creativo. |
| Visión de producto | [`planning-docs/product-brief.md`](planning-docs/product-brief.md) | Resultado, audiencia, recorridos y límites iniciales. |
| Metodología | [`planning-docs/project-methodology.md`](planning-docs/project-methodology.md) | Etapas, gates y colaboración. |
| Fuentes y contenido | [`planning-docs/content-and-source-inventory.md`](planning-docs/content-and-source-inventory.md) | Registro de material, datos, procedencia y permisos. |
| Recorrido | [`planning-docs/experience-blueprint.md`](planning-docs/experience-blueprint.md) | Arquitectura de información y comportamiento propuesto. |
| Roadmap | [`planning-docs/development-roadmap.md`](planning-docs/development-roadmap.md) | Secuencia de ejecución y criterios de avance. |
| Técnica | [`planning-docs/technical-spec.md`](planning-docs/technical-spec.md) | Guardrails y decisiones técnicas; todavía preliminar. |
| Identidad | [`brand/README.md`](brand/README.md) | Estado y reglas de los assets aprobados. |
| Referencias de Ryo Sushi | [`references/ryo-sushi/README.md`](references/ryo-sushi/README.md) | Material externo, sin autoridad automática para publicación. |

Ante una contradicción prevalece la fuente especializada más reciente y aprobada. Si cambia intención, alcance, contenido gastronómico, marca o derechos de uso, se eleva a Victor antes de implementar.

## Resultado del proyecto

Crear una experiencia web de portfolio alrededor de Ryo Sushi con dos recorridos conectados:

1. **Landing scrolling:** presenta el negocio, su personalidad, productos destacados y una narrativa visual memorable; termina en Instagram o WhatsApp.
2. **Página de menú:** muestra inicialmente una selección de sushi rolls y nigiris y permite alternar entre una presentación dinámica, editorial e interactiva y una vista estática, directa y escaneable. El catálogo completo se evaluará después de la aprobación del cliente.

La experiencia debe utilizar fotografías reales disponibles, explicar ingredientes confirmados mediante puntos y líneas cuando aporte claridad y mostrar nombre, precio y descripción de cada plato sin duplicar datos.

## Alcance inicial

### Landing

- Navegación persistente hacia caja, rolls, anatomía, experiencia y contacto.
- Hero de alto impacto.
- Secciones editoriales para negocio, producto, preparación o ingredientes y platos destacados.
- Recorrido de scroll con movimiento proporcional, versión móvil específica y alternativa para `prefers-reduced-motion`.
- Cierre con CTA verificado hacia Instagram o WhatsApp.
- La caja azul de presentación conecta hero, apertura, producto y conversión.

### Menú

- Ruta independiente.
- Switch visible entre modo dinámico y modo estático.
- Una sola fuente de datos para ambas vistas.
- Categorías, platos, ingredientes, descripciones, precios y fotografía cuando exista.
- Navegación accesible por teclado y táctil.

### Fuera de alcance hasta nueva decisión

- Pedidos, carrito, pagos o checkout.
- CMS, base de datos, autenticación o panel de administración.
- Integración con APIs de Instagram o WhatsApp.
- Contenido, precios o recetas inventados.
- Redistribución de material de marca o terceros fuera de la landing autorizada.
- Stack definitivo antes de aprobar el blueprint y el vertical slice.

## Estructura del repositorio

| Ruta | Responsabilidad |
|---|---|
| `brand/` | Sistema visual y assets aprobados o producidos para el proyecto. |
| `deliverables/design/` | Dirección y exploraciones de diseño revisables en HTML. |
| `deliverables/structure/` | Wireframes y arquitectura visible en HTML cuando se produzcan. |
| `planning-docs/` | Briefs, inventarios, blueprints, especificaciones y roadmap. |
| `references/` | Fuentes externas con procedencia; no son assets de producción por defecto. |
| `reports/` | QA, auditorías y evidencia visual fechada. |
| `.agents/skills/` | Procedimientos reutilizables propios del proyecto. |
| `website/` | Landing estática de producción y prototipo interno del menú congelado. |

No se crean paquetes, servicios o capas adicionales sin una necesidad aprobada.

## Backlog priorizado

### Ahora

1. Evaluar y pulir el recorrido público de cuatro actos del landing.
2. Revisar los seis nuevos masters conceptuales sin integrarlos todavía al menú.
3. Mantener congelado el menú interactivo hasta aprobar esas fotografías.
4. Registrar observaciones obtenidas sobre la URL de producción.
5. Mantener el despliegue de GitHub Pages limitado a `website/` y sin backend.

### Después del inventario

1. Convertir la dirección aprobada en design system.
2. Producir el clip corto de apertura, capas de caja/platos y fotografías maestras.
3. Cerrar el modelo de datos y las vistas `Explorar / Lista` del menú.
4. Aprobar un vertical slice responsive antes de producir todas las secciones.
5. Cerrar stack, arquitectura y presupuesto de rendimiento.

### Durante implementación

1. Construir foundation mínima.
2. Implementar vertical slice y validarlo en desktop, tablet, móvil y reduced motion.
3. Completar landing y menú reutilizando los patrones aprobados.
4. Ejecutar QA funcional, visual, accesible, responsive, de rendimiento y contenido.
5. Publicar preview; producción requiere aprobación final y permisos resueltos.

## Decisiones

| Fecha | Decisión | Motivo | Estado |
|---|---|---|---|
| 26.08.2026 | Adoptar la metodología y estructura operativa de Personal Space como base adaptada. | Conservar disciplina de fuentes, gates y verificación sin arrastrar contenido específico del proyecto anterior. | Aplicada |
| 26.08.2026 | Usar `PROJECT.md` como panel central y dos skills locales para coordinación y dirección de experiencia. | Mantener una entrada clara y procedimientos reutilizables. | Aplicada |
| 26.08.2026 | Separar referencias, identidad, planificación, reportes y aplicación. | Evitar que material externo o exploratorio se confunda con assets aprobados o código de producción. | Aplicada |
| 26.08.2026 | Posponer el scaffold técnico hasta cerrar fuentes, blueprint y vertical slice. | La tecnología debe responder al recorrido y no definirlo prematuramente. | Aprobada para la fase actual |
| 26.08.2026 | Mantener una sola fuente de datos para las vistas dinámica y estática del menú. | Evitar divergencias en platos, ingredientes, precios y disponibilidad. | Aprobada como invariante |
| 26.08.2026 | Tratar el material público de Ryo Sushi como referencia hasta confirmar permiso de publicación. | Preservar procedencia, atribución y uso responsable en el portfolio. | Cumplida para la landing el 28.08.2026 |
| 26.08.2026 | Cerrar G0 y avanzar a descubrimiento sin crear todavía la aplicación. | La estructura, navegación documental, skills, enlaces y seguridad básica fueron verificados. | Aplicada |
| 26.08.2026 | Corregir el nombre del negocio a Ryo Sushi y registrar `@ryomcbo`. | Victor confirmó el nombre y aportó el perfil oficial. | Aplicada |
| 26.08.2026 | Adoptar el menú del 31.07.2026 como contexto visual rector, pendiente de confirmar vigencia editorial. | El PDF define de forma consistente paleta, tipografía, marcos, textura, fotografía y jerarquía. | Aplicada para diseño |
| 26.08.2026 | Proponer RYŌ Unboxed y la caja azul como objeto central del recorrido. | El packaging conecta identidad, entrega a domicilio, producto y menú en una sola metáfora. | En revisión G2 |
| 26.08.2026 | Resolver el vertical slice con video corto de apertura más capas HTML/CSS antes de 3D, WebGL o video largo. | Mantiene fidelidad en el gesto y permite controlar cada plato, breakpoint, texto y estado de movimiento. | Recomendación para aprobación |
| 26.08.2026 | Usar negro absoluto, mesa premium mate y luz cenital como atmósfera audiovisual de RYŌ Unboxed. | Convierte la caja azul en el único foco de atención y refuerza la experiencia dark kitchen. | Dirección base acordada; G2 en revisión |
| 26.08.2026 | Ordenar la landing como caja cerrada, apertura, rolls, anatomía, experiencia, “Sobre nosotros”, menú y cierre. | El producto y la experiencia demuestran valor antes de explicar la marca. | Dirección base acordada; copy pendiente |
| 26.08.2026 | Presentar diseño, estructura e implementación como entregables HTML; reservar Markdown para control operativo. | Victor necesita revisar visuales y comportamiento en navegador, mientras la documentación de gestión permanece ligera. | Aplicada |
| 26.08.2026 | Descartar el patrón seigaiha propuesto y usar como fuente los arcos concéntricos superpuestos aportados por Victor. | La nueva captura muestra la geometría real del recurso visual de RYŌ. | Corrección aplicada; reconstrucción pendiente |
| 26.08.2026 | Registrar `+58 422-0382261` como WhatsApp verificado de Ryo Sushi. | Victor aportó directamente el dato para el proyecto. | Verificado; jerarquía de CTA pendiente |
| 27.08.2026 | Construir el sistema visual V1 con masters de caja, cuatro endpoints de rolls, nigiris y cierre antes de producir video. | Las parejas de inicio y fin permiten validar continuidad, fidelidad y composición con menor costo que generar todos los clips de una vez. | Implementado como concepto; aprobación pendiente |
| 27.08.2026 | Tratar el wordmark exterior e interior como parte física invariante de la caja y no como texto generativo. | La forma propia de RYŌ, su orientación y su acabado deben provenir de fotografía o archivo oficial para conservar fidelidad total. | Aprobada; captura y archivo oficial pendientes |
| 27.08.2026 | Usar únicamente rolls especiales y nigiris documentados en el menú para los visuales de producto. | Evita que una composición atractiva cambie ingredientes, cantidad, topping o apariencia del plato real. | Aplicada al inventario; masters fotográficos pendientes |
| 28.08.2026 | Incorporar las siete fotografías físicas de caja como SRC-014 y producir tres masters de estudio para K00, K02 y K08 antes de abordar video. | Fija mejor geometría, arte frontal, material, cierre, apertura e interior, y permite decidir con imágenes sin multiplicar clips prematuros. | Implementado como concepto; aprobación y permiso pendientes |
| 28.08.2026 | Usar Sei Exclusive, Koga Explosion, Yuzu y Playboy en una única pose lateral de anatomía, y limitar el video a abrir/tomar y devolver/cerrar. | Mantiene el producto como foco, permite callouts HTML precisos y evita cuatro clips redundantes o un video largo difícil de controlar con scroll. | Implementado como seis keyframes conceptuales; aprobación pendiente |
| 28.08.2026 | Reservar K12–K15 como únicas tomas anatómicas de roll protagonista y usar K16/K17 solo como puentes estáticos de toma y retorno. | Evita confundir continuidad física con descripción de producto; las etiquetas usan únicamente ingredientes confirmados de SRC-002. | Implementado en sistema visual V1.1; aprobación pendiente |
| 28.08.2026 | Diseñar cada anatomía con coordenadas propias, nombre arriba a la derecha, ingredientes conectados en una columna lateral y descripción general inferior; omitir el precio en esta escena de landing. | Cada roll tiene una estructura visual diferente y necesita anotaciones precisas sin competir con el producto; el precio permanece reservado para el menú. | Dirección aprobada en sistema visual V1.3; calibración fina pendiente |
| 28.08.2026 | Mantener las casillas anatómicas visibles y translúcidas, con separación amplia; revelar solo la línea y el punto del ingrediente explorado mediante hover o foco. | Reduce ruido, conserva descubrimiento y vincula inequívocamente cada ingrediente con su casilla sin excluir teclado. | Aprobada y aplicada |
| 28.08.2026 | Proponer K11 como pausa editorial de Experiencia después de devolver el último roll y aplazar K10 hasta el cierre final del recorrido. | Reutiliza la caja abierta como mesa, mantiene continuidad visual y evita producir un tercer clip. | Implementado en sistema visual V1.4; aprobación pendiente |
| 28.08.2026 | Proponer un stinger de dos paneles con el patrón real RYŌ, menú `Explorar / Lista` y footer marfil con WhatsApp verificado. | Convierte la identidad del menú en transición funcional, conserva una sola fuente de platos y cierra con contacto directo sin backend. | Implementado como prototipo G2; aprobación y contenido completo pendientes |
| 28.08.2026 | Iniciar Foundation con HTML, CSS y JavaScript nativo, sin framework ni GSAP, y mantenerla local hasta resolver permisos. | El vertical slice demuestra landing, anatomía, menú y motion con costo cero y sin adelantar dependencias o publicación. | Base interna aceptada por Victor; aprobación del cliente pendiente |
| 28.08.2026 | Tratar la Foundation como demostración visual previa al cliente, no como producción final. | La prioridad inmediata es comunicar el potencial e impacto del landing; datos definitivos y polishing funcional se consolidan después de la aprobación. | Aplicada |
| 28.08.2026 | Limitar el menú conceptual a sushi rolls y nigiris. | Permite concentrar diseño, fotografía y consistencia sin transcribir o producir categorías que no forman parte de esta etapa. | Aprobada para la presentación inicial |
| 28.08.2026 | Completar el set visual del menú reutilizando los cuatro rolls del landing y produciendo masters nuevos solo para Fuji, Kamasutra, Rendi, Nigiri Tuná, Nigiri Salmón y Pesca Blanca. | Evita duplicar assets aprobados, cubre los seis placeholders reales y mantiene cámara, iluminación y atmósfera coherentes con RYŌ Unboxed. | Implementado como concepto; revisión e integración pendientes |
| 28.08.2026 | Hacer obligatoria la correspondencia entre ID documental, nombre editorial, ID técnico y asset antes de integrar platos al menú. | Evita identificar platos por filenames, perder acentos o conectar una imagen al roll o nigiri equivocado entre `Explorar` y `Lista`. | Aplicada en `sushi-project-manager`; implementación del menú pendiente |
| 28.08.2026 | Mantener el despliegue fuera de Vercel y resolver más adelante una preview estática tipo Pages. | El entregable actual es diseño navegable y no necesita servicios adicionales ni arquitectura de aplicación. | Dirección acordada; proveedor exacto pendiente de confirmación |
| 28.08.2026 | Usar GitHub Pages y llamar `RYO_landing` al repositorio. | Conserva una salida estática, simple y sin costo de infraestructura. | Implementada; landing publicada desde `website/` |
| 28.08.2026 | Congelar el menú interactivo hasta aprobar las nuevas fotografías de rolls y nigiris. | Evita pulir una experiencia cuya composición depende de assets todavía en revisión. | Aplicada |
| 28.08.2026 | Reordenar el landing en cuatro actos públicos: caja/apertura, rolls, anatomía y Experiencia/contacto. | Evita mostrar un menú incompleto y convierte el prototipo en una landing autosuficiente para revisión. | Implementado y publicado; polishing pendiente |
| 28.08.2026 | Autorizar la publicación de la landing y sus derivados web actuales para revisión en producción. | Victor confirmó que el diseño puede publicarse y mantenerse accesible mientras se anotan ajustes. | Autorizada para esta landing; no concede redistribución general de marca o media |
| 28.08.2026 | Incorporar Graphify como skill local e índice derivado del proyecto. | Facilita consultar relaciones entre código, documentos y contenido sin duplicar ni sustituir las fuentes oficiales. | Skill instalada y agentes adaptados; grafo inicial pendiente |
| 28.08.2026 | Incorporar el conjunto oficial de skills GSAP como referencia local de motion. | Permite diseñar y revisar timelines, ScrollTrigger, plugins, frameworks y rendimiento con criterios consistentes sin adelantar la dependencia técnica. | Ocho skills instaladas y agentes adaptados; paquete `gsap` diferido hasta G3 |

## Criterio de cierre de una acción

Una acción está cerrada cuando el resultado existe, fue verificado en proporción a su riesgo, respeta fuentes y permisos, y actualiza este panel solo si cambió estado, alcance, prioridad o una decisión material.
