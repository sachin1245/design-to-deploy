import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Accordion } from "../accordion";

const items = [
	{ value: "a", trigger: "Section A", content: "Content A" },
	{ value: "b", trigger: "Section B", content: "Content B" },
];

describe("Accordion", () => {
	it("renders all triggers", () => {
		render(<Accordion items={items} />);
		expect(screen.getByText("Section A")).toBeInTheDocument();
		expect(screen.getByText("Section B")).toBeInTheDocument();
	});

	it("hides content by default", () => {
		render(<Accordion items={items} />);
		expect(screen.queryByText("Content A")).not.toBeInTheDocument();
	});

	it("shows content when trigger clicked", async () => {
		const user = userEvent.setup();
		render(<Accordion items={items} />);
		await user.click(screen.getByText("Section A"));
		expect(screen.getByText("Content A")).toBeInTheDocument();
	});

	it("single mode: collapses previous when opening new", async () => {
		const user = userEvent.setup();
		render(<Accordion items={items} type="single" />);
		await user.click(screen.getByText("Section A"));
		expect(screen.getByText("Content A")).toBeInTheDocument();
		await user.click(screen.getByText("Section B"));
		expect(screen.queryByText("Content A")).not.toBeInTheDocument();
		expect(screen.getByText("Content B")).toBeInTheDocument();
	});

	it("multiple mode: keeps previous open", async () => {
		const user = userEvent.setup();
		render(<Accordion items={items} type="multiple" />);
		await user.click(screen.getByText("Section A"));
		await user.click(screen.getByText("Section B"));
		expect(screen.getByText("Content A")).toBeInTheDocument();
		expect(screen.getByText("Content B")).toBeInTheDocument();
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Accordion ref={ref} items={items} />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
