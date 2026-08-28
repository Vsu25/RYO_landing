import assert from "node:assert/strict";
import {menuItems} from "./menu-data.js";

assert.equal(menuItems.length,10,"La Foundation debe contener los diez platos transcritos y verificados.");
assert.equal(new Set(menuItems.map(item=>item.id)).size,menuItems.length,"Cada plato necesita un id único.");
assert.deepEqual([...new Set(menuItems.map(item=>item.category))],["Rolls especiales","Nigiris"]);

for(const item of menuItems){
  for(const field of ["id","category","name","description","ingredients","price","source"]){
    assert.notEqual(item[field],undefined,`${item.id}: falta ${field}.`);
  }
  assert.ok(Array.isArray(item.ingredients)&&item.ingredients.length>0,`${item.id}: ingredientes vacíos.`);
  assert.ok(Number.isFinite(item.price)&&item.price>0,`${item.id}: precio inválido.`);
  assert.match(item.source,/^SRC-002/,`${item.id}: fuente inesperada.`);
  if(!item.anatomy) continue;
  assert.ok(item.image,`${item.id}: una anatomía necesita imagen.`);
  assert.equal(item.anatomy.order.length,item.anatomy.points.length,`${item.id}: ingredientes y puntos no coinciden.`);
  assert.ok(item.anatomy.main>=0&&item.anatomy.main<item.anatomy.order.length,`${item.id}: ingrediente principal fuera de rango.`);
  item.anatomy.order.forEach(index=>assert.ok(index>=0&&index<item.ingredients.length,`${item.id}: ingrediente anatómico fuera de rango.`));
}

console.log("CONTENT_DATA_OK · 10 platos · 4 anatomías");
