# Sushi Page — Roadmap de desarrollo

**Estado:** landing audiovisual V2 y preview del menú integradas en Next.js/React; QA de publicación activo · **Aprobación interna:** Victor Silva · **Aprobación externa:** cliente pendiente · **Última actualización:** 30.08.2026

## Resultado y límites

El resultado es una landing scrolling y un menú interactivo/estático conectados, responsive, accesibles y publicables como pieza de portfolio. No se construye backend, checkout, pedidos o administración en la primera versión.

## Flujo general

`Control → Descubrimiento → Dirección → Vertical slice → Producción → QA → Preview → Launch`

Cada cluster termina con evidencia. No se amplía el siguiente cuando el patrón anterior sigue abierto o una decisión material necesita aprobación.

## Cluster 0 · Control y estructura

**Propósito:** establecer trazabilidad y responsabilidades antes de recopilar o construir.

**Progreso:** completado y verificado el 26.08.2026.

### Entregables

- Reglas raíz y panel de proyecto.
- Skills locales de coordinación y dirección de experiencia.
- Estructura para brand, planificación, referencias, reportes y aplicación.
- `.gitignore` sin secretos, builds o metadata local.

### Gate G0 · Workspace listo

- Las fuentes se navegan desde `PROJECT.md`.
- Los documentos no dependen de rutas de Personal Space.
- Git no incluye secretos ni contenido generado accidental.
- La estructura y las skills se validan.

**Resultado:** navegación interna válida, sin términos técnicos heredados de Personal Space, sin firmas de secretos y con ambas skills locales validadas.

## Cluster 1 · Descubrimiento y derechos

**Propósito:** convertir Instagram y el menú en un set confiable de producto.

**Progreso:** menú, perfil público, WhatsApp y reel de la caja localizados; highlights autenticados, transcripción y permisos pendientes.

### Entregables

- URLs y capturas de las fuentes seleccionadas.
- Menú transcrito y verificado.
- Relación entre platos, fotos, ingredientes y precios.
- Canales de contacto confirmados.
- Estado de autorización o licencia de cada material.

### Gate G1 · Contenido confiable

- No hay datos gastronómicos inventados.
- Cada elemento seleccionado tiene procedencia.
- Los bloqueos de permiso están visibles.
- Existen suficientes platos e imágenes para diseñar el recorrido.

## Cluster 2 · Dirección de producto y visual

**Propósito:** cerrar la historia antes de elegir arquitectura técnica.

### Entregables

- Product brief aprobado.
- Sitemap y jerarquía de secciones.
- Storyboard de scroll.
- Comportamiento del menú dinámico y estático.
- Dirección visual, tratamiento fotográfico, tipografía, color y motion.
- Wireframes de desktop y móvil.
- Storyboard, shot list y dirección de la caja azul en `deliverables/design/ryo-unboxed-creative-direction.html`.
- Sistema visual, keyframes, endpoints y contrato de clips en `deliverables/design/ryo-unboxed-visual-system-v1.html`.
- Guía de captura física, logo lock, mediciones y producto en `deliverables/design/ryo-photo-capture-guide.html`.
- Stinger, vertical slice `Explorar / Lista` y footer en `deliverables/design/ryo-stinger-footer-menu-v1.html`.
- Prototipo estructural navegable en HTML antes de Foundation.

### Gate G2 · Dirección aprobada

Victor aprueba estructura, selección de platos, concepto visual, CTA y comportamiento principal.

**Propuesta actual:** RYŌ Unboxed, caja azul como objeto central, escena negra con mesa premium y luz cenital. La secuencia lateral V1 usa Sei Exclusive, Koga Explosion, Yuzu y Playboy en una pose anatómica común. El video se limita a abrir, tomar el primer roll, devolver el último y cerrar; K11 sostiene Experiencia. Un stinger de paneles navy introduce el menú `Explorar / Lista` y el footer marfil cierra con WhatsApp. Platos, anotaciones y datos operativos permanecen como capas de interfaz controladas.

## Cluster 3 · Foundation y vertical slice

**Propósito:** validar el patrón visual y técnico de mayor riesgo antes de multiplicarlo.

**Progreso:** la Foundation nativa validó el concepto y luego fue sustituida por una implementación Next.js/React con TypeScript. La anatomía usa cuatro estados, el menú comparte una fuente JSON para `Explorar / Lista`, el stinger usa el logo transparente y existe reduced motion. Victor aprobó la migración técnica; la aprobación del cliente sigue pendiente.

### Entregables

- Aplicación en `src/` con exportación estática en `out/`.
- Superficie HTML prerenderizada y verificable en navegador.
- Fuente de datos única para el menú.
- Navegación y hero base.
- Una escena completa de plato/anatomía.
- Switch funcional entre una muestra dinámica y estática.
- Adaptación desktop, tablet, móvil y reduced motion.

### Gate G3 · Patrón aprobado

- Lint y build pasan.
- Contenido semántico existe sin depender de animación.
- Scroll, teclado, táctil y reduced motion funcionan.
- Victor aprueba ritmo, composición y claridad del patrón.

**Resultado interno:** patrón aceptado por Victor el 28.08.2026 para continuar la exploración. No equivale a aprobación del cliente ni habilita producción G4.

## Cluster 4 · Producción completa

**Propósito:** completar landing y menú reutilizando patrones aprobados.

**Estado:** la landing V2 integra en React tres videos propios ligados al scroll y cuatro anatomías en orden corregido. El menú React integra los diez platos seleccionados, conserva su correspondencia documental/visual y forma parte del mismo artifact como preview conceptual no indexada.

Victor autorizó el 30.08.2026 vincular y hostear la preview. `Explorar / Lista` comparten datos, imágenes, ingredientes, precios REF y presentaciones; el siguiente gate es revisar el entorno publicado antes de promoverla como carta oficial.

### Paquetes

| Paquete | Alcance | Dependencia |
|---|---|---|
| 4.1 · Narrativa | Hero y secciones de negocio | Copy y dirección aprobados |
| 4.2 · Producto | Platos destacados y anatomías | Inventario verificado |
| 4.3 · Menú | Categorías, modos, navegación táctil/teclado y catálogo equivalente | Implementado en React, integrado al export y en QA pública |
| 4.4 · Conversión | Instagram, WhatsApp y footer | Canales confirmados |
| 4.5 · Motion | Intro, apertura y cierre en video con scrub; anatomías Playboy → Yuzu → Koga → Sei | Migrado a `useGSAP`/ScrollTrigger y verificado en desktop y móvil; revisión en Pages pendiente |
| 4.6 · Metadata | Icono, OG, robots y sitemap | Implementado mediante metadata routes y exportación estática |

### Gate G4 · Experiencia completa

- Todas las secciones y categorías previstas están conectadas.
- No hay placeholders ocultos ni contenido inventado.
- Ambas vistas del menú coinciden.
- Victor aprueba el recorrido completo en local.

## Cluster 5 · QA

### Matriz

| Área | Verificación | Evidencia |
|---|---|---|
| Build | lint, build, prerender y consola | Salidas de comandos |
| Funcional | navegación, switch, categorías, CTA y enlaces | Checklist |
| Responsive | móvil, tablet, desktop y orientación | Capturas |
| Accesibilidad | semántica, teclado, foco, contraste, alt y reduced motion | Reporte |
| Rendimiento | LCP, INP, CLS, media, fuentes y JavaScript | Medición |
| Contenido | platos, ingredientes, precios y enlaces contra fuentes | Matriz |
| Derechos | assets usados contra permisos y atribución | Inventario |
| Complejidad | dependencias y código sin uso | `ponytail-review` |

### Gate G5 · Release candidate

Cero defectos bloqueantes; riesgos residuales y permisos pendientes tienen decisión explícita.

## Cluster 6 · Preview y lanzamiento

### Entregables

- Landing y preview conceptual del menú en una sola publicación de GitHub Pages.
- QA repetido sobre entorno real.
- Dominio, HTTPS, metadata, enlaces y rollback verificados.
- Reporte de lanzamiento.

### Gate G6 · Producción aceptada

La URL muestra la versión aprobada, los materiales están autorizados y no existen regresiones críticas.

## Cluster 7 · Cierre y evolución

- Actualizar `PROJECT.md` con estado final y backlog real.
- Entregar inventario de repositorio, hosting, dominio y accesos.
- Evaluar analytics, pedidos, CMS o nuevas páginas solo con necesidad demostrada.
