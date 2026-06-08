import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import {
  categorySlug,
  getPost,
  getRelatedPosts,
  type Post,
  SITE,
} from "@/content/posts";
import { formatDate, renderMarkdown } from "@/lib/markdown";
import { PostCard } from "@/components/PostCard";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return {
      post,
      html: renderMarkdown(post.content),
      related: getRelatedPosts(post),
    };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const url = `${SITE.url}/${params.slug}`;
    return {
      meta: [
        { title: `${post.title} — Veilo Blog` },
        { name: "description", content: post.description },
        { name: "author", content: post.author },
        { name: "keywords", content: post.tags.join(", ") },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: post.author },
        { property: "article:section", content: post.category },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
      ],
      links: [{ rel: "canonical", href: `/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Person", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "Veilo",
              url: SITE.mainSite,
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            articleSection: post.category,
            keywords: post.tags.join(", "),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-2xl font-semibold">Article not found</h1>
      <Link to="/" className="mt-4 inline-block text-primary underline underline-offset-4">
        Back to the blog
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post, html, related } = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>

      <header className="mt-6">
        <Link
          to="/category/$category"
          params={{ category: categorySlug(post.category) }}
          className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-80"
        >
          {post.category}
        </Link>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.description}</p>

        <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-sm font-semibold text-primary-foreground">
            {post.author
              .split(" ")
              .map((n: string) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div className="text-sm">
            <p className="font-medium text-foreground">{post.author}</p>
            <p className="text-muted-foreground">
              {post.authorRole} · {formatDate(post.date)} · {post.readingMinutes} min read
            </p>
          </div>
        </div>
      </header>

      <div
        className="prose-veilo mt-8"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {post.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-border bg-[image:var(--gradient-subtle)] p-7 text-center shadow-[var(--shadow-card)]">
        <h2 className="text-xl font-semibold tracking-tight">Protect what matters with Veilo</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          End-to-end encryption, biometric locks, intrusion detection and a decoy vault — on
          iOS and Android.
        </p>
        <a
          href={SITE.mainSite}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Download Veilo
        </a>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-semibold tracking-tight">Keep reading</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p: Post) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
