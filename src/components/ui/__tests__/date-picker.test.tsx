import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { DatePicker } from "../date-picker";

describe("DatePicker", () => {
	it("renders a date input", () => {
		const { container } = render(<DatePicker />);
		const input = container.querySelector("input[type='date']");
		expect(input).toBeInTheDocument();
	});

	it("renders with label", () => {
		render(<DatePicker label="Start date" />);
		expect(screen.getByLabelText("Start date")).toBeInTheDocument();
	});

	it("renders error message", () => {
		render(<DatePicker label="Date" error="Required" />);
		expect(screen.getByText("Required")).toBeInTheDocument();
	});

	it("sets aria-invalid on error", () => {
		const { container } = render(<DatePicker error="Bad" />);
		const input = container.querySelector("input[type='date']");
		expect(input).toHaveAttribute("aria-invalid", "true");
	});

	it("accepts custom className", () => {
		const { container } = render(<DatePicker className="extra" />);
		const input = container.querySelector("input[type='date']");
		expect(input?.className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLInputElement>();
		render(<DatePicker ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});
});
