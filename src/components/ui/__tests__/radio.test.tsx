import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "../radio";

describe("Radio", () => {
	it("renders a radio button", () => {
		render(<Radio name="test" value="a" label="Option A" />);
		expect(screen.getByRole("radio")).toBeInTheDocument();
	});

	it("renders with label", () => {
		render(<Radio name="test" value="a" label="Option A" />);
		expect(screen.getByLabelText("Option A")).toBeInTheDocument();
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLInputElement>();
		render(<Radio ref={ref} name="test" value="a" />);
		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});
});

describe("RadioGroup", () => {
	it("renders a radiogroup", () => {
		render(
			<RadioGroup name="color">
				<Radio value="red" label="Red" />
				<Radio value="blue" label="Blue" />
			</RadioGroup>,
		);
		expect(screen.getByRole("radiogroup")).toBeInTheDocument();
		expect(screen.getAllByRole("radio")).toHaveLength(2);
	});

	it("calls onValueChange when option clicked", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(
			<RadioGroup name="color" onValueChange={onChange}>
				<Radio value="red" label="Red" />
				<Radio value="blue" label="Blue" />
			</RadioGroup>,
		);
		await user.click(screen.getByLabelText("Blue"));
		expect(onChange).toHaveBeenCalledWith("blue");
	});

	it("accepts custom className", () => {
		render(
			<RadioGroup className="extra">
				<Radio value="a" label="A" />
			</RadioGroup>,
		);
		expect(screen.getByRole("radiogroup").className).toContain("extra");
	});
});
