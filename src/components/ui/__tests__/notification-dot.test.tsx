import { render } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { NotificationDot } from "../notification-dot";

describe("NotificationDot", () => {
	it("renders with default variant", () => {
		const { container } = render(<NotificationDot />);
		const dot = container.querySelector(".bg-primary");
		expect(dot).toBeInTheDocument();
	});

	it("renders success variant", () => {
		const { container } = render(<NotificationDot variant="success" />);
		const dot = container.querySelector(".bg-emerald-500");
		expect(dot).toBeInTheDocument();
	});

	it("renders warning variant", () => {
		const { container } = render(<NotificationDot variant="warning" />);
		const dot = container.querySelector(".bg-amber-500");
		expect(dot).toBeInTheDocument();
	});

	it("renders error variant", () => {
		const { container } = render(<NotificationDot variant="error" />);
		const dot = container.querySelector(".bg-destructive");
		expect(dot).toBeInTheDocument();
	});

	it("renders pulse animation when enabled", () => {
		const { container } = render(<NotificationDot pulse />);
		const pulseEl = container.querySelector(".animate-ping");
		expect(pulseEl).toBeInTheDocument();
	});

	it("does not render pulse by default", () => {
		const { container } = render(<NotificationDot />);
		const pulseEl = container.querySelector(".animate-ping");
		expect(pulseEl).not.toBeInTheDocument();
	});

	it("accepts custom className", () => {
		const { container } = render(<NotificationDot className="extra" />);
		const wrapper = container.firstChild as HTMLElement;
		expect(wrapper.className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLSpanElement>();
		render(<NotificationDot ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLSpanElement);
	});
});
