import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DesignSystemProvider } from "../design-system-provider";
import { DesignSystemToggle } from "../design-system-toggle";

function renderToggle() {
	return render(
		<DesignSystemProvider>
			<DesignSystemToggle />
		</DesignSystemProvider>,
	);
}

describe("DesignSystemToggle", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-design-system");
	});

	afterEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute("data-design-system");
	});

	it("renders with group role", () => {
		renderToggle();
		expect(screen.getByRole("group", { name: /design system/i })).toBeInTheDocument();
	});

	it("renders Default and Area buttons", () => {
		renderToggle();
		expect(screen.getByRole("button", { name: /default/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /area/i })).toBeInTheDocument();
	});

	it("has Default pressed by default", () => {
		renderToggle();
		expect(screen.getByRole("button", { name: /default/i })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
		expect(screen.getByRole("button", { name: /area/i })).toHaveAttribute("aria-pressed", "false");
	});

	it("switches to Area on click", async () => {
		const user = userEvent.setup();
		renderToggle();

		await user.click(screen.getByRole("button", { name: /area/i }));
		expect(screen.getByRole("button", { name: /area/i })).toHaveAttribute("aria-pressed", "true");
		expect(screen.getByRole("button", { name: /default/i })).toHaveAttribute(
			"aria-pressed",
			"false",
		);
	});

	it("switches back to Default on click", async () => {
		const user = userEvent.setup();
		localStorage.setItem("design-system", "area");
		renderToggle();

		await user.click(screen.getByRole("button", { name: /default/i }));
		expect(screen.getByRole("button", { name: /default/i })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
	});

	it("accepts className prop", () => {
		render(
			<DesignSystemProvider>
				<DesignSystemToggle className="custom-class" />
			</DesignSystemProvider>,
		);
		expect(screen.getByRole("group", { name: /design system/i })).toHaveClass("custom-class");
	});
});
