"use client";

import { motion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

type DocsProgressProps = {
	className?: string;
};

export function DocsProgress({ className }: DocsProgressProps) {
	const { scrollYProgress } = useScroll();

	return (
		<motion.div
			className={cn("fixed top-0 left-0 right-0 z-50 h-0.5 bg-primary origin-left", className)}
			style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
			aria-hidden="true"
		/>
	);
}
