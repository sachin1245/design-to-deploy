"use client";

import { motion, useReducedMotion } from "motion/react";
import { MotionReveal } from "@/components/motion";
import { pathDraw, reducedMotionTransition, springs, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const steps = [
	{
		number: "01",
		title: "Discovery",
		description:
			"We dive deep into your brand, audience, and goals. Research and strategy lay the foundation for everything that follows.",
	},
	{
		number: "02",
		title: "Concept",
		description:
			"Wireframes, moodboards, and prototypes come together to define the direction. We iterate until the vision is clear.",
	},
	{
		number: "03",
		title: "Design",
		description:
			"Pixel-perfect interfaces, motion design, and visual systems are crafted with care and attention to every detail.",
	},
	{
		number: "04",
		title: "Build",
		description:
			"Clean, performant code brings designs to life. We build for scale, accessibility, and long-term maintainability.",
	},
	{
		number: "05",
		title: "Launch",
		description:
			"Thorough QA, performance optimization, and strategic rollout ensure a smooth go-live and measurable results.",
	},
];

type ProcessTimelineProps = {
	className?: string;
};

export function ProcessTimeline({ className }: ProcessTimelineProps) {
	const shouldReduce = useReducedMotion();

	const lineTransition = shouldReduce
		? reducedMotionTransition
		: { ...springs.gentle, duration: 1.5, delay: 0.3 };

	return (
		<section className={cn("py-24", className)}>
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				<MotionReveal direction="up" spring="gentle">
					<p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
						Our Process
					</p>
					<h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
						How we work
					</h2>
					<p className="mt-3 max-w-lg text-muted-foreground">
						A proven process refined over hundreds of projects. Every phase has a purpose; nothing
						is wasted.
					</p>
				</MotionReveal>

				<div className="relative mt-16">
					{/* SVG connecting line */}
					<div className="absolute left-6 top-0 hidden h-full w-px md:block" aria-hidden="true">
						<svg className="h-full w-full overflow-visible" preserveAspectRatio="none" role="none">
							<motion.line
								x1="0"
								y1="0"
								x2="0"
								y2="100%"
								stroke="var(--primary)"
								strokeWidth="2"
								strokeLinecap="round"
								variants={pathDraw}
								initial="hidden"
								whileInView="visible"
								viewport={viewportOnce}
								transition={lineTransition}
							/>
						</svg>
					</div>

					{/* Steps */}
					<div className="space-y-12 md:space-y-16">
						{steps.map((step, index) => (
							<MotionReveal key={step.number} direction="up" delay={index * 0.1} spring="gentle">
								<div className="flex gap-6 md:gap-10">
									{/* Step number circle */}
									<div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-display text-sm font-bold text-primary">
										{step.number}
									</div>

									{/* Step content */}
									<div className="pb-2 pt-2">
										<h3 className="font-display text-xl font-bold text-foreground">{step.title}</h3>
										<p className="mt-2 max-w-md text-muted-foreground">{step.description}</p>
									</div>
								</div>
							</MotionReveal>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
