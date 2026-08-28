# Planning Docs

Fuentes especializadas de estrategia, contenido, experiencia, técnica y ejecución.

## Entrada operativa

1. Consulta [`../PROJECT.md`](../PROJECT.md) para conocer estado, alcance y próxima decisión.
2. Aplica [`../AGENTS.md`](../AGENTS.md) antes de modificar estructura, documentación, diseño o código.
3. Abre [`../website/index.html`](../website/index.html) para revisar la landing implementada.
4. Usa [`../deliverables/design/ryo-unboxed-creative-direction.html`](../deliverables/design/ryo-unboxed-creative-direction.html) y [`../RealizeDesign.md`](../RealizeDesign.md) para la dirección visual.

## Reglas

- Un documento, una responsabilidad.
- Enlazar fuentes en vez de copiar contenido entre archivos.
- Incluir estado y fecha cuando una especificación pueda cambiar.
- Marcar claramente supuestos, pendientes y decisiones aprobadas.
- Una exploración no se vuelve requisito hasta registrarse como decisión.
- Los resultados de pruebas pertenecen a `reports/`, no aquí.

## Documentos iniciales

| Documento | Responsabilidad |
|---|---|
| `../deliverables/design/ryo-unboxed-creative-direction.html` | Entregable revisable de dirección visual, storyboard y producción audiovisual. |
| `../RealizeDesign.md` | Índice operativo y decisiones duraderas del entregable creativo. |
| `project-methodology.md` | Cómo se descubre, decide, diseña, implementa y mejora. |
| `product-brief.md` | Qué producto se quiere crear y para quién. |
| `content-and-source-inventory.md` | Qué material existe, de dónde viene y si puede usarse. |
| `experience-blueprint.md` | Cómo se organiza y se recorre la experiencia. |
| `development-roadmap.md` | En qué orden se construye y qué gate permite avanzar. |
| `technical-spec.md` | Restricciones y decisiones técnicas aprobadas. |

## Estructura operativa

| Ruta | Responsabilidad |
|---|---|
| `brand/` | Identidad y assets aprobados o producidos. |
| `deliverables/` | Entregas visuales y estructurales revisables en HTML. |
| `planning-docs/` | Briefs, inventarios, blueprints, especificaciones y roadmap. |
| `references/` | Material externo con procedencia; no se publica directamente. |
| `reports/` | QA, auditorías y evidencia fechada. |
| `.agents/skills/` | Procedimientos reutilizables del workspace. |
| `website/` | Superficie estática publicada en GitHub Pages. |

`main` publica una lista explícita de archivos de la landing desde `website/` mediante `.github/workflows/pages.yml`. `menu.html` queda fuera del artifact mientras el menú interactivo permanezca congelado.
