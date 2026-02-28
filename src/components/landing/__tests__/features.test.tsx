import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Features } from "../features";

describe("Features", () => {
	it("renders section heading", () => {
		render(<Features />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Everything you need/);
	});

	it("renders all four feature cards", () => {
		render(<Features />);
		expect(screen.getByText("Token-Driven Design")).toBeInTheDocument();
		expect(screen.getByText("Composable Patterns")).toBeInTheDocument();
		expect(screen.getByText("Accessible by Default")).toBeInTheDocument();
		expect(screen.getByText("Variant Architecture")).toBeInTheDocument();
	});

	it("renders feature descriptions", () => {
		render(<Features />);
		expect(screen.getByText(/CSS custom property/)).toBeInTheDocument();
		expect(screen.getByText(/class-variance-authority/)).toBeInTheDocument();
	});

	it("renders the features label", () => {
		render(<Features />);
		expect(screen.getByText("Features")).toBeInTheDocument();
	});
});
