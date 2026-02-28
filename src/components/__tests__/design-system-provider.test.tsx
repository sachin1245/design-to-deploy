import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DesignSystemProvider, useDesignSystem } from "../design-system-provider";

function TestConsumer() {
	const { designSystem, setDesignSystem } = useDesignSystem();
	return (
		<div>
			<span data-testid="current">{designSystem}</span>
			<button type="button" onClick={() => setDesignSystem("area")}>
				Set Area
			</button>
			<button type="button" onClick={() => setDesignSystem("default")}>
				Set Default
			</button>
		</div>
	);
}

describe("DesignSystemProvider", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-design-system");
	});

	afterEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-design-system");
	});

	it("defaults to 'default' design system", () => {
		render(
			<DesignSystemProvider>
				<TestConsumer />
			</DesignSystemProvider>,
		);
		expect(screen.getByTestId("current")).toHaveTextContent("default");
	});

	it("reads initial value from localStorage", () => {
		localStorage.setItem("design-system", "area");
		render(
			<DesignSystemProvider>
				<TestConsumer />
			</DesignSystemProvider>,
		);
		expect(screen.getByTestId("current")).toHaveTextContent("area");
	});

	it("updates design system on button click", async () => {
		const user = userEvent.setup();
		render(
			<DesignSystemProvider>
				<TestConsumer />
			</DesignSystemProvider>,
		);

		await user.click(screen.getByText("Set Area"));
		expect(screen.getByTestId("current")).toHaveTextContent("area");
	});

	it("persists choice to localStorage", async () => {
		const user = userEvent.setup();
		render(
			<DesignSystemProvider>
				<TestConsumer />
			</DesignSystemProvider>,
		);

		await user.click(screen.getByText("Set Area"));
		expect(localStorage.getItem("design-system")).toBe("area");
	});

	it("removes localStorage key when set to default", async () => {
		const user = userEvent.setup();
		localStorage.setItem("design-system", "area");
		render(
			<DesignSystemProvider>
				<TestConsumer />
			</DesignSystemProvider>,
		);

		await user.click(screen.getByText("Set Default"));
		expect(localStorage.getItem("design-system")).toBeNull();
	});

	it("sets data-design-system attribute on html element", async () => {
		const user = userEvent.setup();
		render(
			<DesignSystemProvider>
				<TestConsumer />
			</DesignSystemProvider>,
		);

		await user.click(screen.getByText("Set Area"));
		expect(document.documentElement.getAttribute("data-design-system")).toBe("area");
	});

	it("removes data-design-system attribute for default", async () => {
		const user = userEvent.setup();
		document.documentElement.setAttribute("data-design-system", "area");
		render(
			<DesignSystemProvider>
				<TestConsumer />
			</DesignSystemProvider>,
		);

		await user.click(screen.getByText("Set Default"));
		expect(document.documentElement.hasAttribute("data-design-system")).toBe(false);
	});

	it("throws when useDesignSystem is used outside provider", () => {
		// Suppress console.error for expected error
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		expect(() => render(<TestConsumer />)).toThrow(
			"useDesignSystem must be used within a DesignSystemProvider",
		);
		consoleSpy.mockRestore();
	});
});
