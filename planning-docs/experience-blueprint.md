# Sushi Page — Experience Blueprint

**Estado:** alineado con RYŌ Unboxed; secuencia audiovisual V2 implementada y Experiencia en revisión G2 · **Última actualización:** 29.08.2026

Este documento define la arquitectura de información. La dirección visual y el storyboard se revisan en el [entregable creativo HTML](../deliverables/design/ryo-unboxed-creative-direction.html); los keyframes y el contrato de movimiento se revisan en el [sistema visual V1](../deliverables/design/ryo-unboxed-visual-system-v1.html). [`../RealizeDesign.md`](../RealizeDesign.md) conserva su índice operativo.

## Mapa del sitio

```text
/
├── navegación
├── hero
├── caja cerrada y apertura
├── rolls destacados
├── anatomía
├── experiencia, horarios y pagos
├── sobre nosotros
├── acceso al menú
└── contacto + footer

/menu
├── navegación + switch dinámico/estático
├── categorías
├── platos
└── Instagram / WhatsApp
```

## Landing · secuencia propuesta

### 0 · Navegación

Marca o nombre, acceso al menú y CTA. Debe permanecer clara sobre composiciones visuales variables.

### 1 · Hero

La caja azul cerrada, el wordmark y una promesa breve. El primer viewport identifica Ryo Sushi sin depender de animación.

### 2 · Apertura

La caja se abre y presenta el interior. El contexto parte de fuentes públicas verificadas: sushi de autor, preparado para disfrutarse en casa, solo delivery y pick up.

### 3 · Rolls destacados

Cuatro platos comparten una única pose de anatomía frente a la caja abierta: Playboy, Yuzu, Koga Explosion y Sei Exclusive, seleccionados a partir de fotografías aportadas por Victor. El orden parte del endpoint K17 / Playboy del video de apertura y retrocede hasta Sei. El cambio de roll ocurre como transición entre imágenes controladas, no como cuatro videos separados.

### 4 · Anatomía del roll

Cada roll ocupa la misma pausa frontal, sostenido por palillos naturales, con caja lateral abierta al fondo. Cada imagen tiene un mapa propio de puntos y líneas para sus ingredientes confirmados. El nombre aparece arriba a la derecha, los ingredientes en casillas translúcidas con separación amplia y la descripción general en una casilla inferior. Solo la línea y el punto del ingrediente explorado aparecen mediante hover o foco; en móvil se presenta la misma información como lista lineal. Esta escena de landing no muestra precio; el precio permanece disponible en el menú.

### 5 · Experiencia

Después de la anatomía final de Sei, el clip de salida aportado por Victor ejecuta el retorno de K17 / Playboy y el cierre. La caja cerrada funciona como mesa editorial: desaparece la anatomía, entra la propuesta verificada “Alta cocina japonesa para disfrutar en casa” y se presenta la modalidad “Solo delivery y pick up”. WhatsApp e Instagram pueden figurar como canales verificados, todavía sin fijar su jerarquía como CTA.

El formato separa visualmente hechos verificados de campos pendientes. Horarios, Pagos y Métodos de pago conservan un espacio visible con estado “por verificar” hasta revisar los highlights autenticados; no se inventan tiempos de entrega, condiciones ni medios de pago. En desktop la información forma una banda operativa bajo la caja. En móvil, imagen, propuesta y tarjetas pasan a una secuencia lineal.

La caja permanece inmóvil durante la lectura porque el video se sostiene en su último frame cerrado. El cambio factual de Sei hacia el K17 / Playboy del clip de salida se resuelve con una disolución de producto; una continuidad exacta de roll requerirá reemplazar únicamente el inicio de ese clip. Esta revisión conserva la arquitectura sin introducir otro video.

### 6 · Sobre nosotros

Pausa ligera después de demostrar producto y servicio: propósito, forma de trabajo y experiencia en casa. El copy tendrá 45–65 palabras y dependerá de información aportada o verificada; no se inventan origen, equipo, antigüedad o procesos.

### 7 · Menú

Un stinger breve introduce la ruta `/menu`: dos paneles navy con el patrón real de arcos RYŌ se separan desde una junta dorada central. El wordmark funciona como sello antes de retirarse. No se repite durante la exploración ni bloquea el acceso; en reduced motion se muestra directamente el contenido.

La ruta ofrece `Explorar / Lista` sobre una sola fuente de platos. En esta etapa la selección se limita a sushi rolls y nigiris. `Explorar` presenta un plato grande, navegación anterior/siguiente, selección directa y datos disponibles. `Lista` muestra el mismo contenido como catálogo escaneable. Ningún plato sin fotografía recibe una imagen inventada: el patrón ocupa temporalmente ese espacio. Otras categorías se evalúan únicamente después de la aprobación del cliente.

### 8 · Contacto

El footer cambia a marfil, color secundario del menú, para señalar el cierre sin abandonar navy y dorado. Contiene la propuesta pública, modalidad, WhatsApp e Instagram verificados. Horarios, ubicación y métodos de pago no aparecen hasta ser confirmados. WhatsApp funciona como salida principal propuesta y todavía requiere aprobación de jerarquía G2.

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
| Tablet | Menor distancia y capas; sticky solo cuando preserve control y lectura. |
| Móvil | Secuencia vertical táctil, anotaciones reordenadas y CTA alcanzables. |
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
