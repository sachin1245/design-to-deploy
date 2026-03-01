"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { createStaggerContainer, fadeInUp, reducedMotionTransition, springs } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AgencyHeroProps = {
	className?: string;
};

export function AgencyHero({ className }: AgencyHeroProps) {
	const shouldReduce = useReducedMotion();
	const sectionRef = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);
	const midY = useTransform(scrollYProgress, [0, 1], [0, -100]);
	const fgY = useTransform(scrollYProgress, [0, 1], [0, -200]);

	const containerVariants = shouldReduce
		? { hidden: {}, visible: {} }
		: createStaggerContainer(0.12, 0.15);

	const itemTransition = shouldReduce ? reducedMotionTransition : springs.gentle;

	return (
		<section
			ref={sectionRef}
			className={cn(
				"relative flex min-h-screen items-center overflow-hidden bg-background",
				className,
			)}
		>
			{/* Background parallax layer — deep, slow-moving gradient orbs */}
			<motion.div
				className="pointer-events-none absolute inset-0 -z-30"
				style={{ y: shouldReduce ? 0 : bgY }}
				aria-hidden="true"
			>
				<div
					className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full opacity-20 blur-[100px]"
					style={{
						background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
					}}
				/>
				<div
					className="absolute -bottom-48 right-0 h-[500px] w-[500px] rounded-full opacity-15 blur-[80px]"
					style={{
						background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
					}}
				/>
			</motion.div>

			{/* Mid parallax layer — geometric shapes */}
			<motion.div
				className="pointer-events-none absolute inset-0 -z-20"
				style={{ y: shouldReduce ? 0 : midY }}
				aria-hidden="true"
			>
				<div className="absolute left-[15%] top-[20%] h-64 w-64 rotate-45 rounded-3xl border border-primary/10 opacity-40" />
				<div className="absolute bottom-[25%] right-[10%] h-48 w-48 rounded-full border border-accent/10 opacity-30" />
				<div className="absolute left-[60%] top-[60%] h-32 w-32 rotate-12 rounded-xl border border-primary/15 opacity-25" />
			</motion.div>

			{/* Foreground parallax layer — small decorative elements */}
			<motion.div
				className="pointer-events-none absolute inset-0 -z-10"
				style={{ y: shouldReduce ? 0 : fgY }}
				aria-hidden="true"
			>
				<div className="absolute left-[70%] top-[15%] h-3 w-3 rounded-full bg-primary opacity-60" />
				<div className="absolute left-[25%] top-[75%] h-2 w-2 rounded-full bg-accent opacity-50" />
				<div className="absolute left-[80%] top-[65%] h-4 w-4 rounded-full bg-primary/40 opacity-40" />
			</motion.div>

			{/* Content */}
			<div className="mx-auto w-full max-w-6xl px-6 py-32 sm:px-8">
				<motion.div
					className="max-w-3xl"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={containerVariants}
				>
					<motion.p
						className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary"
						variants={fadeInUp}
						transition={itemTransition}
					>
						Creative Studio
					</motion.p>

					<motion.h1
						className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
						variants={fadeInUp}
						transition={itemTransition}
					>
						We craft
						<br />
						<span className="text-primary">digital</span> experiences
					</motion.h1>

					<motion.p
						className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
						variants={fadeInUp}
						transition={itemTransition}
					>
						Strategy, design, and engineering for brands that refuse to blend in. We build the
						digital products people remember.
					</motion.p>

					<motion.div
						className="mt-10 flex flex-wrap gap-4"
						variants={fadeInUp}
						transition={itemTransition}
					>
						<Button size="lg">View Our Work</Button>
						<Button variant="outline" size="lg">
							Get in Touch
						</Button>
					</motion.div>

					<motion.div
						className="mt-16 flex gap-10 border-t border-border pt-8"
						variants={fadeInUp}
						transition={itemTransition}
					>
						<div>
							<p className="font-display text-3xl font-bold text-foreground">120+</p>
							<p className="text-sm text-muted-foreground">Projects Shipped</p>
						</div>
						<div>
							<p className="font-display text-3xl font-bold text-foreground">8</p>
							<p className="text-sm text-muted-foreground">Years Running</p>
						</div>
						<div>
							<p className="font-display text-3xl font-bold text-foreground">40+</p>
							<p className="text-sm text-muted-foreground">Global Clients</p>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
