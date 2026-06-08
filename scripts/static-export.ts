/**
 * Static export for the Veilo blog.
 *
 * TanStack Start's built-in prerender targets a Node preview server, but this
 * template builds a Cloudflare Worker, so we render every route ourselves by
 * calling the built worker's `fetch` handler and writing the HTML/XML to disk.
 *
 * Usage:
 *   bun run build            # produces dist/client + dist/server
 *   bun run scripts/static-export.ts
 *
 * Result: dist/client is a fully static site you can upload to any web host
 * (e.g. cPanel public_html/blog).
 */
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { POSTS, CATEGORIES, categorySlug } from "../src/content/posts";

const OUT = join(import.meta.dir, "..", "dist", "client");
const WORKER = join(import.meta.dir, "..", "dist", "server", "index.mjs");
const ORIGIN = "https://blog.veilo.link";

type Mod = { default: { fetch: (req: Request, env: unknown, ctx: unknown) => Promise<Response> } };

async function render(app: Mod["default"], path: string) {
  const res = await app.fetch(new Request(ORIGIN + path), {}, { waitUntil() {} });
  const body = await res.text();
  if (res.status !== 200) {
    console.warn(`  ! ${path} returned ${res.status}`);
  }
  return body;
}

async function save(relPath: string, contents: string) {
  const full = join(OUT, relPath);
  await mkdir(dirname(full), { recursive: true });
  await writeFile(full, contents, "utf8");
  console.log(`  ✓ ${relPath} (${contents.length.toLocaleString()} bytes)`);
}

async function main() {
  const mod = (await import(WORKER)) as Mod;
  const app = mod.default;

  console.log("Rendering HTML pages…");
  // Home
  await save("index.html", await render(app, "/"));

  // Category pages
  for (const cat of CATEGORIES) {
    const slug = categorySlug(cat);
    await save(`category/${slug}/index.html`, await render(app, `/category/${slug}`));
  }

  // Post pages
  for (const post of POSTS) {
    await save(`${post.slug}/index.html`, await render(app, `/${post.slug}`));
  }

  // 404 page (rendered from an unmatched route)
  await save("404.html", await render(app, "/__not_found__"));

  console.log("Rendering feeds…");
  await save("rss.xml", await render(app, "/rss.xml"));
  await save("sitemap.xml", await render(app, "/sitemap.xml"));

  // Apache rewrite + headers so clean URLs and feeds work on cPanel.
  const htaccess = await readFile(join(import.meta.dir, "static", "blog.htaccess"), "utf8");
  await save(".htaccess", htaccess);

  console.log("\nStatic site ready in dist/client — upload its contents to public_html/blog");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
