import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

import { PricingCards } from "../pricing-cards";

describe("PricingCards", () => {
	it("renders three tier names", () => {
		render(<PricingCards />);
		expect(screen.getByText("Starter")).toBeInTheDocument();
		expect(screen.getByText("Pro")).toBeInTheDocument();
		expect(screen.getByText("Enterprise")).toBeInTheDocument();
	});

	it("renders monthly prices by default", () => {
		render(<PricingCards />);
		expect(screen.getByText("$0")).toBeInTheDocument();
		expect(screen.getByText("$29")).toBeInTheDocument();
		expect(screen.getByText("Custom")).toBeInTheDocument();
	});

	it("shows Popular badge on Pro tier", () => {
		render(<PricingCards />);
		expect(screen.getByText("Popular")).toBeInTheDocument();
	});

	it("renders CTA buttons for each tier", () => {
		render(<PricingCards />);
		expect(screen.getByText("Get Started Free")).toBeInTheDocument();
		expect(screen.getByText("Start Free Trial")).toBeInTheDocument();
		expect(screen.getByText("Contact Sales")).toBeInTheDocument();
	});

	it("has a billing toggle", () => {
		render(<PricingCards />);
		expect(screen.getByRole("switch")).toBeInTheDocument();
		expect(screen.getByText("Monthly")).toBeInTheDocument();
		expect(screen.getByText("Yearly")).toBeInTheDocument();
	});

	it("switches to yearly pricing when toggle is clicked", async () => {
		const user = userEvent.setup();
		render(<PricingCards />);

		const toggle = screen.getByRole("switch");
		await user.click(toggle);

		expect(screen.getByText("$290")).toBeInTheDocument();
		expect(screen.getByText(/Save 17%/)).toBeInTheDocument();
	});

	it("accepts className prop", () => {
		const { container } = render(<PricingCards className="custom-class" />);
		const section = container.querySelector("section");
		expect(section).toHaveClass("custom-class");
	});
});
