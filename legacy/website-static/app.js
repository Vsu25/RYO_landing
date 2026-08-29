import {menuItems} from "./menu-data.js?v=20260828-4";

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
    image.alt=item.imageAlt;
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
  const gsap=window.gsap;
  const catalogue=document.querySelector("[data-menu-catalogue]");
  const categoriesRoot=document.querySelector("[data-menu-categories]");
  const cardList=explorer.querySelector("[data-menu-card-list]");
  const status=document.querySelector("[data-menu-status]");
  const viewButtons=[...document.querySelectorAll("[data-menu-view]")];
  const categories=[...new Set(menuItems.map(item=>item.category))];
  let category=categories[0];
  let current=0;
  let pointerStart;
  const filtered=()=>menuItems.filter(item=>item.category===category);
  explorer.dataset.motion=gsap?"gsap":"static";

  function showPlaceholder(container,item){
    container.innerHTML=`<span class="dish-placeholder"><span>${item.name}</span><small>Visual no disponible</small></span>`;
  }

  function renderImage(container,item,loading="eager"){
    container.replaceChildren();
    if(!item.image){showPlaceholder(container,item);return}
    const image=new Image();
    image.src=item.image;
    image.alt=item.imageAlt;
    image.width=1672;
    image.height=940;
    image.loading=loading;
    image.decoding="async";
    image.draggable=false;
    image.addEventListener("error",()=>showPlaceholder(container,item),{once:true});
    container.append(image);
    if(item.imageStatus==="conceptual"){
      const caption=document.createElement("span");
      caption.className="visual-caption";
      caption.textContent="Visual conceptual";
      container.append(caption);
    }
  }

  function renderPicker(items,focusPicker){
    const picker=explorer.querySelector("[data-dish-picker]");
    picker.innerHTML=items.map((item,index)=>`<button type="button" data-index="${index}" aria-current="${index===current}" tabindex="${index===current?0:-1}">${item.name}</button>`).join("");
    if(focusPicker) picker.querySelector(`[data-index="${current}"]`)?.focus();
  }

  function renderCards(items,focusCardId){
    cardList.innerHTML=items.map((item,index)=>{
      const open=index===current;
      return `<article class="menu-card${open?" is-open":""}" data-card-id="${item.id}" data-card-category="${item.category}"><button class="menu-card__trigger" type="button" data-card-index="${index}" aria-expanded="${open}" aria-controls="menu-card-detail-${item.id}"><span class="menu-card__figure" data-card-image="${item.id}"></span><span class="menu-card__action"><small>${String(index+1).padStart(2,"0")} · ${item.category}</small><strong>${item.name}</strong><em>${open?"Selección activa":"Ver plato"}</em></span></button><div class="menu-card__detail" id="menu-card-detail-${item.id}" aria-hidden="${!open}"><div><p>${item.description}</p><ul class="ingredient-chips" aria-label="Ingredientes confirmados">${item.ingredients.map(ingredient=>`<li>${ingredient}</li>`).join("")}</ul><div class="menu-card__meta"><strong>${item.price} ${item.currency}</strong><span>${item.pieces}</span></div></div></div></article>`;
    }).join("");
    items.forEach((item,index)=>renderImage(cardList.querySelector(`[data-card-image="${item.id}"]`),item,index===current?"eager":"lazy"));
    if(focusCardId) cardList.querySelector(`[data-card-id="${focusCardId}"] .menu-card__trigger`)?.focus({preventScroll:true});
  }

  function animateSelection(direction){
    if(reducedMotion.matches||!gsap) return;
    const image=explorer.querySelector("[data-dish-visual] img");
    const copy=[...explorer.querySelectorAll(".dish-copy > :not(.explorer-controls)")];
    const activeCategory=categoriesRoot.querySelector('[aria-pressed="true"]');
    const activeCard=cardList.querySelector(".is-open");
    const targets=[image,...copy,activeCategory,activeCard].filter(Boolean);
    gsap.killTweensOf(targets);
    if(image) gsap.fromTo(image,{autoAlpha:.58,x:direction*18,scale:1.025},{autoAlpha:1,x:0,scale:1,duration:.34,ease:"power2.out",overwrite:"auto",clearProps:"transform,opacity,visibility"});
    gsap.fromTo(copy,{autoAlpha:0,y:10},{autoAlpha:1,y:0,duration:.28,ease:"power2.out",stagger:.025,overwrite:"auto",clearProps:"transform,opacity,visibility"});
    if(activeCategory) gsap.fromTo(activeCategory,{y:9},{y:0,duration:.28,ease:"power2.out",overwrite:"auto",clearProps:"transform"});
    if(activeCard) gsap.fromTo(activeCard,{autoAlpha:.72,y:8},{autoAlpha:1,y:0,duration:.28,ease:"power2.out",overwrite:"auto",clearProps:"transform,opacity,visibility"});
  }

  function renderExplorer({focusPicker=false,focusCardId,direction=1}={}){
    const items=filtered();
    const item=items[current];
    const controls=[explorer.querySelector("[data-previous-dish]"),explorer.querySelector("[data-next-dish]")];
    if(!item){
      showPlaceholder(explorer.querySelector("[data-dish-visual]"),{name:"Sin platos"});
      explorer.querySelector("[data-dish-name]").textContent="Sin platos disponibles";
      explorer.querySelector("[data-dish-description]").textContent="Esta categoría todavía no tiene platos documentados.";
      explorer.querySelector("[data-dish-ingredients]").replaceChildren();
      explorer.querySelector("[data-dish-picker]").replaceChildren();
      cardList.replaceChildren();
      controls.forEach(button=>button.disabled=true);
      status.textContent="No hay platos disponibles en esta categoría.";
      return;
    }
    controls.forEach(button=>button.disabled=items.length<2);
    renderImage(explorer.querySelector("[data-dish-visual]"),item);
    explorer.querySelector("[data-dish-category]").textContent=item.category;
    explorer.querySelector("[data-dish-count]").textContent=`${String(current+1).padStart(2,"0")} / ${String(items.length).padStart(2,"0")}`;
    explorer.querySelector("[data-dish-name]").textContent=item.name;
    explorer.querySelector("[data-dish-description]").textContent=item.description;
    explorer.querySelector("[data-dish-ingredients]").innerHTML=item.ingredients.map(ingredient=>`<li>${ingredient}</li>`).join("");
    explorer.querySelector("[data-dish-price]").textContent=`${item.price} ${item.currency}`;
    explorer.querySelector("[data-dish-pieces]").textContent=item.pieces;
    renderPicker(items,focusPicker);
    renderCards(items,focusCardId);
    status.textContent=`${item.name}, ${current+1} de ${items.length}, ${item.category}.`;
    const next=items[(current+1)%items.length];
    if(next?.image) new Image().src=next.image;
    animateSelection(direction);
  }

  function renderCatalogue(){
    const items=menuItems;
    catalogue.innerHTML=items.map(item=>`<article><figure data-list-image="${item.id}"></figure><div class="catalogue-copy"><small>${item.documentId} · ${item.source}</small><h2>${item.name}</h2><p>${item.description}</p><ul class="ingredient-chips" aria-label="Ingredientes confirmados">${item.ingredients.map(ingredient=>`<li>${ingredient}</li>`).join("")}</ul><small>${item.pieces}</small></div><div class="catalogue-price"><strong>${item.price}</strong><span>${item.currency}</span></div></article>`).join("");
    items.forEach(item=>renderImage(catalogue.querySelector(`[data-list-image="${item.id}"]`),item,"lazy"));
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
    status.textContent=exploring?"Vista Explorar activa.":"Vista Lista activa.";
  }

  function move(step,{focusPicker=false}={}){
    const length=filtered().length;
    if(!length) return;
    current=(current+step+length)%length;
    renderExplorer({focusPicker,direction:Math.sign(step)});
  }

  categoriesRoot.innerHTML=categories.map((item,index)=>{
    const count=menuItems.filter(dish=>dish.category===item).length;
    const subtitle=item==="Nigiris"?"Dos piezas por selección":"Selección de autor";
    return `<button type="button" data-category="${item}" aria-pressed="${index===0}"><small>${String(index+1).padStart(2,"0")} · ${String(count).padStart(2,"0")} platos</small><strong>${item}</strong><span>${subtitle}</span></button>`;
  }).join("");
  categoriesRoot.querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>setCategory(button.dataset.category)));
  viewButtons.forEach(button=>button.addEventListener("click",()=>setView(button.dataset.menuView)));
  explorer.querySelector("[data-dish-picker]").addEventListener("click",event=>{
    const button=event.target.closest("button[data-index]");
    if(!button) return;
    const next=Number(button.dataset.index);
    const direction=next>=current?1:-1;
    current=next;
    renderExplorer({focusPicker:true,direction});
  });
  cardList.addEventListener("click",event=>{
    const button=event.target.closest("button[data-card-index]");
    if(!button) return;
    const items=filtered();
    const next=Number(button.dataset.cardIndex);
    const direction=next>=current?1:-1;
    current=next;
    renderExplorer({focusCardId:items[current].id,direction});
    cardList.querySelector(".is-open")?.scrollIntoView({behavior:reducedMotion.matches?"auto":"smooth",block:"nearest"});
  });
  explorer.querySelector("[data-previous-dish]").addEventListener("click",()=>move(-1));
  explorer.querySelector("[data-next-dish]").addEventListener("click",()=>move(1));
  explorer.addEventListener("keydown",event=>{
    const focusPicker=Boolean(event.target.closest("[data-dish-picker]"));
    if(event.key==="ArrowLeft"){event.preventDefault();move(-1,{focusPicker})}
    if(event.key==="ArrowRight"){event.preventDefault();move(1,{focusPicker})}
  });
  const visual=explorer.querySelector("[data-dish-visual]");
  visual.addEventListener("pointerdown",event=>{pointerStart={x:event.clientX,y:event.clientY}});
  visual.addEventListener("pointerup",event=>{
    if(!pointerStart) return;
    const deltaX=event.clientX-pointerStart.x;
    const deltaY=event.clientY-pointerStart.y;
    pointerStart=undefined;
    if(Math.abs(deltaX)>48&&Math.abs(deltaX)>Math.abs(deltaY)) move(deltaX<0?1:-1);
  });
  visual.addEventListener("pointercancel",()=>{pointerStart=undefined});
  renderExplorer();
  renderCatalogue();
}

setupAnatomy();
setupLandingReveal();
setupMenu();
