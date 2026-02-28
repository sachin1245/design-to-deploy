import type { Metadata } from "next";
import Link from "next/link";
import { DesignSystemToggle } from "@/components/design-system-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
	title: {
		template: "%s | design-to-deploy",
		default: "design-to-deploy",
	},
	description: "From pixel to production.",
};

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			{/* ── Navigation ────────────────────────────────── */}
			<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
					<div className="flex items-center gap-8">
						<Link
							href="/"
							className="font-display text-sm font-semibold tracking-widest text-primary uppercase"
						>
							d&mdash;t&mdash;d
						</Link>
						<NavLinks />
					</div>
					<div className="flex items-center gap-2">
						<DesignSystemToggle />
						<ThemeToggle />
						<MobileNav />
					</div>
				</div>
			</header>

			{/* ── Main Content ──────────────────────────────── */}
			<main className="flex-1">{children}</main>

			{/* ── Footer ────────────────────────────────────── */}
			<footer className="border-t border-border/60">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
					<p className="text-sm text-muted-foreground">
						&copy; {new Date().getFullYear()} design-to-deploy. Built with Next.js, Tailwind CSS v4
						&amp; React 19.
					</p>
					<div className="flex items-center gap-6">
						<Link
							href="/"
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Home
						</Link>
						<Link
							href="/about"
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							About
						</Link>
						<Link
							href="/dashboard"
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Dashboard
						</Link>
						<Link
							href="/showcase"
							className="text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							Showcase
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
