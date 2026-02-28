import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Tooltip } from "../tooltip";

describe("Tooltip", () => {
	it("renders trigger content", () => {
		render(
			<Tooltip content="Tip">
				<button type="button">Hover me</button>
			</Tooltip>,
		);
		expect(screen.getByText("Hover me")).toBeInTheDocument();
	});

	it("does not show tooltip by default", () => {
		render(
			<Tooltip content="Tip">
				<button type="button">Hover me</button>
			</Tooltip>,
		);
		expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
	});

	it("shows tooltip on mouse enter with zero delay", async () => {
		render(
			<Tooltip content="Tip text" delayMs={0}>
				<button type="button">Hover</button>
			</Tooltip>,
		);
		const wrapper = screen.getByText("Hover").closest("[class]") as HTMLElement;
		fireEvent.mouseEnter(wrapper);
		// With delayMs=0, setTimeout(fn, 0) needs a tick
		await new Promise((r) => setTimeout(r, 10));
		expect(screen.getByRole("tooltip")).toHaveTextContent("Tip text");
	});

	it("hides tooltip on mouse leave", async () => {
		render(
			<Tooltip content="Tip" delayMs={0}>
				<button type="button">Hover</button>
			</Tooltip>,
		);
		const wrapper = screen.getByText("Hover").closest("[class]") as HTMLElement;
		fireEvent.mouseEnter(wrapper);
		// Wait for setTimeout(fn, 0) to fire — needs multiple ticks in JSDOM
		await new Promise((r) => setTimeout(r, 50));
		expect(screen.getByRole("tooltip")).toBeInTheDocument();
		fireEvent.mouseLeave(wrapper);
		expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
	});

	it("accepts custom className", () => {
		const { container } = render(
			<Tooltip content="T" className="extra">
				<span>X</span>
			</Tooltip>,
		);
		expect((container.firstChild as HTMLElement).className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(
			<Tooltip ref={ref} content="T">
				<span>X</span>
			</Tooltip>,
		);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
