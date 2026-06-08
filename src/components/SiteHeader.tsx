import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { CATEGORIES, categorySlug, SITE } from "@/content/posts";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]">
            <Shield className="h-5 w-5" />
          </span>
          <span className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold tracking-tight">{SITE.brand}</span>
            <span className="text-sm font-medium text-muted-foreground">Blog</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/category/$category"
              params={{ category: categorySlug(c) }}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeProps={{ className: "bg-accent text-accent-foreground" }}
            >
              {c}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.mainSite}
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Get Veilo
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
