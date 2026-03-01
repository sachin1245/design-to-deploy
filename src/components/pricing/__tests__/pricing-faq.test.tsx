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

import { PricingFaq } from "../pricing-faq";

describe("PricingFaq", () => {
	it("renders the section heading", () => {
		render(<PricingFaq />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
			"Frequently asked questions",
		);
	});

	it("renders 5 FAQ items", () => {
		render(<PricingFaq />);
		const buttons = screen.getAllByRole("button");
		expect(buttons).toHaveLength(5);
	});

	it("renders FAQ questions", () => {
		render(<PricingFaq />);
		expect(screen.getByText("Can I switch plans at any time?")).toBeInTheDocument();
		expect(screen.getByText("Is there a free trial for the Pro plan?")).toBeInTheDocument();
	});

	it("shows answer when question is clicked", async () => {
		const user = userEvent.setup();
		render(<PricingFaq />);

		const firstButton = screen.getByText("Can I switch plans at any time?");
		await user.click(firstButton);

		expect(screen.getByText(/you can upgrade or downgrade/)).toBeInTheDocument();
	});

	it("has aria-expanded attribute on buttons", () => {
		render(<PricingFaq />);
		const buttons = screen.getAllByRole("button");
		for (const button of buttons) {
			expect(button).toHaveAttribute("aria-expanded", "false");
		}
	});

	it("toggles aria-expanded when clicked", async () => {
		const user = userEvent.setup();
		render(<PricingFaq />);

		const firstButton = screen.getByText("Can I switch plans at any time?");
		expect(firstButton).toHaveAttribute("aria-expanded", "false");

		await user.click(firstButton);
		expect(firstButton).toHaveAttribute("aria-expanded", "true");
	});

	it("accepts className prop", () => {
		const { container } = render(<PricingFaq className="custom-class" />);
		const section = container.querySelector("section");
		expect(section).toHaveClass("custom-class");
	});
});
