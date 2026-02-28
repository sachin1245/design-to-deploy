import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Tab, TabList, TabPanel, Tabs } from "../tabs";

describe("Tabs", () => {
	const TabsExample = ({ value = "a", onValueChange = vi.fn() }) => (
		<Tabs value={value} onValueChange={onValueChange}>
			<TabList>
				<Tab value="a">Tab A</Tab>
				<Tab value="b">Tab B</Tab>
			</TabList>
			<TabPanel value="a">Panel A</TabPanel>
			<TabPanel value="b">Panel B</TabPanel>
		</Tabs>
	);

	it("renders tab list with tabs", () => {
		render(<TabsExample />);
		expect(screen.getByRole("tablist")).toBeInTheDocument();
		expect(screen.getAllByRole("tab")).toHaveLength(2);
	});

	it("shows active tab panel", () => {
		render(<TabsExample value="a" />);
		expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel A");
	});

	it("hides inactive panel", () => {
		render(<TabsExample value="a" />);
		expect(screen.queryByText("Panel B")).not.toBeInTheDocument();
	});

	it("calls onValueChange when tab clicked", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<TabsExample onValueChange={onChange} />);
		await user.click(screen.getByText("Tab B"));
		expect(onChange).toHaveBeenCalledWith("b");
	});

	it("sets aria-selected on active tab", () => {
		render(<TabsExample value="a" />);
		expect(screen.getByText("Tab A")).toHaveAttribute("aria-selected", "true");
		expect(screen.getByText("Tab B")).toHaveAttribute("aria-selected", "false");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(
			<Tabs ref={ref} value="a" onValueChange={vi.fn()}>
				<span>X</span>
			</Tabs>,
		);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
