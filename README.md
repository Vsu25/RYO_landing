# RYŌ Unboxed

Landing editorial para RYŌ Sushi, construida alrededor de su caja azul, cuatro rolls protagonistas y una exploración anatómica de ingredientes.

[Ver la landing](https://vsu25.github.io/RYO_landing/) · [Contactar por WhatsApp](https://wa.me/584220382261) · [Instagram de RYŌ](https://www.instagram.com/ryomcbo/)

![Caja RYŌ abierta en estudio](website/public/media/box-open.webp)

## La experiencia

El recorrido público está compuesto por cuatro actos:

1. **La caja:** el packaging introduce la identidad y abre la escena.
2. **Los protagonistas:** Sei Exclusive, Koga Explosion, Yuzu y Playboy comparten un lenguaje fotográfico consistente.
3. **La anatomía:** cada roll revela sus ingredientes con puntos y líneas vinculados a su composición.
4. **La experiencia:** delivery, pick up y contacto directo cierran el recorrido.

El menú interactivo se desarrollará en una etapa posterior, cuando sus fotografías estén aprobadas. No forma parte de la navegación pública actual.

## Cómo está construido

El sitio usa HTML semántico, CSS y JavaScript nativo. No requiere framework, backend, proceso de build ni dependencias de producción. Las animaciones son progresivas y respetan `prefers-reduced-motion`.

```bash
python3 -m http.server 4173 --directory website
```

Después abre `http://127.0.0.1:4173/`.

Cada cambio enviado a `main` publica únicamente los archivos de la landing desde `website/` mediante GitHub Pages. El prototipo del menú no se incluye en el artifact público.

## Estado

- Landing responsive: implementada y publicada para revisión.
- Anatomía de cuatro rolls: implementada; sus coordenadas podrán refinarse con las fotografías finales.
- Menú interactivo: congelado hasta aprobar las imágenes de rolls y nigiris.
- Video de apertura y cierre: planificado para una fase audiovisual posterior.

## Estructura

| Ruta | Contenido |
|---|---|
| `website/` | Landing desplegable y assets web optimizados. |
| `brand/` | Identidad y recursos visuales producidos para el proyecto. |
| `deliverables/design/` | Storyboards, exploraciones y sistemas visuales revisables. |
| `planning-docs/` | Brief, roadmap, inventario y documentación interna. |
| `reports/` | Evidencia de QA y decisiones verificadas. |
| `references/` | Índices de procedencia; los originales pesados permanecen fuera de Git. |

La navegación operativa y las reglas básicas se trasladaron a [`planning-docs/README.md`](planning-docs/README.md). El estado detallado del proyecto se mantiene en [`PROJECT.md`](PROJECT.md).

## Colaboración

Las contribuciones deben conservar tres principios: el producto real es protagonista, los datos gastronómicos tienen una fuente verificable y la experiencia funciona con teclado, en móvil y con movimiento reducido.

Antes de proponer una ampliación, revisa el [roadmap](planning-docs/development-roadmap.md) y abre una conversación con el objetivo, el alcance y la evidencia necesaria. Evitamos dependencias, servicios y abstracciones mientras la plataforma nativa cubra el resultado.

## Uso de marca y contenido

El código y la documentación no conceden derechos de reutilización sobre el nombre RYŌ, su logotipo, fotografías, menú, ilustraciones o assets de marca. La licencia pública del proyecto se definirá antes de aceptar redistribuciones externas.
