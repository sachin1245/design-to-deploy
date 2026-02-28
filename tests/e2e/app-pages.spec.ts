import { expect, test } from "@playwright/test";

test.describe("App Pages", () => {
	test.describe("Home Page", () => {
		test("loads and displays hero section", async ({ page }) => {
			await page.goto("/");
			await expect(
				page.getByRole("heading", { name: /from design tokens.*to deployed pages/i }),
			).toBeVisible();
		});

		test("displays hero description", async ({ page }) => {
			await page.goto("/");
			await expect(page.getByText(/complete design system stress-test/i)).toBeVisible();
		});

		test("CTA buttons are visible and clickable", async ({ page }) => {
			await page.goto("/");
			const dashboardCTA = page.getByRole("link", { name: /view dashboard/i });
			await expect(dashboardCTA).toBeVisible();
			await dashboardCTA.click();
			await expect(page).toHaveURL(/\/dashboard/);
		});

		test("Browse Components CTA navigates to showcase", async ({ page }) => {
			await page.goto("/");
			const showcaseCTA = page.getByRole("link", { name: /browse components/i });
			await expect(showcaseCTA).toBeVisible();
			await showcaseCTA.click();
			await expect(page).toHaveURL(/\/showcase/);
		});

		test("feature cards are visible", async ({ page }) => {
			await page.goto("/");
			await expect(page.getByText("36 Components")).toBeVisible();
			await expect(page.getByText("Token-Driven Theming")).toBeVisible();
			await expect(page.getByText("Server-First Architecture")).toBeVisible();
		});

		test("recent activity section is visible", async ({ page }) => {
			await page.goto("/");
			await expect(page.getByText("Recent Activity")).toBeVisible();
			await expect(page.getByText(/Added responsive navigation layout/)).toBeVisible();
		});
	});

	test.describe("About Page", () => {
		test("loads and displays heading", async ({ page }) => {
			await page.goto("/about");
			await expect(page.getByRole("heading", { name: /building the bridge/i })).toBeVisible();
		});

		test("displays tech stack section", async ({ page }) => {
			await page.goto("/about");
			await expect(page.getByText("Tech Stack")).toBeVisible();
			await expect(page.getByText("Next.js 15", { exact: true })).toBeVisible();
			await expect(page.getByText("React 19", { exact: true })).toBeVisible();
			await expect(page.getByText("TypeScript", { exact: true })).toBeVisible();
			await expect(page.getByText("Tailwind CSS v4", { exact: true })).toBeVisible();
		});

		test("displays team section", async ({ page }) => {
			await page.goto("/about");
			await expect(page.getByText("Team")).toBeVisible();
			await expect(page.getByText("Sachin C")).toBeVisible();
			await expect(page.getByText("Claude")).toBeVisible();
		});

		test("displays project stats", async ({ page }) => {
			await page.goto("/about");
			await expect(page.getByText("By the Numbers")).toBeVisible();
			await expect(page.getByText("UI Components")).toBeVisible();
			await expect(page.getByText("Project Phases")).toBeVisible();
		});
	});

	test.describe("Dashboard Page", () => {
		test("loads and displays heading", async ({ page }) => {
			await page.goto("/dashboard");
			await expect(page.getByRole("heading", { name: /project overview/i })).toBeVisible();
		});

		test("displays all stat cards", async ({ page }) => {
			await page.goto("/dashboard");
			await expect(page.getByText("Components", { exact: true })).toBeVisible();
			await expect(page.getByText("Test Coverage")).toBeVisible();
			await expect(page.getByText("Type Safety")).toBeVisible();
			await expect(page.getByText("Build Score")).toBeVisible();
		});

		test("displays activity feed", async ({ page }) => {
			await page.goto("/dashboard");
			await expect(page.getByText("Activity Feed")).toBeVisible();
			await expect(page.getByText(/v2\.4\.0 to production/)).toBeVisible();
		});

		test("show all activity expands the feed", async ({ page }) => {
			await page.goto("/dashboard");
			await page.getByRole("button", { name: /show all activity/i }).click();
			await expect(page.getByText(/feat: add About page/)).toBeVisible();
			await expect(page.getByRole("button", { name: /show less/i })).toBeVisible();
		});

		test("displays quick actions", async ({ page }) => {
			await page.goto("/dashboard");
			await expect(page.getByText("Quick Actions")).toBeVisible();
			await expect(page.getByText("Browse Components")).toBeVisible();
			await expect(page.getByText("View Design System")).toBeVisible();
		});
	});

	test.describe("Navigation between pages", () => {
		test("navigate to About via nav link", async ({ page }) => {
			await page.goto("/");
			await page.getByRole("banner").getByRole("link", { name: "About" }).click();
			await expect(page).toHaveURL(/\/about/);
			await expect(page.getByRole("heading", { name: /building the bridge/i })).toBeVisible();
		});

		test("navigate to Dashboard via nav link", async ({ page }) => {
			await page.goto("/");
			await page.getByRole("banner").getByRole("link", { name: "Dashboard" }).click();
			await expect(page).toHaveURL(/\/dashboard/);
			await expect(page.getByRole("heading", { name: /project overview/i })).toBeVisible();
		});

		test("navigate to Showcase via nav link", async ({ page }) => {
			await page.goto("/");
			await page.getByRole("banner").getByRole("link", { name: "Showcase" }).click();
			await expect(page).toHaveURL(/\/showcase/);
		});

		test("navigate back to Home via nav link", async ({ page }) => {
			await page.goto("/about");
			await page.getByRole("banner").getByRole("link", { name: "Home" }).click();
			await expect(page).toHaveURL("/");
		});

		test("footer links navigate correctly", async ({ page }) => {
			await page.goto("/");
			await page.getByRole("contentinfo").getByRole("link", { name: "About" }).click();
			await expect(page).toHaveURL(/\/about/);
		});
	});

	test.describe("Mobile Navigation", () => {
		test.use({ viewport: { width: 375, height: 812 } });

		test("hamburger menu opens and closes", async ({ page }) => {
			await page.goto("/");
			const menuButton = page.getByRole("button", { name: /open menu/i });
			await expect(menuButton).toBeVisible();

			await menuButton.click();
			const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
			await expect(mobileNav).toBeVisible();
			await expect(mobileNav.getByRole("link", { name: "Home" })).toBeVisible();
			await expect(mobileNav.getByRole("link", { name: "About" })).toBeVisible();
			await expect(mobileNav.getByRole("link", { name: "Dashboard" })).toBeVisible();
			await expect(mobileNav.getByRole("link", { name: "Showcase" })).toBeVisible();

			await page.getByRole("button", { name: /close menu/i }).click();
			await expect(mobileNav).toBeHidden();
		});

		test("mobile menu navigates to About", async ({ page }) => {
			await page.goto("/");
			await page.getByRole("button", { name: /open menu/i }).click();
			await page.getByRole("navigation").getByRole("link", { name: "About" }).click();
			await expect(page).toHaveURL(/\/about/);
		});

		test("mobile menu navigates to Dashboard", async ({ page }) => {
			await page.goto("/");
			await page.getByRole("button", { name: /open menu/i }).click();
			await page.getByRole("navigation").getByRole("link", { name: "Dashboard" }).click();
			await expect(page).toHaveURL(/\/dashboard/);
		});
	});

	test.describe("Theme Toggle", () => {
		test("theme toggle is visible", async ({ page }) => {
			await page.goto("/");
			const toggle = page.getByRole("button", { name: /theme/i });
			await expect(toggle).toBeVisible();
		});

		test("theme cycles through states on click", async ({ page }) => {
			await page.goto("/");
			const toggle = page.getByRole("button", { name: /theme/i });
			const html = page.locator("html");

			// Get initial state
			const initialClass = await html.getAttribute("class");

			// Click to change theme
			await toggle.click();
			const afterFirstClick = await html.getAttribute("class");

			// Click again
			await toggle.click();
			const afterSecondClick = await html.getAttribute("class");

			// At least one click should produce a different state
			const changed = initialClass !== afterFirstClick || afterFirstClick !== afterSecondClick;
			expect(changed).toBe(true);
		});

		test("theme persists across navigation", async ({ page }) => {
			await page.goto("/");
			const toggle = page.getByRole("button", { name: /theme/i });
			const html = page.locator("html");

			// Switch to dark theme
			await toggle.click();
			const themeAfterClick = await html.getAttribute("class");

			// Navigate to About
			await page.getByRole("banner").getByRole("link", { name: "About" }).click();
			await expect(page).toHaveURL(/\/about/);

			// Theme should persist
			const themeAfterNav = await html.getAttribute("class");
			expect(themeAfterNav).toEqual(themeAfterClick);
		});
	});
});
