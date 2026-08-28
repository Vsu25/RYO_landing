import {menuItems} from "./menu-data.js";

const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)");

function restartStinger(stinger){
  const animated=stinger.querySelectorAll(".stinger__door,.stinger__light,.stinger__seal");
  animated.forEach(element=>element.style.animation="none");
  stinger.offsetWidth;
  animated.forEach(element=>element.style.removeProperty("animation"));
}

const stinger=document.querySelector("[data-stinger]");
const replayStinger=document.querySelector("[data-replay-stinger]");
if(stinger&&replayStinger) replayStinger.addEventListener("click",()=>restartStinger(stinger));

function setupAnatomy(){
  const root=document.querySelector("[data-anatomy]");
  if(!root) return;
  const items=menuItems.filter(item=>item.anatomy);
  const tabs=root.querySelector("[data-anatomy-tabs]");
  const image=root.querySelector("[data-anatomy-image]");
  const name=root.querySelector("[data-anatomy-name]");
  const description=root.querySelector("[data-anatomy-description]");
  const ingredients=root.querySelector("[data-anatomy-ingredients]");
  const connectors=root.querySelector("[data-anatomy-connectors]");
  const status=root.querySelector("[data-anatomy-status]");
  const detailMedia=matchMedia("(min-width: 981px)");
  let currentItem;

  function render(item){
    currentItem=item;
    tabs.querySelectorAll("button").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.id===item.id)));
    image.src=item.image;
    image.alt=`${item.name} frente a la caja RYŌ`;
    name.textContent=item.name;
    description.textContent=item.description;
    ingredients.innerHTML=item.anatomy.order.map((ingredientIndex,index)=>`<li tabindex="${detailMedia.matches?0:-1}" data-connector="${index}" class="anatomy-ingredient${index===item.anatomy.main?" anatomy-ingredient--main":""}"><span>${item.ingredients[ingredientIndex]}</span><small>${index===item.anatomy.main?"Ingrediente principal":""}</small></li>`).join("");
    connectors.innerHTML=item.anatomy.points.map(([x,y],index)=>{const endY=22+index*7.8;return `<g data-line="${index}"><path d="M ${x} ${y} Q 60 ${endY-5} 69 ${endY}"/><circle cx="${x}" cy="${y}" r=".72"/></g>`}).join("");
    ingredients.querySelectorAll("[data-connector]").forEach(ingredient=>{
      const line=connectors.querySelector(`[data-line="${ingredient.dataset.connector}"]`);
      ["mouseenter","focus"].forEach(event=>ingredient.addEventListener(event,()=>line.classList.add("is-active")));
      ["mouseleave","blur"].forEach(event=>ingredient.addEventListener(event,()=>line.classList.remove("is-active")));
    });
    status.textContent=`${item.name} seleccionado`;
    if(!reducedMotion.matches) root.querySelector(".anatomy-stage").animate([{opacity:.65},{opacity:1}],{duration:300,easing:"ease-out"});
  }

  tabs.innerHTML=items.map((item,index)=>`<button type="button" data-id="${item.id}" aria-pressed="${index===0}">${item.name}</button>`).join("");
  tabs.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>render(items.find(item=>item.id===button.dataset.id))));
  render(items.find(item=>item.id==="sei")||items[0]);
  detailMedia.addEventListener("change",()=>render(currentItem));

  document.querySelectorAll("[data-roll-jump]").forEach(link=>link.addEventListener("click",event=>{
    event.preventDefault();
    tabs.querySelector(`[data-id="${link.dataset.rollJump}"]`)?.click();
    root.scrollIntoView({behavior:reducedMotion.matches?"auto":"smooth",block:"start"});
  }));
}

function setupLandingReveal(){
  const items=[...document.querySelectorAll("[data-reveal]")];
  if(!items.length||reducedMotion.matches||!("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("has-reveal");
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  }),{threshold:.14});
  items.forEach(item=>observer.observe(item));
}

function setupMenu(){
  const explorer=document.querySelector("[data-menu-explorer]");
  if(!explorer) return;
  const catalogue=document.querySelector("[data-menu-catalogue]");
  const categoriesRoot=document.querySelector("[data-menu-categories]");
  const viewButtons=[...document.querySelectorAll("[data-menu-view]")];
  const categories=[...new Set(menuItems.map(item=>item.category))];
  let category=categories[0];
  let current=0;
  const filtered=()=>menuItems.filter(item=>item.category===category);

  function renderExplorer(){
    const items=filtered();
    const item=items[current];
    explorer.querySelector("[data-dish-visual]").innerHTML=item.image?`<img src="${item.image}" width="1672" height="940" alt="${item.name} frente a la caja RYŌ">`:`<div class="dish-placeholder">${item.name}<small>Fotografía pendiente</small></div>`;
    explorer.querySelector("[data-dish-category]").textContent=item.category;
    explorer.querySelector("[data-dish-count]").textContent=`${String(current+1).padStart(2,"0")} / ${String(items.length).padStart(2,"0")}`;
    explorer.querySelector("[data-dish-name]").textContent=item.name;
    explorer.querySelector("[data-dish-description]").textContent=item.description;
    explorer.querySelector("[data-dish-ingredients]").innerHTML=item.ingredients.map(ingredient=>`<li>${ingredient}</li>`).join("");
    explorer.querySelector("[data-dish-price]").textContent=`${item.price} · moneda pendiente`;
    explorer.querySelector("[data-dish-pieces]").textContent=item.pieces||"Por confirmar";
    const dots=explorer.querySelector("[data-progress-dots]");
    dots.innerHTML=items.map((dish,index)=>`<button type="button" data-index="${index}" aria-label="Ver ${dish.name}" aria-current="${index===current}"></button>`).join("");
    dots.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>{current=Number(button.dataset.index);renderExplorer()}));
    if(!reducedMotion.matches) explorer.animate([{opacity:.65,transform:"translateY(6px)"},{opacity:1,transform:"translateY(0)"}],{duration:280,easing:"cubic-bezier(.2,.75,.2,1)"});
  }

  function renderCatalogue(){
    catalogue.innerHTML=filtered().map(item=>`<article><div><small>${item.category} · ${item.source}</small><h2>${item.name}</h2><p>${item.description}</p><small>${item.pieces||"Presentación por confirmar"}</small></div><div class="catalogue-price"><strong>${item.price}</strong><span>Moneda pendiente</span></div></article>`).join("");
  }

  function setCategory(nextCategory){
    category=nextCategory;
    current=0;
    categoriesRoot.querySelectorAll("button").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.category===category)));
    renderExplorer();
    renderCatalogue();
  }

  function setView(view){
    const exploring=view==="explore";
    explorer.hidden=!exploring;
    catalogue.hidden=exploring;
    viewButtons.forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.menuView===view)));
  }

  function move(step){
    const length=filtered().length;
    current=(current+step+length)%length;
    renderExplorer();
  }

  categoriesRoot.innerHTML=categories.map((item,index)=>`<button type="button" data-category="${item}" aria-pressed="${index===0}">${item}</button>`).join("");
  categoriesRoot.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>setCategory(button.dataset.category)));
  viewButtons.forEach(button=>button.addEventListener("click",()=>setView(button.dataset.menuView)));
  explorer.querySelector("[data-previous-dish]").addEventListener("click",()=>move(-1));
  explorer.querySelector("[data-next-dish]").addEventListener("click",()=>move(1));
  explorer.addEventListener("keydown",event=>{if(event.key==="ArrowLeft"){event.preventDefault();move(-1)}if(event.key==="ArrowRight"){event.preventDefault();move(1)}});
  renderExplorer();
  renderCatalogue();
}

setupAnatomy();
setupLandingReveal();
setupMenu();
