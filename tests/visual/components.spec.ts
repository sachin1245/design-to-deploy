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

function getSection(page: Page, name: string) {
	return page.locator("section").filter({ has: page.getByRole("heading", { name, exact: true }) });
}

/* ═══════════════════════════════════════════════════
   Component Visual Tests
   ═══════════════════════════════════════════════════ */

const themes = ["light", "dark"] as const;

test.describe("Component Visual Regression", () => {
	for (const theme of themes) {
		test.describe(`${theme} theme`, () => {
			test.beforeEach(async ({ page }) => {
				await page.addInitScript((t) => {
					localStorage.setItem("theme", t);
				}, theme);
				await page.goto("/showcase");
				await page.waitForLoadState("networkidle");
				await disableAnimations(page);
			});

			test("Button — every variant × every size", async ({ page }) => {
				const section = getSection(page, "Button");
				await expect(section).toHaveScreenshot(`button-${theme}.png`);
			});

			test("Input — default, error, disabled", async ({ page }) => {
				const section = getSection(page, "Input");
				await expect(section).toHaveScreenshot(`input-${theme}.png`);
			});

			test("Badge — every variant", async ({ page }) => {
				const section = getSection(page, "Badge");
				await expect(section).toHaveScreenshot(`badge-${theme}.png`);
			});

			test("Card — with content", async ({ page }) => {
				const section = getSection(page, "Card");
				await expect(section).toHaveScreenshot(`card-${theme}.png`);
			});

			test("Avatar — with fallback", async ({ page }) => {
				const section = getSection(page, "Avatar");
				await expect(section).toHaveScreenshot(`avatar-${theme}.png`);
			});

			test("Dialog — open state", async ({ page }) => {
				await page.getByRole("button", { name: "Open Dialog" }).click();
				const dialog = page.locator('[role="dialog"]');
				await expect(dialog).toBeVisible();
				await disableAnimations(page);
				await expect(dialog).toHaveScreenshot(`dialog-open-${theme}.png`);
			});
		});
	}
});
