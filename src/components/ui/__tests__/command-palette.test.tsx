import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { CommandPalette } from "../command-palette";

const groups = [
	{
		heading: "Actions",
		items: [
			{ id: "1", label: "New File", onSelect: vi.fn() },
			{ id: "2", label: "Open File", shortcut: "⌘O", onSelect: vi.fn() },
		],
	},
];

describe("CommandPalette", () => {
	it("renders nothing when closed", () => {
		render(<CommandPalette open={false} onClose={vi.fn()} groups={groups} />);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("renders dialog when open", () => {
		render(<CommandPalette open onClose={vi.fn()} groups={groups} />);
		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});

	it("shows all items", () => {
		render(<CommandPalette open onClose={vi.fn()} groups={groups} />);
		expect(screen.getByText("New File")).toBeInTheDocument();
		expect(screen.getByText("Open File")).toBeInTheDocument();
	});

	it("filters by search query", async () => {
		const user = userEvent.setup();
		render(<CommandPalette open onClose={vi.fn()} groups={groups} />);
		await user.type(screen.getByPlaceholderText("Search commands..."), "New");
		expect(screen.getByText("New File")).toBeInTheDocument();
		expect(screen.queryByText("Open File")).not.toBeInTheDocument();
	});

	it("shows shortcut badge", () => {
		render(<CommandPalette open onClose={vi.fn()} groups={groups} />);
		expect(screen.getByText("⌘O")).toBeInTheDocument();
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<CommandPalette ref={ref} open onClose={vi.fn()} groups={groups} />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
