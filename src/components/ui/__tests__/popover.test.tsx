import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Popover } from "../popover";

describe("Popover", () => {
	it("renders trigger", () => {
		render(<Popover trigger={<button type="button">Open</button>}>Content</Popover>);
		expect(screen.getByText("Open")).toBeInTheDocument();
	});

	it("does not show content by default", () => {
		render(<Popover trigger={<button type="button">Open</button>}>Content</Popover>);
		expect(screen.queryByText("Content")).not.toBeInTheDocument();
	});

	it("shows content on trigger click", async () => {
		const user = userEvent.setup();
		render(<Popover trigger={<button type="button">Open</button>}>Popover content</Popover>);
		await user.click(screen.getByText("Open"));
		expect(screen.getByText("Popover content")).toBeInTheDocument();
	});

	it("hides content on second click", async () => {
		const user = userEvent.setup();
		render(<Popover trigger={<button type="button">Open</button>}>Content</Popover>);
		await user.click(screen.getByText("Open"));
		expect(screen.getByText("Content")).toBeInTheDocument();
		await user.click(screen.getByText("Open"));
		expect(screen.queryByText("Content")).not.toBeInTheDocument();
	});

	it("accepts custom className", () => {
		const { container } = render(
			<Popover trigger={<button type="button">T</button>} className="extra">
				C
			</Popover>,
		);
		expect((container.firstChild as HTMLElement).className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(
			<Popover ref={ref} trigger={<button type="button">T</button>}>
				C
			</Popover>,
		);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
