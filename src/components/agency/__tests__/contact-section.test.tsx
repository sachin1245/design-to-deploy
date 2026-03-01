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

import { ContactSection } from "../contact-section";

describe("ContactSection", () => {
	it("renders the section heading", () => {
		render(<ContactSection />);
		expect(screen.getByText("Get in Touch")).toBeInTheDocument();
		expect(screen.getByText(/remarkable together/)).toBeInTheDocument();
	});

	it("renders all form fields with labels", () => {
		render(<ContactSection />);
		expect(screen.getByLabelText("Name")).toBeInTheDocument();
		expect(screen.getByLabelText("Email")).toBeInTheDocument();
		expect(screen.getByLabelText("Message")).toBeInTheDocument();
	});

	it("renders the submit button", () => {
		render(<ContactSection />);
		expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
	});

	it("renders the divider", () => {
		const { container } = render(<ContactSection />);
		const hr = container.querySelector("hr");
		expect(hr).toBeInTheDocument();
	});

	it("renders form with correct input types", () => {
		render(<ContactSection />);
		const emailInput = screen.getByLabelText("Email");
		expect(emailInput).toHaveAttribute("type", "email");
	});

	it("renders the description text", () => {
		render(<ContactSection />);
		expect(screen.getByText(/Have a project in mind/)).toBeInTheDocument();
	});

	it("accepts and applies className", () => {
		const { container } = render(<ContactSection className="test-class" />);
		const section = container.querySelector("section");
		expect(section?.className).toContain("test-class");
	});
});
