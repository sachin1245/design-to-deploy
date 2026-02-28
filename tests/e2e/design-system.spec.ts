import { expect, test } from "@playwright/test";

test.describe("Design System Switching", () => {
	test.beforeEach(async ({ page }) => {
		// Clear localStorage before each test
		await page.goto("/");
		await page.evaluate(() => localStorage.removeItem("design-system"));
		await page.reload();
	});

	test("toggle is visible on home page", async ({ page }) => {
		await page.goto("/");
		const toggle = page.getByRole("group", { name: /design system/i });
		await expect(toggle).toBeVisible();
	});

	test("defaults to Default design system", async ({ page }) => {
		await page.goto("/");
		const defaultBtn = page
			.getByRole("group", { name: /design system/i })
			.getByRole("button", { name: /default/i });
		await expect(defaultBtn).toHaveAttribute("aria-pressed", "true");
	});

	test("switches to Area design system", async ({ page }) => {
		await page.goto("/");
		const group = page.getByRole("group", { name: /design system/i });
		await group.getByRole("button", { name: /area/i }).click();

		// Area option should be pressed
		await expect(group.getByRole("button", { name: /area/i })).toHaveAttribute(
			"aria-pressed",
			"true",
		);

		// data-design-system attribute should be set
		const ds = await page.evaluate(() =>
			document.documentElement.getAttribute("data-design-system"),
		);
		expect(ds).toBe("area");
	});

	test("persists choice across page reload", async ({ page }) => {
		await page.goto("/");
		const group = page.getByRole("group", { name: /design system/i });
		await group.getByRole("button", { name: /area/i }).click();

		// Reload and verify it persists
		await page.reload();
		const groupAfter = page.getByRole("group", { name: /design system/i });
		await expect(groupAfter.getByRole("button", { name: /area/i })).toHaveAttribute(
			"aria-pressed",
			"true",
		);

		const ds = await page.evaluate(() =>
			document.documentElement.getAttribute("data-design-system"),
		);
		expect(ds).toBe("area");
	});

	test("composes with dark mode", async ({ page }) => {
		await page.goto("/");

		// Switch to Area
		const group = page.getByRole("group", { name: /design system/i });
		await group.getByRole("button", { name: /area/i }).click();

		// Toggle to dark mode (click theme toggle)
		const themeButton = page.getByRole("button", { name: /theme/i });
		await themeButton.click();

		// Both should coexist
		const ds = await page.evaluate(() =>
			document.documentElement.getAttribute("data-design-system"),
		);
		expect(ds).toBe("area");
	});

	test("toggle works on showcase page", async ({ page }) => {
		await page.goto("/showcase");
		const toggle = page.getByRole("group", { name: /design system/i });
		await expect(toggle).toBeVisible();

		await toggle.getByRole("button", { name: /area/i }).click();
		await expect(toggle.getByRole("button", { name: /area/i })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
	});

	test("design system choice persists across navigation", async ({ page }) => {
		await page.goto("/");
		const group = page.getByRole("group", { name: /design system/i });
		await group.getByRole("button", { name: /area/i }).click();

		// Navigate to showcase
		await page.getByRole("link", { name: /Component Showcase/i }).click();
		await expect(page).toHaveURL(/\/showcase/);

		// Should still be Area
		const showcaseGroup = page.getByRole("group", { name: /design system/i });
		await expect(showcaseGroup.getByRole("button", { name: /area/i })).toHaveAttribute(
			"aria-pressed",
			"true",
		);
	});

	test("can switch back to Default", async ({ page }) => {
		await page.goto("/");
		const group = page.getByRole("group", { name: /design system/i });
		await group.getByRole("button", { name: /area/i }).click();
		await group.getByRole("button", { name: /default/i }).click();

		await expect(group.getByRole("button", { name: /default/i })).toHaveAttribute(
			"aria-pressed",
			"true",
		);

		const ds = await page.evaluate(() =>
			document.documentElement.getAttribute("data-design-system"),
		);
		expect(ds).toBeNull();
	});
});
