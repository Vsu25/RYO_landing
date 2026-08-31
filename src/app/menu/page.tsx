import type {Metadata} from "next";
import {MenuExperience} from "@/components/menu/MenuExperience";
import {ContactFooter} from "@/components/shared/ContactFooter";
import {productionUrl} from "@/lib/site-path";
import "./menu.css";

export const metadata: Metadata = {
  title: "Menú",
  description: "Explora la selección de rolls especiales y nigiris de RYŌ Sushi en formato interactivo o tradicional.",
  alternates: {canonical: `${productionUrl}/menu/`},
  robots: {index: false, follow: true},
  openGraph: {
    type: "website",
    locale: "es_VE",
    title: "Menú — RYŌ Sushi",
    description: "Dos maneras de explorar RYŌ: una experiencia visual y una carta directa.",
    url: `${productionUrl}/menu/`,
    images: [{url: `${productionUrl}/media/roll-playboy.webp`, width: 1672, height: 940, alt: "Presentación conceptual del roll Playboy de RYŌ Sushi"}],
  },
};

export default function MenuPage() {
  return <><MenuExperience /><ContactFooter menu /></>;
}
