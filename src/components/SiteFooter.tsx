import { Shield } from "lucide-react";

const MAIN = "https://veilo.link";

const FOOTER_LINKS = [
  { label: "Privacy", href: `${MAIN}/privacy` },
  { label: "Terms", href: `${MAIN}/terms` },
  { label: "Refund", href: `${MAIN}/refund` },
  { label: "Contact", href: `${MAIN}/contact` },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-4 w-4" />
            </span>
            <span className="font-semibold tracking-tight">Veilo</span>
            <span className="text-sm text-muted-foreground">© {year}</span>
          </div>

          <nav className="flex items-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
            Made with ❤ in Lebanon
          </span>
        </div>
      </div>
    </footer>
  );
}
