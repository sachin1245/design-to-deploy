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

import { ApiPlayground } from "../api-playground";

describe("ApiPlayground", () => {
	it("renders the section heading", () => {
		render(<ApiPlayground />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Try the/);
	});

	it("renders the section description", () => {
		render(<ApiPlayground />);
		expect(screen.getByText(/Explore request and response shapes/)).toBeInTheDocument();
	});

	it("renders three tab buttons", () => {
		render(<ApiPlayground />);
		expect(screen.getByRole("tab", { name: "Request" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Response" })).toBeInTheDocument();
		expect(screen.getByRole("tab", { name: "Schema" })).toBeInTheDocument();
	});

	it("shows request content by default", () => {
		render(<ApiPlayground />);
		expect(screen.getByText(/GET \/api\/v1\/users/)).toBeInTheDocument();
	});

	it("switches to response tab on click", async () => {
		const user = userEvent.setup();
		render(<ApiPlayground />);
		await user.click(screen.getByRole("tab", { name: "Response" }));
		expect(screen.getByText(/usr_2xK9mQ/)).toBeInTheDocument();
	});

	it("switches to schema tab on click", async () => {
		const user = userEvent.setup();
		render(<ApiPlayground />);
		await user.click(screen.getByRole("tab", { name: "Schema" }));
		expect(screen.getByText(/type User/)).toBeInTheDocument();
	});

	it("has an accessible section label", () => {
		render(<ApiPlayground />);
		expect(screen.getByRole("region", { name: "API playground" })).toBeInTheDocument();
	});

	it("accepts and applies className", () => {
		const { container } = render(<ApiPlayground className="custom-class" />);
		const section = container.querySelector("section");
		expect(section?.classList.contains("custom-class")).toBe(true);
	});
});
