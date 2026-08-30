import assert from "node:assert/strict";
import {existsSync, readFileSync, readdirSync, statSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import test from "node:test";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const menuItems = JSON.parse(readFileSync(resolve(projectRoot, "src/data/menu.json"), "utf8"));
const publicMedia = resolve(projectRoot, "public/media");
const readme = readFileSync(resolve(projectRoot, "README.md"), "utf8");
const scrollStory = readFileSync(resolve(projectRoot, "src/app/scroll-story.css"), "utf8");
const homePage = readFileSync(resolve(projectRoot, "src/app/page.tsx"), "utf8");
const scrollExperience = readFileSync(resolve(projectRoot, "src/components/landing/ScrollExperience.tsx"), "utf8");

const walk = (directory) => readdirSync(directory).flatMap((name) => {
  const path = resolve(directory, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});

test("la fuente del menú conserva diez platos documentados", () => {
  assert.equal(menuItems.length, 10);
  assert.equal(new Set(menuItems.map((item) => item.id)).size, 10);
  assert.equal(new Set(menuItems.map((item) => item.documentId)).size, 10);
  assert.deepEqual(menuItems.filter((item) => item.anatomy).map((item) => item.id), ["yuzu", "sei", "koga", "playboy"]);
  for (const item of menuItems) {
    assert.ok(item.ingredients.length > 0, `${item.id}: ingredientes vacíos`);
    assert.equal(item.currency, "REF", `${item.id}: moneda no verificada`);
    assert.match(item.source, /^SRC-002/, `${item.id}: fuente inesperada`);
    if (!item.anatomy) continue;
    assert.equal(item.anatomy.order.length, item.anatomy.points.length, `${item.id}: puntos incompletos`);
    assert.ok(item.anatomy.main >= 0 && item.anatomy.main < item.anatomy.order.length, `${item.id}: principal fuera de rango`);
    assert.ok(item.anatomy.featured.length >= 4 && item.anatomy.featured.length <= 5, `${item.id}: selección móvil fuera de rango`);
    assert.equal(new Set(item.anatomy.featured).size, item.anatomy.featured.length, `${item.id}: selección móvil duplicada`);
    assert.ok(item.anatomy.featured.includes(item.anatomy.main), `${item.id}: falta el ingrediente principal en móvil`);
    assert.ok(item.anatomy.featured.every((line) => line >= 0 && line < item.anatomy.order.length), `${item.id}: línea móvil fuera de rango`);
  }
});

test("la landing pública contiene solo los doce masters aprobados", () => {
  const expected = [
    "box-closed.webp", "box-front.jpg", "box-open.webp",
    "roll-koga.webp", "roll-playboy.webp", "roll-sei.webp", "roll-yuzu.webp",
    "ryo-overlapping-arcs-pattern.png", "ryo-scroll-intro-v2.mp4",
    "ryo-scroll-open-playboy-v2.mp4", "ryo-scroll-return-close-v2.mp4",
    "ryo-wordmark-gold.png",
  ];
  assert.deepEqual(readdirSync(publicMedia).sort(), expected);
});

test("el export estático excluye la ruta y los visuales locales del menú", () => {
  const out = resolve(projectRoot, "out");
  assert.ok(existsSync(resolve(out, "index.html")), "falta out/index.html; ejecuta npm run build primero");
  assert.equal(existsSync(resolve(out, "menu")), false, "la ruta local /menu no debe publicarse");
  assert.equal(existsSync(resolve(out, "local-menu-media")), false, "los visuales locales del menú no deben publicarse");
  const emittedText = walk(out)
    .filter((path) => /\.(?:html|js|json|txt|xml)$/.test(path))
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  assert.doesNotMatch(emittedText, /Kamasutra|Nigiri Tuná|menu-fuji\.webp/, "el bundle público filtró contenido del menú local");
  assert.match(emittedText, /Playboy/);
  assert.match(emittedText, /Sei Exclusive/);
  assert.match(emittedText, /Presentación del roll/);
  assert.match(emittedText, /El corte es nuestro/);
  assert.match(emittedText, /Ya viste el detalle\. Ahora descubre el resto\./);
  assert.match(emittedText, /Vista en preparación/);
  assert.doesNotMatch(emittedText, /\/menu\/\?view=(?:explore|list)/, "la invitación pública no debe enlazar una ruta excluida");
  assert.doesNotMatch(emittedText, /La experiencia empieza antes del primer bocado/);
  assert.doesNotMatch(emittedText, /Descubre cuatro rolls/);
  assert.match(emittedText, /https:\/\/meetvsu\.dev/);
  assert.doesNotMatch(emittedText, /https:\/\/github\.com\/Vsu25/);
});

test("el README funciona como acceso público al proyecto", () => {
  assert.match(readme, /https:\/\/vsu25\.github\.io\/RYO_landing\//);
  assert.match(readme, /RYŌ · El toque final/);
  assert.match(readme, /https:\/\/meetvsu\.dev/);
});

test("la sección 06 conecta las dos vistas del menú local", () => {
  assert.match(homePage, /06 · Explora el menú/);
  assert.match(homePage, /\/menu\/\?view=explore#menu-content/);
  assert.match(homePage, /\/menu\/\?view=list#menu-content/);
});

test("el encuadre móvil no cambia en teléfonos altos", () => {
  assert.match(scrollStory, /width:min\(220vw,177\.778svh\)/);
  assert.match(scrollStory, /\.story-media-frame \{ left:50%; \}/);
  assert.match(scrollStory, /\.scroll-connectors,\.anatomy-marker-layer \{ left:66%; \}/);
  assert.doesNotMatch(scrollStory, /story-media-frame,.scroll-connectors,.anatomy-marker-layer \{ top:31%; left:66%/);
  assert.match(scrollExperience, /const anatomyShiftX = phoneViewport \? window\.innerWidth \* 0\.16 : 0/);
  assert.match(scrollExperience, /x: anatomyShiftX/);
  assert.match(scrollExperience, /scale: closingScale, x: 0/);
  assert.doesNotMatch(scrollStory, /min-height:900px|250vw/);
  const phones = [[320, 568], [360, 740], [360, 800], [375, 667], [375, 812], [390, 844], [393, 852], [412, 915], [430, 932]];
  for (const [width, height] of phones) {
    const frameWidth = Math.min(width * 2.2, height * 1.77778);
    assert.equal(frameWidth, width * 2.2, `${width}×${height}: el alto alteró el recorte`);
  }
});
