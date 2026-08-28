# Website

Landing estática de RYŌ Sushi. Victor autorizó su publicación para revisión el 28.08.2026. El menú interactivo permanece congelado y fuera de la navegación pública hasta aprobar sus fotografías.

## Stack

- HTML semántico.
- CSS nativo.
- JavaScript nativo y Web Animations API.
- Sin framework, build, backend, variables de entorno o dependencias de producción.

## Rutas actuales

- `index.html`: landing de cuatro actos —caja/apertura, cuatro rolls, anatomía y Experiencia/contacto—.
- `menu.html`: stinger, categorías verificadas y switch `Explorar / Lista`.
- `menu-data.js`: fuente única de los diez platos verificados.
- `app.js`: interacción compartida por ambas rutas.
- `styles.css`: identidad, responsive, motion y reduced motion.

## Preview local

```bash
python3 -m http.server 4173 --directory website
```

Abrir `http://127.0.0.1:4173/`. No hay comando de build: los archivos servidos son el resultado.

## Producción

`.github/workflows/pages.yml` publica en <https://vsu25.github.io/RYO_landing/> una lista explícita de archivos de esta carpeta cada vez que cambia `main`. `menu.html` no se incluye mientras el menú esté congelado.

## Límites vigentes

- Las imágenes web actuales están autorizadas por Victor para esta landing pública de revisión; no implican permiso de redistribución o uso independiente.
- La demostración se limita intencionalmente a sushi rolls y nigiris. Moneda, precios vigentes, horarios y métodos de pago se consolidarán después de la aprobación del cliente.
- El menú interactivo queda congelado hasta aprobar las nuevas fotografías.
- Los clips físicos de apertura y cierre todavía no existen.
- GSAP se mantiene fuera del stack hasta demostrar una necesidad que CSS y APIs nativas no cubran.
