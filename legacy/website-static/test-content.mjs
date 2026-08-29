import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {dirname,resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {menuItems} from "./menu-data.js";

const websiteRoot=dirname(fileURLToPath(import.meta.url));
const expected=[
  ["RYO-ROL-FUJI","fuji","Fuji","10 piezas",13,"pág. 10"],
  ["RYO-ROL-YUZU","yuzu","Yuzu","10 piezas",11,"pág. 11"],
  ["RYO-ROL-KAMASUTRA","kamasutra","Kamasutra","6 piezas",14,"pág. 11"],
  ["RYO-ROL-RENDI","rendi","Rendi","10 piezas",15,"pág. 12"],
  ["RYO-ROL-SEI","sei","Sei Exclusive","10 piezas",11,"pág. 10"],
  ["RYO-ROL-KOGA","koga","Koga Explosion","10 piezas",11,"pág. 10"],
  ["RYO-ROL-PLAYBOY","playboy","Playboy","10 piezas",10,"pág. 12"],
  ["RYO-NIG-TUNA","nigiri-tuna","Nigiri Tuná","2 piezas",5,"pág. 5"],
  ["RYO-NIG-SALMON","nigiri-salmon","Nigiri Salmón","2 piezas",5,"pág. 5"],
  ["RYO-NIG-BLANCA","pesca-blanca","Pesca Blanca","2 piezas",5,"pág. 5"]
];

assert.equal(menuItems.length,10,"La Foundation debe contener los diez platos transcritos y verificados.");
assert.equal(new Set(menuItems.map(item=>item.id)).size,menuItems.length,"Cada plato necesita un id único.");
assert.equal(new Set(menuItems.map(item=>item.documentId)).size,menuItems.length,"Cada plato necesita un ID documental único.");
assert.deepEqual([...new Set(menuItems.map(item=>item.category))],["Rolls especiales","Nigiris"]);
assert.deepEqual(menuItems.map(item=>[item.documentId,item.id,item.name,item.pieces,item.price,item.source.split(" · ")[1]]),expected,"La identidad editorial o la fuente de un plato cambió.");

for(const item of menuItems){
  for(const field of ["documentId","id","category","name","description","ingredients","price","currency","pieces","image","imageAlt","imageStatus","source"]){
    assert.notEqual(item[field],undefined,`${item.id}: falta ${field}.`);
  }
  assert.ok(Array.isArray(item.ingredients)&&item.ingredients.length>0,`${item.id}: ingredientes vacíos.`);
  assert.ok(Number.isFinite(item.price)&&item.price>0,`${item.id}: precio inválido.`);
  assert.equal(item.currency,"REF",`${item.id}: no se debe asumir una moneda.`);
  assert.equal(item.imageStatus,"conceptual",`${item.id}: el estado visual debe ser explícito.`);
  assert.ok(item.imageAlt.length>20,`${item.id}: alt insuficiente.`);
  assert.ok(existsSync(resolve(websiteRoot,item.image)),`${item.id}: no existe ${item.image}.`);
  assert.match(item.source,/^SRC-002/,`${item.id}: fuente inesperada.`);
  if(!item.anatomy) continue;
  assert.ok(item.image,`${item.id}: una anatomía necesita imagen.`);
  assert.equal(item.anatomy.order.length,item.anatomy.points.length,`${item.id}: ingredientes y puntos no coinciden.`);
  assert.ok(item.anatomy.main>=0&&item.anatomy.main<item.anatomy.order.length,`${item.id}: ingrediente principal fuera de rango.`);
  item.anatomy.order.forEach(index=>assert.ok(index>=0&&index<item.ingredients.length,`${item.id}: ingrediente anatómico fuera de rango.`));
}

const menuHtml=readFileSync(resolve(websiteRoot,"menu.html"),"utf8");
const appJs=readFileSync(resolve(websiteRoot,"app.js"),"utf8");
assert.match(menuHtml,/data-menu-explorer/);
assert.match(menuHtml,/data-menu-catalogue/);
assert.match(menuHtml,/data-menu-card-list/);
assert.match(menuHtml,/vendor\/gsap\.min\.js/);
assert.match(appJs,/item\.ingredients\.map/,"Lista y Explorar deben usar los ingredientes de la fuente única.");
assert.match(appJs,/renderImage\(catalogue/,"Lista debe usar las mismas imágenes de la fuente única.");
assert.match(appJs,/window\.gsap/,"La selección visual debe usar el GSAP local ya aprobado.");
assert.match(appJs,/function renderCards/,"Tablet y teléfono necesitan sus tarjetas desplegables.");

console.log("CONTENT_DATA_OK · 10 platos · 10 assets · 4 anatomías");
