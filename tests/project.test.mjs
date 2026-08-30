import assert from "node:assert/strict";
import {existsSync, readFileSync, readdirSync, statSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import test from "node:test";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const menuItems = JSON.parse(readFileSync(resolve(projectRoot, "src/data/menu.json"), "utf8"));
const publicMedia = resolve(projectRoot, "public/media");
const publicMenuMedia = resolve(projectRoot, "public/menu-media");
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

test("el menú público contiene los seis visuales conceptuales seleccionados", () => {
  const expected = [
    "menu-fuji.webp", "menu-kamasutra.webp", "menu-nigiri-salmon.webp",
    "menu-nigiri-tuna.webp", "menu-pesca-blanca.webp", "menu-rendi.webp",
  ];
  assert.deepEqual(readdirSync(publicMenuMedia).sort(), expected);
  for (const item of menuItems) {
    assert.ok(existsSync(resolve(projectRoot, "public", item.image.replace(/^\//, ""))), `${item.id}: falta ${item.image}`);
  }
});

test("el export estático incluye la ruta y los visuales del menú", () => {
  const out = resolve(projectRoot, "out");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  assert.ok(existsSync(resolve(out, "index.html")), "falta out/index.html; ejecuta npm run build primero");
  assert.ok(existsSync(resolve(out, "menu/index.html")), "falta la ruta pública /menu/");
  assert.ok(existsSync(resolve(out, "menu-media/menu-fuji.webp")), "faltan los visuales públicos del menú");
  const indexHtml = readFileSync(resolve(out, "index.html"), "utf8");
  const menuHtml = readFileSync(resolve(out, "menu/index.html"), "utf8");
  assert.ok(indexHtml.includes(`href="${basePath}/menu/?view=explore#menu-content"`), "falta el enlace prefijado a Explorar");
  assert.ok(indexHtml.includes(`href="${basePath}/menu/?view=list#menu-content"`), "falta el enlace prefijado a Lista");
  assert.ok(menuHtml.includes(`src="${basePath}/menu-media/menu-fuji.webp"`), "falta el prefijo de media del menú");
  assert.match(menuHtml, /content="noindex, follow"/, "la preview conceptual debe permanecer fuera de indexación");
  const emittedText = walk(out)
    .filter((path) => /\.(?:html|js|json|txt|xml)$/.test(path))
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  assert.match(emittedText, /Kamasutra/);
  assert.match(emittedText, /Nigiri Tuná/);
  assert.match(emittedText, /menu-fuji\.webp/);
  assert.match(emittedText, /Playboy/);
  assert.match(emittedText, /Sei Exclusive/);
  assert.match(emittedText, /Presentación del roll/);
  assert.match(emittedText, /El corte es nuestro/);
  assert.match(emittedText, /Ya viste el detalle\. Ahora descubre el resto\./);
  assert.doesNotMatch(emittedText, /Vista en preparación/);
  assert.match(emittedText, /\/menu\/\?view=explore#menu-content/);
  assert.match(emittedText, /\/menu\/\?view=list#menu-content/);
  assert.doesNotMatch(emittedText, /La experiencia empieza antes del primer bocado/);
  assert.doesNotMatch(emittedText, /Descubre cuatro rolls/);
  assert.match(emittedText, /https:\/\/meetvsu\.dev/);
  assert.doesNotMatch(emittedText, /https:\/\/github\.com\/Vsu25/);
});

test("el README funciona como acceso público al proyecto", () => {
  assert.match(readme, /https:\/\/vsu25\.github\.io\/RYO_landing\//);
  assert.match(readme, /RYŌ · El toque final/);
  assert.doesNotMatch(readme, /wa\.me|instagram\.com|meetvsu\.dev|github\.com/);
});

test("la sección 06 conecta las dos vistas del menú público", () => {
  assert.match(homePage, /06 · Explora el menú/);
  assert.match(homePage, /\/menu\/\?view=explore#menu-content/);
  assert.match(homePage, /\/menu\/\?view=list#menu-content/);
});

test("el encuadre móvil permanece estable y el cierre no rebobina el scroll", () => {
  assert.match(scrollStory, /width:min\(220vw,177\.778svh\)/);
  assert.match(scrollStory, /\.story-media-frame \{ left:50%; \}/);
  assert.match(scrollStory, /\.scroll-connectors,\.anatomy-marker-layer \{ left:58%; \}/);
  assert.doesNotMatch(scrollStory, /story-media-frame,.scroll-connectors,.anatomy-marker-layer \{ top:31%; left:66%/);
  assert.match(scrollExperience, /const anatomyShiftX = phoneViewport \? window\.innerWidth \* 0\.08 : 0/);
  assert.match(scrollExperience, /x: anatomyShiftX/);
  assert.match(scrollExperience, /scale: closingScale, x: 0/);
  assert.doesNotMatch(scrollExperience, /closingCheckpointUsed|closingSettleTimer|closingStartProgress|closingEndProgress/);
  assert.doesNotMatch(scrollExperience, /self\.start \+ \(self\.end - self\.start\) \* closingStartProgress/);
  assert.doesNotMatch(scrollStory, /min-height:900px|250vw/);
  const phones = [[320, 568], [360, 740], [360, 800], [375, 667], [375, 812], [390, 844], [393, 852], [412, 915], [430, 932]];
  for (const [width, height] of phones) {
    const frameWidth = Math.min(width * 2.2, height * 1.77778);
    assert.equal(frameWidth, width * 2.2, `${width}×${height}: el alto alteró el recorte`);
  }
});
