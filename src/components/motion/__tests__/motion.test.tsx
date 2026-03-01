import { render, screen } from "@testing-library/react";
import { createElement, createRef, forwardRef } from "react";
import { describe, expect, it, vi } from "vitest";

// ─── Mock motion/react ──────────────────────────────────────────────

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
	AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// ─── Import after mock ──────────────────────────────────────────────

import { MotionItem, MotionReveal, MotionStagger } from "../index";

// ─── MotionReveal ───────────────────────────────────────────────────

describe("MotionReveal", () => {
	it("renders children", () => {
		render(
			<MotionReveal>
				<p>Hello</p>
			</MotionReveal>,
		);
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(
			<MotionReveal ref={ref}>
				<p>Ref test</p>
			</MotionReveal>,
		);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts className", () => {
		render(
			<MotionReveal className="custom-class">
				<p>Styled</p>
			</MotionReveal>,
		);
		const wrapper = screen.getByText("Styled").parentElement;
		expect(wrapper?.className).toContain("custom-class");
	});

	it("accepts all direction props", () => {
		const directions = ["up", "down", "left", "right", "none"] as const;
		for (const direction of directions) {
			const { unmount } = render(
				<MotionReveal direction={direction}>
					<p>{direction}</p>
				</MotionReveal>,
			);
			expect(screen.getByText(direction)).toBeInTheDocument();
			unmount();
		}
	});
});

// ─── MotionStagger ──────────────────────────────────────────────────

describe("MotionStagger", () => {
	it("renders children", () => {
		render(
			<MotionStagger>
				<p>Item 1</p>
				<p>Item 2</p>
			</MotionStagger>,
		);
		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("Item 2")).toBeInTheDocument();
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(
			<MotionStagger ref={ref}>
				<p>Ref test</p>
			</MotionStagger>,
		);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts className", () => {
		render(
			<MotionStagger className="stagger-grid">
				<p>Child</p>
			</MotionStagger>,
		);
		const wrapper = screen.getByText("Child").parentElement;
		expect(wrapper?.className).toContain("stagger-grid");
	});
});

// ─── MotionItem ─────────────────────────────────────────────────────

describe("MotionItem", () => {
	it("renders children", () => {
		render(
			<MotionItem>
				<p>Item content</p>
			</MotionItem>,
		);
		expect(screen.getByText("Item content")).toBeInTheDocument();
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(
			<MotionItem ref={ref}>
				<p>Ref test</p>
			</MotionItem>,
		);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts className", () => {
		render(
			<MotionItem className="item-class">
				<p>Styled item</p>
			</MotionItem>,
		);
		const wrapper = screen.getByText("Styled item").parentElement;
		expect(wrapper?.className).toContain("item-class");
	});

	it("works inside MotionStagger", () => {
		render(
			<MotionStagger>
				<MotionItem>
					<p>Staggered 1</p>
				</MotionItem>
				<MotionItem>
					<p>Staggered 2</p>
				</MotionItem>
			</MotionStagger>,
		);
		expect(screen.getByText("Staggered 1")).toBeInTheDocument();
		expect(screen.getByText("Staggered 2")).toBeInTheDocument();
	});
});
