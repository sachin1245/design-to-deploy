import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Textarea } from "../textarea";

describe("Textarea", () => {
	it("renders a textarea", () => {
		render(<Textarea />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("renders with label", () => {
		render(<Textarea label="Description" />);
		expect(screen.getByLabelText("Description")).toBeInTheDocument();
	});

	it("renders error message", () => {
		render(<Textarea label="Bio" error="Too long" />);
		expect(screen.getByText("Too long")).toBeInTheDocument();
		expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
	});

	it("accepts text input", async () => {
		const user = userEvent.setup();
		render(<Textarea />);
		const textarea = screen.getByRole("textbox");
		await user.type(textarea, "hello");
		expect(textarea).toHaveValue("hello");
	});

	it("accepts custom className", () => {
		render(<Textarea className="custom" />);
		expect(screen.getByRole("textbox").className).toContain("custom");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLTextAreaElement>();
		render(<Textarea ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
	});
});
