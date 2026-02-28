import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MobileNav } from "../mobile-nav";

// Mock next/navigation
let mockPathname = "/";
vi.mock("next/navigation", () => ({
	usePathname: () => mockPathname,
}));

describe("MobileNav", () => {
	beforeEach(() => {
		mockPathname = "/";
		document.body.style.overflow = "";
	});

	it("renders the menu toggle button", () => {
		render(<MobileNav />);
		expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
	});

	it("menu is closed by default", () => {
		render(<MobileNav />);
		expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
	});

	it("opens menu when button is clicked", async () => {
		const user = userEvent.setup();
		render(<MobileNav />);

		await user.click(screen.getByRole("button", { name: /open menu/i }));
		expect(screen.getByRole("navigation")).toBeInTheDocument();
	});

	it("shows all nav links when open", async () => {
		const user = userEvent.setup();
		render(<MobileNav />);

		await user.click(screen.getByRole("button", { name: /open menu/i }));

		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Showcase" })).toBeInTheDocument();
	});

	it("closes menu when button is clicked again", async () => {
		const user = userEvent.setup();
		render(<MobileNav />);

		await user.click(screen.getByRole("button", { name: /open menu/i }));
		expect(screen.getByRole("navigation")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: /close menu/i }));
		expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
	});

	it("button aria-label changes when open", async () => {
		const user = userEvent.setup();
		render(<MobileNav />);

		const button = screen.getByRole("button", { name: /open menu/i });
		expect(button).toHaveAttribute("aria-expanded", "false");

		await user.click(button);
		expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute(
			"aria-expanded",
			"true",
		);
	});

	it("sets body overflow hidden when open", async () => {
		const user = userEvent.setup();
		render(<MobileNav />);

		await user.click(screen.getByRole("button", { name: /open menu/i }));
		expect(document.body.style.overflow).toBe("hidden");
	});

	it("restores body overflow when closed", async () => {
		const user = userEvent.setup();
		render(<MobileNav />);

		await user.click(screen.getByRole("button", { name: /open menu/i }));
		await user.click(screen.getByRole("button", { name: /close menu/i }));
		expect(document.body.style.overflow).toBe("");
	});

	it("renders nav links with correct hrefs", async () => {
		const user = userEvent.setup();
		render(<MobileNav />);

		await user.click(screen.getByRole("button", { name: /open menu/i }));

		expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
		expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
		expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard");
		expect(screen.getByRole("link", { name: "Showcase" })).toHaveAttribute("href", "/showcase");
	});
});
