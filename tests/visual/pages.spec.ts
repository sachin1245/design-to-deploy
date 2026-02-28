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
   ═══════════════════════════════════════════════════ */

const themes = ["light", "dark"] as const;

test.describe("Page Visual Regression", () => {
	for (const theme of themes) {
		test.describe(`${theme} theme`, () => {
			test("Showcase — desktop (1440px)", async ({ browser }) => {
				const context = await browser.newContext({
					viewport: { width: 1440, height: 900 },
				});
				const page = await context.newPage();
				await page.addInitScript((t) => {
					localStorage.setItem("theme", t);
				}, theme);
				await page.goto("/showcase");
				await page.waitForLoadState("networkidle");
				await disableAnimations(page);
				await expect(page).toHaveScreenshot(`showcase-desktop-${theme}.png`, { fullPage: true });
				await context.close();
			});

			test("Showcase — mobile (375px)", async ({ browser }) => {
				const context = await browser.newContext({
					viewport: { width: 375, height: 812 },
				});
				const page = await context.newPage();
				await page.addInitScript((t) => {
					localStorage.setItem("theme", t);
				}, theme);
				await page.goto("/showcase");
				await page.waitForLoadState("networkidle");
				await disableAnimations(page);
				await expect(page).toHaveScreenshot(`showcase-mobile-${theme}.png`, { fullPage: true });
				await context.close();
			});
		});
	}
});
