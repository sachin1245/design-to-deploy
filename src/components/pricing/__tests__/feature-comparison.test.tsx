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

import { FeatureComparison } from "../feature-comparison";

describe("FeatureComparison", () => {
	it("renders the section heading", () => {
		render(<FeatureComparison />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Compare plans");
	});

	it("renders tier column headers", () => {
		render(<FeatureComparison />);
		expect(screen.getByText("Starter")).toBeInTheDocument();
		expect(screen.getByText("Pro")).toBeInTheDocument();
		expect(screen.getByText("Enterprise")).toBeInTheDocument();
	});

	it("renders section titles", () => {
		render(<FeatureComparison />);
		expect(screen.getByText("Core")).toBeInTheDocument();
		expect(screen.getByText("Collaboration")).toBeInTheDocument();
		expect(screen.getByText("Support")).toBeInTheDocument();
	});

	it("renders feature rows", () => {
		render(<FeatureComparison />);
		expect(screen.getByText("Projects")).toBeInTheDocument();
		expect(screen.getByText("Storage")).toBeInTheDocument();
		expect(screen.getByText("API access")).toBeInTheDocument();
		expect(screen.getByText("Team members")).toBeInTheDocument();
	});

	it("renders check icons for included features", () => {
		render(<FeatureComparison />);
		const includedIcons = screen.getAllByLabelText("Included");
		expect(includedIcons.length).toBeGreaterThan(0);
	});

	it("renders dash icons for excluded features", () => {
		render(<FeatureComparison />);
		const excludedIcons = screen.getAllByLabelText("Not included");
		expect(excludedIcons.length).toBeGreaterThan(0);
	});

	it("accepts className prop", () => {
		const { container } = render(<FeatureComparison className="custom-class" />);
		const section = container.querySelector("section");
		expect(section).toHaveClass("custom-class");
	});
});
