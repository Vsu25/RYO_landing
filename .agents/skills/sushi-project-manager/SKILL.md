---
name: sushi-project-manager
description: Coordina decisiones, alcance, estructura y estado de Sushi Page cuando se inicia una fase, se incorpora trabajo nuevo, se reorganizan fuentes o una acción afecta costo, arquitectura, contenido, permisos o varios entregables. No se activa para cambios pequeños y locales con alcance ya definido.
---

# Sushi Page Project Manager

Protege la dirección del proyecto sin convertir cada cambio en una ceremonia.

## Fuente de control

Lee `PROJECT.md` y `AGENTS.md` desde la raíz. Después revisa únicamente las fuentes especializadas y archivos afectados por la solicitud. No copies sus contenidos al panel central.

## Decide el nivel de intervención

- **Local:** cambio reversible, de un área, con intención y aceptación claras. Confirma encaje y deja ejecutar; no genera documentación de gestión.
- **Gestionado:** nueva fase, funcionalidad, dependencia, servicio, reorganización, contradicción, permiso pendiente o impacto transversal. Aplica el flujo siguiente.

## Flujo gestionado

1. Define el resultado, la necesidad actual y lo que queda fuera.
2. Identifica fuentes oficiales, archivos afectados, dependencias, permisos y decisiones previas.
3. Compara solo enfoques viables por alcance, costo, mantenimiento, riesgo y reversibilidad.
4. Recomienda la opción mínima que preserve completamente la intención. Reutiliza lo existente y respeta Ponytail para decisiones técnicas.
5. Señala si hace falta aprobación de Victor por costo, acción externa, publicación de terceros, cambio de marca o nueva dirección de producto.
6. Convierte la opción aprobada en una acción concreta con criterios de aceptación y verificación.
7. Al finalizar, actualiza en `PROJECT.md` solo el estado, próxima decisión, backlog o registro que haya cambiado materialmente.

## Reglas de organización

- Cada tema tiene una fuente oficial; enlaza en vez de duplicar.
- Amplía un documento existente cuando conserva la misma responsabilidad.
- Crea un archivo o carpeta solo cuando tenga una responsabilidad estable y diferente.
- Usa `planning-docs/` para especificaciones, `reports/` para resultados fechados, `references/` para consulta externa y `brand/` para identidad oficial.
- No muevas ni retires fuentes sin revisar referencias y confirmar que la nueva ubicación mejora la navegación.
- Registra decisiones duraderas, no conversaciones ni detalles de ejecución pasajeros.
- No confundas `referencia`, `autorizado`, `aprobado`, `implementado` y `verificado`.

## Identidad documental de platos y media

Cuando una tarea documente, produzca o integre platos e imágenes del menú:

1. Usa `planning-docs/content-and-source-inventory.md` como autoridad para el ID estable, la categoría y el nombre editorial exacto del plato. No deduzcas el nombre desde el filename ni mantengas otra lista paralela dentro de esta skill.
2. Contrasta ese registro con `website/menu-data.js` antes de implementar. Conserva una correspondencia inequívoca entre el ID documental, el `id` técnico, el nombre visible y el asset utilizado por ambas vistas del menú.
3. Registra cada imagen contra un único plato o una función editorial explícita. Anota ruta, fuente, fecha y estado (`referencia`, `concepto`, `aprobado`, `implementado` o `autorizado`) sin elevar automáticamente un derivado generado a fotografía factual.
4. Mantén ortografía, mayúsculas y acentos de la fuente oficial. Si una fuente y la implementación difieren, marca la contradicción y corrígela en la autoridad correspondiente antes de integrar el asset.
5. Si una imagen no puede asociarse con certeza a un ID del inventario, déjala pendiente; no la conectes al menú por semejanza visual.

## Respuesta de dirección

Comunica de forma compacta:

- **Decisión:** enfoque recomendado o aplicado.
- **Por qué:** necesidad y principal tradeoff.
- **Impacto:** alcance, archivos, costo, permisos y riesgos relevantes.
- **Siguiente paso:** acción ejecutable o aprobación concreta que falta.

Si existe una opción claramente superior y está autorizada, ejecútala sin detener el trabajo para presentar alternativas ceremoniales.
