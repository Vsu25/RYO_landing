import {cpSync, existsSync, mkdirSync, rmSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {fileURLToPath} from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = resolve(projectRoot, "local-media/menu");
const targetDir = resolve(projectRoot, "public/local-menu-media");
const routeDir = resolve(projectRoot, "src/app/menu");
const devTypesDir = resolve(projectRoot, ".next/dev/types");
const files = [
  "menu-fuji.webp",
  "menu-kamasutra.webp",
  "menu-nigiri-salmon.webp",
  "menu-nigiri-tuna.webp",
  "menu-pesca-blanca.webp",
  "menu-rendi.webp",
];

if (process.argv[2] === "clean") {
  rmSync(targetDir, {recursive: true, force: true});
  rmSync(routeDir, {recursive: true, force: true});
  rmSync(devTypesDir, {recursive: true, force: true});
  process.exit(0);
}

mkdirSync(targetDir, {recursive: true});
mkdirSync(routeDir, {recursive: true});
for (const file of files) {
  const source = resolve(sourceDir, file);
  if (!existsSync(source)) {
    throw new Error(`Falta el master local del menú: ${source}`);
  }
  cpSync(source, resolve(targetDir, file));
}
writeFileSync(resolve(routeDir, "page.tsx"), 'export {metadata, default} from "@/local-pages/MenuPage";\n');
