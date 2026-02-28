import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Chip } from "../chip";

describe("Chip", () => {
	it("renders content", () => {
		render(<Chip>React</Chip>);
		expect(screen.getByText("React")).toBeInTheDocument();
	});

	it("renders remove button when onRemove provided", () => {
		render(<Chip onRemove={vi.fn()}>Tag</Chip>);
		expect(screen.getByLabelText("Remove")).toBeInTheDocument();
	});

	it("calls onRemove when remove button clicked", async () => {
		const user = userEvent.setup();
		const onRemove = vi.fn();
		render(<Chip onRemove={onRemove}>Tag</Chip>);
		await user.click(screen.getByLabelText("Remove"));
		expect(onRemove).toHaveBeenCalledOnce();
	});

	it("renders selected variant", () => {
		const { container } = render(<Chip selected>Active</Chip>);
		const chip = container.firstChild as HTMLElement;
		expect(chip.className).toContain("border-primary");
	});

	it("accepts custom className", () => {
		const { container } = render(<Chip className="extra">X</Chip>);
		const chip = container.firstChild as HTMLElement;
		expect(chip.className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLSpanElement>();
		render(<Chip ref={ref}>X</Chip>);
		expect(ref.current).toBeInstanceOf(HTMLSpanElement);
	});
});
