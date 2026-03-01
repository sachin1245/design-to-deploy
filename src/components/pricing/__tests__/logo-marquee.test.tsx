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

import { LogoMarquee } from "../logo-marquee";

describe("LogoMarquee", () => {
	it("renders the trust label", () => {
		render(<LogoMarquee />);
		expect(screen.getByText(/Trusted by teams at/)).toBeInTheDocument();
	});

	it("renders company names", () => {
		render(<LogoMarquee />);
		// Each company appears twice (original + duplicate for seamless loop)
		expect(screen.getAllByText("Vercel")).toHaveLength(2);
		expect(screen.getAllByText("Stripe")).toHaveLength(2);
		expect(screen.getAllByText("Linear")).toHaveLength(2);
	});

	it("renders duplicated set for seamless loop", () => {
		const { container } = render(<LogoMarquee />);
		const duplicateContainer = container.querySelector("[aria-hidden='true']");
		expect(duplicateContainer).toBeInTheDocument();
	});

	it("has a marquee role for accessibility", () => {
		render(<LogoMarquee />);
		expect(screen.getByRole("marquee")).toBeInTheDocument();
	});

	it("accepts className prop", () => {
		const { container } = render(<LogoMarquee className="custom-class" />);
		const section = container.querySelector("section");
		expect(section).toHaveClass("custom-class");
	});
});
