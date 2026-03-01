"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { createStaggerContainer, fadeInUp, reducedMotionTransition, springs } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type PricingHeroProps = {
	className?: string;
};

export function PricingHero({ className }: PricingHeroProps) {
	const shouldReduce = useReducedMotion();
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end start"],
	});

	const shape1Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
	const shape2Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
	const shape3Y = useTransform(scrollYProgress, [0, 1], [0, -160]);

	const containerVariants = shouldReduce
		? { hidden: {}, visible: {} }
		: createStaggerContainer(0.12, 0.1);

	const itemTransition = shouldReduce ? reducedMotionTransition : springs.gentle;

	return (
		<section
			ref={sectionRef}
			className={cn("relative flex min-h-[70vh] items-center overflow-hidden", className)}
		>
			{/* Parallax gradient shapes — decorative */}
			<motion.div
				className="pointer-events-none absolute left-[10%] top-[20%] -z-10 h-[300px] w-[300px] rounded-full opacity-25 blur-3xl dark:opacity-15"
				style={{
					background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
					y: shouldReduce ? 0 : shape1Y,
				}}
				aria-hidden="true"
			/>
			<motion.div
				className="pointer-events-none absolute right-[15%] top-[10%] -z-10 h-[250px] w-[250px] rounded-full opacity-20 blur-3xl dark:opacity-10"
				style={{
					background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
					y: shouldReduce ? 0 : shape2Y,
				}}
				aria-hidden="true"
			/>
			<motion.div
				className="pointer-events-none absolute left-[50%] bottom-[10%] -z-10 h-[200px] w-[200px] rounded-full opacity-20 blur-3xl dark:opacity-10"
				style={{
					background: "radial-gradient(circle, var(--primary) 30%, var(--accent) 100%)",
					y: shouldReduce ? 0 : shape3Y,
				}}
				aria-hidden="true"
			/>

			<div className="mx-auto w-full max-w-4xl px-6 py-24 text-center sm:px-8">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={containerVariants}
				>
					<motion.p
						className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
						variants={fadeInUp}
						transition={itemTransition}
					>
						Pricing
					</motion.p>

					<motion.h1
						className="font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
						variants={fadeInUp}
						transition={itemTransition}
					>
						Simple pricing for <span className="text-primary">every team</span>
					</motion.h1>

					<motion.p
						className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
						variants={fadeInUp}
						transition={itemTransition}
					>
						Start free and scale as you grow. No hidden fees, no surprise charges. Just transparent
						pricing that works for teams of any size.
					</motion.p>
				</motion.div>
			</div>
		</section>
	);
}
