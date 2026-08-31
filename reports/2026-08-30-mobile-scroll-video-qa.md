# QA · Scrubbing móvil RYŌ

**Fecha:** 30.08.2026 · **Estado:** implementación local verificada; hardware y GitHub Pages pendientes

## Hallazgo

Los tres MP4 V2 contenían un único keyframe en `0 s`. Durante un barrido móvil, GSAP mantenía `currentTime` a un promedio de `8 ms` del objetivo y sin retrocesos, pero el elemento de video caía repetidamente de `readyState 4` a `readyState 1`: el tiempo cambiaba antes de que el decodificador pudiera presentar el cuadro correspondiente.

## Corrección

- Se generaron tres derivados H.264 de 960 × 540 px, sin audio y con `faststart`.
- GOP 6 a 24 fps: keyframe cada `0,25 s`.
- Intro y apertura contienen 32 keyframes; cierre contiene 24.
- Los `<source media="(max-width: 599px)">` sirven estos derivados únicamente en teléfono.
- `scrub: true` vincula el timeline móvil directamente con el progreso; tablet y escritorio conservan su amortiguación.
- No se añadió ninguna dependencia a la aplicación. FFmpeg se usó solo como herramienta local de derivación.

## Criterios de cierre

- Progreso monotónico hacia adelante y atrás.
- Barra, timeline y cuadro presentado sin deriva perceptible.
- Cierre alcanzable sin snap ni corrección automática de `scrollY`.
- Verificación en 390 × 844, 360 × 800 y 430 × 932 sobre el artifact y luego en teléfono físico.

## Evidencia local

| Matriz | Resultado |
|---|---|
| 360 × 800 | Apertura monotónica en ambos sentidos; `readyState 4` en 16/16 muestras. |
| 390 × 844 | Apertura monotónica en ambos sentidos; `readyState 4` en 28/28 muestras. |
| 430 × 932 | Apertura monotónica en ambos sentidos; `readyState 4` en 16/16 muestras. |
| Intro y cierre · 390 × 844 | `readyState 4` en 18/18 muestras; cierre monotónico hacia adelante y atrás. |
| Barra vs. timeline · 390 × 844 | Diferencia máxima normalizada `0,00005`. |
| Escritorio · 1280 × 720 | Continúa seleccionando exclusivamente los tres V2 originales. |

La validación final pendiente es repetir el gesto manual sobre GitHub Pages en un teléfono físico después del despliegue.
