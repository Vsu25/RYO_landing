# Website

Foundation local de Sushi Page. Victor autorizó iniciar el vertical slice el 28.08.2026; no está autorizado su despliegue público mientras continúen pendientes permisos, vigencia del menú y contenido operativo.

## Stack

- HTML semántico.
- CSS nativo.
- JavaScript nativo y Web Animations API.
- Sin framework, build, backend, variables de entorno o dependencias de producción.

## Rutas actuales

- `index.html`: landing de cinco actos —caja cerrada, apertura, cuatro rolls, anatomía y Experiencia/contacto—.
- `menu.html`: stinger, categorías verificadas y switch `Explorar / Lista`.
- `menu-data.js`: fuente única de los diez platos verificados.
- `app.js`: interacción compartida por ambas rutas.
- `styles.css`: identidad, responsive, motion y reduced motion.

## Preview local

```bash
python3 -m http.server 4173 --directory website
```

Abrir `http://127.0.0.1:4173/`. No hay comando de build: los archivos servidos son el resultado.

## Límites vigentes

- Las imágenes web son derivados conceptuales aprobados para revisión local; no implican permiso de publicación.
- La demostración se limita intencionalmente a sushi rolls y nigiris. Moneda, precios vigentes, horarios y métodos de pago se consolidarán después de la aprobación del cliente.
- El menú interactivo queda congelado hasta aprobar las nuevas fotografías.
- Los clips físicos de apertura y cierre todavía no existen.
- GSAP se mantiene fuera del stack hasta demostrar una necesidad que CSS y APIs nativas no cubran.
