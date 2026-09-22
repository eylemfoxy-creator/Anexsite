import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://anexglobal.uk";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/desk", "/api"] }
    ],
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`
  };
}
