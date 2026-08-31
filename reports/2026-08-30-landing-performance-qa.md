# QA · Rendimiento de la landing

**Fecha:** 30.08.2026

**Estado:** implementado y verificado en build de producción; comprobación pública incluida en el despliegue de Pages.

## Alcance

Este pase responde a los hallazgos aportados desde PageSpeed Insights: vida de caché, entrega de imágenes, reflows forzados, descubrimiento del LCP, árboles de dependencias, recursos bloqueantes, JavaScript legacy o sin uso y payload de red. La condición de aceptación fue preservar la resolución visible, los videos y la coreografía ligada al scroll.

## Hallazgos reproducidos

- La versión pública anterior solicitaba los tres videos, las cuatro imágenes anatómicas y recursos de `/menu/` durante la entrada. En una navegación limpia del navegador se observaron 37 solicitudes de assets: 14 imágenes, 9 scripts, 3 videos, 1 CSS y 10 recursos adicionales.
- Los tres videos usaban `preload="auto"`; las capas de rolls eran eager y los dos enlaces Next al menú conservaban el prefetch automático.
- Cada `loadedmetadata` de video y la resolución de fuentes ejecutaban `ScrollTrigger.refresh()`. El botón magnético medía su rectángulo en cada `pointermove`.
- GitHub Pages respondió `Cache-Control: max-age=600` tanto para media como para chunks e imágenes. Es un header administrado por el proveedor, no por el código de esta aplicación.

## Cambios implementados

1. Solo la introducción conserva carga inmediata. Apertura y rolls se preparan con el primer gesto o al alcanzar 2 % del recorrido; el cierre, al 38 %.
2. Los enlaces `Interactivo / Tradicional` usan `prefetch={false}` para que leer la landing no descargue la ruta `/menu/` ni su media.
3. La caja inicial declara preload y prioridad explícita como candidata LCP.
4. Wordmark y patrón se sirven como WebP lossless ajustados a su tamaño de presentación. El icono usa un recorte aprobado de 96 px.
5. Los MP4 de escritorio se remuxearon con `faststart` y sin la pista AAC que nunca se reproduce; el bitstream visual no fue recomprimido. Los derivados móviles no se modificaron.
6. La geometría del botón magnético se mide al entrar, no en cada movimiento. El `ResizeObserver` anatómico agrupa la actualización de conectores en un solo `requestAnimationFrame`.
7. Se eliminaron refreshes repetidos de ScrollTrigger durante la carga de media y fuentes. Los eventos `loadedmetadata` y `loadeddata` sincronizan el tiempo solicitado sin alterar el documento.

## Segundo pase sobre la landing principal

La integración del menú permitió detectar que su CSS seguía dentro de la hoja global. Se separaron los estilos por ruta: `globals.css` conserva únicamente base, navegación y footer; `scroll-story.css` se carga desde `/`; `menu.css`, solo desde `/menu/`. El export resultante entrega a la landing 9 616 B de CSS comprimido en vez del bloque único previo de aproximadamente 10,8 KB, y la ruta de menú recibe 5 935 B entre base y estilos propios.

El póster inicial de 1672 × 941 px pasó de JPEG de 292 KB a WebP de 176 KB, una reducción aproximada del 40 % con PSNR 45,66 dB y validación visual a resolución original. Los posters de apertura y cierre ahora se asignan únicamente al preparar cada clip.

También se retiraron cuatro animaciones de variables CSS que repintaban el gradiente ambiental y una variable de progreso aplicada al escenario completo. Las barras actualizan su `scaleX` directamente; la posición anatómica agrupa resize y scroll táctil en un solo `requestAnimationFrame`, y la rotación automática móvil ya no vuelve a medir una geometría que no cambió.

## Impacto medido en archivos y carga inicial

| Recurso | Antes | Después | Resultado |
|---|---:|---:|---:|
| Wordmark | 341 041 B PNG | 59 928 B WebP lossless | −82,4 % |
| Patrón | 277 822 B PNG | 132 568 B WebP lossless | −52,3 % |
| Tres MP4 desktop | 12 479 549 B | 12 057 910 B | −421 639 B, sin recomprimir video |
| Video solicitado al inicio · desktop | 12 479 549 B | 4 404 428 B | −64,7 % inicial |
| Video solicitado al inicio · móvil | 10 637 162 B | 3 600 803 B | −66,1 % inicial |

En una entrada limpia del artifact local posterior al cambio se observaron 14 assets: 4 imágenes, 8 scripts, 1 CSS y únicamente el video de introducción. Apertura, cierre y rolls permanecieron sin solicitar; tampoco aparecieron prefetches de `/menu/`. El recorrido incremental cargó cada tramo antes de usarlo y completó correctamente intro, apertura, Playboy, Yuzu, Koga, Sei, cierre y bento; al invertir el scroll volvió desde el cierre a la escena de roll sin salto de documento.

## Diagnósticos residuales y criterio

- **Cache lifetime:** GitHub Pages fija 10 minutos. Resolverlo completamente exige un CDN u hosting con headers configurables; no se introduce un service worker ni un cambio de proveedor sin una decisión de arquitectura.
- **Render blocking:** la landing conserva dos chunks necesarios —base y recorrido— por un total de 9 616 B comprimidos. No se activó `experimental.inlineCss` porque duplicaría CSS en HTML/RSC y perjudicaría visitas repetidas para una ganancia pequeña.
- **Unused / legacy JavaScript:** React, Next y GSAP forman el runtime aprobado de esta experiencia. Se retiró la descarga anticipada de la ruta del menú; los bundles restantes sostienen navegación, accesibilidad, timeline y scrubbing. Una reducción mayor requiere medir cobertura pública por chunk antes de retirar funcionalidad.
- **Payload total:** el sitio conserva seis fuentes de video porque desktop y móvil necesitan codificaciones distintas, pero ya no compiten todas en la entrada. La siguiente mejora material sería un encode moderno adicional negociado por navegador, que debe validarse visualmente antes de reemplazar H.264.

## Verificación

- `NEXT_PUBLIC_BASE_PATH=/RYO_landing npm run check`: TypeScript, export estático y diez contratos automatizados aprobados.
- Artifact inicial: un video, sin media del menú y sin imágenes anatómicas antes de interacción.
- Scrub: recorrido incremental completo hacia adelante y atrás verificado en el navegador integrado.
- Calidad: entrada, anatomía, cierre y `RYŌ en casa` comprobados visualmente; MP4 sin reencode y masters originales preservados.

PageSpeed debe repetirse sobre la URL pública después del despliegue y con la caché de la medición limpia. El API automatizado respondió 429 durante esta revisión, por lo que este informe no inventa una puntuación posterior.
