import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/content/posts";
import { formatDate } from "@/lib/markdown";

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link
      to="/$slug"
      params={{ slug: post.slug }}
      className={`group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 ${
        featured ? "sm:p-8" : ""
      }`}
    >
      <div className="flex items-center gap-3 text-xs font-medium">
        <span className="rounded-full bg-accent px-2.5 py-1 text-accent-foreground">
          {post.category}
        </span>
        <span className="text-muted-foreground">{post.readingMinutes} min read</span>
      </div>

      <h3
        className={`mt-4 font-semibold tracking-tight text-card-foreground transition-colors group-hover:text-primary ${
          featured ? "text-2xl" : "text-lg"
        }`}
      >
        {post.title}
      </h3>

      <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {post.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div className="text-xs">
          <p className="font-medium text-foreground">{post.author}</p>
          <p className="text-muted-foreground">{formatDate(post.date)}</p>
        </div>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
