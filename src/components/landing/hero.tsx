import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
	return (
		<section className="relative min-h-[90vh] flex items-center overflow-hidden">
			{/* Floating orb — decorative gradient sphere */}
			<div
				className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] animate-landing-orb rounded-full opacity-30 blur-3xl dark:opacity-20"
				style={{
					background:
						"radial-gradient(circle, var(--accent) 0%, var(--primary) 50%, transparent 70%)",
				}}
				aria-hidden="true"
			/>

			{/* Pulse ring accent */}
			<div
				className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-landing-pulse rounded-full border border-primary/20"
				aria-hidden="true"
			/>

			<div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8">
				<div className="max-w-3xl">
					{/* Eyebrow */}
					<div className="animate-landing-reveal" style={{ animationDelay: "0ms" }}>
						<Badge variant="info" className="mb-6">
							v1.0 — 36 Components
						</Badge>
					</div>

					{/* Headline */}
					<h1
						className="animate-landing-reveal font-display text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
						style={{ animationDelay: "100ms" }}
					>
						Build interfaces
						<br />
						with <span className="text-primary">clarity</span>,
						<br />
						not compromise.
					</h1>

					{/* Subtitle */}
					<p
						className="animate-landing-reveal mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
						style={{ animationDelay: "200ms" }}
					>
						A production-ready React component library built on Tailwind CSS v4. Accessible,
						themeable, and designed for teams that care about craft.
					</p>

					{/* CTAs */}
					<div
						className="animate-landing-reveal mt-10 flex flex-wrap gap-4"
						style={{ animationDelay: "300ms" }}
					>
						<Button size="lg">Get Started</Button>
						<Button variant="outline" size="lg">
							View Components
						</Button>
					</div>

					{/* Stats row */}
					<div
						className="animate-landing-reveal mt-16 flex gap-10 border-t border-border pt-8"
						style={{ animationDelay: "400ms" }}
					>
						<div>
							<p className="font-display text-3xl font-bold text-foreground">36</p>
							<p className="text-sm text-muted-foreground">Components</p>
						</div>
						<div>
							<p className="font-display text-3xl font-bold text-foreground">100%</p>
							<p className="text-sm text-muted-foreground">Accessible</p>
						</div>
						<div>
							<p className="font-display text-3xl font-bold text-foreground">0</p>
							<p className="text-sm text-muted-foreground">Dependencies</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
