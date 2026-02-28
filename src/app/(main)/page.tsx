import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Home Page — Hero + Feature Cards + Activity Summary
   Server Component (no "use client")
   ═══════════════════════════════════════════════════ */

function LayersIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
			<path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
			<path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
		</svg>
	);
}

function PaletteIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
			<circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
			<circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
			<circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
			<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
		</svg>
	);
}

function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
		</svg>
	);
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
			<path d="m9 11 3 3L22 4" />
		</svg>
	);
}

const features = [
	{
		icon: LayersIcon,
		title: "36 Components",
		description:
			"From foundational primitives like Button and Input to composite patterns like CommandPalette and DataTable. Every variant tested.",
		badge: "Design System",
	},
	{
		icon: PaletteIcon,
		title: "Token-Driven Theming",
		description:
			"CSS custom properties power light and dark themes. Switch seamlessly with no flash, no layout shift. Colors, spacing, and motion all tokenized.",
		badge: "Theming",
	},
	{
		icon: ZapIcon,
		title: "Server-First Architecture",
		description:
			"Built on Next.js 15 App Router with React 19. Server Components by default, client interactivity only where needed. Fast by design.",
		badge: "Performance",
	},
];

const activityItems = [
	{
		action: "Added responsive navigation layout",
		time: "Just now",
		status: "success" as const,
	},
	{
		action: "Implemented Dashboard with KPI cards",
		time: "2 hours ago",
		status: "success" as const,
	},
	{
		action: "Created About page with tech stack",
		time: "3 hours ago",
		status: "success" as const,
	},
	{
		action: "Completed 36-component design system",
		time: "1 day ago",
		status: "info" as const,
	},
	{
		action: "Set up Vitest + Playwright testing",
		time: "2 days ago",
		status: "info" as const,
	},
];

export default function HomePage() {
	return (
		<div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
			{/* ── Hero Section ────────────────────────────── */}
			<section className="max-w-3xl">
				<Badge variant="info" className="mb-6">
					Phase 8 &mdash; App Pages
				</Badge>
				<h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
					From design tokens <span className="text-primary">to deployed pages</span>
				</h1>
				<p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
					A complete design system stress-test. Three production pages built entirely from reusable
					components, semantic tokens, and responsive layouts. Every pixel intentional.
				</p>
				<div className="mt-10 flex flex-wrap gap-4">
					<Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }))}>
						View Dashboard
					</Link>
					<Link href="/showcase" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
						Browse Components
					</Link>
				</div>
			</section>

			<Divider className="my-16 sm:my-20" />

			{/* ── Feature Cards ───────────────────────────── */}
			<section>
				<h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
					Highlights
				</h2>
				<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{features.map((feature) => (
						<Card key={feature.title}>
							<CardHeader>
								<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
									<feature.icon className="h-5 w-5" />
								</div>
								<div className="flex items-center gap-2">
									<CardTitle>{feature.title}</CardTitle>
								</div>
								<Badge variant="info" className="w-fit text-[10px]">
									{feature.badge}
								</Badge>
							</CardHeader>
							<CardContent>
								<CardDescription>{feature.description}</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<Divider className="my-16 sm:my-20" />

			{/* ── Recent Activity ─────────────────────────── */}
			<section>
				<h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
					Recent Activity
				</h2>
				<Card className="mt-8">
					<CardContent className="pt-6">
						<ul className="space-y-4">
							{activityItems.map((item) => (
								<li key={item.action} className="flex items-start gap-3">
									<CheckCircleIcon
										className={`mt-0.5 h-4 w-4 shrink-0 ${
											item.status === "success" ? "text-emerald-500" : "text-primary"
										}`}
									/>
									<div className="flex-1">
										<p className="text-sm text-foreground">{item.action}</p>
										<p className="text-xs text-muted-foreground">{item.time}</p>
									</div>
									<Badge variant={item.status} className="text-[10px]">
										{item.status === "success" ? "Done" : "Complete"}
									</Badge>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</section>
		</div>
	);
}
