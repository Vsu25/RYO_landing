import menuSource from "./menu.json";

export type Anatomy = {
  order: number[];
  main: number;
  featured: number[];
  points: [number, number][];
};

export type MenuItem = {
  documentId: string;
  id: string;
  category: "Rolls especiales" | "Nigiris";
  name: string;
  description: string;
  ingredients: string[];
  price: number;
  currency: "REF";
  pieces: string;
  image: string;
  imageAlt: string;
  imageStatus: "conceptual";
  source: string;
  anatomy?: Anatomy;
};

export const menuItems = menuSource as MenuItem[];

export const anatomyItems = ["playboy", "yuzu", "koga", "sei"]
  .map((id) => menuItems.find((item) => item.id === id))
  .filter((item): item is MenuItem & { anatomy: Anatomy } => Boolean(item?.anatomy));
