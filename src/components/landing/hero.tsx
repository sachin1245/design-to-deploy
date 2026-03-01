"use client";

import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createStaggerContainer, fadeInUp, reducedMotionTransition, springs } from "@/lib/motion";

export function Hero() {
	const shouldReduce = useReducedMotion();

	const containerVariants = shouldReduce
		? { hidden: {}, visible: {} }
		: createStaggerContainer(0.12, 0.1);

	const itemTransition = shouldReduce ? reducedMotionTransition : springs.gentle;

	return (
		<section className="relative min-h-[90vh] flex items-center overflow-hidden">
			{/* Floating orb — decorative gradient sphere (CSS animation, kept) */}
			<div
				className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] animate-landing-orb rounded-full opacity-30 blur-3xl dark:opacity-20"
				style={{
					background:
						"radial-gradient(circle, var(--accent) 0%, var(--primary) 50%, transparent 70%)",
				}}
				aria-hidden="true"
			/>

			{/* Pulse ring accent (CSS animation, kept) */}
			<div
				className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-landing-pulse rounded-full border border-primary/20"
				aria-hidden="true"
			/>

			<div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8">
				<motion.div
					className="max-w-3xl"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={containerVariants}
				>
					{/* Eyebrow */}
					<motion.div variants={fadeInUp} transition={itemTransition}>
						<Badge variant="info" className="mb-6">
							v1.0 — 36 Components
						</Badge>
					</motion.div>

					{/* Headline */}
					<motion.h1
						className="font-display text-5xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
						variants={fadeInUp}
						transition={itemTransition}
					>
						Build interfaces
						<br />
						with <span className="text-primary">clarity</span>,
						<br />
						not compromise.
					</motion.h1>

					{/* Subtitle */}
					<motion.p
						className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
						variants={fadeInUp}
						transition={itemTransition}
					>
						A production-ready React component library built on Tailwind CSS v4. Accessible,
						themeable, and designed for teams that care about craft.
					</motion.p>

					{/* CTAs */}
					<motion.div
						className="mt-10 flex flex-wrap gap-4"
						variants={fadeInUp}
						transition={itemTransition}
					>
						<Button size="lg">Get Started</Button>
						<Button variant="outline" size="lg">
							View Components
						</Button>
					</motion.div>

					{/* Stats row */}
					<motion.div
						className="mt-16 flex gap-10 border-t border-border pt-8"
						variants={fadeInUp}
						transition={itemTransition}
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
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
