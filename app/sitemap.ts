import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { movingPages } from "@/data/pages";

// 공개 페이지만 넣는다. 새 공개 페이지가 생기면 여기에 추가한다.
const publicPaths = ["/", ...Object.keys(movingPages).map((slug) => `/moving/${slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
