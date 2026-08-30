# Sushi Page — Experience Blueprint

**Estado:** alineado con `RYŌ · El toque final`; secuencia audiovisual V2 y preview conceptual del menú conectadas · **Última actualización:** 30.08.2026

Este documento define la arquitectura de información. La dirección visual y el storyboard se revisan en el [entregable creativo HTML](../deliverables/design/ryo-unboxed-creative-direction.html); los keyframes y el contrato de movimiento se revisan en el [sistema visual V1](../deliverables/design/ryo-unboxed-visual-system-v1.html). [`../RealizeDesign.md`](../RealizeDesign.md) conserva su índice operativo.

## Mapa del sitio

```text
/
├── navegación
├── hero
├── caja cerrada y apertura
├── rolls destacados
├── anatomía
├── cierre editorial
├── RYŌ en casa · bento de servicio y contacto
├── 06 · exploración del menú · Interactivo / Tradicional
└── contacto + footer

/menu
├── navegación + switch dinámico/estático
├── categorías
├── platos
└── Instagram / WhatsApp
```

## Landing · secuencia propuesta

### 0 · Navegación

Marca o nombre y CTA. Debe permanecer clara sobre composiciones visuales variables. En escritorio usa enlaces lineales; en tablet y móvil se transforma en un panel curvo marfil inspirado en la referencia aportada, construido con el sistema visual RYŌ y sin introducir una librería de componentes adicional.

### 1 · Hero

La caja azul cerrada funciona como portal editorial y conserva el peso visual dominante del primer viewport. El texto ocupa aproximadamente el 40% del encuadre en escritorio con la promesa aprobada `El corte es nuestro. El toque final es tuyo.`, el apoyo `Alta cocina japonesa, preparada para disfrutarse donde tú elijas.` y la indicación mínima `Desliza para abrir`. WhatsApp permanece en la navegación; no se repite como CTA dentro del hero. En móvil la caja se acerca, el espacio superior se comprime y el contador aparece después del primer gesto. El primer frame identifica Ryo Sushi incluso antes de que comience la animación.

### 2 · Apertura

La caja se abre y presenta el interior. El contexto parte de fuentes públicas verificadas: sushi de autor, preparado para disfrutarse en casa, solo delivery y pick up.

### 3 · Rolls destacados

Cuatro platos comparten una única pose de anatomía frente a la caja abierta: Playboy, Yuzu, Koga Explosion y Sei Exclusive, seleccionados a partir de fotografías aportadas por Victor. El orden parte del endpoint K17 / Playboy del video de apertura y retrocede hasta Sei. El cambio de roll ocurre como transición entre imágenes controladas, no como cuatro videos separados.

### 4 · Presentación del roll

Cada roll ocupa la misma pausa frontal, sostenido por palillos naturales, con caja lateral abierta al fondo. Cada imagen tiene un mapa propio de puntos y líneas para sus ingredientes confirmados. El nombre aparece arriba a la derecha, los ingredientes en casillas translúcidas con separación amplia y la descripción general en una casilla inferior. Solo el conector del ingrediente explorado aparece mediante hover, foco o toque: una línea dorada con base oscura se dibuja desde un sello circular independiente, de anillos concéntricos, pulso sutil e índice numérico. El sello se superpone como HTML para conservar su círculo real aunque el SVG de líneas se adapte a un encuadre 16:9. En tablet las casillas forman una banda horizontal táctil con controles anterior/siguiente. En teléfono, la fotografía protagonista comienza junto al navbar, título, puntos e imagen comparten el mismo marco y se muestran cuatro ingredientes prioritarios —principal más tres— con rotación automática; el resto queda resumido en la ficha inferior y un selector `01–04` permite saltar entre rolls. La imagen parte ampliada sobre el logo de la caja y hace zoom-out por transformación de página hasta la anatomía, antes de volver a acercarse para el cierre. Durante la anatomía móvil, el frame y sus capas se desplazan juntos `8vw` hasta un centro compartido en `58vw`; entrada, apertura y cierre vuelven al centro físico del viewport. Esta escena de landing no muestra precio; el precio permanece disponible en el menú.

### 5 · Experiencia

Después de la presentación final de Sei, el clip de salida aportado por Victor ejecuta el retorno de K17 / Playboy y el cierre. La interfaz desaparece, una línea dorada desciende por el centro, dos puertas con el patrón de arcos RYŌ cierran desde los laterales y el título `RYŌ · En casa` entra de forma enmascarada. El panel cerrado atraviesa el límite de la escena al liberar el scroll hacia la información.

La sección siguiente usa una composición bento: caja cerrada, modalidad `Solo delivery y pick up`, título `La experiencia continúa cuando la caja se cierra.`, CTA `Pide por WhatsApp` e Instagram `@ryomcbo`. El número verificado permanece detrás del enlace y no se expone como texto en la interfaz. No muestra horarios, pagos, ubicación ni otros campos pendientes. En desktop la caja ocupa la celda visual protagonista; en tablet se reorganiza en dos columnas y en móvil pasa a una secuencia lineal.

La caja permanece inmóvil durante la lectura porque el video se sostiene en su último frame cerrado. El cambio factual de Sei hacia el K17 / Playboy del clip de salida se resuelve con una disolución de producto; una continuidad exacta de roll requerirá reemplazar únicamente el inicio de ese clip. Esta revisión conserva la arquitectura sin introducir otro video.

### 6 · Exploración del menú

Después de `RYŌ en casa`, una sección marfil presenta dos accesos equivalentes a la misma carta: `Menú interactivo` para recorrer cada plato como una escena visual y `Menú tradicional` para consultarlos como catálogo. El encabezado parte de la idea `Ya viste el detalle. Ahora descubre el resto.` y pide elegir la presentación favorita sin introducir testimonios ni afirmaciones no verificadas.

Un stinger breve introduce la ruta `/menu`: dos paneles navy con el patrón real de arcos RYŌ se separan desde una junta dorada central. El wordmark funciona como sello antes de retirarse. No se repite durante la exploración ni bloquea el acceso; en reduced motion se muestra directamente el contenido.

La ruta ofrece `Explorar / Lista` sobre una sola fuente de platos. En esta etapa la selección se limita a sushi rolls y nigiris. `Explorar` presenta un plato grande, navegación anterior/siguiente, selección directa y datos disponibles. `Lista` muestra el mismo contenido como catálogo escaneable. Ningún plato sin fotografía recibe una imagen inventada: el patrón ocupa temporalmente ese espacio. Otras categorías se evalúan únicamente después de la aprobación del cliente.

Los dos enlaces abren `/menu/` con el modo solicitado en la URL. La ruta se publica como preview conceptual no indexada: identifica sus imágenes conceptuales, mantiene los valores en REF y no se presenta como carta oficial hasta confirmar vigencia y aprobación externa.

### 7 · Contacto

El footer cierra sobre navy con el patrón de arcos RYŌ en baja opacidad y una banda dorada inferior. Contiene la propuesta pública, modalidad, CTA de WhatsApp sin número visible, Instagram `@ryomcbo` y la atribución `Desarrollo por VSU` enlazada a `https://meetvsu.dev`. Horarios, ubicación y métodos de pago no aparecen hasta ser confirmados. WhatsApp funciona como salida principal propuesta y todavía requiere aprobación de jerarquía G2.

## Ritmo del recorrido audiovisual

La timeline conserva hitos temporales para entrada, apertura, cada anatomía, cierre y salida, pero no hace snap entre ellos. Cada tramo traduce su progreso a `currentTime` dentro de una timeline virtual compacta; el seek se agrupa y espera al frame presentado antes de enviar el siguiente objetivo al video. El scrub queda en `0.18` para escritorio, `0.14` para tablet y `0.10` para teléfono. El recorrido asigna aproximadamente `12`, `10` y `8.5` alturas de viewport respectivamente: el gesto produce movimiento perceptible con menos arrastre, sin quitar control sobre las pausas anatómicas. En viewport compacto, el primer gesto que intente atravesar completamente el tramo final vuelve suavemente al inicio del cierre; el siguiente gesto continúa con normalidad. Este checkpoint garantiza que el clip de salida aparezca incluso ante un flick largo, sin convertir el resto del recorrido en secciones con snap. Los tres clips se precargan para reducir pausas al entrar en cada tramo. La fluidez definitiva también depende de que los masters tengan keyframes frecuentes; una exportación con GOP corto o intra-frame es la siguiente optimización de media si se busca scrubbing de precisión editorial.

## Menú dinámico

- El usuario conserva control del avance.
- Cada escena mantiene visible nombre, precio y descripción.
- Las categorías permiten saltos directos.
- El progreso puede expresarse con puntos, índice o mini navegación.
- No bloquear scroll ni exigir precisión de cursor.
- En reduced motion se conserva la jerarquía sin transiciones espaciales.
- La fotografía es opcional; un placeholder de patrón identifica claramente su estado pendiente.
- El número de precio puede mostrarse como referencia del PDF, sin símbolo, mientras moneda y vigencia sigan pendientes.

## Menú estático

- Vista completa por categorías.
- Jerarquía rápida: nombre, descripción, precio y disponibilidad.
- Filtros o búsqueda solo si el tamaño real del menú los justifica.
- El estado del switch puede persistir localmente si aporta valor; no es requisito actual.

## Responsive

| Contexto | Dirección |
|---|---|
| Desktop | Composiciones amplias, escenas sticky selectivas y anotaciones laterales. |
| Tablet | Recorrido sticky de `10` alturas de viewport, scrub de `0.14`, panel curvo de navegación, encuadre de caja que hace zoom-out hacia la anatomía superior, banda táctil con controles y bento de dos columnas. |
| Móvil | Recorrido sticky de `8.5` alturas de viewport, scrub de `0.10`, composición activa de borde a borde, roll protagonista junto al navbar, cuatro ingredientes automáticos, selector directo `01–04`, navegación curva y bento lineal. |
| Reduced motion | Frame final y contenido completo sin parallax, scrub o loops esenciales. |

## Criterios de aceptación del blueprint

- Cada sección responde a una función de negocio o narrativa.
- El contenido requerido existe o está marcado como pendiente.
- El visitante puede llegar al menú y al contacto sin completar la experiencia teatral.
- Las vistas dinámica y estática son equivalentes en contenido.
- Desktop, tablet, móvil y reduced motion tienen comportamiento definido.
- Se identifica un vertical slice de mayor riesgo antes de implementar la página completa.
- La caja azul conecta hero, retícula, menú y CTA sin inventar su comportamiento físico.
- Intro, apertura y cierre pueden resolverse con clips cortos ligados al progreso, mientras platos y contenido se mantienen como capas HTML/CSS controlables.
