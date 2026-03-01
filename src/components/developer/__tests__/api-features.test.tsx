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
	useTransform: (_value: unknown, _input: unknown, output: unknown) => {
		if (typeof output === "function") return { get: () => 0, set: () => {} };
		if (Array.isArray(output)) return { get: () => output[0] ?? 0, set: () => {} };
		return { get: () => 0, set: () => {} };
	},
	useInView: () => true,
	useMotionValue: (init: number) => ({ get: () => init, set: () => {}, on: () => () => {} }),
	animate: () => ({ stop: vi.fn() }),
	AnimatePresence: ({ children }: { children: ReactNode }) => children,
}));

import { ApiFeatures } from "../api-features";

describe("ApiFeatures", () => {
	it("renders the section heading", () => {
		render(<ApiFeatures />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Everything you need to/);
	});

	it("renders the section description", () => {
		render(<ApiFeatures />);
		expect(screen.getByText(/Production-grade features/)).toBeInTheDocument();
	});

	it("renders all 6 feature cards", () => {
		render(<ApiFeatures />);
		expect(screen.getByText("Lightning Fast")).toBeInTheDocument();
		expect(screen.getByText("Type Safety")).toBeInTheDocument();
		expect(screen.getByText("Auto Scaling")).toBeInTheDocument();
		expect(screen.getByText("Real-time Logs")).toBeInTheDocument();
		expect(screen.getByText("Auth Built In")).toBeInTheDocument();
		expect(screen.getByText("One-Click Deploy")).toBeInTheDocument();
	});

	it("renders category badges for each feature", () => {
		render(<ApiFeatures />);
		expect(screen.getByText("Performance")).toBeInTheDocument();
		expect(screen.getByText("Developer Experience")).toBeInTheDocument();
		expect(screen.getByText("Infrastructure")).toBeInTheDocument();
		expect(screen.getByText("Monitoring")).toBeInTheDocument();
		expect(screen.getByText("Security")).toBeInTheDocument();
		expect(screen.getByText("Deployment")).toBeInTheDocument();
	});

	it("renders SVG icons with aria-hidden", () => {
		const { container } = render(<ApiFeatures />);
		const svgs = container.querySelectorAll('svg[aria-hidden="true"]');
		expect(svgs.length).toBe(6);
	});

	it("has an accessible section label", () => {
		render(<ApiFeatures />);
		expect(screen.getByRole("region", { name: "API features" })).toBeInTheDocument();
	});

	it("accepts and applies className", () => {
		const { container } = render(<ApiFeatures className="custom-class" />);
		const section = container.querySelector("section");
		expect(section?.classList.contains("custom-class")).toBe(true);
	});
});
