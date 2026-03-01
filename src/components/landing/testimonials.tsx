"use client";

import { MotionItem, MotionReveal, MotionStagger } from "@/components/motion";
import { Avatar } from "@/components/ui/avatar";

const testimonials = [
	{
		quote:
			"Clarity replaced three different component libraries in our stack. The token system alone saved us weeks of design-engineering alignment.",
		name: "Elena Vasquez",
		role: "Lead Engineer, Meridian",
		initials: "EV",
	},
	{
		quote:
			"Finally, a library that treats accessibility as a feature, not an afterthought. Every component works with screen readers out of the box.",
		name: "James Okafor",
		role: "Design Systems Lead, Praxis",
		initials: "JO",
	},
	{
		quote:
			"The CVA variant pattern is addictive. We went from inconsistent one-off styles to a unified component API in a single sprint.",
		name: "Mina Chen",
		role: "Frontend Architect, Lumen",
		initials: "MC",
	},
];

export function Testimonials() {
	return (
		<section className="py-24 sm:py-32">
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				{/* Section header */}
				<MotionReveal direction="up" spring="gentle" className="mb-16 max-w-2xl">
					<p className="mb-3 font-mono text-sm font-medium uppercase tracking-wider text-primary">
						Testimonials
					</p>
					<h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Trusted by teams
						<br />
						who ship.
					</h2>
				</MotionReveal>

				{/* Testimonial grid */}
				<MotionStagger stagger={0.12} className="grid gap-8 sm:grid-cols-3">
					{testimonials.map((t) => (
						<MotionItem key={t.name}>
							<figure className="relative">
								{/* Oversized quotation mark */}
								<span
									className="pointer-events-none absolute -top-4 -left-2 select-none font-display text-7xl leading-none text-primary/10"
									aria-hidden="true"
								>
									&ldquo;
								</span>

								<blockquote className="relative text-base leading-relaxed text-foreground">
									{t.quote}
								</blockquote>

								<figcaption className="mt-6 flex items-center gap-3">
									<Avatar fallback={t.initials} alt={t.name} size="sm" />
									<div>
										<p className="text-sm font-medium text-foreground">{t.name}</p>
										<p className="text-sm text-muted-foreground">{t.role}</p>
									</div>
								</figcaption>
							</figure>
						</MotionItem>
					))}
				</MotionStagger>
			</div>
		</section>
	);
}
