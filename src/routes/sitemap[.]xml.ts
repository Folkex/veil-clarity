import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CATEGORIES, categorySlug, getAllPosts, SITE } from "@/content/posts";

const BASE_URL = SITE.url;

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getAllPosts();

        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "daily", priority: "1.0" },
          ...CATEGORIES.map((c) => ({
            path: `/category/${categorySlug(c)}`,
            changefreq: "weekly" as const,
            priority: "0.7",
          })),
          ...posts.map((post) => ({
            path: `/${post.slug}`,
            lastmod: post.date,
            changefreq: "monthly" as const,
            priority: "0.8",
          })),
        ];

        const urls = entries.map((e) =>
          [
            "  <url>",
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
