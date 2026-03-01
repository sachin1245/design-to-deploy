"use client";

import { motion, useReducedMotion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export type ScrollProgressProps = {
	className?: string;
};

export function ScrollProgress({ className }: ScrollProgressProps) {
	const shouldReduce = useReducedMotion();
	const { scrollYProgress } = useScroll();

	if (shouldReduce) return null;

	return (
		<motion.div
			className={cn("fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-primary", className)}
			style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
			aria-hidden="true"
		/>
	);
}
