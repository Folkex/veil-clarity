import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  CATEGORIES,
  categorySlug,
  getPostsByCategory,
  SITE,
  type Category,
  type Post,
} from "@/content/posts";
import { PostCard } from "@/components/PostCard";

function resolveCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => categorySlug(c) === slug);
}

export const Route = createFileRoute("/category/$category")({
  loader: ({ params }) => {
    const category = resolveCategory(params.category);
    if (!category) throw notFound();
    return { category, posts: getPostsByCategory(category) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { category } = loaderData;
    const title = `${category} — Veilo Blog`;
    const description = `${category} articles from Veilo: privacy guides, encryption explainers and feature deep-dives.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE.url}/category/${params.category}` },
      ],
      links: [{ rel: "canonical", href: `/category/${params.category}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-2xl font-semibold">Category not found</h1>
      <Link to="/" className="mt-4 inline-block text-primary underline underline-offset-4">
        Back to the blog
      </Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, posts } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <header className="text-center">
        <p className="text-sm font-medium text-primary">Category</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{category}</h1>
      </header>

      <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            to="/category/$category"
            params={{ category: categorySlug(c) }}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
            activeProps={{ className: "border-primary/40 bg-primary text-primary-foreground" }}
          >
            {c}
          </Link>
        ))}
      </nav>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">
          No articles in this category yet.
        </p>
      )}
    </div>
  );
}
