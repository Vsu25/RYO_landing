# RYŌ Sushi — Realize Design

**Tipo:** índice operativo · **Estado:** anatomía aprobada; Experiencia y sistema de transición/menú en revisión · **Última actualización:** 28.08.2026

Los entregables creativo y visual se revisan en HTML:

- [`deliverables/design/ryo-unboxed-creative-direction.html`](deliverables/design/ryo-unboxed-creative-direction.html)
- [`deliverables/design/ryo-unboxed-visual-system-v1.html`](deliverables/design/ryo-unboxed-visual-system-v1.html)
- [`deliverables/design/ryo-stinger-footer-menu-v1.html`](deliverables/design/ryo-stinger-footer-menu-v1.html)
- [`deliverables/design/ryo-photo-capture-guide.html`](deliverables/design/ryo-photo-capture-guide.html)
- [`website/index.html`](website/index.html) y [`website/menu.html`](website/menu.html)
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
- El menú se prueba con una única fuente para `Explorar / Lista`; actualmente contiene diez platos verificados y mantiene visibles las limitaciones de moneda, vigencia, fotografía y transcripción.
- El footer cambia a marfil como color secundario y propone WhatsApp como CTA principal, con Instagram como salida secundaria.
- La Foundation local implementa estas decisiones en dos rutas estáticas; `menu-data.js` es la fuente única de las vistas del menú y los cuatro estados de anatomía, mientras `app.js` resuelve su comportamiento.
- La Foundation es una demostración visual previa al cliente. El menú de esta etapa se limita a sushi rolls y nigiris; el resto del catálogo y el polishing de producción quedan condicionados a aprobación.
- El landing V2 añade el acto de cuatro rolls destacados, elimina lenguaje técnico de la superficie pública, concentra Experiencia en datos verificados y enlaza cada tarjeta con su anatomía. El menú queda congelado hasta aprobar fotografías.

## Próxima decisión

Aprobar el stinger, el cambio navy → marfil del footer y la interacción `Explorar / Lista`; confirmar WhatsApp como CTA principal. Mantener en paralelo la aprobación de Experiencia K11 y completar la transcripción del menú antes de escalar el prototipo.
