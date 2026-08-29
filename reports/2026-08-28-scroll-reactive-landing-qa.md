# QA · Landing scroll-reactive RYŌ

**Fecha:** 28.08.2026

**Estado:** implementada y verificada localmente; publicación en GitHub Pages pendiente del commit final.

**Superficie:** `website/index.html` + `website/scroll-story.css` + `website/scroll-story.js`.

## Resultado

La landing dejó de ser una sucesión de bloques editoriales y pasó a una única escena sticky gobernada por el progreso del scroll. El recorrido implementado conserva el orden acordado:

1. entrada frontal de la caja;
2. giro a la toma lateral;
3. apertura;
4. pausa abierta y toma del primer roll;
5. Sei Exclusive;
6. Koga Explosion;
7. Yuzu;
8. Playboy;
9. retorno del roll;
10. cierre y recentrado de la caja;
11. cierre editorial de la experiencia RYŌ.

Las anatomías usan la fuente única de `website/menu-data.js`. El nombre aparece arriba a la derecha, la descripción general abajo y los ingredientes confirmados en fichas translúcidas. Punto y línea se revelan solo al activar una ficha con hover, foco o toque; la curva termina en la posición real de esa ficha. No se muestra precio.

## Media y continuidad

- Se generaron dos masters Veo 3.1 Standard de 8 segundos, 16:9 y 1080p mediante `veo-3.1-generate-preview`.
- Costo estimado del lote: **US$6.40**, según la tarifa oficial consultada el 28.08.2026.
- El master de entrada mutaba el roll después de aproximadamente 2.15 s; solo se publicó el tramo fiel anterior.
- El master de salida deformaba mano, logotipo y patrón durante su parte media; solo se publicó el asentamiento final fiel de 1.5 s.
- Toma, retorno y crossfades se completan con endpoints estáticos ya aprobados. Esta composición evita presentar como real un frame generativo defectuoso.
- Derivados publicados: entrada ~1.7 MB y salida ~1.1 MB, con poster y fallback estático.

Fuentes técnicas: [guía oficial de Veo](https://ai.google.dev/gemini-api/docs/veo) y [precios oficiales](https://ai.google.dev/gemini-api/docs/pricing#veo-3.1).

## Verificaciones

- Sintaxis: `node --check` aprobado para controlador y script de generación.
- Integridad de contenido: `CONTENT_DATA_OK · 10 platos · 10 assets · 4 anatomías`.
- Navegador local 1280×720: hero, apertura, las cuatro anatomías, retorno, cierre y escena final verificados sin errores de consola.
- Geometría: imagen y SVG comparten un lienzo 16:9; la línea activa se calcula contra la casilla real para evitar desalineación en tablet.
- Responsive: se eliminaron mínimos absolutos que recortaban pantallas bajas; existe composición compacta para landscape y breakpoint de tablet hasta 1024 px.
- Accesibilidad: foco visible, `aria-current`, anuncio de cada roll, foco preservado entre cambios, transcripción expandible y recorrido lineal completo para movimiento reducido.
- Movimiento reducido: la navegación usa anchors válidos de la versión lineal, se oculta el replay y un cambio de preferencia recarga la variante correcta.
- Rendimiento: scroll pasivo, escrituras en `requestAnimationFrame`, capas animadas solo por `opacity`/`transform`, `will-change` limitado a capas visibles.
- Artifact de Pages: lista explícita de HTML, CSS, JS y media autorizada. El menú, sus seis imágenes conceptuales y su código local no forman parte del despliegue.

## Riesgo residual

Los clips generativos no ofrecen continuidad material perfecta durante sus ocho segundos completos. La landing mitiga esa limitación publicando únicamente los intervalos fieles y utilizando imágenes maestras para el resto. Si el cliente exige una apertura y cierre físicamente continuos sin crossfade, hará falta rodaje controlado o una nueva generación supervisada frame a frame.
