import assert from "node:assert/strict";
import {existsSync, readFileSync, readdirSync, statSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import test from "node:test";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const menuItems = JSON.parse(readFileSync(resolve(projectRoot, "src/data/menu.json"), "utf8"));
const publicMedia = resolve(projectRoot, "public/media");

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
  assert.match(emittedText, /https:\/\/meetvsu\.dev/);
  assert.doesNotMatch(emittedText, /https:\/\/github\.com\/Vsu25/);
});
