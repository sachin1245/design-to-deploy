import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
	{
		title: "Token-Driven Design",
		description:
			"Every color, spacing value, and motion curve is a CSS custom property. Swap your entire theme by changing a few tokens — dark mode included.",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-6 w-6"
				aria-hidden="true"
			>
				<circle cx="12" cy="12" r="3" />
				<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
			</svg>
		),
	},
	{
		title: "Composable Patterns",
		description:
			"Compound components like Card, Tabs, and Dialog give you full control. Mix sub-components freely — no prop drilling, no magic.",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-6 w-6"
				aria-hidden="true"
			>
				<rect x="3" y="3" width="7" height="7" rx="1" />
				<rect x="14" y="3" width="7" height="7" rx="1" />
				<rect x="3" y="14" width="7" height="7" rx="1" />
				<rect x="14" y="14" width="7" height="7" rx="1" />
			</svg>
		),
	},
	{
		title: "Accessible by Default",
		description:
			"ARIA attributes, keyboard navigation, focus management, and screen reader support baked into every component. WCAG 2.1 AA compliant.",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-6 w-6"
				aria-hidden="true"
			>
				<circle cx="12" cy="4.5" r="2.5" />
				<path d="m10.2 8.5-3 10.5M13.8 8.5l3 10.5M6.5 12h11" />
			</svg>
		),
	},
	{
		title: "Variant Architecture",
		description:
			"class-variance-authority powers every component. Define variants, sizes, and states declaratively. TypeScript auto-completes them all.",
		icon: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-6 w-6"
				aria-hidden="true"
			>
				<polyline points="16 18 22 12 16 6" />
				<polyline points="8 6 2 12 8 18" />
				<line x1="14.5" y1="4" x2="9.5" y2="20" />
			</svg>
		),
	},
];

export function Features() {
	return (
		<section className="relative py-24 sm:py-32">
			{/* Subtle grid texture */}
			<div
				className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
				style={{
					backgroundImage:
						"linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
					backgroundSize: "48px 48px",
				}}
				aria-hidden="true"
			/>

			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				{/* Section header */}
				<div className="mb-16 max-w-2xl">
					<p className="mb-3 font-mono text-sm font-medium uppercase tracking-wider text-primary">
						Features
					</p>
					<h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Everything you need,
						<br />
						nothing you don&apos;t.
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Built for real products, not demos. Each component is battle-tested, fully typed, and
						ready for production.
					</p>
				</div>

				{/* Feature cards */}
				<div className="grid gap-6 sm:grid-cols-2">
					{features.map((feature) => (
						<Card key={feature.title} className="group transition-shadow hover:shadow-md">
							<CardHeader>
								<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
									{feature.icon}
								</div>
								<CardTitle>{feature.title}</CardTitle>
								<CardDescription>{feature.description}</CardDescription>
							</CardHeader>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
