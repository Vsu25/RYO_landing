# QA · Integración pública del menú

**Fecha:** 30.08.2026 · **Estado:** implementado y verificado localmente; publicación pendiente · **Superficie:** landing y `/menu/`

## Resultado

La página paralela del menú ya pertenecía al mismo stack Next.js 16, React 19 y TypeScript. La integración no requirió migración ni un segundo proyecto: se convirtió la ruta temporal `/menu/` en una página permanente del App Router, se incluyeron sus seis derivados WebP en el artifact estático y se activaron los dos enlaces de la sección 06.

La preview conserva la dirección aprobada `02-B · Índice encajado`: azul noche, marfil, dorado, patrón RYŌ, imagen protagonista en escritorio y tarjetas desplegables en tablet/teléfono.

## Contratos verificados

- `Explorar` y `Lista` consumen los mismos diez registros de `src/data/menu.json`.
- La selección contiene siete rolls especiales y tres nigiris; no se incorporaron otras categorías.
- Cada registro conserva ID documental único, fuente, ingredientes, piezas, precio y moneda `REF`.
- Los diez registros resuelven a un asset existente; seis usan `public/menu-media/` y cuatro reutilizan `public/media/`.
- Las imágenes mantienen la etiqueta visible `Visual conceptual`.
- La nota editorial declara que los valores provienen de la carta de referencia y se muestran en REF.
- La ruta declara canonical propio y `robots: noindex, follow` hasta confirmar vigencia y aprobación externa.

## Funcional y accesibilidad

- Los enlaces de la landing abren directamente `?view=explore` o `?view=list`.
- El selector actualiza el modo y sincroniza la URL sin recargar ni alterar el ancla.
- Categorías, anterior/siguiente, selector directo y cartas desplegables responden con controles nativos.
- Flechas izquierda/derecha cambian el plato y conservan el foco del explorador.
- El gesto horizontal exige 48 px y predominio sobre el eje vertical para no bloquear el scroll móvil.
- Existen skip link, foco visible, textos alternativos, estado `aria-live` y alternativa de movimiento reducido.
- El stinger y las transiciones de plato respetan `prefers-reduced-motion`.

## Matriz visual revisada

| Viewport | Resultado |
|---|---|
| 320 × 568 | Sin overflow; switch y cartas dentro del viewport. |
| 390 × 844 | Sin overflow; una carta expandida y controles táctiles completos. |
| 768 × 1024 | Sin overflow; jerarquía y selector conservados. |
| 844 × 390 | Sin overflow horizontal en orientación apaisada. |
| 1280 × 720 | Imagen protagonista, categoría solapada y detalle editorial legibles. |

En navegador se verificaron diez filas en `Lista`, siete cartas para Rolls especiales, tres para Nigiris, cambio por teclado, ausencia de imágenes rotas y sincronización `Lista → Explorar` en la URL.

## Build

`NEXT_PUBLIC_BASE_PATH=/RYO_landing npm run check` pasó TypeScript, build y siete pruebas. El export contiene:

- `out/index.html`
- `out/menu/index.html`
- `out/menu-media/` con seis WebP
- enlaces `/RYO_landing/menu/?view=explore|list`
- URLs de media con un único prefijo `/RYO_landing`

## Riesgos residuales

1. El menú es una preview de portfolio, no una carta oficial: la vigencia editorial del PDF del 31.07.2026 sigue pendiente.
2. Los diez visuales son conceptuales; deben sustituirse o aprobarse expresamente antes de presentarlos como fotografía documental.
3. La aprobación pública de Victor habilita esta preview, no la redistribución independiente de marca, imágenes o contenido.
4. La revisión final debe repetirse en la URL de GitHub Pages después del despliegue y en hardware táctil real.
