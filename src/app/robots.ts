import type {MetadataRoute} from "next";
import {productionUrl} from "@/lib/site-path";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {userAgent: "*", allow: "/"},
    sitemap: `${productionUrl}/sitemap.xml`,
  };
}
