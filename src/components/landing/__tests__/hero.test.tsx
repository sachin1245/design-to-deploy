import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "../hero";

describe("Hero", () => {
	it("renders the headline", () => {
		render(<Hero />);
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Build interfaces/);
	});

	it("renders the subtitle", () => {
		render(<Hero />);
		expect(screen.getByText(/production-ready React component library/)).toBeInTheDocument();
	});

	it("renders two CTA buttons", () => {
		render(<Hero />);
		expect(screen.getByText("Get Started")).toBeInTheDocument();
		expect(screen.getByText("View Components")).toBeInTheDocument();
	});

	it("renders the version badge", () => {
		render(<Hero />);
		expect(screen.getByText(/36 Components/)).toBeInTheDocument();
	});

	it("renders stats section", () => {
		render(<Hero />);
		expect(screen.getByText("Components")).toBeInTheDocument();
		expect(screen.getByText("Accessible")).toBeInTheDocument();
		expect(screen.getByText("Dependencies")).toBeInTheDocument();
	});
});
