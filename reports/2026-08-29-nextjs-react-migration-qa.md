# QA · Migración Next.js/React

**Fecha:** 29.08.2026 · **Estado:** aprobado localmente; verificación de Pages pendiente · **Superficie:** landing pública y menú local

## Alcance

Migración de la implementación estática anterior a Next.js 16 App Router, React 19, TypeScript y GSAP mediante `@gsap/react`, conservando exportación estática y el contrato audiovisual V2.

## Verificación automatizada

`NEXT_PUBLIC_BASE_PATH=/RYO_landing npm run check` aprobó:

- TypeScript estricto sin errores.
- Compilación y exportación estática de `/`, `/robots.txt` y `/sitemap.xml`.
- Diez platos con IDs únicos, fuentes y anatomías válidas.
- Allowlist exacta de doce archivos en `public/media/`.
- Ausencia de `/menu`, `local-menu-media` y datos no anatómicos del menú dentro de `out/`.

La salida de Next.js contiene solo rutas estáticas y no requiere runtime de servidor.

## QA funcional y visual

Entorno: Next.js dev server en `http://127.0.0.1:3000/`.

| Matriz | Resultado |
|---|---|
| 1280 × 720 | Stinger, pin, intro, apertura, cuatro rolls, cierre, final y footer operativos. |
| 390 × 844 | Sin overflow horizontal; hero, video y anatomía adaptados; menú en cartas de una columna. |
| 844 × 390 | Sin overflow; escena audiovisual y final editorial dentro del viewport. |
| Scroll reversible | `currentTime` de los tres videos cambia con el progreso y conserva la cámara real. |
| Anatomía | Orden `Playboy → Yuzu → Koga → Sei`; punto y línea ocultos hasta hover/foco/toque. |
| Navegación | Links de capítulos y acceso directo a Experiencia llevan al estado correcto. |
| Menú local | `Explorar / Lista`, categorías, siguiente/anterior, teclado y cartas responsive funcionan. |
| Consola | Sin errores nuevos; se eliminó un warning de `next/image` en figuras ocultas del menú. |

## Defectos encontrados y corregidos

1. Next.js bloqueaba los chunks de desarrollo al abrir `localhost` desde `127.0.0.1`; se añadieron ambos orígenes a `allowedDevOrigins`.
2. El salto de navegación a Experiencia caía todavía dentro del último tramo de cierre; se movió al 96 % del recorrido.
3. `next/image` con `fill` advertía sobre figuras de tarjetas ocultas en desktop; las fotografías editoriales usan ahora `img` con dimensiones explícitas y lazy loading.
4. El menú podía compilarse como una ruta aparentemente oculta y filtrar datos en chunks; ahora la ruta y sus assets se generan solo durante `npm run dev` y se eliminan antes del build.

## Accesibilidad y movimiento reducido

Se verificaron landmarks, nombres accesibles, estados live, foco del menú y navegación con flechas. La rama `prefers-reduced-motion` permanece implementada como contenido lineal completo y evita ScrollTrigger/stinger; la prueba final en un dispositivo con la preferencia del sistema activada queda como parte del polishing G5.

## Riesgos residuales

- El ritmo definitivo debe aprobarse sobre la URL desplegada, donde la descarga de video puede variar.
- La publicación del menú continúa bloqueada por permiso y vigencia editorial.
- Falta una pasada final en hardware táctil real y con reduced motion del sistema.

## Gate

La migración técnica está aprobada localmente. G4 continúa activo hasta verificar el nuevo artifact en GitHub Pages y recibir la revisión visual de Victor.
