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
	useTransform: (_value: unknown, _input: unknown, output: number[]) => ({
		get: () => output?.[0] ?? 0,
		set: () => {},
	}),
	useInView: () => true,
	useMotionValue: (init: number) => ({ get: () => init, set: () => {} }),
	animate: () => ({ stop: vi.fn() }),
	AnimatePresence: ({ children }: { children: ReactNode }) => children,
}));

import { PricingCta } from "../pricing-cta";

describe("PricingCta", () => {
	it("renders the section heading", () => {
		render(<PricingCta />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Ready to get started?");
	});

	it("renders the description", () => {
		render(<PricingCta />);
		expect(screen.getByText(/Join thousands of teams/)).toBeInTheDocument();
	});

	it("renders two CTA buttons", () => {
		render(<PricingCta />);
		expect(screen.getByText("Start Free Trial")).toBeInTheDocument();
		expect(screen.getByText("Talk to Sales")).toBeInTheDocument();
	});

	it("marks decorative gradient as aria-hidden", () => {
		const { container } = render(<PricingCta />);
		const decorative = container.querySelector("[aria-hidden='true']");
		expect(decorative).toBeInTheDocument();
	});

	it("accepts className prop", () => {
		const { container } = render(<PricingCta className="custom-class" />);
		const section = container.querySelector("section");
		expect(section).toHaveClass("custom-class");
	});
});
