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

import { AgencyHero } from "../agency-hero";

describe("AgencyHero", () => {
	it("renders the headline text", () => {
		render(<AgencyHero />);
		expect(screen.getByText(/We craft/)).toBeInTheDocument();
		expect(screen.getByText("digital")).toBeInTheDocument();
		expect(screen.getByText(/experiences/)).toBeInTheDocument();
	});

	it("renders the eyebrow text", () => {
		render(<AgencyHero />);
		expect(screen.getByText("Creative Studio")).toBeInTheDocument();
	});

	it("renders the subtitle", () => {
		render(<AgencyHero />);
		expect(screen.getByText(/Strategy, design, and engineering for brands/)).toBeInTheDocument();
	});

	it("renders CTA buttons", () => {
		render(<AgencyHero />);
		expect(screen.getByRole("button", { name: "View Our Work" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Get in Touch" })).toBeInTheDocument();
	});

	it("renders stats section", () => {
		render(<AgencyHero />);
		expect(screen.getByText("120+")).toBeInTheDocument();
		expect(screen.getByText("Projects Shipped")).toBeInTheDocument();
		expect(screen.getByText("8")).toBeInTheDocument();
		expect(screen.getByText("Years Running")).toBeInTheDocument();
		expect(screen.getByText("40+")).toBeInTheDocument();
		expect(screen.getByText("Global Clients")).toBeInTheDocument();
	});

	it("marks decorative parallax layers as aria-hidden", () => {
		const { container } = render(<AgencyHero />);
		const hiddenElements = container.querySelectorAll("[aria-hidden='true']");
		expect(hiddenElements.length).toBeGreaterThanOrEqual(3);
	});

	it("accepts and applies className", () => {
		const { container } = render(<AgencyHero className="custom-class" />);
		const section = container.querySelector("section");
		expect(section?.className).toContain("custom-class");
	});
});
