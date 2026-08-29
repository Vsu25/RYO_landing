import {menuItems} from "./menu-data.js?v=20260828-4";

const anatomyIds=["playboy","yuzu","koga","sei"];
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
    const seam=stinger.querySelector(".entry-stinger__seam");
    gsap.killTweensOf([stinger,left,right,seam]);
    gsap.set(stinger,{autoAlpha:1});
    gsap.set([left,right],{xPercent:0});
    gsap.set(seam,{scaleY:.08});
    return gsap.timeline({defaults:{ease:"power4.inOut"}})
      .to(seam,{scaleY:1,duration:.55,ease:"power3.out"})
      .to(left,{xPercent:.8,duration:.28,ease:"power2.inOut"},.22)
      .to(right,{xPercent:-.8,duration:.28,ease:"power2.inOut"},.22)
      .to(seam,{scaleY:.08,duration:.35,ease:"power3.in"},.62)
      .to(left,{xPercent:-101,duration:1.45},.72)
      .to(right,{xPercent:101,duration:1.45},.72)
      .set(stinger,{autoAlpha:0});
  };

  document.querySelector("[data-replay-stinger]")?.addEventListener("click",playStinger);

  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
    const story=document.querySelector("[data-scroll-story]");
    const stage=document.querySelector("[data-story-stage]");
    if(!story||!stage) return;

    const layer=name=>story.querySelector(`[data-layer="${name}"]`);
    const layers={intro:layer("intro"),opening:layer("opening"),closing:layer("closing")};
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
    const introState={progress:0};
    const openingState={progress:0};
    const closingState={progress:0};
    let currentRoll=-1;
    let currentChapter=-1;
    let timeline;

    const seek=(video,ratio)=>{
      if(!video||video.readyState<1||!Number.isFinite(video.duration)) return;
      const next=Math.max(0,Math.min(1,ratio))*Math.max(0,video.duration-.04);
      if(Math.abs(video.currentTime-next)>.035) video.currentTime=next;
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
      seek(layers.intro,time/8);
      seek(layers.opening,(time-8)/8);
      seek(layers.closing,(time-30.7)/6);
      const rollIndex=time<19.35?0:time<23.15?1:time<26.95?2:3;
      const anatomyActive=time>=15.55&&time<30.75;
      const experienceActive=time>=36.65;
      if(anatomyActive) renderAnatomy(rollIndex);
      setInteractive(anatomy,anatomyActive);
      setInteractive(experience,experienceActive);
      setChapter(time<8?0:time<15.55?1:time<30.75?2:time<36.65?3:4);
      stage.style.setProperty("--story-progress",timeline.progress().toFixed(4));
    };

    gsap.set(allMedia,{autoAlpha:0,scale:1,transformOrigin:"50% 50%"});
    gsap.set(layers.intro,{autoAlpha:1});
    gsap.set([anatomy,experience,chapterRail],{autoAlpha:0});
    gsap.set(stage,{"--glow-x":"72%","--glow-y":"52%"});
    setInteractive(anatomy,false);
    setInteractive(experience,false);

    timeline=gsap.timeline({defaults:{ease:"none"},paused:true});
    timeline
      .addLabel("intro",0)
      .fromTo(introState,{progress:0},{progress:1,duration:8,immediateRender:false},"intro")
      .to(hero,{autoAlpha:0,y:-26,duration:1.15,ease:"power2.inOut"},5.25)
      .to(chapterRail,{autoAlpha:.78,duration:.65,ease:"power2.out"},4.8)
      .to(stage,{"--glow-x":"59%","--glow-y":"57%",duration:5.8},2.2)
      .addLabel("open",8)
      .set(layers.opening,{autoAlpha:1},"open")
      .set(layers.intro,{autoAlpha:0},"open+=.02")
      .fromTo(openingState,{progress:0},{progress:1,duration:8,immediateRender:false},"open")
      .to(stage,{"--glow-x":"48%","--glow-y":"50%",duration:6.5},"open+=1")
      .to(anatomy,{autoAlpha:1,duration:.6,ease:"power2.out"},15.55);

    const rollStarts=[15.55,19.35,23.15,26.95];
    const rollEnds=[19.9,23.7,27.5,31.1];
    anatomyIds.forEach((id,index)=>{
      const start=rollStarts[index];
      const end=rollEnds[index];
      timeline
        .fromTo(rollLayers[id],{autoAlpha:0},{autoAlpha:1,duration:.55,ease:"power2.inOut",immediateRender:false},start)
        .to(rollLayers[id],{autoAlpha:0,duration:.55,ease:"power2.inOut"},end-.55);
    });

    timeline
      .to(layers.opening,{autoAlpha:0,duration:.55,ease:"power2.inOut"},15.55)
      .to(anatomy,{autoAlpha:0,duration:.55,ease:"power2.inOut"},30.55)
      .addLabel("close",30.7)
      .fromTo(layers.closing,{autoAlpha:0},{autoAlpha:1,duration:.55,ease:"power2.inOut",immediateRender:false},"close")
      .fromTo(closingState,{progress:0},{progress:1,duration:6,immediateRender:false},"close")
      .to(stage,{"--glow-x":"61%","--glow-y":"59%",duration:5.2},"close+=.4")
      .addLabel("finale",36.65)
      .fromTo(experience,{autoAlpha:0},{autoAlpha:1,duration:.75,ease:"power2.out",immediateRender:false},"finale+=.3")
      .fromTo(experience.querySelectorAll(".eyebrow,.type-line > span,p,.experience-overlay__actions"),{autoAlpha:0,y:38},{autoAlpha:1,y:0,duration:.85,stagger:.11,ease:"power3.out",immediateRender:false},"finale+=.35")
      .to(chapterRail,{autoAlpha:0,duration:.45},"finale")
      .to(stage,{"--glow-x":"48%","--glow-y":"50%",duration:2.1},"finale+=.4");

    timeline.eventCallback("onUpdate",syncSemantics);
    const ambientLoop=gsap.to(story.querySelectorAll(".story-ambient i"),{x:()=>innerWidth*.16,rotation:"+=12",duration:7,repeat:-1,yoyo:true,ease:"sine.inOut",stagger:.8});
    ScrollTrigger.create({
      id:"ryo-scroll-story",
      trigger:story,
      animation:timeline,
      start:"top top",
      end:()=>`+=${Math.round(innerHeight*(innerWidth<1024?18:20))}`,
      pin:true,
      pinSpacing:true,
      scrub:.65,
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

    [layers.intro,layers.opening,layers.closing].forEach(video=>{
      const onReady=()=>{
        syncSemantics();
        ScrollTrigger.refresh();
      };
      if(video.readyState>=1) onReady();
      else video.addEventListener("loadedmetadata",onReady,{once:true});
    });
    document.fonts?.ready.then(()=>ScrollTrigger.refresh());
    addEventListener("load",playStinger,{once:true});
    syncSemantics();

    return ()=>{
      ambientLoop.kill();
      timeline.kill();
    };
  });
}
