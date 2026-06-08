import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import {
  CATEGORIES,
  categorySlug,
  getAllPosts,
  getFeaturedPosts,
  SITE,
} from "@/content/posts";
import { PostCard } from "@/components/PostCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Veilo Blog — Privacy, Encryption & Digital Safety" },
      { name: "description", content: SITE.description },
      { property: "og:title", content: "Veilo Blog — Privacy, Encryption & Digital Safety" },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: SITE.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = getFeaturedPosts().slice(0, 2);
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const recent = getAllPosts().filter((p) => !featuredSlugs.has(p.slug));

  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="py-16 text-center sm:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-primary" />
          From the team behind Veilo
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Take back control of your{" "}
          <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
            private life
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Practical privacy guides, encryption explainers, and feature deep-dives — so your
          photos, videos and files stay yours alone.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/category/$category"
              params={{ category: categorySlug(c) }}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="pb-4">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Featured</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((post) => (
            <PostCard key={post.slug} post={post} featured />
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="py-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Latest articles</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
