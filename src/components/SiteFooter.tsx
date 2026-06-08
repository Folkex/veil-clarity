import { Link } from "@tanstack/react-router";
import { CATEGORIES, categorySlug, SITE } from "@/content/posts";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-[image:var(--gradient-subtle)]">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <span className="text-lg font-semibold tracking-tight">{SITE.brand}</span>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{SITE.tagline}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Topics</h3>
          <ul className="mt-3 space-y-2">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link
                  to="/category/$category"
                  params={{ category: categorySlug(c) }}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Veilo</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={SITE.mainSite} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Main site
              </a>
            </li>
            <li>
              <a href={`${SITE.mainSite}/#download`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Download
              </a>
            </li>
            <li>
              <a href={`${SITE.mainSite}/#pricing`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Subscribe</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <a href="/rss.xml" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                RSS feed
              </a>
            </li>
            <li>
              <a href="/sitemap.xml" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Veilo. Privacy-first by design.</p>
          <p>End-to-end encrypted. iOS &amp; Android.</p>
        </div>
      </div>
    </footer>
  );
}
