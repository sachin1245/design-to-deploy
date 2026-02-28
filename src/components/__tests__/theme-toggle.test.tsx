import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock next-themes
const mockSetTheme = vi.fn();
let mockTheme = "light";

vi.mock("next-themes", () => ({
	useTheme: () => ({
		theme: mockTheme,
		setTheme: mockSetTheme,
	}),
}));

import { ThemeToggle } from "../theme-toggle";

describe("ThemeToggle", () => {
	beforeEach(() => {
		mockTheme = "light";
		mockSetTheme.mockClear();
	});

	it("renders the toggle button", () => {
		render(<ThemeToggle />);
		expect(screen.getByRole("button", { name: /theme/i })).toBeInTheDocument();
	});

	it("displays current theme in aria-label", () => {
		render(<ThemeToggle />);
		expect(screen.getByRole("button")).toHaveAttribute(
			"aria-label",
			expect.stringContaining("Light"),
		);
	});

	it("cycles to dark theme on click", async () => {
		const user = userEvent.setup();
		render(<ThemeToggle />);

		await user.click(screen.getByRole("button", { name: /theme/i }));
		expect(mockSetTheme).toHaveBeenCalledWith("dark");
	});

	it("cycles from dark to system", async () => {
		mockTheme = "dark";
		const user = userEvent.setup();
		render(<ThemeToggle />);

		await user.click(screen.getByRole("button", { name: /theme/i }));
		expect(mockSetTheme).toHaveBeenCalledWith("system");
	});

	it("cycles from system to light", async () => {
		mockTheme = "system";
		const user = userEvent.setup();
		render(<ThemeToggle />);

		await user.click(screen.getByRole("button", { name: /theme/i }));
		expect(mockSetTheme).toHaveBeenCalledWith("light");
	});

	it("accepts custom className", () => {
		render(<ThemeToggle className="custom-class" />);
		const button = screen.getByRole("button", { name: /theme/i });
		expect(button.className).toContain("custom-class");
	});

	it("shows next theme label in aria-label", () => {
		render(<ThemeToggle />);
		const button = screen.getByRole("button");
		expect(button.getAttribute("aria-label")).toContain("Switch to Dark");
	});
});
