import { render, screen } from "@testing-library/react";
import { createElement, forwardRef, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

const motionPropKeys = new Set([
	"initial",
	"animate",
	"exit",
	"variants",
	"transition",
	"whileHover",
	"whileTap",
	"whileFocus",
	"whileDrag",
	"whileInView",
	"viewport",
	"layout",
	"layoutId",
	"onAnimationStart",
	"onAnimationComplete",
	"style",
]);

vi.mock("motion/react", () => ({
	motion: new Proxy(
		{},
		{
			get: (_target: unknown, prop: string) => {
				const Comp = forwardRef((props: Record<string, unknown>, ref: unknown) => {
					const htmlProps: Record<string, unknown> = {};
					for (const [key, value] of Object.entries(props)) {
						if (!motionPropKeys.has(key)) {
							htmlProps[key] = value;
						}
					}
					return createElement(prop, { ...htmlProps, ref });
				});
				Comp.displayName = `motion.${prop}`;
				return Comp;
			},
		},
	),
	useReducedMotion: () => false,
	useScroll: () => ({ scrollYProgress: { get: () => 0, set: () => {} } }),
	useTransform: (_value: unknown, _input: unknown, output: unknown) => {
		if (typeof output === "function") return { get: () => 0, set: () => {} };
		if (Array.isArray(output)) return { get: () => output[0] ?? 0, set: () => {} };
		return { get: () => 0, set: () => {} };
	},
	useInView: () => true,
	useMotionValue: (init: number) => ({ get: () => init, set: () => {}, on: () => () => {} }),
	animate: () => ({ stop: vi.fn() }),
	AnimatePresence: ({ children }: { children: ReactNode }) => children,
}));

import { TerminalHero } from "../terminal-hero";

describe("TerminalHero", () => {
	it("renders the headline", () => {
		render(<TerminalHero />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Ship APIs in minutes/);
	});

	it("renders the subtitle", () => {
		render(<TerminalHero />);
		expect(screen.getByText(/complete developer platform/)).toBeInTheDocument();
	});

	it("renders two CTA buttons", () => {
		render(<TerminalHero />);
		expect(screen.getByText("Get Started")).toBeInTheDocument();
		expect(screen.getByText("Read the Docs")).toBeInTheDocument();
	});

	it("renders the Developer Platform badge", () => {
		render(<TerminalHero />);
		expect(screen.getByText("Developer Platform")).toBeInTheDocument();
	});

	it("renders the terminal window with title bar", () => {
		render(<TerminalHero />);
		expect(screen.getByText("terminal")).toBeInTheDocument();
	});

	it("renders the terminal content area with accessible role", () => {
		render(<TerminalHero />);
		expect(
			screen.getByRole("img", {
				name: /Terminal showing CLI initialization/,
			}),
		).toBeInTheDocument();
	});

	it("has decorative elements marked as aria-hidden", () => {
		const { container } = render(<TerminalHero />);
		const decorativeElements = container.querySelectorAll('[aria-hidden="true"]');
		// Grid pattern, glow accent, terminal dots (3), cursor
		expect(decorativeElements.length).toBeGreaterThanOrEqual(5);
	});

	it("accepts and applies className", () => {
		const { container } = render(<TerminalHero className="custom-class" />);
		const section = container.querySelector("section");
		expect(section?.classList.contains("custom-class")).toBe(true);
	});
});
