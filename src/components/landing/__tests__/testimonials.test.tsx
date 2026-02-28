import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Testimonials } from "../testimonials";

describe("Testimonials", () => {
	it("renders section heading", () => {
		render(<Testimonials />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Trusted by teams/);
	});

	it("renders all three testimonial quotes", () => {
		render(<Testimonials />);
		expect(screen.getByText(/replaced three different component libraries/)).toBeInTheDocument();
		expect(screen.getByText(/treats accessibility as a feature/)).toBeInTheDocument();
		expect(screen.getByText(/CVA variant pattern is addictive/)).toBeInTheDocument();
	});

	it("renders testimonial authors", () => {
		render(<Testimonials />);
		expect(screen.getByText("Elena Vasquez")).toBeInTheDocument();
		expect(screen.getByText("James Okafor")).toBeInTheDocument();
		expect(screen.getByText("Mina Chen")).toBeInTheDocument();
	});

	it("renders author roles", () => {
		render(<Testimonials />);
		expect(screen.getByText(/Meridian/)).toBeInTheDocument();
		expect(screen.getByText(/Praxis/)).toBeInTheDocument();
		expect(screen.getByText(/Lumen/)).toBeInTheDocument();
	});
});
