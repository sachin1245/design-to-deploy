import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Breadcrumb } from "../breadcrumb";

describe("Breadcrumb", () => {
	const items = [
		{ label: "Home", href: "/" },
		{ label: "Products", href: "/products" },
		{ label: "Widget" },
	];

	it("renders navigation with breadcrumb label", () => {
		render(<Breadcrumb items={items} />);
		expect(screen.getByLabelText("Breadcrumb")).toBeInTheDocument();
	});

	it("renders all items", () => {
		render(<Breadcrumb items={items} />);
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Products")).toBeInTheDocument();
		expect(screen.getByText("Widget")).toBeInTheDocument();
	});

	it("marks last item as current page", () => {
		render(<Breadcrumb items={items} />);
		expect(screen.getByText("Widget")).toHaveAttribute("aria-current", "page");
	});

	it("renders links for non-last items with href", () => {
		render(<Breadcrumb items={items} />);
		const homeLink = screen.getByText("Home");
		expect(homeLink.tagName).toBe("A");
		expect(homeLink).toHaveAttribute("href", "/");
	});

	it("accepts custom className", () => {
		render(<Breadcrumb items={items} className="extra" />);
		expect(screen.getByLabelText("Breadcrumb").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLElement>();
		render(<Breadcrumb ref={ref} items={items} />);
		expect(ref.current).toBeInstanceOf(HTMLElement);
	});
});
