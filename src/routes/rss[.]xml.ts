import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getAllPosts, SITE } from "@/content/posts";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getAllPosts();
        const items = posts
          .map((post) =>
            [
              "    <item>",
              `      <title>${escapeXml(post.title)}</title>`,
              `      <link>${SITE.url}/${post.slug}</link>`,
              `      <guid isPermaLink="true">${SITE.url}/${post.slug}</guid>`,
              `      <description>${escapeXml(post.description)}</description>`,
              `      <category>${escapeXml(post.category)}</category>`,
              `      <dc:creator>${escapeXml(post.author)}</dc:creator>`,
              `      <pubDate>${new Date(post.date + "T08:00:00Z").toUTCString()}</pubDate>`,
              "    </item>",
            ].join("\n"),
          )
          .join("\n");

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">',
          "  <channel>",
          `    <title>${escapeXml(SITE.name)}</title>`,
          `    <link>${SITE.url}</link>`,
          `    <description>${escapeXml(SITE.description)}</description>`,
          "    <language>en-us</language>",
          `    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />`,
          `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
          items,
          "  </channel>",
          "</rss>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
