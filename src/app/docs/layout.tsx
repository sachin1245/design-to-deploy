import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata = {
	title: "Documentation — Clarity",
	description: "Interactive developer guide for Claude Code orchestration in design-to-deploy.",
};

export default function DocsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex min-h-screen flex-col bg-background text-foreground">
			{/* Header */}
			<header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
				<div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
					<div className="flex items-center gap-4">
						<Link
							href="/"
							className="font-display text-sm font-semibold tracking-widest text-primary uppercase"
						>
							d&mdash;t&mdash;d
						</Link>
						<Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Documentation" }]} />
					</div>
					<ThemeToggle />
				</div>
			</header>

			{/* Content */}
			{children}
		</div>
	);
}
