/**
 * Framer Motion presets — animation variants, spring configs, and helpers.
 *
 * Import from `@/lib/motion` in client components. All spring and duration
 * values are sourced from `@/lib/tokens` to stay aligned with design tokens.
 */

import type { Transition, Variants } from "motion/react";
import { durationSeconds, springPresets } from "@/lib/tokens";

export type { SpringPresetName } from "@/lib/tokens";
// Re-export for convenience so consumers don't need to import from tokens
export { springPresets } from "@/lib/tokens";

// ─── Spring shortcuts ───────────────────────────────────────────────

export const springs = springPresets;

// ─── Duration shortcuts (seconds) ───────────────────────────────────

export const durations = durationSeconds;

// ─── Variant presets ────────────────────────────────────────────────

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 24 },
	visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
	hidden: { opacity: 0, y: -24 },
	visible: { opacity: 1, y: 0 },
};

export const fadeInLeft: Variants = {
	hidden: { opacity: 0, x: -24 },
	visible: { opacity: 1, x: 0 },
};

export const fadeInRight: Variants = {
	hidden: { opacity: 0, x: 24 },
	visible: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1 },
};

// ─── Stagger helpers ────────────────────────────────────────────────

/** Container variant that triggers staggered children. */
export const staggerContainer: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.05,
		},
	},
};

/** Create a stagger container with custom timing. */
export function createStaggerContainer(stagger = 0.1, delayChildren = 0.05): Variants {
	return {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: stagger,
				delayChildren,
			},
		},
	};
}

// ─── Interaction presets ────────────────────────────────────────────

/** Subtle lift on hover — good for cards and clickable elements. */
export const hoverLift = {
	whileHover: { y: -2, transition: springs.snappy },
	whileTap: { scale: 0.98, transition: springs.snappy },
} as const;

/** Scale up on hover — good for buttons and icons. */
export const hoverScale = {
	whileHover: { scale: 1.03, transition: springs.snappy },
	whileTap: { scale: 0.97, transition: springs.snappy },
} as const;

/** Shrink on tap — minimal feedback for touch interactions. */
export const tapShrink = {
	whileTap: { scale: 0.95, transition: springs.snappy },
} as const;

// ─── Viewport defaults ─────────────────────────────────────────────

/** Standard viewport trigger: once, 30% visible. */
export const viewportOnce = { once: true, amount: 0.3 } as const;

// ─── Reduced motion ────────────────────────────────────────────────

/** Transition override for `prefers-reduced-motion` — instant, no animation. */
export const reducedMotionTransition: Transition = { duration: 0 };

// ─── SVG path drawing ──────────────────────────────────────────────

/** Animate SVG path from hidden to fully drawn. */
export const pathDraw: Variants = {
	hidden: { pathLength: 0, opacity: 0 },
	visible: { pathLength: 1, opacity: 1 },
};

// ─── Direction map (used by MotionReveal) ───────────────────────────

export const directionVariants = {
	up: fadeInUp,
	down: fadeInDown,
	left: fadeInLeft,
	right: fadeInRight,
	none: fadeIn,
} as const;

export type RevealDirection = keyof typeof directionVariants;
