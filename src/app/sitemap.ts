import type { MetadataRoute } from "next";

import { SITE_URL, PAGE_SEO } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return Object.values(PAGE_SEO).map((page) => ({
        url: `${SITE_URL}${page.path}`,
        lastModified: now,
        changeFrequency:
            page.path === "/"
                ? "weekly"
                : "monthly",
        priority:
            page.path === "/"
                ? 1
                : 0.8,
    }));
}