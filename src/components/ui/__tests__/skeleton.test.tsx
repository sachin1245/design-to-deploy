import { render } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "../skeleton";

describe("Skeleton", () => {
	it("renders with default text variant", () => {
		const { container } = render(<Skeleton />);
		const el = container.firstChild as HTMLElement;
		expect(el.className).toContain("animate-pulse");
		expect(el.className).toContain("rounded-md");
	});

	it("renders circular variant", () => {
		const { container } = render(<Skeleton variant="circular" />);
		const el = container.firstChild as HTMLElement;
		expect(el.className).toContain("rounded-full");
	});

	it("renders rectangular variant", () => {
		const { container } = render(<Skeleton variant="rectangular" />);
		const el = container.firstChild as HTMLElement;
		expect(el.className).toContain("rounded-lg");
	});

	it("is hidden from assistive technology", () => {
		const { container } = render(<Skeleton />);
		const el = container.firstChild as HTMLElement;
		expect(el).toHaveAttribute("aria-hidden", "true");
	});

	it("accepts custom className", () => {
		const { container } = render(<Skeleton className="custom" />);
		const el = container.firstChild as HTMLElement;
		expect(el.className).toContain("custom");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Skeleton ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
