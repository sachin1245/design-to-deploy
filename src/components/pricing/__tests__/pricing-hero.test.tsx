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

import { PricingHero } from "../pricing-hero";

describe("PricingHero", () => {
	it("renders the headline", () => {
		render(<PricingHero />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Simple pricing for/);
	});

	it("renders the eyebrow label", () => {
		render(<PricingHero />);
		expect(screen.getByText("Pricing")).toBeInTheDocument();
	});

	it("renders the subheading", () => {
		render(<PricingHero />);
		expect(screen.getByText(/Start free and scale as you grow/)).toBeInTheDocument();
	});

	it("marks gradient shapes as decorative", () => {
		const { container } = render(<PricingHero />);
		const decorativeElements = container.querySelectorAll("[aria-hidden='true']");
		expect(decorativeElements.length).toBeGreaterThanOrEqual(3);
	});

	it("accepts className prop", () => {
		const { container } = render(<PricingHero className="custom-class" />);
		const section = container.querySelector("section");
		expect(section).toHaveClass("custom-class");
	});
});
