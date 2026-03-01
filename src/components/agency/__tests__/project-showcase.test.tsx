import { render, screen } from "@testing-library/react";
import { createElement, forwardRef, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock matchMedia for JSDOM (not available by default)
beforeEach(() => {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		configurable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
});

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
	useTransform: (_value: unknown, _input: unknown, output: string[]) => ({
		get: () => output?.[0] ?? "0%",
		set: () => {},
	}),
	useInView: () => true,
	useMotionValue: (init: number) => ({ get: () => init, set: () => {} }),
	animate: () => ({ stop: vi.fn() }),
	AnimatePresence: ({ children }: { children: ReactNode }) => children,
}));

import { ProjectShowcase } from "../project-showcase";

describe("ProjectShowcase", () => {
	it("renders the section heading", () => {
		render(<ProjectShowcase />);
		expect(screen.getByText("Selected Work")).toBeInTheDocument();
		expect(screen.getByText("Projects that speak")).toBeInTheDocument();
	});

	it("renders all 5 project titles", () => {
		render(<ProjectShowcase />);
		expect(screen.getByText("Lumina Rebrand")).toBeInTheDocument();
		expect(screen.getByText("Vertex Dashboard")).toBeInTheDocument();
		expect(screen.getByText("Nomad Social")).toBeInTheDocument();
		expect(screen.getByText("Echo Music")).toBeInTheDocument();
		expect(screen.getByText("Arc Architecture")).toBeInTheDocument();
	});

	it("renders category badges for each project", () => {
		render(<ProjectShowcase />);
		expect(screen.getByText("Branding")).toBeInTheDocument();
		expect(screen.getByText("Product Design")).toBeInTheDocument();
		expect(screen.getByText("App Development")).toBeInTheDocument();
		expect(screen.getByText("Web Experience")).toBeInTheDocument();
		expect(screen.getByText("Website")).toBeInTheDocument();
	});

	it("renders in grid layout by default (mobile/SSR fallback)", () => {
		// In JSDOM, matchMedia defaults to not matching, so isDesktop = false
		// which means it renders the vertical grid
		const { container } = render(<ProjectShowcase />);
		const grid = container.querySelector(".grid");
		expect(grid).toBeInTheDocument();
	});

	it("marks gradient placeholders as aria-hidden", () => {
		const { container } = render(<ProjectShowcase />);
		const hiddenElements = container.querySelectorAll("[aria-hidden='true']");
		expect(hiddenElements.length).toBeGreaterThanOrEqual(5);
	});

	it("accepts and applies className", () => {
		const { container } = render(<ProjectShowcase className="test-class" />);
		const section = container.querySelector("section");
		expect(section?.className).toContain("test-class");
	});
});
