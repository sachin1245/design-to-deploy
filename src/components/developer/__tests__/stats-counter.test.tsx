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

// Helper to check if something looks like a MotionValue mock
function isMotionValueLike(v: unknown): v is { get: () => unknown } {
	if (v == null || typeof v !== "object") return false;
	if (!("get" in v)) return false;
	return typeof (v as { get: unknown }).get === "function";
}

vi.mock("motion/react", () => ({
	motion: new Proxy(
		{},
		{
			get: (_target: unknown, prop: string) => {
				const Comp = forwardRef((props: Record<string, unknown>, ref: unknown) => {
					const htmlProps: Record<string, unknown> = {};
					for (const [key, value] of Object.entries(props)) {
						if (!motionPropKeys.has(key)) {
							// If children is a MotionValue-like object, extract its value
							if (key === "children" && isMotionValueLike(value)) {
								htmlProps[key] = String(value.get());
							} else {
								htmlProps[key] = value;
							}
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
	useTransform: (_value: unknown, transform: unknown) => {
		if (typeof transform === "function") {
			return { get: () => (transform as (v: number) => string)(0), set: () => {} };
		}
		return { get: () => "0", set: () => {} };
	},
	useInView: () => true,
	useMotionValue: (init: number) => ({ get: () => init, set: () => {}, on: () => () => {} }),
	animate: () => ({ stop: vi.fn() }),
	AnimatePresence: ({ children }: { children: ReactNode }) => children,
}));

import { StatsCounter } from "../stats-counter";

describe("StatsCounter", () => {
	it("renders all 4 stat labels", () => {
		render(<StatsCounter />);
		expect(screen.getByText("Uptime SLA")).toBeInTheDocument();
		expect(screen.getByText("Avg Latency")).toBeInTheDocument();
		expect(screen.getByText("API Calls / Day")).toBeInTheDocument();
		expect(screen.getByText("Developers")).toBeInTheDocument();
	});

	it("renders category chips", () => {
		render(<StatsCounter />);
		expect(screen.getByText("Reliability")).toBeInTheDocument();
		expect(screen.getByText("Speed")).toBeInTheDocument();
		expect(screen.getByText("Scale")).toBeInTheDocument();
		expect(screen.getByText("Community")).toBeInTheDocument();
	});

	it("renders suffixes for stat values", () => {
		render(<StatsCounter />);
		// Suffixes are rendered in separate spans
		expect(screen.getByText("%")).toBeInTheDocument();
		expect(screen.getByText("ms")).toBeInTheDocument();
		expect(screen.getByText("M+")).toBeInTheDocument();
		expect(screen.getByText("K+")).toBeInTheDocument();
	});

	it("has an accessible section label", () => {
		render(<StatsCounter />);
		expect(screen.getByRole("region", { name: "Platform statistics" })).toBeInTheDocument();
	});

	it("accepts and applies className", () => {
		const { container } = render(<StatsCounter className="custom-class" />);
		const section = container.querySelector("section");
		expect(section?.classList.contains("custom-class")).toBe(true);
	});
});
