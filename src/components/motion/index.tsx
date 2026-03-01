"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { forwardRef, type ReactNode } from "react";
import {
	createStaggerContainer,
	directionVariants,
	fadeInUp,
	type RevealDirection,
	reducedMotionTransition,
	type SpringPresetName,
	springs,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── MotionReveal ───────────────────────────────────────────────────

export type MotionRevealProps = {
	/** Animation direction. @default "up" */
	direction?: RevealDirection;
	/** Delay before animation starts (seconds). @default 0 */
	delay?: number;
	/** Spring preset name from design tokens. @default "gentle" */
	spring?: SpringPresetName;
	/** Fraction of element visible before triggering. @default 0.3 */
	viewportAmount?: number;
	/** Only animate on first entrance. @default true */
	once?: boolean;
	className?: string;
	children: ReactNode;
};

/**
 * Viewport-triggered reveal animation.
 *
 * Wraps children in a `motion.div` that animates in when scrolled into view.
 * Respects `prefers-reduced-motion` by skipping animation entirely.
 */
const MotionReveal = forwardRef<HTMLDivElement, MotionRevealProps>(
	(
		{
			direction = "up",
			delay = 0,
			spring = "gentle",
			viewportAmount = 0.3,
			once = true,
			className,
			children,
		},
		ref,
	) => {
		const shouldReduce = useReducedMotion();

		const variants = directionVariants[direction];
		const transition = shouldReduce ? reducedMotionTransition : { ...springs[spring], delay };

		return (
			<motion.div
				ref={ref}
				initial="hidden"
				whileInView="visible"
				viewport={{ once, amount: viewportAmount }}
				variants={variants}
				transition={transition}
				className={cn(className)}
			>
				{children}
			</motion.div>
		);
	},
);
MotionReveal.displayName = "MotionReveal";

// ─── MotionStagger ──────────────────────────────────────────────────

export type MotionStaggerProps = {
	/** Delay between each child animation (seconds). @default 0.1 */
	stagger?: number;
	/** Delay before stagger sequence starts (seconds). @default 0.05 */
	delayChildren?: number;
	/** Fraction of element visible before triggering. @default 0.3 */
	viewportAmount?: number;
	/** Only animate on first entrance. @default true */
	once?: boolean;
	className?: string;
	children: ReactNode;
};

/**
 * Stagger container for animating children sequentially.
 *
 * Wrap multiple `<MotionItem>` children in this component to create
 * cascading entrance animations triggered on viewport entry.
 */
const MotionStagger = forwardRef<HTMLDivElement, MotionStaggerProps>(
	(
		{ stagger = 0.1, delayChildren = 0.05, viewportAmount = 0.3, once = true, className, children },
		ref,
	) => {
		const shouldReduce = useReducedMotion();

		const containerVariants = shouldReduce
			? { hidden: {}, visible: {} }
			: createStaggerContainer(stagger, delayChildren);

		return (
			<motion.div
				ref={ref}
				initial="hidden"
				whileInView="visible"
				viewport={{ once, amount: viewportAmount }}
				variants={containerVariants}
				className={cn(className)}
			>
				{children}
			</motion.div>
		);
	},
);
MotionStagger.displayName = "MotionStagger";

// ─── MotionItem ─────────────────────────────────────────────────────

export type MotionItemProps = {
	/** Custom variants override. @default fadeInUp */
	variants?: Variants;
	/** Spring preset name. @default "gentle" */
	spring?: SpringPresetName;
	className?: string;
	children: ReactNode;
};

/**
 * Child item for use inside `<MotionStagger>`.
 *
 * Inherits stagger timing from the parent container. Uses `fadeInUp` by
 * default but accepts custom variants.
 */
const MotionItem = forwardRef<HTMLDivElement, MotionItemProps>(
	({ variants: customVariants, spring = "gentle", className, children }, ref) => {
		const shouldReduce = useReducedMotion();

		const itemVariants = customVariants ?? fadeInUp;
		const transition = shouldReduce ? reducedMotionTransition : springs[spring];

		return (
			<motion.div
				ref={ref}
				variants={itemVariants}
				transition={transition}
				className={cn(className)}
			>
				{children}
			</motion.div>
		);
	},
);
MotionItem.displayName = "MotionItem";

// ─── Exports ────────────────────────────────────────────────────────

export { MotionReveal, MotionStagger, MotionItem };
