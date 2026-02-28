import { test, expect } from "@playwright/test";

test.describe("Showcase Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/showcase");
  });

  test("page loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Showcase/);
    await expect(
      page.getByRole("heading", { name: /Component.*Showcase/ })
    ).toBeVisible();
  });

  test("all component sections are visible", async ({ page }) => {
    const sections = [
      "Button",
      "Input",
      "Badge",
      "Card",
      "Avatar",
      "Dialog",
    ];

    for (const section of sections) {
      await expect(
        page.getByRole("heading", { name: section, exact: true })
      ).toBeVisible();
    }
  });

  test("theme toggle switches between light and dark", async ({ page }) => {
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: /Theme:.*Switch to/i });

    // Click to cycle through themes and verify the class changes
    await toggle.click();
    const classAfterFirst = await html.getAttribute("class");

    await toggle.click();
    const classAfterSecond = await html.getAttribute("class");

    // The two clicks should produce different states
    expect(classAfterFirst).not.toEqual(classAfterSecond);
  });

  test("buttons are clickable", async ({ page }) => {
    // Find a non-disabled primary button and click it
    const button = page
      .getByRole("button", { name: "Primary" })
      .first();
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
    await button.click();
  });

  test("inputs accept text", async ({ page }) => {
    const input = page.getByPlaceholder("Default input");
    await expect(input).toBeVisible();
    await input.fill("Hello Playwright");
    await expect(input).toHaveValue("Hello Playwright");
  });

  test("dialog opens and closes", async ({ page }) => {
    // Open dialog
    const trigger = page.getByRole("button", { name: "Open Dialog" });
    await trigger.click();

    // Verify dialog content is visible
    await expect(
      page.getByRole("heading", { name: "Confirm Action" })
    ).toBeVisible();
    await expect(page.getByText(/This dialog demonstrates/)).toBeVisible();

    // Close via Cancel button
    await page.getByRole("button", { name: "Cancel" }).click();

    // Verify dialog is closed
    await expect(
      page.getByRole("heading", { name: "Confirm Action" })
    ).toBeHidden();
  });
});
