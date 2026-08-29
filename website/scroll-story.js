import {menuItems} from "./menu-data.js?v=20260828-4";

const clamp=(value,min=0,max=1)=>Math.min(max,Math.max(min,value));
const smoothstep=(start,end,value)=>{
  const progress=clamp((value-start)/(end-start));
  return progress*progress*(3-2*progress);
};
const windowOpacity=(value,start,fadeIn,fadeOut,end)=>smoothstep(start,fadeIn,value)*(1-smoothstep(fadeOut,end,value));

const story=document.querySelector("[data-scroll-story]");
const stage=document.querySelector("[data-story-stage]");
const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)");
const finePointer=matchMedia("(hover: hover) and (pointer: fine)");
const anatomyIds=["sei","koga","yuzu","playboy"];
const anatomyItems=anatomyIds.map(id=>menuItems.find(item=>item.id===id)).filter(Boolean);

function buildReducedStory(){
  const root=document.querySelector("[data-reduced-story]");
  if(!root) return;
  const rolls=anatomyItems.map((item,index)=>`
    <article class="reduced-roll">
      <img src="${item.image}" width="1672" height="940" loading="${index?"lazy":"eager"}" decoding="async" alt="${item.imageAlt||`${item.name} frente a la caja RYŌ`}">
      <div class="reduced-roll__copy">
        <p class="eyebrow">${String(index+1).padStart(2,"0")} · Anatomía del roll</p>
        <h2>${item.name}</h2>
        <ul>${item.anatomy.order.map(ingredientIndex=>`<li>${item.ingredients[ingredientIndex]}</li>`).join("")}</ul>
        <p>${item.description}</p>
      </div>
    </article>`).join("");
  root.innerHTML=`
    <header class="reduced-story__intro" id="reduced-inicio">
      <img src="public/media/box-front.jpg" width="1672" height="940" alt="Caja azul RYŌ cerrada y centrada en una escena de estudio oscura">
      <div class="reduced-roll__copy"><p class="eyebrow">RYŌ · Unboxed</p><h1>La experiencia empieza en la caja.</h1><p>Un recorrido por cuatro rolls protagonistas y sus ingredientes confirmados.</p></div>
    </header><div id="reduced-anatomia">${rolls}</div>`;
}

buildReducedStory();

const transcript=document.querySelector("[data-story-transcript-content]");
if(transcript){
  transcript.innerHTML=anatomyItems.map((item,index)=>`
    <article>
      <p class="eyebrow">${String(index+1).padStart(2,"0")} · Anatomía</p>
      <h3>${item.name}</h3>
      <ul>${item.anatomy.order.map(ingredientIndex=>`<li>${item.ingredients[ingredientIndex]}</li>`).join("")}</ul>
      <p>${item.description}</p>
    </article>`).join("");
}

if(reducedMotion.matches){
  document.querySelectorAll("[data-story-jump]").forEach(control=>{
    const progress=Number(control.dataset.storyJump);
    control.href=progress<.2?"#reduced-inicio":progress<.8?"#reduced-anatomia":"#continuation-title";
  });
}
reducedMotion.addEventListener("change",()=>location.reload());

if(story&&stage&&!reducedMotion.matches){
  const layers={};
  story.querySelectorAll("[data-layer]").forEach(layer=>{layers[layer.dataset.layer]=layer});
  const rollLayers={};
  story.querySelectorAll("[data-roll-layer]").forEach(layer=>{rollLayers[layer.dataset.rollLayer]=layer});
  const hero=story.querySelector("[data-story-hero]");
  const anatomy=story.querySelector("[data-anatomy-overlay]");
  const experience=story.querySelector("[data-experience-overlay]");
  const ingredients=story.querySelector("[data-scroll-ingredients]");
  const connectors=story.querySelector("[data-scroll-connectors]");
  const anatomyName=story.querySelector("[data-anatomy-name]");
  const anatomyDescription=story.querySelector("[data-anatomy-description]");
  const rollNumber=story.querySelector("[data-roll-number]");
  const status=story.querySelector("[data-story-status]");
  const rollStatus=story.querySelector("[data-roll-status]");
  const storyIndex=story.querySelector("[data-story-index]");
  const progressBar=document.querySelector("[data-scroll-progress]");
  const nav=document.querySelector(".story-nav");
  const chapterButtons=[...story.querySelectorAll("[data-chapter]")];
  const chapterRail=story.querySelector(".chapter-rail");
  const chapterStops=[0,.14,.28,.67,.82,1];
  const rollStops=[.285,.38,.475,.57,.675];
  let targetProgress=0;
  let renderedProgress=0;
  let frame=0;
  let currentRoll=-1;
  let currentChapter=-1;

  [layers.entry,layers.exit].forEach(video=>{
    if(!video) return;
    video.addEventListener("loadedmetadata",()=>{video.dataset.ready="true";updateTarget()},{once:true});
    video.addEventListener("error",()=>video.dataset.failed="true",{once:true});
    video.load();
  });

  function setOpacity(element,value,scale=1){
    if(!element) return;
    const opacity=clamp(value);
    element.style.opacity=opacity.toFixed(3);
    element.style.transform=`scale(${scale.toFixed(4)})`;
    element.classList.toggle("is-visible",opacity>.001);
  }

  function seek(video,ratio){
    if(!video||video.dataset.failed==="true"||video.readyState<1||!Number.isFinite(video.duration)) return false;
    const next=clamp(ratio)*(video.duration-.04);
    if(Math.abs(video.currentTime-next)>.035) video.currentTime=next;
    return true;
  }

  function activateConnector(index,button){
    const line=connectors.querySelectorAll("g")[index];
    if(line&&button){
      const svgRect=connectors.getBoundingClientRect();
      const buttonRect=button.getBoundingClientRect();
      const startX=Number(line.dataset.x);
      const startY=Number(line.dataset.y);
      const targetBelow=buttonRect.top>svgRect.top+svgRect.height;
      const endX=((targetBelow?buttonRect.left+buttonRect.width/2:buttonRect.left)-svgRect.left)/svgRect.width*100;
      const endY=((targetBelow?buttonRect.top:buttonRect.top+buttonRect.height/2)-svgRect.top)/svgRect.height*100;
      const controlX=startX+(endX-startX)*.62;
      const controlY=startY+(endY-startY)*.35;
      line.querySelector("path").setAttribute("d",`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`);
    }
    connectors.querySelectorAll("g").forEach((line,lineIndex)=>line.classList.toggle("is-active",lineIndex===index));
    ingredients.querySelectorAll("button").forEach(item=>{
      const active=item===button;
      item.classList.toggle("is-active",active);
      if(!finePointer.matches) item.setAttribute("aria-pressed",String(active));
    });
  }

  function setInteractive(element,opacity){
    const active=opacity>.55;
    const hidden=opacity<.1;
    element.classList.toggle("is-active",active);
    if(element.getAttribute("aria-hidden")!==String(hidden)) element.setAttribute("aria-hidden",String(hidden));
    if(element.inert===active) element.inert=!active;
  }

  function renderAnatomy(index){
    if(index===currentRoll||!anatomyItems[index]) return;
    const focusedIndex=ingredients.contains(document.activeElement)?Number(document.activeElement.dataset.connector):-1;
    currentRoll=index;
    const item=anatomyItems[index];
    anatomyName.textContent=item.name;
    anatomyName.classList.toggle("is-long",item.name.length>12);
    anatomyDescription.textContent=item.description;
    rollNumber.textContent=String(index+1).padStart(2,"0");
    ingredients.innerHTML=item.anatomy.order.map((ingredientIndex,lineIndex)=>`
      <li><button class="ingredient-callout${lineIndex===item.anatomy.main?" ingredient-callout--main":""}" type="button" data-connector="${lineIndex}"><span>${item.ingredients[ingredientIndex]}</span>${lineIndex===item.anatomy.main?"<small>Principal</small>":""}</button></li>`).join("");
    connectors.innerHTML=item.anatomy.points.map(([x,y])=>{
      return `<g data-x="${x}" data-y="${y}"><path d="M ${x} ${y} L ${x} ${y}"/><circle cx="${x}" cy="${y}" r=".62"/></g>`;
    }).join("");
    ingredients.querySelectorAll("[data-connector]").forEach(button=>{
      const index=Number(button.dataset.connector);
      if(!finePointer.matches) button.setAttribute("aria-pressed","false");
      button.addEventListener("pointerenter",()=>activateConnector(index,button));
      button.addEventListener("pointerleave",()=>activateConnector(-1));
      button.addEventListener("focus",()=>activateConnector(index,button));
      button.addEventListener("blur",()=>activateConnector(-1));
      button.addEventListener("click",()=>{if(!finePointer.matches) activateConnector(index,button)});
    });
    if(focusedIndex>=0) ingredients.querySelector(`[data-connector="${focusedIndex}"]`)?.focus();
    rollStatus.textContent=`Anatomía: ${item.name}`;
    anatomy.animate([{opacity:.35,transform:"translateY(.65rem)"},{opacity:1,transform:"translateY(0)"}],{duration:360,easing:"cubic-bezier(.2,.75,.2,1)"});
  }

  function setChapter(progress){
    const index=chapterStops.findIndex((stop,stopIndex)=>progress>=stop&&progress<chapterStops[stopIndex+1]);
    const safeIndex=index<0?chapterButtons.length-1:index;
    if(safeIndex===currentChapter) return;
    currentChapter=safeIndex;
    chapterButtons.forEach((button,buttonIndex)=>{
      const current=buttonIndex===safeIndex;
      button.classList.toggle("is-current",current);
      if(current) button.setAttribute("aria-current","step");
      else button.removeAttribute("aria-current");
    });
    storyIndex.textContent=String(safeIndex+1).padStart(2,"0");
    const labels=["Entrada de la caja","Apertura de la caja","Anatomía de los rolls","Retorno y cierre","Experiencia RYŌ"];
    status.textContent=labels[safeIndex];
  }

  function paint(progress){
    const heroOpacity=1-smoothstep(.045,.105,progress);
    hero.style.opacity=heroOpacity.toFixed(3);
    hero.style.transform=`translateY(calc(-46% + ${smoothstep(.04,.11,progress)*-1.5}rem))`;
    hero.style.pointerEvents=heroOpacity>.15?"auto":"none";

    const frontIntro=1-smoothstep(.055,.115,progress);
    const frontOutro=smoothstep(.79,.845,progress);
    setOpacity(layers.front,Math.max(frontIntro,frontOutro),1.035-smoothstep(0,.1,progress)*.025+frontOutro*.01);
    setOpacity(layers.closed,windowOpacity(progress,.055,.105,.135,.17),1.025-smoothstep(.06,.16,progress)*.012);

    const entryOpacity=windowOpacity(progress,.135,.16,.245,.275);
    const entryReady=seek(layers.entry,(progress-.14)/.12);
    setOpacity(layers.entry,entryReady?entryOpacity:0,1.012);
    setOpacity(layers.open,entryReady?windowOpacity(progress,.245,.27,.273,.295):windowOpacity(progress,.14,.185,.26,.295),1.012);
    setOpacity(layers.pickup,windowOpacity(progress,.258,.285,.295,.32),1.008);

    const rollWindows=[
      [.285,.31,.365,.395],
      [.365,.39,.46,.49],
      [.46,.485,.555,.585],
      [.555,.58,.65,.68],
    ];
    anatomyIds.forEach((id,index)=>setOpacity(rollLayers[id],windowOpacity(progress,...rollWindows[index]),1.008));
    const activeRoll=rollStops.findIndex((stop,index)=>progress>=stop&&progress<rollStops[index+1]);
    if(activeRoll>=0) renderAnatomy(activeRoll);

    const anatomyOpacity=windowOpacity(progress,.292,.315,.64,.675);
    anatomy.style.opacity=anatomyOpacity.toFixed(3);
    anatomy.style.transform=`translateY(${(1-anatomyOpacity)*.7}rem)`;
    setInteractive(anatomy,anatomyOpacity);

    setOpacity(layers.return,windowOpacity(progress,.645,.675,.695,.72),1.008-smoothstep(.66,.71,progress)*.018);
    const exitOpacity=windowOpacity(progress,.69,.72,.78,.81);
    const exitReady=seek(layers.exit,(progress-.70)/.09);
    setOpacity(layers.exit,exitReady?exitOpacity:0,1.006);
    const closingStill=windowOpacity(progress,.70,.755,.805,.84);
    setOpacity(layers.closed,Math.max(Number(layers.closed.style.opacity)||0,closingStill),1.012-smoothstep(.70,.82,progress)*.006);

    const experienceOpacity=smoothstep(.82,.875,progress)*(1-smoothstep(.975,1,progress)*.15);
    experience.style.opacity=experienceOpacity.toFixed(3);
    experience.style.transform=`translateY(calc(-42% + ${(1-experienceOpacity)*1.3}rem))`;
    setInteractive(experience,experienceOpacity);

    stage.style.setProperty("--story-progress",progress.toFixed(4));
    const railOpacity=smoothstep(.105,.16,progress)*(1-smoothstep(.78,.83,progress))*.78;
    chapterRail.style.opacity=railOpacity.toFixed(3);
    chapterRail.style.pointerEvents=railOpacity>.15?"auto":"none";
    chapterRail.inert=railOpacity<=.15;
    if(progressBar) progressBar.style.transform=`scaleX(${progress.toFixed(4)})`;
    nav?.classList.toggle("is-scrolled",progress>.02);
    setChapter(progress);
  }

  function updateTarget(){
    const rect=story.getBoundingClientRect();
    const distance=Math.max(1,story.offsetHeight-innerHeight);
    targetProgress=clamp(-rect.top/distance);
    if(!frame) frame=requestAnimationFrame(tick);
  }

  function tick(){
    renderedProgress+=(targetProgress-renderedProgress)*.16;
    if(Math.abs(targetProgress-renderedProgress)<.00025) renderedProgress=targetProgress;
    paint(renderedProgress);
    if(renderedProgress!==targetProgress) frame=requestAnimationFrame(tick);
    else frame=0;
  }

  document.querySelectorAll("[data-story-jump]").forEach(control=>control.addEventListener("click",event=>{
    event.preventDefault();
    const progress=clamp(Number(control.dataset.storyJump));
    const distance=story.offsetHeight-innerHeight;
    scrollTo({top:story.offsetTop+distance*progress,behavior:"smooth"});
  }));

  addEventListener("scroll",updateTarget,{passive:true});
  addEventListener("resize",updateTarget,{passive:true});
  updateTarget();
}

document.querySelector("[data-replay-stinger]")?.addEventListener("click",()=>{
  const stinger=document.querySelector("[data-entry-stinger]");
  if(!stinger||reducedMotion.matches) return;
  const animated=[stinger,...stinger.querySelectorAll("*")];
  animated.forEach(element=>element.style.animation="none");
  stinger.getBoundingClientRect();
  animated.forEach(element=>element.style.removeProperty("animation"));
});

if(finePointer.matches&&!reducedMotion.matches){
  document.querySelectorAll(".magnetic-button").forEach(button=>{
    button.addEventListener("pointermove",event=>{
      const rect=button.getBoundingClientRect();
      const x=(event.clientX-rect.left-rect.width/2)/rect.width*7;
      const y=(event.clientY-rect.top-rect.height/2)/rect.height*5;
      button.style.transform=`translate(${x}px,${y}px)`;
    });
    button.addEventListener("pointerleave",()=>button.style.removeProperty("transform"));
  });
}
