import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
	it("renders a checkbox", () => {
		render(<Checkbox />);
		expect(screen.getByRole("checkbox")).toBeInTheDocument();
	});

	it("renders with label", () => {
		render(<Checkbox label="Agree" />);
		expect(screen.getByLabelText("Agree")).toBeInTheDocument();
	});

	it("can be toggled", async () => {
		const user = userEvent.setup();
		render(<Checkbox label="Accept" />);
		const checkbox = screen.getByRole("checkbox");
		expect(checkbox).not.toBeChecked();
		await user.click(checkbox);
		expect(checkbox).toBeChecked();
	});

	it("supports disabled state", () => {
		render(<Checkbox disabled />);
		expect(screen.getByRole("checkbox")).toBeDisabled();
	});

	it("accepts custom className", () => {
		render(<Checkbox className="extra" />);
		expect(screen.getByRole("checkbox").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLInputElement>();
		render(<Checkbox ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});
});
