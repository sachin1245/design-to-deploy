import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NavLinks } from "../nav-links";

// Mock next/navigation
let mockPathname = "/";
vi.mock("next/navigation", () => ({
	usePathname: () => mockPathname,
}));

describe("NavLinks", () => {
	beforeEach(() => {
		mockPathname = "/";
	});

	it("renders all navigation links", () => {
		render(<NavLinks />);
		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Showcase" })).toBeInTheDocument();
	});

	it("renders links with correct hrefs", () => {
		render(<NavLinks />);
		expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
		expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
		expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard");
		expect(screen.getByRole("link", { name: "Showcase" })).toHaveAttribute("href", "/showcase");
	});

	it("marks Home as active when on root path", () => {
		mockPathname = "/";
		render(<NavLinks />);
		expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
		expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute("aria-current");
	});

	it("marks About as active when on /about", () => {
		mockPathname = "/about";
		render(<NavLinks />);
		expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
		expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
	});

	it("marks Dashboard as active when on /dashboard", () => {
		mockPathname = "/dashboard";
		render(<NavLinks />);
		expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("aria-current", "page");
	});

	it("marks Showcase as active when on /showcase", () => {
		mockPathname = "/showcase";
		render(<NavLinks />);
		expect(screen.getByRole("link", { name: "Showcase" })).toHaveAttribute("aria-current", "page");
	});

	it("renders inside a list for accessibility", () => {
		render(<NavLinks />);
		const list = screen.getByRole("list");
		expect(list).toBeInTheDocument();
		const items = screen.getAllByRole("listitem");
		expect(items).toHaveLength(4);
	});

	it("does not mark Home as active on other routes", () => {
		mockPathname = "/about";
		render(<NavLinks />);
		expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
	});
});
