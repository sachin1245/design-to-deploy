/**
 * Design Tokens — typed definitions for the design system.
 *
 * These tokens are the single source of truth. CSS custom properties
 * in globals.css mirror these values, and Tailwind v4 consumes them
 * via `@theme inline`.
 */

// ─── Colors ──────────────────────────────────────────────────────────

export const colors = {
	light: {
		background: "#faf8f5",
		foreground: "#1c1427",
		card: "#ffffff",
		"card-foreground": "#1c1427",
		popover: "#ffffff",
		"popover-foreground": "#1c1427",
		primary: "#7c3aed",
		"primary-foreground": "#faf8f5",
		secondary: "#f0ecf9",
		"secondary-foreground": "#4c1d95",
		muted: "#f3f0f7",
		"muted-foreground": "#736b7e",
		accent: "#f59e0b",
		"accent-foreground": "#451a03",
		destructive: "#e11d48",
		"destructive-foreground": "#ffffff",
		border: "#e8e0f0",
		input: "#e8e0f0",
		ring: "#7c3aed",
	},
	dark: {
		background: "#0f0d15",
		foreground: "#f5f0ff",
		card: "#1a1726",
		"card-foreground": "#f5f0ff",
		popover: "#1a1726",
		"popover-foreground": "#f5f0ff",
		primary: "#a78bfa",
		"primary-foreground": "#0f0d15",
		secondary: "#262235",
		"secondary-foreground": "#c4b5fd",
		muted: "#262235",
		"muted-foreground": "#a099b4",
		accent: "#fbbf24",
		"accent-foreground": "#1a0f00",
		destructive: "#fb7185",
		"destructive-foreground": "#1c0412",
		border: "#352f4a",
		input: "#352f4a",
		ring: "#a78bfa",
	},
} as const;

export type ColorToken = keyof typeof colors.light;

// ─── Typography ──────────────────────────────────────────────────────

export const typography = {
	xs: { fontSize: "0.75rem", lineHeight: "1rem" },
	sm: { fontSize: "0.875rem", lineHeight: "1.25rem" },
	base: { fontSize: "1rem", lineHeight: "1.5rem" },
	lg: { fontSize: "1.125rem", lineHeight: "1.75rem" },
	xl: { fontSize: "1.25rem", lineHeight: "1.75rem" },
	"2xl": { fontSize: "1.5rem", lineHeight: "2rem" },
	"3xl": { fontSize: "1.875rem", lineHeight: "2.25rem" },
	"4xl": { fontSize: "2.25rem", lineHeight: "2.5rem" },
} as const;

export type TypographyScale = keyof typeof typography;

export const fontFamily = {
	sans: "var(--font-geist-sans)",
	mono: "var(--font-geist-mono)",
	display: "var(--font-space-grotesk)",
} as const;

export type FontFamily = keyof typeof fontFamily;

// ─── Spacing ─────────────────────────────────────────────────────────

export const spacing = {
	0: "0px",
	1: "0.25rem",
	2: "0.5rem",
	3: "0.75rem",
	4: "1rem",
	5: "1.25rem",
	6: "1.5rem",
	7: "1.75rem",
	8: "2rem",
	9: "2.25rem",
	10: "2.5rem",
	11: "2.75rem",
	12: "3rem",
	14: "3.5rem",
	16: "4rem",
	18: "4.5rem",
	20: "5rem",
} as const;

export type SpacingScale = keyof typeof spacing;

// ─── Border Radius ───────────────────────────────────────────────────

export const radius = {
	none: "0px",
	sm: "0.375rem",
	md: "0.5rem",
	lg: "0.75rem",
	xl: "1rem",
	full: "9999px",
} as const;

export type RadiusScale = keyof typeof radius;

// ─── Shadows ─────────────────────────────────────────────────────────

export const shadows = {
	sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
	md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
	lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
	xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const;

export type ShadowScale = keyof typeof shadows;

// ─── Motion ─────────────────────────────────────────────────────────

export const duration = {
	instant: "50ms",
	fast: "150ms",
	normal: "250ms",
	slow: "400ms",
	slower: "600ms",
} as const;

export type DurationScale = keyof typeof duration;

/** Duration values in seconds — for use with Framer Motion transitions. */
export const durationSeconds = {
	instant: 0.05,
	fast: 0.15,
	normal: 0.25,
	slow: 0.4,
	slower: 0.6,
} as const satisfies Record<DurationScale, number>;

export const easing = {
	default: "cubic-bezier(0.2, 0, 0, 1)",
	spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
	out: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export type EasingCurve = keyof typeof easing;

// ─── Spring Presets (Framer Motion) ─────────────────────────────────

export type SpringPreset = {
	type: "spring";
	stiffness: number;
	damping: number;
	mass?: number;
};

/** Spring presets for Framer Motion — tuned to complement design tokens. */
export const springPresets = {
	/** Snappy — fast, crisp interactions (buttons, toggles) */
	snappy: { type: "spring" as const, stiffness: 400, damping: 30 },
	/** Default — balanced, natural motion (general purpose) */
	default: { type: "spring" as const, stiffness: 200, damping: 24 },
	/** Gentle — smooth reveals (viewport entrance, fade-ins) */
	gentle: { type: "spring" as const, stiffness: 80, damping: 14 },
	/** Bouncy — playful, elastic feel (hero elements, emphasis) */
	bouncy: { type: "spring" as const, stiffness: 300, damping: 12 },
} as const satisfies Record<string, SpringPreset>;

export type SpringPresetName = keyof typeof springPresets;
