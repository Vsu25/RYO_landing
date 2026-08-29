import {menuItems} from "./menu-data.js?v=20260828-4";

const anatomyIds=["sei","koga","yuzu","playboy"];
const anatomyItems=anatomyIds.map(id=>menuItems.find(item=>item.id===id)).filter(Boolean);
const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)");
const finePointer=matchMedia("(hover: hover) and (pointer: fine)");

function rollCard(item,index,className="reduced-roll"){
  return `<article class="${className}">
    ${className==="reduced-roll"?`<img src="${item.image}" width="1672" height="940" loading="${index?"lazy":"eager"}" decoding="async" alt="${item.imageAlt||`${item.name} frente a la caja RYŌ`}">`:""}
    <div class="reduced-roll__copy">
      <p class="eyebrow">${String(index+1).padStart(2,"0")} · Anatomía del roll</p>
      <h2>${item.name}</h2>
      <ul>${item.anatomy.order.map(ingredientIndex=>`<li>${item.ingredients[ingredientIndex]}</li>`).join("")}</ul>
      <p>${item.description}</p>
    </div>
  </article>`;
}

const reducedRoot=document.querySelector("[data-reduced-story]");
if(reducedRoot){
  reducedRoot.innerHTML=`<header class="reduced-story__intro" id="reduced-inicio">
    <img src="public/media/box-front.jpg" width="1672" height="940" alt="Caja azul RYŌ cerrada y centrada en una escena de estudio oscura">
    <div class="reduced-roll__copy"><p class="eyebrow">RYŌ · Unboxed</p><h1>La experiencia empieza en la caja.</h1><p>Un recorrido por cuatro rolls protagonistas y sus ingredientes confirmados.</p></div>
  </header><div id="reduced-anatomia">${anatomyItems.map((item,index)=>rollCard(item,index)).join("")}</div>`;
}

const transcript=document.querySelector("[data-story-transcript-content]");
if(transcript) transcript.innerHTML=anatomyItems.map((item,index)=>rollCard(item,index,"story-transcript__card")).join("");

if(reducedMotion.matches){
  document.querySelectorAll("[data-story-jump]").forEach(control=>{
    const progress=Number(control.dataset.storyJump);
    control.setAttribute("href",progress<.2?"#reduced-inicio":progress<.8?"#reduced-anatomia":"#continuation-title");
  });
}

const {gsap,ScrollTrigger}=window;
if(!gsap||!ScrollTrigger){
  document.querySelector("[data-entry-stinger]")?.setAttribute("hidden","");
  document.documentElement.classList.add("motion-fallback");
}else{
  gsap.registerPlugin(ScrollTrigger);

  const playStinger=()=>{
    const stinger=document.querySelector("[data-entry-stinger]");
    if(!stinger||reducedMotion.matches) return;
    const left=stinger.querySelector(".entry-stinger__door--left");
    const right=stinger.querySelector(".entry-stinger__door--right");
    const mark=stinger.querySelector("img");
    gsap.killTweensOf([stinger,left,right,mark]);
    gsap.set(stinger,{autoAlpha:1});
    gsap.set([left,right],{xPercent:0});
    return gsap.timeline({defaults:{ease:"power3.inOut"}})
      .fromTo(mark,{autoAlpha:0,scale:.84,y:18},{autoAlpha:1,scale:1,y:0,duration:.65,ease:"power3.out"})
      .to(mark,{autoAlpha:0,scale:.9,duration:.5},.72)
      .to(left,{xPercent:-101,duration:1.15},.9)
      .to(right,{xPercent:101,duration:1.15},.9)
      .set(stinger,{autoAlpha:0});
  };

  document.querySelector("[data-replay-stinger]")?.addEventListener("click",playStinger);

  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
    const story=document.querySelector("[data-scroll-story]");
    const stage=document.querySelector("[data-story-stage]");
    if(!story||!stage) return;

    const layer=name=>story.querySelector(`[data-layer="${name}"]`);
    const layers={front:layer("front"),closed:layer("closed"),entry:layer("entry"),open:layer("open"),pickup:layer("pickup"),return:layer("return"),exit:layer("exit")};
    const rollLayers=Object.fromEntries(anatomyIds.map(id=>[id,story.querySelector(`[data-roll-layer="${id}"]`)]));
    const allMedia=[...Object.values(layers),...Object.values(rollLayers)].filter(Boolean);
    const hero=story.querySelector("[data-story-hero]");
    const anatomy=story.querySelector("[data-anatomy-overlay]");
    const experience=story.querySelector("[data-experience-overlay]");
    const ingredients=story.querySelector("[data-scroll-ingredients]");
    const connectors=story.querySelector("[data-scroll-connectors]");
    const anatomyName=story.querySelector("[data-anatomy-name]");
    const anatomyDescription=story.querySelector("[data-anatomy-description]");
    const rollNumber=story.querySelector("[data-roll-number]");
    const rollStatus=story.querySelector("[data-roll-status]");
    const storyStatus=story.querySelector("[data-story-status]");
    const storyIndex=story.querySelector("[data-story-index]");
    const chapterRail=story.querySelector(".chapter-rail");
    const chapterButtons=[...story.querySelectorAll("[data-chapter]")];
    const progressBar=document.querySelector("[data-scroll-progress]");
    const nav=document.querySelector(".story-nav");
    const entryState={progress:0};
    const exitState={progress:0};
    let currentRoll=-1;
    let currentChapter=-1;
    let timeline;

    const seek=(video,ratio)=>{
      if(!video||video.readyState<1||!Number.isFinite(video.duration)) return;
      const next=Math.max(0,Math.min(1,ratio))*(video.duration-.04);
      if(Math.abs(video.currentTime-next)>.025) video.currentTime=next;
    };

    const activateConnector=(index,button)=>{
      const line=connectors.querySelectorAll("g")[index];
      if(line&&button){
        const svgRect=connectors.getBoundingClientRect();
        const buttonRect=button.getBoundingClientRect();
        const startX=Number(line.dataset.x);
        const startY=Number(line.dataset.y);
        const targetBelow=buttonRect.top>svgRect.bottom;
        const endX=((targetBelow?buttonRect.left+buttonRect.width/2:buttonRect.left)-svgRect.left)/svgRect.width*100;
        const endY=((targetBelow?buttonRect.top:buttonRect.top+buttonRect.height/2)-svgRect.top)/svgRect.height*100;
        line.querySelector("path").setAttribute("d",`M ${startX} ${startY} Q ${startX+(endX-startX)*.62} ${startY+(endY-startY)*.35} ${endX} ${endY}`);
      }
      connectors.querySelectorAll("g").forEach((item,lineIndex)=>item.classList.toggle("is-active",lineIndex===index));
      ingredients.querySelectorAll("button").forEach(item=>{
        const active=item===button;
        item.classList.toggle("is-active",active);
        if(!finePointer.matches) item.setAttribute("aria-pressed",String(active));
      });
    };

    const renderAnatomy=index=>{
      if(index===currentRoll||!anatomyItems[index]) return;
      const focusedIndex=ingredients.contains(document.activeElement)?Number(document.activeElement.dataset.connector):-1;
      const item=anatomyItems[index];
      currentRoll=index;
      anatomyName.textContent=item.name;
      anatomyName.classList.toggle("is-long",item.name.length>12);
      anatomyDescription.textContent=item.description;
      rollNumber.textContent=String(index+1).padStart(2,"0");
      ingredients.innerHTML=item.anatomy.order.map((ingredientIndex,lineIndex)=>`<li><button class="ingredient-callout${lineIndex===item.anatomy.main?" ingredient-callout--main":""}" type="button" data-connector="${lineIndex}"><span>${item.ingredients[ingredientIndex]}</span>${lineIndex===item.anatomy.main?"<small>Principal</small>":""}</button></li>`).join("");
      connectors.innerHTML=item.anatomy.points.map(([x,y])=>`<g data-x="${x}" data-y="${y}"><path d="M ${x} ${y} L ${x} ${y}"/><circle cx="${x}" cy="${y}" r=".62"/></g>`).join("");
      ingredients.querySelectorAll("[data-connector]").forEach(button=>{
        const lineIndex=Number(button.dataset.connector);
        if(!finePointer.matches) button.setAttribute("aria-pressed","false");
        button.addEventListener("pointerenter",()=>activateConnector(lineIndex,button));
        button.addEventListener("pointerleave",()=>activateConnector(-1));
        button.addEventListener("focus",()=>activateConnector(lineIndex,button));
        button.addEventListener("blur",()=>activateConnector(-1));
        button.addEventListener("click",()=>{if(!finePointer.matches) activateConnector(lineIndex,button)});
      });
      if(focusedIndex>=0) ingredients.querySelector(`[data-connector="${focusedIndex}"]`)?.focus();
      rollStatus.textContent=`Anatomía: ${item.name}`;
      gsap.fromTo(anatomyName,{autoAlpha:0,y:34},{autoAlpha:1,y:0,duration:.75,ease:"power3.out",overwrite:true});
      gsap.fromTo(ingredients.querySelectorAll("button"),{autoAlpha:0,x:34},{autoAlpha:1,x:0,duration:.55,stagger:.055,ease:"power2.out",overwrite:true});
      gsap.fromTo(anatomy.querySelector(".anatomy-overlay__summary"),{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:.65,ease:"power2.out",overwrite:true});
    };

    const setInteractive=(element,active)=>{
      if(element.classList.contains("is-active")===active) return;
      element.classList.toggle("is-active",active);
      element.setAttribute("aria-hidden",String(!active));
      element.inert=!active;
    };

    const setChapter=index=>{
      if(index===currentChapter) return;
      currentChapter=index;
      chapterButtons.forEach((button,buttonIndex)=>{
        const current=buttonIndex===index;
        button.classList.toggle("is-current",current);
        if(current) button.setAttribute("aria-current","step"); else button.removeAttribute("aria-current");
      });
      const labels=["Entrada de la caja","Apertura de la caja","Anatomía de los rolls","Retorno y cierre","Experiencia RYŌ"];
      storyIndex.textContent=String(index+1).padStart(2,"0");
      storyStatus.textContent=labels[index];
    };

    const syncSemantics=()=>{
      const time=timeline.time();
      const rollIndex=time<9.2?0:time<11.4?1:time<13.6?2:3;
      const anatomyActive=time>=7.1&&time<16;
      const experienceActive=time>=20.4;
      if(anatomyActive) renderAnatomy(rollIndex);
      setInteractive(anatomy,anatomyActive);
      setInteractive(experience,experienceActive);
      setChapter(time<3?0:time<7.1?1:time<16?2:time<20.4?3:4);
      stage.style.setProperty("--story-progress",timeline.progress().toFixed(4));
    };

    gsap.set(allMedia,{autoAlpha:0,scale:1.02,transformOrigin:"50% 50%"});
    gsap.set(layers.front,{autoAlpha:1,scale:1.04});
    gsap.set([anatomy,experience,chapterRail],{autoAlpha:0});
    gsap.set(stage,{"--glow-x":"72%","--glow-y":"52%"});
    setInteractive(anatomy,false);
    setInteractive(experience,false);

    timeline=gsap.timeline({defaults:{ease:"none"},paused:true});
    timeline
      .addLabel("intro",0)
      .to(hero,{autoAlpha:0,duration:1},.55)
      .to(layers.front,{scale:1.13,xPercent:-3,duration:1.35},.25)
      .addLabel("turn",1.45)
      .to(layers.front,{autoAlpha:0,xPercent:-9,rotation:-1.2,duration:1.25,ease:"power2.inOut"},"turn")
      .fromTo(layers.closed,{autoAlpha:0,scale:1.16,xPercent:10,rotation:1.5},{autoAlpha:1,scale:1,xPercent:0,rotation:0,duration:1.55,ease:"power3.out",immediateRender:false},"turn")
      .to(chapterRail,{autoAlpha:.78,duration:.6},"turn+=.35")
      .to(stage,{"--glow-x":"58%","--glow-y":"58%",duration:1.5},"turn")
      .addLabel("open",3.2)
      .to(layers.closed,{autoAlpha:0,scale:.98,duration:.45},"open")
      .fromTo(layers.entry,{autoAlpha:0,scale:1.025},{autoAlpha:1,scale:1,duration:.45,immediateRender:false},"open")
      .fromTo(entryState,{progress:0},{progress:1,duration:2.5,onUpdate:()=>seek(layers.entry,entryState.progress),immediateRender:false},"open")
      .fromTo(layers.open,{autoAlpha:0,scale:1.035},{autoAlpha:1,scale:1,duration:.55,ease:"power2.out",immediateRender:false},"open+=2.1")
      .to(layers.entry,{autoAlpha:0,duration:.45},"open+=2.25")
      .addLabel("pickup",5.85)
      .fromTo(layers.pickup,{autoAlpha:0,scale:1.045,yPercent:2},{autoAlpha:1,scale:1,yPercent:0,duration:.75,ease:"power3.out",immediateRender:false},"pickup")
      .to(layers.open,{autoAlpha:0,duration:.65},"pickup")
      .to(layers.pickup,{scale:1.035,duration:1.1},"pickup+=.7")
      .to(layers.pickup,{autoAlpha:0,scale:1.06,duration:.5},"pickup+=1.35")
      .to(anatomy,{autoAlpha:1,duration:.65},7.05)
      .to(stage,{"--glow-x":"40%","--glow-y":"48%",duration:2},6.5);

    const rollStarts=[7.1,9.3,11.5,13.7];
    anatomyIds.forEach((id,index)=>{
      const start=rollStarts[index];
      const end=rollStarts[index+1]||16;
      timeline
        .fromTo(rollLayers[id],{autoAlpha:0,scale:1.06,xPercent:2,yPercent:1},{autoAlpha:1,scale:1,xPercent:0,yPercent:0,duration:.72,ease:"power3.out",immediateRender:false},start)
        .to(rollLayers[id],{scale:1.025,duration:Math.max(.4,end-start-1),ease:"none"},start+.7)
        .to(rollLayers[id],{autoAlpha:0,scale:.99,xPercent:-1.5,duration:.65,ease:"power2.in"},end-.42);
    });

    timeline
      .to(anatomy,{autoAlpha:0,duration:.6},15.65)
      .addLabel("return",15.8)
      .fromTo(layers.return,{autoAlpha:0,scale:1.07,yPercent:-1},{autoAlpha:1,scale:1,yPercent:0,duration:.75,ease:"power3.out",immediateRender:false},"return")
      .to(layers.return,{scale:.985,yPercent:1,duration:1.1},"return+=.65")
      .to(layers.return,{autoAlpha:0,duration:.5},"return+=1.25")
      .addLabel("close",17.25)
      .set(layers.entry,{autoAlpha:1,scale:1},"close")
      .fromTo(entryState,{progress:1},{progress:0,duration:2.3,onUpdate:()=>seek(layers.entry,entryState.progress),immediateRender:false},"close")
      .to(stage,{"--glow-x":"62%","--glow-y":"60%",duration:2.1},"close")
      .fromTo(layers.exit,{autoAlpha:0,scale:1.02},{autoAlpha:1,scale:1,duration:.45,immediateRender:false},"close+=1.9")
      .fromTo(exitState,{progress:0},{progress:1,duration:1.15,onUpdate:()=>seek(layers.exit,exitState.progress),immediateRender:false},"close+=1.9")
      .to(layers.entry,{autoAlpha:0,duration:.35},"close+=2")
      .addLabel("finale",20.4)
      .fromTo(layers.front,{autoAlpha:0,scale:1.12,xPercent:4},{autoAlpha:1,scale:1,xPercent:0,rotation:0,duration:1.25,ease:"power3.out",immediateRender:false},"finale")
      .to(layers.exit,{autoAlpha:0,duration:.6},"finale")
      .fromTo(experience,{autoAlpha:0},{autoAlpha:1,duration:.75,ease:"power2.out",immediateRender:false},"finale+=.3")
      .fromTo(experience.querySelectorAll(".eyebrow,.type-line > span,p,.experience-overlay__actions"),{autoAlpha:0,y:38},{autoAlpha:1,y:0,duration:.85,stagger:.11,ease:"power3.out",immediateRender:false},"finale+=.35")
      .to(chapterRail,{autoAlpha:0,duration:.45},"finale")
      .to(layers.front,{scale:1.035,duration:2.1},"finale+=1")
      .to(stage,{"--glow-x":"48%","--glow-y":"50%",duration:2.1},"finale+=.4");

    timeline.eventCallback("onUpdate",syncSemantics);
    const ambientLoop=gsap.to(story.querySelectorAll(".story-ambient i"),{x:()=>innerWidth*.16,rotation:"+=12",duration:7,repeat:-1,yoyo:true,ease:"sine.inOut",stagger:.8});
    ScrollTrigger.create({
      id:"ryo-scroll-story",
      trigger:story,
      animation:timeline,
      start:"top top",
      end:()=>`+=${Math.round(innerHeight*13)}`,
      pin:true,
      pinSpacing:true,
      scrub:1.35,
      anticipatePin:1,
      invalidateOnRefresh:true,
      onUpdate:self=>{
        if(progressBar) gsap.set(progressBar,{scaleX:self.progress,transformOrigin:"left center"});
        nav?.classList.toggle("is-scrolled",self.progress>.015);
      },
      onEnter:()=>ambientLoop.resume(),
      onEnterBack:()=>ambientLoop.resume(),
      onLeave:()=>ambientLoop.pause(),
      onLeaveBack:()=>ambientLoop.pause(0),
    });

    document.querySelectorAll("[data-story-jump]").forEach(control=>control.addEventListener("click",event=>{
      event.preventDefault();
      const trigger=timeline.scrollTrigger;
      const progress=Math.max(0,Math.min(1,Number(control.dataset.storyJump)));
      scrollTo({top:trigger.start+(trigger.end-trigger.start)*progress,behavior:"smooth"});
    }));

    gsap.fromTo(hero.querySelectorAll(".type-line > span"),{autoAlpha:0,yPercent:115},{autoAlpha:1,yPercent:0,duration:1.05,stagger:.12,ease:"power3.out",delay:.72});
    gsap.fromTo(hero.querySelectorAll(".eyebrow,p,.scroll-cue"),{autoAlpha:0,y:22},{autoAlpha:1,y:0,duration:.8,stagger:.09,ease:"power2.out",delay:.9});
    ScrollTrigger.batch(".continuation .eyebrow,.continuation h2,.contact-card,.site-footer__main > *",{
      start:"top 88%",
      once:true,
      onEnter:batch=>gsap.fromTo(batch,{autoAlpha:0,y:42},{autoAlpha:1,y:0,duration:.85,stagger:.1,ease:"power3.out",overwrite:true}),
    });

    if(finePointer.matches){
      document.querySelectorAll(".magnetic-button").forEach(button=>{
        const xTo=gsap.quickTo(button,"x",{duration:.35,ease:"power3.out"});
        const yTo=gsap.quickTo(button,"y",{duration:.35,ease:"power3.out"});
        button.addEventListener("pointermove",event=>{
          const rect=button.getBoundingClientRect();
          xTo((event.clientX-rect.left-rect.width/2)/rect.width*7);
          yTo((event.clientY-rect.top-rect.height/2)/rect.height*5);
        });
        button.addEventListener("pointerleave",()=>{xTo(0);yTo(0)});
      });
    }

    Object.values(layers).filter(element=>element?.tagName==="VIDEO").forEach(video=>{
      video.load();
      video.addEventListener("loadedmetadata",()=>ScrollTrigger.refresh(),{once:true});
    });
    document.fonts?.ready.then(()=>ScrollTrigger.refresh());
    addEventListener("load",playStinger,{once:true});
    syncSemantics();

    return ()=>timeline.kill();
  });
}
