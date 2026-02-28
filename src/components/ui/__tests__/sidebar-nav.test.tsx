import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { SidebarNav } from "../sidebar-nav";

const sections = [
	{
		title: "Main",
		items: [
			{ label: "Dashboard", href: "/dashboard", active: true },
			{ label: "Settings", href: "/settings" },
		],
	},
	{
		title: "Resources",
		items: [{ label: "Docs", href: "/docs" }],
	},
];

describe("SidebarNav", () => {
	it("renders navigation", () => {
		render(<SidebarNav sections={sections} />);
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("renders all sections and items", () => {
		render(<SidebarNav sections={sections} />);
		expect(screen.getByText("Main")).toBeInTheDocument();
		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		expect(screen.getByText("Settings")).toBeInTheDocument();
		expect(screen.getByText("Resources")).toBeInTheDocument();
		expect(screen.getByText("Docs")).toBeInTheDocument();
	});

	it("marks active item", () => {
		render(<SidebarNav sections={sections} />);
		expect(screen.getByText("Dashboard")).toHaveAttribute("aria-current", "page");
	});

	it("collapses section when collapsible", async () => {
		const user = userEvent.setup();
		render(<SidebarNav sections={sections} collapsible />);
		expect(screen.getByText("Dashboard")).toBeInTheDocument();
		await user.click(screen.getByText("Main"));
		expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLElement>();
		render(<SidebarNav ref={ref} sections={sections} />);
		expect(ref.current).toBeInstanceOf(HTMLElement);
	});
});
