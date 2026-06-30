import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/selected-work", "/ai-playground"],
        disallow: ["/work/", "/v2/work/", "/enter", "/archive"],
      },
    ],
    sitemap: "https://www.majidkareem.com/sitemap.xml",
  };
}
