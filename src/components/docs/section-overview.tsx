import { MotionItem, MotionReveal, MotionStagger } from "@/components/motion";
import { OVERVIEW } from "./data";

export function SectionOverview() {
	return (
		<section id="overview" aria-label="Overview">
			<MotionReveal direction="up" spring="gentle">
				<h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					{OVERVIEW.title}
				</h1>
				<p className="mt-2 font-display text-lg text-muted-foreground">{OVERVIEW.subtitle}</p>
			</MotionReveal>

			<MotionReveal direction="up" delay={0.1} spring="gentle">
				<p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
					{OVERVIEW.description}
				</p>
			</MotionReveal>

			<MotionStagger stagger={0.06} className="mt-8">
				<h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-primary">
					Quick Start
				</h2>
				<ol className="space-y-2">
					{OVERVIEW.quickStart.map((item) => (
						<MotionItem key={item}>
							<li className="flex items-start gap-3 text-sm text-muted-foreground">
								<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
								{item}
							</li>
						</MotionItem>
					))}
				</ol>
			</MotionStagger>
		</section>
	);
}
