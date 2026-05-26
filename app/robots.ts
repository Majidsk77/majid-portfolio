import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/work/", "/enter"],
      },
    ],
    sitemap: "https://www.majidkareem.com/sitemap.xml",
  };
}
