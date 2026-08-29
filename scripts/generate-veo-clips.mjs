import {readFile, writeFile, access, mkdir} from "node:fs/promises";
import {resolve, dirname} from "node:path";
import {GoogleGenAI} from "@google/genai";

const root=resolve(import.meta.dirname,"..");
const outputRoot=resolve(root,"deliverables/design/media/ryo-scroll-video-v1");
const model="veo-3.1-generate-preview";

const clips={
  entry:{
    first:"deliverables/design/media/ryo-roll-anatomy-masters-v1/k10-box-closed-side-start-v1.png",
    last:"deliverables/design/media/ryo-roll-anatomy-masters-v1/k16-sei-pickup-midpoint-v1.png",
    output:"ryo-entry-open-pickup-v1.mp4",
    prompt:`Locked-off premium food-commercial shot on a matte black studio table. Preserve the exact navy-blue RYŌ sushi box, its gold RYŌ wordmark, overlapping-wave line pattern, proportions, camera angle and lighting from the supplied first frame. The box lid opens smoothly and naturally. A single pair of pale bamboo chopsticks enters from the upper left, picks up exactly one sushi roll from the open box, and arrives at the exact composition of the supplied last frame. Slow deliberate motion, no camera movement, no cuts, no zoom, photorealistic materials, crisp product detail, subtle studio ambience only.`,
  },
  exit:{
    first:"deliverables/design/media/ryo-roll-anatomy-masters-v1/k17-playboy-return-midpoint-v1.png",
    last:"deliverables/design/media/ryo-roll-anatomy-masters-v1/k10-box-closed-side-start-v1.png",
    output:"ryo-exit-return-close-v1.mp4",
    prompt:`Locked-off premium food-commercial shot on a matte black studio table. Preserve the exact navy-blue RYŌ sushi box, its gold RYŌ wordmark, overlapping-wave line pattern, proportions, camera angle and lighting from the supplied first frame. A single pair of pale bamboo chopsticks returns exactly one sushi roll into the open box, withdraws toward the upper left, and the lid closes smoothly until the scene arrives at the exact supplied last frame. Slow deliberate motion, no camera movement, no cuts, no zoom, photorealistic materials, crisp product detail, subtle studio ambience only.`,
  },
};

const negativePrompt="warped or misspelled logo, changed text, altered wave pattern, different box geometry, different navy color, added branding, extra chopsticks, visible hands, extra food, missing food, duplicated rolls, mutated sushi, floating objects, camera movement, pan, tilt, zoom, rack focus, cuts, flicker, blur, low detail, cartoon, illustration";

async function exists(path){try{await access(path);return true}catch{return false}}

async function apiKey(){
  const env=await readFile(resolve(root,".env"),"utf8");
  const line=env.split(/\r?\n/).find(value=>/^GEMINI_API_VEO_KEY\s*[:=]/.test(value));
  const key=line?.replace(/^GEMINI_API_VEO_KEY\s*[:=]\s*/,"").trim();
  if(!key) throw new Error("No se encontró GEMINI_API_VEO_KEY en .env");
  return key;
}

async function generate(name,ai){
  const clip=clips[name];
  if(!clip) throw new Error(`Clip desconocido: ${name}`);
  const output=resolve(outputRoot,clip.output);
  if(await exists(output)){
    console.log(`${name}: ya existe ${clip.output}; no se vuelve a generar.`);
    return;
  }

  const operationPath=resolve(outputRoot,`.${name}-operation.json`);
  let operation;
  if(await exists(operationPath)){
    operation=JSON.parse(await readFile(operationPath,"utf8"));
    console.log(`${name}: reanudando ${operation.name}`);
  }else{
    const [first,last]=await Promise.all([
      readFile(resolve(root,clip.first),"base64"),
      readFile(resolve(root,clip.last),"base64"),
    ]);
    operation=await ai.models.generateVideos({
      model,
      prompt:clip.prompt,
      image:{imageBytes:first,mimeType:"image/png"},
      config:{
        aspectRatio:"16:9",
        durationSeconds:8,
        numberOfVideos:1,
        personGeneration:"allow_adult",
        resolution:"1080p",
        negativePrompt,
        lastFrame:{imageBytes:last,mimeType:"image/png"},
      },
    });
    console.log(`${name}: enviando generación Veo 3.1…`);
    if(!operation.name) throw new Error(`${name}: respuesta sin operación`);
    await writeFile(operationPath,JSON.stringify({name:operation.name},null,2));
  }

  while(!operation.done){
    await new Promise(resolveWait=>setTimeout(resolveWait,10000));
    operation=await ai.operations.getVideosOperation({operation});
    console.log(`${name}: ${operation.done?"completado":"procesando"}…`);
  }
  if(operation.error) throw new Error(`${name}: ${JSON.stringify(operation.error)}`);
  const video=operation.response?.generatedVideos?.[0]?.video;
  if(!video) throw new Error(`${name}: operación terminada sin video`);
  await mkdir(dirname(output),{recursive:true});
  await ai.files.download({file:video,downloadPath:output});
  console.log(`${name}: guardado ${output}`);
}

const requested=process.argv[2]||"all";
const names=requested==="all"?Object.keys(clips):[requested];
const key=await apiKey();
const ai=new GoogleGenAI({apiKey:key});
for(const name of names) await generate(name,ai);
