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

import { DeveloperCta } from "../developer-cta";

describe("DeveloperCta", () => {
	it("renders the section heading", () => {
		render(<DeveloperCta />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Ready to build/);
	});

	it("renders the description", () => {
		render(<DeveloperCta />);
		expect(screen.getByText(/Get started in under 2 minutes/)).toBeInTheDocument();
	});

	it("renders the version badge", () => {
		render(<DeveloperCta />);
		expect(screen.getByText("v2.0 Beta")).toBeInTheDocument();
	});

	it("renders two CTA buttons", () => {
		render(<DeveloperCta />);
		expect(screen.getByText("Start Building Free")).toBeInTheDocument();
		expect(screen.getByText("Talk to Sales")).toBeInTheDocument();
	});

	it("renders the code teaser", () => {
		render(<DeveloperCta />);
		expect(screen.getByText(/npx clarity init my-api/)).toBeInTheDocument();
	});

	it("has an accessible section label", () => {
		render(<DeveloperCta />);
		expect(screen.getByRole("region", { name: "Call to action" })).toBeInTheDocument();
	});

	it("accepts and applies className", () => {
		const { container } = render(<DeveloperCta className="custom-class" />);
		const section = container.querySelector("section");
		expect(section?.classList.contains("custom-class")).toBe(true);
	});
});
