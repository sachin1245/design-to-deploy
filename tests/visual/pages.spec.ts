import { expect, type Page, test } from "@playwright/test";

/* ═══════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════ */

async function disableAnimations(page: Page) {
	await page.addStyleTag({
		content: `*, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }`,
	});
}

/* ═══════════════════════════════════════════════════
   Full-Page Visual Tests
   3 pages × 3 viewports × 2 themes = 18 screenshots
   (+ Showcase = 24 total)
   ═══════════════════════════════════════════════════ */

const themes = ["light", "dark"] as const;

const viewports = [
	{ name: "mobile", width: 375, height: 812 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1440, height: 900 },
] as const;

const pages = [
	{ name: "home", path: "/" },
	{ name: "about", path: "/about" },
	{ name: "dashboard", path: "/dashboard" },
	{ name: "showcase", path: "/showcase" },
] as const;

test.describe("Page Visual Regression", () => {
	for (const theme of themes) {
		test.describe(`${theme} theme`, () => {
			for (const vp of viewports) {
				for (const pg of pages) {
					test(`${pg.name} — ${vp.name} (${vp.width}px)`, async ({ browser }) => {
						const context = await browser.newContext({
							viewport: { width: vp.width, height: vp.height },
						});
						const page = await context.newPage();
						await page.addInitScript((t) => {
							localStorage.setItem("theme", t);
						}, theme);
						await page.goto(pg.path);
						await page.waitForLoadState("networkidle");
						await disableAnimations(page);
						await expect(page).toHaveScreenshot(`${pg.name}-${vp.name}-${theme}.png`, {
							fullPage: true,
						});
						await context.close();
					});
				}
			}
		});
	}
});
