import { render } from "@testing-library/react";
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

import { DocsProgress } from "../docs-progress";

describe("DocsProgress", () => {
	it("renders the progress bar as aria-hidden", () => {
		const { container } = render(<DocsProgress />);
		const progressBar = container.firstElementChild;
		expect(progressBar?.getAttribute("aria-hidden")).toBe("true");
	});

	it("renders as a fixed-position element", () => {
		const { container } = render(<DocsProgress />);
		const progressBar = container.firstElementChild;
		expect(progressBar?.classList.contains("fixed")).toBe(true);
	});

	it("accepts and applies className", () => {
		const { container } = render(<DocsProgress className="custom-class" />);
		const progressBar = container.firstElementChild;
		expect(progressBar?.classList.contains("custom-class")).toBe(true);
	});
});
