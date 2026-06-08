import { Link } from "@tanstack/react-router";
import { Shield, Download, Globe } from "lucide-react";

const MAIN = "https://veilo.link";

const NAV_LINKS = [
  { label: "Features", href: `${MAIN}/#features`, external: true },
  { label: "How it works", href: `${MAIN}/#how`, external: true },
  { label: "Pricing", href: `${MAIN}/#pricing`, external: true },
  { label: "Blog", href: "/", external: false },
  { label: "Docs", href: `${MAIN}/knowledge`, external: true },
  { label: "Download", href: `${MAIN}/#download`, external: true },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">Veilo</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Blog" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle language"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <Globe className="h-[1.05rem] w-[1.05rem]" />
          </button>
          <a
            href={`${MAIN}/#download`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Get app
          </a>
        </div>
      </div>
    </header>
  );
}
