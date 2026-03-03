import { expect, test } from "@playwright/test";

test.describe("Docs Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/docs");
	});

	test("page loads with correct title and heading", async ({ page }) => {
		await expect(page).toHaveTitle(/Documentation/);
		await expect(page.getByRole("heading", { name: /Claude Code Orchestration/i })).toBeVisible();
	});

	test("breadcrumb shows Home > Documentation", async ({ page }) => {
		const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
		await expect(breadcrumb).toBeVisible();
		await expect(breadcrumb.getByText("Home")).toBeVisible();
		await expect(breadcrumb.getByText("Documentation")).toBeVisible();
	});

	test("all 9 sections are present in DOM", async ({ page }) => {
		// Sections use MotionReveal (whileInView) so offscreen ones start at
		// opacity:0. We scroll each into view to trigger the animation.
		const sectionIds = [
			"overview",
			"pipeline",
			"agents",
			"commands",
			"skills",
			"plugins",
			"hooks",
			"mcp",
			"parallel",
		];

		for (const id of sectionIds) {
			const section = page.locator(`section#${id}`);
			await section.scrollIntoViewIfNeeded();
			await expect(section).toBeVisible();
		}
	});

	test("pipeline shows first and last steps", async ({ page }) => {
		const pipelineSection = page.locator("section#pipeline");
		await pipelineSection.scrollIntoViewIfNeeded();

		await expect(pipelineSection.getByText("Explore").first()).toBeVisible();
		await expect(pipelineSection.getByText("Ship").first()).toBeVisible();
	});

	test("agent filter tabs work", async ({ page }) => {
		const agentsSection = page.locator("section#agents");
		await agentsSection.scrollIntoViewIfNeeded();

		const tabList = agentsSection.getByRole("tablist");
		await expect(tabList).toBeVisible();

		// Click Opus tab
		await tabList.getByRole("tab", { name: /Opus/i }).click();
		await expect(agentsSection.getByText("staff-reviewer")).toBeVisible();
		await expect(agentsSection.getByText("design-implementer")).toBeVisible();

		// Click Sonnet tab
		await tabList.getByRole("tab", { name: /Sonnet/i }).click();
		await expect(agentsSection.getByText("code-reviewer")).toBeVisible();
		await expect(agentsSection.getByText("test-writer")).toBeVisible();

		// Click All tab to reset
		await tabList.getByRole("tab", { name: /All/i }).click();
		await expect(agentsSection.getByText("staff-reviewer")).toBeVisible();
		await expect(agentsSection.getByText("code-reviewer")).toBeVisible();
	});

	test("code blocks have copy buttons", async ({ page }) => {
		const copyButtons = page.getByRole("button", { name: /Copy code/i });
		const count = await copyButtons.count();
		expect(count).toBeGreaterThan(0);
	});

	test("theme toggle is present and clickable", async ({ page }) => {
		// Wait for hydration — ThemeToggle renders a skeleton until mounted
		const toggle = page.getByRole("button", { name: /Theme/i });
		await expect(toggle).toBeVisible({ timeout: 10000 });
		await toggle.click();
		// Verify it didn't crash — the toggle is still visible after clicking
		await expect(toggle).toBeVisible();
	});

	test("breadcrumb Home link navigates to /", async ({ page }) => {
		const breadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
		await breadcrumb.getByRole("link", { name: "Home" }).click();
		await expect(page).toHaveURL("/");
	});

	test.describe("Sidebar (desktop)", () => {
		test.use({ viewport: { width: 1280, height: 800 } });

		test("sidebar navigation is visible", async ({ page }) => {
			const sidebar = page.getByRole("navigation", {
				name: "Documentation navigation",
			});
			await expect(sidebar).toBeVisible();
		});

		test("sidebar contains all section links", async ({ page }) => {
			const sidebar = page.getByRole("navigation", {
				name: "Documentation navigation",
			});
			const sectionLabels = [
				"Overview",
				"Pipeline",
				"Agents",
				"Commands",
				"Skills",
				"Plugins",
				"Hooks",
				"MCP Servers",
				"Parallel",
			];

			for (const label of sectionLabels) {
				await expect(sidebar.getByText(label)).toBeVisible();
			}
		});

		test("clicking sidebar link scrolls to section", async ({ page }) => {
			const sidebar = page.getByRole("navigation", {
				name: "Documentation navigation",
			});
			await sidebar.getByRole("link", { name: "Parallel" }).click();

			const parallelSection = page.locator("section#parallel");
			await expect(parallelSection).toBeInViewport({ timeout: 5000 });
		});
	});

	test.describe("Mobile layout", () => {
		test.use({ viewport: { width: 375, height: 812 } });

		test("sidebar is hidden on mobile", async ({ page }) => {
			const sidebar = page.locator("aside");
			await expect(sidebar).toBeHidden();
		});

		test("content sections are still visible", async ({ page }) => {
			await expect(page.getByRole("heading", { name: /Claude Code Orchestration/i })).toBeVisible();

			// Scroll to agents section to trigger its MotionReveal
			const agentsSection = page.locator("section#agents");
			await agentsSection.scrollIntoViewIfNeeded();
			await expect(page.getByRole("heading", { name: "Agents" })).toBeVisible();
		});
	});
});
