import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Progress } from "../progress";

describe("Progress", () => {
	it("renders with progressbar role", () => {
		render(<Progress value={50} />);
		expect(screen.getByRole("progressbar")).toBeInTheDocument();
	});

	it("sets aria attributes correctly", () => {
		render(<Progress value={30} max={100} />);
		const bar = screen.getByRole("progressbar");
		expect(bar).toHaveAttribute("aria-valuenow", "30");
		expect(bar).toHaveAttribute("aria-valuemin", "0");
		expect(bar).toHaveAttribute("aria-valuemax", "100");
	});

	it("clamps percentage between 0 and 100", () => {
		const { container } = render(<Progress value={150} />);
		const inner = container.querySelector("[role='progressbar'] > div") as HTMLElement;
		expect(inner.style.width).toBe("100%");
	});

	it("renders small size", () => {
		render(<Progress value={50} size="sm" />);
		expect(screen.getByRole("progressbar").className).toContain("h-1.5");
	});

	it("renders accent variant", () => {
		const { container } = render(<Progress value={50} variant="accent" />);
		const inner = container.querySelector("[role='progressbar'] > div") as HTMLElement;
		expect(inner.className).toContain("bg-accent");
	});

	it("accepts custom className", () => {
		render(<Progress value={50} className="extra" />);
		expect(screen.getByRole("progressbar").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Progress ref={ref} value={50} />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
