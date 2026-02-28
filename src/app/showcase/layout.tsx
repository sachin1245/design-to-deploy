import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
	title: "Showcase — design-to-deploy",
	description: "Interactive component showcase with every variant, size, and state.",
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* ── Sticky header with breadcrumb nav ────────── */}
			<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
					<nav className="flex items-center gap-3">
						<Link
							href="/"
							className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="transition-transform group-hover:-translate-x-0.5"
								aria-hidden="true"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
							Home
						</Link>
						<span className="select-none text-border" aria-hidden="true">
							/
						</span>
						<span className="font-display text-sm font-semibold tracking-wide">Showcase</span>
					</nav>
					<ThemeToggle />
				</div>
			</header>

			{/* ── Page content ─────────────────────────────── */}
			<main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">{children}</main>
		</div>
	);
}
