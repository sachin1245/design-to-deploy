import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Slider } from "../slider";

describe("Slider", () => {
	it("renders a slider", () => {
		render(<Slider />);
		expect(screen.getByRole("slider")).toBeInTheDocument();
	});

	it("accepts min, max, and step", () => {
		render(<Slider min={0} max={100} step={5} />);
		const slider = screen.getByRole("slider");
		expect(slider).toHaveAttribute("min", "0");
		expect(slider).toHaveAttribute("max", "100");
		expect(slider).toHaveAttribute("step", "5");
	});

	it("supports disabled state", () => {
		render(<Slider disabled />);
		expect(screen.getByRole("slider")).toBeDisabled();
	});

	it("accepts custom className", () => {
		render(<Slider className="extra" />);
		expect(screen.getByRole("slider").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLInputElement>();
		render(<Slider ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});
});
