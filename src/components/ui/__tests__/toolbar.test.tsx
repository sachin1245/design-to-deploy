import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Toolbar, ToolbarButton, ToolbarSeparator } from "../toolbar";

describe("Toolbar", () => {
	it("renders toolbar", () => {
		render(
			<Toolbar>
				<ToolbarButton>Bold</ToolbarButton>
			</Toolbar>,
		);
		expect(screen.getByRole("toolbar")).toBeInTheDocument();
	});

	it("renders buttons", () => {
		render(
			<Toolbar>
				<ToolbarButton>B</ToolbarButton>
				<ToolbarButton>I</ToolbarButton>
			</Toolbar>,
		);
		expect(screen.getAllByRole("button")).toHaveLength(2);
	});

	it("renders separator", () => {
		render(
			<Toolbar>
				<ToolbarButton>B</ToolbarButton>
				<ToolbarSeparator />
				<ToolbarButton>I</ToolbarButton>
			</Toolbar>,
		);
		expect(screen.getByRole("separator")).toBeInTheDocument();
	});

	it("renders active button state", () => {
		render(
			<Toolbar>
				<ToolbarButton active>B</ToolbarButton>
			</Toolbar>,
		);
		expect(screen.getByText("B").className).toContain("bg-secondary");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(
			<Toolbar ref={ref}>
				<ToolbarButton>X</ToolbarButton>
			</Toolbar>,
		);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
