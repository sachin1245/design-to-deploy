import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { NavBar } from "../navbar";

const items = [
	{ label: "Home", href: "/", active: true },
	{ label: "About", href: "/about" },
	{ label: "Contact", href: "/contact" },
];

describe("NavBar", () => {
	it("renders navigation", () => {
		render(<NavBar items={items} />);
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("renders all nav items", () => {
		render(<NavBar items={items} />);
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("About")).toBeInTheDocument();
		expect(screen.getByText("Contact")).toBeInTheDocument();
	});

	it("marks active item", () => {
		render(<NavBar items={items} />);
		expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");
	});

	it("renders brand", () => {
		render(<NavBar items={items} brand="MyApp" />);
		expect(screen.getByText("MyApp")).toBeInTheDocument();
	});

	it("renders links with href", () => {
		render(<NavBar items={items} />);
		expect(screen.getByText("About")).toHaveAttribute("href", "/about");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLElement>();
		render(<NavBar ref={ref} items={items} />);
		expect(ref.current).toBeInstanceOf(HTMLElement);
	});
});
