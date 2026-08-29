# RYŌ Unboxed — caja de estudio y plan audiovisual

**Fecha:** 28.08.2026 · **Revisión:** 29.08.2026 · **Estado:** secuencia V2 publicada y verificada · **Fuentes:** SRC-014, SRC-015 y SRC-017

## Decisión

Usar las siete fotografías nuevas como un único set de evidencia física y producir primero tres imágenes maestras coherentes, no siete retoques aislados:

1. `K00` caja cerrada, entrada y hero.
2. `K02` caja abierta, revelación.
3. `K08` caja cerrada horizontal, transición hacia “Sobre nosotros”.

La revisión del 29.08.2026 incorpora tres videos propios producidos y aportados por Victor: intro centrado a diagonal, apertura/toma de K17 / Playboy y retorno/cierre. Los originales se archivan como SRC-017 y las copias V2 se publican desde `website/public/media/`. Los stills continúan como autoridad para la anatomía controlable.

## Lectura física de la caja

- Formato largo y bajo, con tapa abatible sobre el eje largo.
- Cartón laminado azul cobalto/índigo con brillo semimate y variación visible según la luz.
- Frente ilustrado continuo en línea marfil/dorada, con cierre central y pliegues triangulares laterales.
- Wordmark dorado en el exterior y claro en el interior; ambos forman parte física del empaque.
- Interior del mismo azul, con divisores longitudinales y compartimiento lateral para dos salsas.
- La construcción real conserva pequeños desniveles, bordes y tensiones de cartón que deben seguir presentes después de limpiar polvo, flash y entorno doméstico.

## Masters producidos

| Estado | Archivo | Función | Observación |
|---|---|---|---|
| En revisión | `deliverables/design/media/ryo-box-studio-masters-v1/k00-box-closed-studio-v1.png` | Hero, poster de carga y entrada | Mejor balance entre frente ilustrado, logo y volumen. |
| En revisión | `deliverables/design/media/ryo-box-studio-masters-v1/k02-box-open-studio-v1.png` | Revelación y referencia de apertura | La comida es una reconstrucción conceptual del contenido visible en SRC-014; no identifica un plato del menú. |
| En revisión | `deliverables/design/media/ryo-box-studio-masters-v1/k08-box-horizontal-studio-v1.png` | Cierre y puente editorial | Deja vacío superior e inferior para copy HTML. |

Los tres archivos son PNG de 1672 × 941 px. Fueron creados con el generador integrado de imágenes y archivados dentro del proyecto. No son fotografía documental ni están autorizados para publicación.

## Sistema de eventos de imagen

| ID | Disparo | Imagen | Comportamiento | Reduced motion |
|---|---|---|---|---|
| IMG-01 | Entrada inicial | K00 | Aparece completa; el texto no depende de animación. | K00 inmóvil. |
| IMG-02 | Primer avance | K00, recorte cercano | Push óptico muy corto mediante recorte, sin deformar la caja. | K00 inmóvil. |
| IMG-03 | Fin de apertura | K02 | Sustituye al poster de V01 cuando el clip termina. | K02 directo. |
| IMG-04 | Selección de roll | Endpoint del plato aprobado | Una pieza ocupa el plano de anatomía; etiquetas viven en HTML. | Endpoint directo con lista lineal. |
| IMG-05 | Cambio de ritmo | Nigiris verificados | Composición propia, no inventada desde el contenido de K02. | Imagen fija y contenido completo. |
| IMG-06 | Salida editorial | K08 | Caja centrada; aparece “Sobre nosotros” y luego CTA. | K08 inmóvil. |

## Sistema de eventos de video — V2 implementado

1. **V00 Intro físico:** caja cerrada centrada → giro hasta diagonal cerrada. 8 s, 1920 × 1080.
2. **V01 Apertura física:** diagonal cerrada → apertura → palillos toman K17 / Playboy → hold protagonista. 8 s, 1280 × 720.
3. **Estados de imagen:** Playboy → Yuzu → Koga Explosion → Sei Exclusive. No son clips; son disolvencias cortas controladas por scroll.
4. **V02 Salida física:** K17 / Playboy desciende y regresa → caja se cierra → hold final. 6 s, 1920 × 1080.
5. **Nigiris:** permanecen fuera de esta prueba.

Los tres clips se buscan por `currentTime` desde ScrollTrigger, sin autoplay ni loop. El intro y la apertura empalman en la pose diagonal cerrada; el cierre sostiene su último frame debajo de Experiencia. Los posters y la alternativa de movimiento reducido permanecen disponibles.

## Sistema de eventos de animación de interfaz

- **A01 Luz:** la caída de luz responde al avance con un rango corto; nunca hace pulsos.
- **A02 Etiquetas:** las casillas translúcidas aparecen después del hold; cada línea y punto se revela únicamente al hacer hover o foco sobre su ingrediente.
- **A03 Copy editorial:** entra por opacidad y desplazamiento mínimo; no compite con el empaque.
- **A04 Navegación:** permanece accesible y estable sobre fondos variables.
- **A05 Menú:** el teaser cambia de “mirar” a “consultar”; el contenido factual sigue fuera de la media.
- **A06 Táctil móvil:** sustituye parallax y scrub largo por secuencia vertical de estados discretos.
- **A07 Reduced motion:** elimina scrub, parallax y loops; conserva K00, K02, endpoints y K08 como imágenes completas.

## Prompt maestro de caja

```text
Use case: product-mockup
Asset type: RYŌ Unboxed landing-page keyframe
Primary request: reconstruir meticulosamente la caja física RYŌ documentada en SRC-014 como fotografía editorial de estudio.
Scene/backdrop: vacío negro absoluto y mesa de piedra casi negra, mate, con reflejo corto.
Subject: caja larga y baja de cartón plegado azul cobalto/índigo; conservar proporciones, cierre central, arte frontal, wordmark, pliegues, profundidad y material observados.
Style/medium: fotografía de producto y gastronomía de alta gama, fotorealista y físicamente plausible; no CGI perfecto.
Composition/framing: 16:9, familia de lente 50 mm, upper three-quarter; reservar vacío solo donde la interfaz lo necesite.
Lighting/mood: spot cenital suave y estrecho, caída rápida a negro, fill navy mínimo y rim cálido muy restringido.
Materials/textures: laminado semimate, fibra fina, pliegues y desgaste mínimo creíble; limpiar polvo, huellas, flash y reflejos domésticos.
Text: conservar únicamente las marcas físicas de las referencias; no rediseñar, reescribir ni añadir texto.
Constraints: no alterar geometría, ilustración, escala u orientación de marca; no inventar ingredientes, utilería o fondos.
Avoid: habitación, silla, cables, manos, humo, vapor, neón, clichés japoneses, objeto flotante, espejo, ultra wide, plástico CGI, watermark.
```

Variantes controladas:

- `K00`: cerrada, diagonal suave, 58% del ancho del frame, vacío superior.
- `K02`: usar la foto abierta como autoridad; preservar ángulo, compartimientos, salsas, cantidad y posición visibles; no nombrar el contenido como un plato concreto.
- `K08`: cerrada y horizontal, cámara a 55–58°, pool de luz más pequeño, vacío superior e inferior.

## Gate antes de video

Victor debe aprobar:

1. cuál de K00/K08 define el azul y el nivel de brillo final;
2. si K11 conserva este contenido de caja como contexto suave o espera una caja preparada específicamente para la sesión;
3. medidas de caja, ángulo máximo de tapa y separadores;
4. archivo oficial del wordmark y permiso para usar fotografías, caja, logo y derivados;
5. orden definitivo Playboy → Yuzu → Koga → Sei y fidelidad visible de las cuatro anatomías.

## Revisión — secuencia lateral de rolls

**Fuente de producto:** SRC-015 · **Video:** SRC-017 · **Estado:** ocho keyframes y tres clips integrados

Victor aportó cuatro cortes frontales: Sei Exclusive, Koga Explosion, Yuzu y Playboy. La secuencia anterior de clips independientes se simplifica a un único escenario lateral con dos acciones físicas y cuatro estados de imagen.

### Masters actuales

| ID | Archivo | Función |
|---|---|---|
| K10 | `deliverables/design/media/ryo-roll-anatomy-masters-v1/k10-box-closed-side-start-v1.png` | Inicio y final cerrado. |
| K11 | `deliverables/design/media/ryo-roll-anatomy-masters-v1/k11-box-open-side-anchor-v1.png` | Caja abierta antes y después de los rolls. |
| K12 | `deliverables/design/media/ryo-roll-anatomy-masters-v1/k12-sei-exclusive-anatomy-hold-v1.png` | Sei Exclusive en pausa anatómica. |
| K13 | `deliverables/design/media/ryo-roll-anatomy-masters-v1/k13-koga-explosion-anatomy-hold-v1.png` | Koga Explosion en la misma pose. |
| K14 | `deliverables/design/media/ryo-roll-anatomy-masters-v1/k14-yuzu-anatomy-hold-v1.png` | Yuzu en la misma pose. |
| K15 | `deliverables/design/media/ryo-roll-anatomy-masters-v1/k15-playboy-anatomy-hold-v1.png` | Playboy en la misma pose. |
| K16 | `deliverables/design/media/ryo-roll-anatomy-masters-v1/k16-sei-pickup-midpoint-v1.png` | Still puente: Sei elevado cerca de la caja; no es una toma anatómica. |
| K17 | `deliverables/design/media/ryo-roll-anatomy-masters-v1/k17-playboy-return-midpoint-v1.png` | Still puente: Playboy regresando a la caja; no es una toma anatómica. |

Todos los canvases están normalizados a 1672 × 940 px. En K12–K15 la caja permanece lateral y abierta en el fondo mientras el roll ocupa el primer plano, perpendicular a cámara y sostenido por palillos naturales. K16/K17 acercan el roll a la caja únicamente para explicar toma y retorno. Las etiquetas, líneas, ingredientes, nombre, descripción y precio permanecen fuera de la imagen.

### Prompts de K16 y K17

Ambos stills se produjeron con el generador integrado en modo edición `product-mockup`, usando como invariantes: canvas 16:9, cámara, lente, caja RYŌ, wordmark interior, patrón frontal, compartimientos, mesa, luz, sombras y palillos naturales de los masters de referencia; sin manos, texto añadido, UI, motion blur, props ni ingredientes inventados.

- **K16:** crear el punto medio entre K11 y K12; elevar Sei Exclusive solo unos centímetros sobre su compartimiento, todavía pequeño y cerca de la caja, mientras el corte empieza a girar hacia cámara. Es una etapa de toma, no la pose protagonista.
- **K17:** crear el punto medio entre K15 y K11; bajar Playboy hacia su compartimiento, todavía pequeño y cerca de la caja, mientras el corte empieza a girar fuera de cámara. Es una etapa de retorno, no la pose protagonista.

### Contrato audiovisual simplificado

1. **Entrada física:** caja centrada → diagonal cerrada → apertura → K17 / Playboy protagonista.
2. **Exploración por scroll:** Playboy → Yuzu → Koga → Sei mediante disolución corta; no se mueve caja, cámara ni palillos.
3. **Anatomía:** cada estado sostiene la imagen mientras aparecen callouts HTML correspondientes al plato actual.
4. **Salida física:** la anatomía de Sei se disuelve hacia el K17 / Playboy presente en el clip aportado; el movimiento real regresa el roll y cierra la caja. Esta diferencia se mantiene visible como riesgo residual hasta sustituir el inicio del clip por Sei.
5. **Reduced motion:** caja y cuatro anatomías como imágenes estáticas en el mismo orden; sin scrub ni video esencial.

La producción se resuelve con tres clips cortos —intro, apertura y salida— y cuatro estados intermedios en imágenes. No existe video largo monolítico y las anotaciones no se hornean en media.

### Layout anatómico V1.2

- K12, K13, K14 y K15 usan mapas de coordenadas independientes; no comparten puntos genéricos.
- El nombre del roll ocupa la esquina superior derecha.
- La columna derecha enumera todos los ingredientes confirmados y distingue su función literal en la descripción: relleno, topping, baño o acabado.
- El primer relleno proteico se destaca como “ingrediente principal” a modo de jerarquía editorial propuesta; Victor debe confirmar esa selección.
- La descripción general ocupa una casilla inferior derecha.
- La escena de landing omite precio referencial. Los precios siguen disponibles en la fuente de menú y en la futura página de menú.
- En móvil se retiran las líneas y la misma información pasa debajo de la fotografía en orden lineal.

**Refinamiento V1.3 aprobado:** aumentar el espacio entre casillas, conservarlas visibles con transparencia y ocultar todos los conectores en reposo. Hover o foco revela un único par línea/punto y la casilla gana contraste; cada curva termina en el centro de su borde izquierdo.

**Extensión V1.4 en revisión:** después del retorno, K11 sostiene Experiencia como mesa editorial. El titular y los datos operativos son capas HTML; horarios y pagos permanecen marcados como pendientes. K10 se reserva para el cierre final, sin añadir un tercer clip.

### Prompt de continuidad

```text
Use case: precise-object-edit / compositing
Asset type: RYŌ Unboxed scroll anatomy endpoint
Primary request: conservar la escena lateral de caja abierta como plantilla inmutable y sustituir únicamente el roll sostenido entre palillos.
Composition: 16:9, lente fija 50 mm, caja abierta tres cuartos lateral en el fondo derecho; roll frontal en primer plano izquierdo; palillos naturales en una V idéntica.
Lighting: spot cenital suave, roll en foco, caja ligeramente más suave, negro absoluto y mesa mate.
Constraints: cámara, caja, tapa, wordmark, arte frontal, mesa, sombras, palillos, escala y posición no cambian entre platos; solo cambia la identidad del roll según SRC-015.
Text: ninguna etiqueta dentro de la imagen; todos los datos viven en HTML.
Avoid: ingredientes inventados, cambio de pose, fondo diferente, manos, vapor, humo, neón, props, motion blur, watermark.
```

Los ocho PNG fueron creados con el generador integrado de imágenes. Son derivados conceptuales en revisión y no material documental ni autorizado.
