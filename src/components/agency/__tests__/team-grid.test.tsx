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

import { TeamGrid } from "../team-grid";

describe("TeamGrid", () => {
	it("renders the section heading", () => {
		render(<TeamGrid />);
		expect(screen.getByText("The Team")).toBeInTheDocument();
		expect(screen.getByText("People behind the pixels")).toBeInTheDocument();
	});

	it("renders all 6 team members", () => {
		render(<TeamGrid />);
		expect(screen.getByText("Ava Chen")).toBeInTheDocument();
		expect(screen.getByText("Marcus Rivera")).toBeInTheDocument();
		expect(screen.getByText("Sofia Andersson")).toBeInTheDocument();
		expect(screen.getByText("James Okafor")).toBeInTheDocument();
		expect(screen.getByText("Lena Park")).toBeInTheDocument();
		expect(screen.getByText("Daniel Torres")).toBeInTheDocument();
	});

	it("renders role badges for each member", () => {
		render(<TeamGrid />);
		expect(screen.getByText("Creative Director")).toBeInTheDocument();
		expect(screen.getByText("Lead Engineer")).toBeInTheDocument();
		expect(screen.getByText("UX Strategist")).toBeInTheDocument();
		expect(screen.getByText("Motion Designer")).toBeInTheDocument();
		expect(screen.getByText("Brand Designer")).toBeInTheDocument();
		expect(screen.getByText("Project Lead")).toBeInTheDocument();
	});

	it("renders 6 avatar components", () => {
		const { container } = render(<TeamGrid />);
		// Radix Avatar renders <span> root elements with the avatar variant classes
		const avatars = container.querySelectorAll(".rounded-full.border.border-border");
		expect(avatars.length).toBe(6);
	});

	it("renders bio text for each member", () => {
		render(<TeamGrid />);
		expect(screen.getByText(/15 years shaping brand identities/)).toBeInTheDocument();
		expect(screen.getByText(/Full-stack architect/)).toBeInTheDocument();
	});

	it("marks decorative hover gradients as aria-hidden", () => {
		const { container } = render(<TeamGrid />);
		const hiddenElements = container.querySelectorAll("[aria-hidden='true']");
		expect(hiddenElements.length).toBeGreaterThanOrEqual(6);
	});

	it("accepts and applies className", () => {
		const { container } = render(<TeamGrid className="test-class" />);
		const section = container.querySelector("section");
		expect(section?.className).toContain("test-class");
	});
});
