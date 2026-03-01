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

import { ProcessTimeline } from "../process-timeline";

describe("ProcessTimeline", () => {
	it("renders the section heading", () => {
		render(<ProcessTimeline />);
		expect(screen.getByText("Our Process")).toBeInTheDocument();
		expect(screen.getByText("How we work")).toBeInTheDocument();
	});

	it("renders all 5 process steps", () => {
		render(<ProcessTimeline />);
		expect(screen.getByText("Discovery")).toBeInTheDocument();
		expect(screen.getByText("Concept")).toBeInTheDocument();
		expect(screen.getByText("Design")).toBeInTheDocument();
		expect(screen.getByText("Build")).toBeInTheDocument();
		expect(screen.getByText("Launch")).toBeInTheDocument();
	});

	it("renders step numbers", () => {
		render(<ProcessTimeline />);
		expect(screen.getByText("01")).toBeInTheDocument();
		expect(screen.getByText("02")).toBeInTheDocument();
		expect(screen.getByText("03")).toBeInTheDocument();
		expect(screen.getByText("04")).toBeInTheDocument();
		expect(screen.getByText("05")).toBeInTheDocument();
	});

	it("renders step descriptions", () => {
		render(<ProcessTimeline />);
		expect(screen.getByText(/We dive deep into your brand/)).toBeInTheDocument();
		expect(screen.getByText(/Wireframes, moodboards, and prototypes/)).toBeInTheDocument();
		expect(screen.getByText(/Pixel-perfect interfaces/)).toBeInTheDocument();
		expect(screen.getByText(/Clean, performant code/)).toBeInTheDocument();
		expect(screen.getByText(/Thorough QA, performance optimization/)).toBeInTheDocument();
	});

	it("renders the SVG connecting line container", () => {
		const { container } = render(<ProcessTimeline />);
		const svg = container.querySelector("svg");
		expect(svg).toBeInTheDocument();
	});

	it("marks the SVG line container as aria-hidden", () => {
		const { container } = render(<ProcessTimeline />);
		const hiddenLine = container.querySelector("[aria-hidden='true']");
		expect(hiddenLine).toBeInTheDocument();
	});

	it("accepts and applies className", () => {
		const { container } = render(<ProcessTimeline className="test-class" />);
		const section = container.querySelector("section");
		expect(section?.className).toContain("test-class");
	});
});
