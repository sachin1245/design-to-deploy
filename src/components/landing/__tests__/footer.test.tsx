import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../footer";

describe("Footer", () => {
	it("renders the brand name", () => {
		render(<Footer />);
		expect(screen.getByText("Clarity")).toBeInTheDocument();
	});

	it("renders navigation column headings", () => {
		render(<Footer />);
		expect(screen.getByText("Product")).toBeInTheDocument();
		expect(screen.getByText("Developers")).toBeInTheDocument();
		expect(screen.getByText("Company")).toBeInTheDocument();
	});

	it("renders navigation links", () => {
		render(<Footer />);
		expect(screen.getByText("Components")).toBeInTheDocument();
		expect(screen.getByText("Getting Started")).toBeInTheDocument();
		expect(screen.getByText("About")).toBeInTheDocument();
	});

	it("renders copyright text", () => {
		render(<Footer />);
		expect(screen.getByText(/Clarity. All rights reserved/)).toBeInTheDocument();
	});

	it("renders legal links", () => {
		render(<Footer />);
		expect(screen.getByText("Privacy")).toBeInTheDocument();
		expect(screen.getByText("Terms")).toBeInTheDocument();
	});
});
