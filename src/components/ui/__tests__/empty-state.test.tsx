import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "../empty-state";

describe("EmptyState", () => {
	it("renders title", () => {
		render(<EmptyState title="No results" />);
		expect(screen.getByText("No results")).toBeInTheDocument();
	});

	it("renders description", () => {
		render(<EmptyState title="Empty" description="Nothing to show" />);
		expect(screen.getByText("Nothing to show")).toBeInTheDocument();
	});

	it("renders action button", () => {
		render(<EmptyState title="Empty" action={<button type="button">Add item</button>} />);
		expect(screen.getByText("Add item")).toBeInTheDocument();
	});

	it("renders icon", () => {
		render(<EmptyState title="Empty" icon={<span data-testid="icon">📭</span>} />);
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("accepts custom className", () => {
		const { container } = render(<EmptyState title="T" className="extra" />);
		expect((container.firstChild as HTMLElement).className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<EmptyState ref={ref} title="T" />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
