import type {Metadata} from "next";
import {MenuExperience} from "@/components/menu/MenuExperience";
import {ContactFooter} from "@/components/shared/ContactFooter";

export const metadata: Metadata = {
  title: "Menú",
  description: "Prototipo local del menú interactivo de RYŌ Sushi.",
  robots: {index: false, follow: false},
};

export default function MenuPage() {
  return <><MenuExperience /><ContactFooter menu /></>;
}
