# RYŌ Sushi — Realize Design

**Tipo:** índice operativo · **Estado:** landing migrada a Next.js/React; menú completo en revisión local · **Última actualización:** 29.08.2026

Los entregables creativo y visual se revisan en HTML:

- [`deliverables/design/ryo-unboxed-creative-direction.html`](deliverables/design/ryo-unboxed-creative-direction.html)
- [`deliverables/design/ryo-unboxed-visual-system-v1.html`](deliverables/design/ryo-unboxed-visual-system-v1.html)
- [`deliverables/design/ryo-stinger-footer-menu-v1.html`](deliverables/design/ryo-stinger-footer-menu-v1.html)
- [`deliverables/design/ryo-menu-responsive-explorations-v1.html`](deliverables/design/ryo-menu-responsive-explorations-v1.html)
- [`deliverables/design/ryo-photo-capture-guide.html`](deliverables/design/ryo-photo-capture-guide.html)
- [`src/app/page.tsx`](src/app/page.tsx) y [`src/local-pages/MenuPage.tsx`](src/local-pages/MenuPage.tsx)
- [`reports/2026-08-28-ryo-box-studio-and-audiovisual-plan.md`](reports/2026-08-28-ryo-box-studio-and-audiovisual-plan.md)

## Función de este archivo

Este Markdown conserva únicamente navegación, estado y decisiones duraderas. La dirección de arte, el storyboard, las composiciones, la planificación de imágenes y el plan audiovisual pertenecen al entregable HTML.

## Decisiones registradas

- La caja azul es el objeto narrativo central.
- La atmósfera base es una dark kitchen abstracta: negro absoluto, mesa premium mate y luz cenital controlada.
- El navy, marfil y dorado del menú funcionan como sistema editorial alrededor de la escena negra.
- La secuencia acordada es caja cerrada, apertura, rolls, anatomía, experiencia, “Sobre nosotros”, menú y cierre.
- La primera aproximación al patrón fue descartada. La fuente correcta muestra arcos concéntricos superpuestos de forma irregular; cualquier reconstrucción debe derivarse de esa evidencia, no de un seigaiha genérico.
- La solución recomendada combina un clip corto de apertura con capas HTML/CSS para caja, platos, anatomía e interfaz; el 3D completo queda fuera de v1 salvo evidencia del vertical slice.
- Las imágenes y videos serán producidos por Codex mediante keyframes y checkpoints aprobados por Victor.
- Los assets generados se identificarán como material conceptual y no como fotografía documental del negocio.
- El contenido factual seguirá pendiente hasta verificarse en el inventario de fuentes.
- El sistema visual V1 original conserva como exploración histórica los endpoints de Fuji, Yuzu, Kamasutra y Rendi; la selección vigente para anatomía está definida por SRC-015.
- Ningún video se produce antes de aprobar composición y fidelidad. La prueba vigente se limita a entrada física y salida física alrededor de los cuatro estados de imagen.
- El wordmark físico debe aparecer en tapa exterior e interior. Los keyframes actuales conservan composición, pero su branding y producto son provisionales hasta completar la guía fotográfica.
- Siete fotografías físicas aportadas por Victor fijan mejor la construcción, el arte frontal, el color, el brillo, el cierre, la apertura y el interior de la caja. A partir de ellas se produjeron tres masters de estudio V1: cerrado, abierto y cierre horizontal.
- Los masters de estudio no sustituyen el objeto fotografiado ni el vector oficial. Se revisan como dirección y continuidad antes de declarar un asset final.
- Cuatro recortes aportados por Victor sustituyen la selección provisional de rolls para la anatomía: Sei Exclusive, Koga Explosion, Yuzu y Playboy. Todos comparten cámara, caja, palillos, escala y pose; solo cambia el producto.
- El sistema audiovisual se simplifica a dos acciones físicas de video —abrir/tomar y devolver/cerrar— conectadas por cuatro endpoints de imagen controlados por scroll.
- K12–K15 son las únicas tomas anatómicas: el roll conserva escala protagonista y recibe etiquetas HTML con ingredientes confirmados del menú. K16/K17 solo representan los puentes físicos de toma y retorno.
- Cada roll usa coordenadas anatómicas propias. El nombre aparece arriba a la derecha, los ingredientes y su función se ordenan en una columna lateral, la descripción general queda abajo y el precio se omite en esta escena de landing.
- Las casillas anatómicas permanecen visibles con transparencia y mayor separación. Hover o foco muestra únicamente la línea y el punto asociados; la calibración final se hará sobre los masters de producción.
- El stinger propuesto usa dos paneles navy con el patrón real RYŌ, junta y sello dorados, y apertura desde el centro. Su versión reducida elimina el desplazamiento.
- El menú usa una única fuente para `Explorar / Lista`; contiene diez platos verificados, selección directa por nombre y visuals conceptuales vinculados por ID documental, ID técnico y nombre editorial.
- El footer cambia a marfil como color secundario y propone WhatsApp como CTA principal, con Instagram como salida secundaria.
- La implementación usa Next.js 16, React 19 y TypeScript; `src/data/menu.json` es la fuente única de `Explorar / Lista` y de los cuatro estados anatómicos.
- La landing es la única superficie publicada. El menú de esta etapa se limita a rolls especiales y nigiris, está implementado para revisión local y se excluye del artifact de GitHub Pages hasta resolver permisos y vigencia.
- La landing pública organiza caja/apertura, cuatro rolls destacados, anatomía y Experiencia/contacto; elimina lenguaje técnico, concentra Experiencia en datos verificados y enlaza cada tarjeta con su anatomía.
- Índice de carta 02-B es la base aprobada del menú: en escritorio el bloque de categoría se encaja y sobresale desde la fotografía; en tablet y teléfono cada plato funciona como una carta táctil que amplía el visual y despliega información debajo sin modal de pantalla completa.
- El motion del menú usa GSAP Core solo en selección y apertura perceptual, con transform y opacidad durante 280–340 ms, reemplazo de tweens activos y salida equivalente sin animación para `prefers-reduced-motion`.
- La historia audiovisual vive en una isla React con `useGSAP` y ScrollTrigger: los tres videos controlan caja y cámara; únicamente los cuatro rolls usan crossfade durante la pausa anatómica.
- El menú se genera solo en desarrollo local. La exportación estática elimina su ruta, sus imágenes y sus chunks antes de subir `out/` a GitHub Pages.

## Próxima decisión

Revisar con Victor el ritmo del build Next.js en GitHub Pages y después afinar recortes, proporción imagen/texto y densidad de ingredientes del menú 02-B antes de autorizar su publicación.
