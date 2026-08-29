import type {MetadataRoute} from "next";
import {productionUrl} from "@/lib/site-path";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{url: `${productionUrl}/`, lastModified: new Date("2026-08-29")}];
}
