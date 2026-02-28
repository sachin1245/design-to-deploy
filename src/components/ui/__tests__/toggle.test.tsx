import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "../toggle";

describe("Toggle", () => {
	it("renders a switch", () => {
		render(<Toggle />);
		expect(screen.getByRole("switch")).toBeInTheDocument();
	});

	it("has correct aria-checked when off", () => {
		render(<Toggle checked={false} />);
		expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
	});

	it("has correct aria-checked when on", () => {
		render(<Toggle checked />);
		expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
	});

	it("calls onCheckedChange on click", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<Toggle checked={false} onCheckedChange={onChange} />);
		await user.click(screen.getByRole("switch"));
		expect(onChange).toHaveBeenCalledWith(true);
	});

	it("supports disabled state", () => {
		render(<Toggle disabled />);
		expect(screen.getByRole("switch")).toBeDisabled();
	});

	it("accepts custom className", () => {
		render(<Toggle className="extra" />);
		expect(screen.getByRole("switch").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLButtonElement>();
		render(<Toggle ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
	});
});
