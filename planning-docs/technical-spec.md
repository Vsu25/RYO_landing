# Sushi Page — Especificación técnica preliminar

**Estado:** stack nativo resuelto para Foundation; vertical slice implementado localmente · **Última actualización:** 28.08.2026

## Autoridad

Esta fuente define decisiones técnicas. No sustituye contenido, blueprint, identidad ni roadmap. Se completará después de G2.

## Resultado técnico esperado

- Landing y menú en una sola aplicación web.
- Renderizado estático o prerenderizado mientras el alcance no requiera servidor.
- Una fuente de datos tipada para todas las vistas del menú.
- HTML semántico útil antes de aplicar motion.
- Responsive, teclado, táctil y `prefers-reduced-motion`.
- Deploy reproducible y sin secretos en el repositorio.

## Invariantes

1. **Estático primero:** no backend, base de datos o CMS sin requisito aprobado.
2. **Contenido único:** las vistas del menú no mantienen copias divergentes.
3. **Server-first cuando aplique:** el código cliente se limita a interacción real.
4. **CSS y APIs nativas primero:** dependencias solo si reducen riesgo o complejidad neta.
5. **Motion progresivo:** el contenido y la navegación funcionan sin animaciones.
6. **Media responsable:** dimensiones explícitas, formatos web, poster para video y carga selectiva.
7. **Accesibilidad estructural:** landmarks, headings, controles nativos, foco visible y nombres claros.
8. **Producción híbrida:** un clip corto de apertura más capas HTML/CSS para caja, platos, anotaciones y UI antes de 3D, WebGL o video largo sincronizado frame a frame.
9. **Patrón fiel:** la fuente muestra arcos concéntricos superpuestos, no un seigaiha. La versión de producción se reconstruye como SVG/CSS de bajo contraste después de validar geometría contra SRC-011; el raster original queda como referencia.

## Stack

El vertical slice adopta HTML semántico, CSS y JavaScript nativo. No usa framework, proceso de build, backend ni dependencia de producción. La decisión permanece limitada a Foundation y puede revisarse únicamente si una necesidad medible no queda cubierta por la plataforma.

La preview futura será estática en GitHub Pages desde un repositorio llamado `RYO_landing`. Vercel no forma parte del plan. Mientras falten permisos, el repositorio de trabajo permanece privado y no se activa Pages. La publicación deberá empaquetar únicamente `website/`, sin originales de `references/`, archivos temporales ni documentación interna.

La landing vive en `website/index.html`, el menú en `website/menu.html` y ambas superficies consumen `website/menu-data.js` como fuente única actual. `website/app.js` comparte el comportamiento de interacción.

El vertical slice debe intentar primero `video` nativo muted/inline para la apertura, imágenes transparentes, `position: sticky`, transforms CSS, máscaras e `IntersectionObserver`. Un modelo 3D, control frame a frame o librería de scroll solo se evalúa si el prototipo híbrido no alcanza una perspectiva o continuidad aprobada.

### Evaluación de GSAP

Las skills oficiales de GreenSock están instaladas como documentación de implementación, pero el paquete `gsap` no forma parte todavía del stack. En G3 se puede comparar con la solución nativa si el vertical slice necesita timelines coordinadas, control reversible o scroll ligado al progreso. Si se adopta, debe cubrir cleanup, responsive, `prefers-reduced-motion` y rendimiento antes de escalar a todas las escenas.

**Resultado del primer corte:** el stinger, los fades entre platos y la anatomía se resuelven con transforms CSS y Web Animations API. No existe todavía evidencia que justifique instalar GSAP.

## Modelo de contenido propuesto

```ts
type MenuItem = {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  currency: string;
  image?: string;
  sourceId: string;
  status: "verified" | "unavailable";
};
```

El esquema es ilustrativo, no código aprobado. La fuente final debe soportar orden editorial, categorías, disponibilidad y texto alternativo sin acoplarse a una vista.

## Presupuesto de experiencia

- Evitar videos o imágenes hero pesadas sin medición.
- No precargar media fuera del primer viewport.
- Cargar escenas del menú dinámico según necesidad cuando el catálogo lo justifique.
- Mantener estable el layout con dimensiones conocidas.
- Definir metas de rendimiento sobre preview, no sobre desarrollo.

## Seguridad y privacidad

- No almacenar tokens, credenciales, datos personales o números no autorizados en Git.
- WhatsApp e Instagram usan enlaces normales en v1.
- No se rastrea comportamiento ni se añaden cookies sin una decisión de medición y consentimiento.

## Definition of Done técnica

- Lint y build exitosos.
- Sin errores de consola ni enlaces rotos.
- Rutas principales prerenderizadas cuando el stack lo permita.
- Navegación por teclado y foco verificados.
- Resultado equivalente en reduced motion.
- Contenido del menú comparado con la fuente aprobada.
- Media optimizada y con texto alternativo.
- Sin dependencias, componentes o abstracciones sin uso.
- QA desktop, tablet y móvil documentado en `reports/`.
