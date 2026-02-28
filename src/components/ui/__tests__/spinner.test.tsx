import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Spinner } from "../spinner";

describe("Spinner", () => {
	it("renders with status role", () => {
		render(<Spinner />);
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("has accessible loading text", () => {
		render(<Spinner />);
		expect(screen.getByText("Loading")).toBeInTheDocument();
	});

	it("renders small size", () => {
		render(<Spinner size="sm" />);
		const svg = screen.getByRole("status").querySelector("svg");
		expect(svg?.getAttribute("class")).toContain("h-4");
	});

	it("renders large size", () => {
		render(<Spinner size="lg" />);
		const svg = screen.getByRole("status").querySelector("svg");
		expect(svg?.getAttribute("class")).toContain("h-8");
	});

	it("renders muted variant", () => {
		render(<Spinner variant="muted" />);
		const svg = screen.getByRole("status").querySelector("svg");
		expect(svg?.getAttribute("class")).toContain("text-muted-foreground");
	});

	it("accepts custom className", () => {
		render(<Spinner className="extra" />);
		expect(screen.getByRole("status").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Spinner ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
