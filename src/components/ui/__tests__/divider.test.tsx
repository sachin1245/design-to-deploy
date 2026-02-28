import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Divider } from "../divider";

describe("Divider", () => {
	it("renders a horizontal separator by default", () => {
		render(<Divider />);
		const separator = screen.getByRole("separator");
		expect(separator).toBeInTheDocument();
	});

	it("renders a vertical separator", () => {
		const { container } = render(<Divider orientation="vertical" />);
		const hr = container.querySelector("hr");
		expect(hr).toBeInTheDocument();
		expect(hr?.className).toContain("w-px");
	});

	it("renders with a label", () => {
		render(<Divider label="or" />);
		expect(screen.getByText("or")).toBeInTheDocument();
	});

	it("accepts custom className", () => {
		const { container } = render(<Divider className="my-class" />);
		const hr = container.querySelector("hr");
		expect(hr?.className).toContain("my-class");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLHRElement>();
		render(<Divider ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLHRElement);
	});
});
