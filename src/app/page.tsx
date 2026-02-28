import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 sm:px-8">
        <span className="font-display text-sm font-semibold tracking-widest text-primary uppercase">
          d—t—d
        </span>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-3xl px-6 pt-24 pb-32 sm:px-8 sm:pt-36">
        <h1 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
          design
          <span className="text-primary">—</span>to
          <span className="text-primary">—</span>deploy
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
          A bold design system foundation. Typed tokens, CSS custom properties,
          Tailwind v4 integration, and theme switching that feels right.
        </p>

        {/* Action row */}
        <div className="mt-10 flex flex-wrap gap-4">
          <span className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105 active:scale-95">
            Tokens Active
          </span>
          <span className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground transition-transform hover:scale-105 active:scale-95">
            Theme System Ready
          </span>
          <Link
            href="/showcase"
            className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground transition-transform hover:scale-105 active:scale-95"
          >
            Component Showcase &rarr;
          </Link>
        </div>

        {/* Color palette showcase */}
        <section className="mt-20">
          <h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Palette
          </h2>
          <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-8">
            <Swatch className="bg-primary" label="Primary" />
            <Swatch className="bg-secondary" label="Secondary" />
            <Swatch className="bg-accent" label="Accent" />
            <Swatch className="bg-destructive" label="Destructive" />
            <Swatch className="bg-muted" label="Muted" />
            <Swatch className="bg-card" label="Card" />
            <Swatch className="bg-foreground" label="Foreground" />
            <Swatch className="bg-background border border-border" label="Background" />
          </div>
        </section>

        {/* Typography sample */}
        <section className="mt-20">
          <h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Typography
          </h2>
          <div className="mt-4 space-y-3">
            <p className="font-display text-4xl font-bold tracking-tight">
              Space Grotesk — Display
            </p>
            <p className="text-lg">
              Geist Sans — Body text with good readability and a clean feel.
            </p>
            <p className="font-mono text-sm text-muted-foreground">
              Geist Mono — const token = &quot;monospace&quot;;
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Swatch({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`h-12 w-full rounded-lg shadow-sm transition-transform hover:scale-110 ${className}`}
      />
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
