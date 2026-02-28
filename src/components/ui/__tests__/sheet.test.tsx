import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Sheet } from "../sheet";

describe("Sheet", () => {
	it("renders nothing when closed", () => {
		render(
			<Sheet open={false} onClose={vi.fn()} title="Test">
				Content
			</Sheet>,
		);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("renders dialog when open", () => {
		render(
			<Sheet open onClose={vi.fn()} title="Settings">
				Panel content
			</Sheet>,
		);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByText("Panel content")).toBeInTheDocument();
	});

	it("renders title", () => {
		render(
			<Sheet open onClose={vi.fn()} title="Settings">
				X
			</Sheet>,
		);
		expect(screen.getByText("Settings")).toBeInTheDocument();
	});

	it("calls onClose when close button clicked", async () => {
		const user = userEvent.setup();
		const onClose = vi.fn();
		render(
			<Sheet open onClose={onClose} title="T">
				X
			</Sheet>,
		);
		await user.click(screen.getByLabelText("Close"));
		expect(onClose).toHaveBeenCalledOnce();
	});

	it("accepts custom className", () => {
		render(
			<Sheet open onClose={vi.fn()} className="extra">
				X
			</Sheet>,
		);
		expect(screen.getByRole("dialog").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(
			<Sheet ref={ref} open onClose={vi.fn()}>
				X
			</Sheet>,
		);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
