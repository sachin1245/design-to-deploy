import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CtaSection } from "../cta-section";

describe("CtaSection", () => {
	it("renders the heading", () => {
		render(<CtaSection />);
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/Start building with/);
	});

	it("renders the install command", () => {
		render(<CtaSection />);
		expect(screen.getByText(/pnpm add @clarity\/ui/)).toBeInTheDocument();
	});

	it("renders two CTA buttons", () => {
		render(<CtaSection />);
		expect(screen.getByText("Get Started")).toBeInTheDocument();
		expect(screen.getByText("Read the Docs")).toBeInTheDocument();
	});

	it("renders description text", () => {
		render(<CtaSection />);
		expect(screen.getByText(/No configuration ceremony/)).toBeInTheDocument();
	});
});
