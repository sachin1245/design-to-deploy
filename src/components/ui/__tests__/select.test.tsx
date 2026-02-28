import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Select } from "../select";

describe("Select", () => {
	it("renders a select element", () => {
		render(
			<Select>
				<option value="a">A</option>
			</Select>,
		);
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	it("renders with label", () => {
		render(
			<Select label="Country">
				<option value="us">US</option>
			</Select>,
		);
		expect(screen.getByLabelText("Country")).toBeInTheDocument();
	});

	it("renders error message", () => {
		render(
			<Select label="Size" error="Required">
				<option value="">Select</option>
			</Select>,
		);
		expect(screen.getByText("Required")).toBeInTheDocument();
		expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
	});

	it("renders children options", () => {
		render(
			<Select>
				<option value="a">Option A</option>
				<option value="b">Option B</option>
			</Select>,
		);
		expect(screen.getByText("Option A")).toBeInTheDocument();
		expect(screen.getByText("Option B")).toBeInTheDocument();
	});

	it("accepts custom className", () => {
		render(
			<Select className="extra">
				<option>X</option>
			</Select>,
		);
		expect(screen.getByRole("combobox").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLSelectElement>();
		render(
			<Select ref={ref}>
				<option>X</option>
			</Select>,
		);
		expect(ref.current).toBeInstanceOf(HTMLSelectElement);
	});
});
