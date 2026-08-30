# RYŌ · El toque final

Landing editorial y audiovisual para RYŌ Sushi. La caja azul guía un recorrido continuo ligado al scroll: entrada, giro, apertura, presentación de producto, retorno, cierre cinematográfico y contacto.

## Experiencia publicada

**[Abrir la landing de RYŌ →](https://vsu25.github.io/RYO_landing/)**

![Caja RYŌ abierta en estudio](public/media/box-open.webp)

## Experiencia pública

- Tres videos propios sincronizados con el progreso, sin reproducción automática lineal.
- Presentaciones en orden `Playboy → Yuzu → Koga → Sei`, con coordenadas e ingredientes propios por roll.
- Stinger de dos puertas con patrón y wordmark RYŌ.
- Cierre cinematográfico con línea dorada, puertas laterales y transición `RYŌ · En casa`.
- Layout responsive y alternativa completa para `prefers-reduced-motion`.
- Cierre editorial integrado con la identidad visual de RYŌ.
- Menú público con una vista interactiva y otra tradicional sobre la misma fuente de diez platos.

La ruta `/menu/` funciona como preview conceptual: las imágenes están identificadas como tales y los valores se presentan en REF según la carta de referencia.

## Tecnología

- Next.js 16 con App Router y exportación estática.
- React 19 y TypeScript estricto.
- GSAP, ScrollTrigger y `@gsap/react` para la única secuencia que requiere control temporal ligado al scroll.
- CSS propio; sin backend, CMS, base de datos, cookies ni servicios recurrentes.
- GitHub Actions y GitHub Pages, con `basePath` configurado durante el build.

## Desarrollo local

Requiere Node.js 20.9 o posterior.

```bash
npm ci
npm run dev
```

Abre `http://127.0.0.1:3000/`. El menú está disponible en `http://127.0.0.1:3000/menu/`.

Comandos útiles:

```bash
npm run typecheck  # TypeScript
npm run build      # exporta la landing pública en out/
npm test           # contenido, media y rutas del artifact
npm run check      # validación completa
npm run preview    # sirve out/ en el puerto 4173
```

## Arquitectura

| Ruta | Responsabilidad |
|---|---|
| `src/app/` | Layout, metadata, landing y ruta `/menu/` prerenderizadas. |
| `src/components/landing/` | Stinger, historia scroll-reactive y presentaciones de producto. |
| `src/components/menu/` | Menú React con vistas `Explorar / Lista`. |
| `src/data/menu.json` | Fuente única de platos, ingredientes y mapas de presentación. |
| `public/media/` | Allowlist de los doce assets autorizados para la landing. |
| `public/menu-media/` | Seis derivados WebP conceptuales usados por el menú. |
| `deliverables/design/` | Dirección visual y prototipos HTML revisables. |
| `planning-docs/` | Producto, contenido, técnica y roadmap. |
| `reports/` | Evidencia de QA fechada. |

El estado operativo vive en `PROJECT.md`; las decisiones técnicas, en `planning-docs/technical-spec.md`.

## Publicación

Cada push a `main` ejecuta `npm ci`, `npm run check` y publica `out/` en GitHub Pages. El build incluye la landing, `/menu/` y únicamente la media registrada en el inventario; las pruebas fallan si falta una ruta, un plato o un asset esperado.

## Marca y contenido

El código y la documentación no conceden derechos de reutilización sobre el nombre RYŌ, el logotipo, las fotografías, el menú ni los assets de marca. Las fuentes, permisos y límites se registran en `planning-docs/content-and-source-inventory.md`.
