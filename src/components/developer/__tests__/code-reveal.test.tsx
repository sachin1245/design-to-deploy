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

import { CodeReveal } from "../code-reveal";

describe("CodeReveal", () => {
	it("renders the section heading", () => {
		render(<CodeReveal />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Type-safe from/);
	});

	it("renders the description text", () => {
		render(<CodeReveal />);
		expect(screen.getByText(/Full TypeScript inference/)).toBeInTheDocument();
	});

	it("renders the file tab label", () => {
		render(<CodeReveal />);
		expect(screen.getByText("api/users/route.ts")).toBeInTheDocument();
	});

	it("renders code content with syntax-like coloring", () => {
		render(<CodeReveal />);
		// Check for key code tokens (may appear in multiple spans)
		const matches = screen.getAllByText(/NextRequest/);
		expect(matches.length).toBeGreaterThanOrEqual(1);
	});

	it("accepts and applies className", () => {
		const { container } = render(<CodeReveal className="custom-class" />);
		const section = container.querySelector("section");
		expect(section?.classList.contains("custom-class")).toBe(true);
	});
});
