import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /design.*to.*deploy/i })
    ).toBeVisible();
  });

  test("can navigate to /showcase", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /Component Showcase/i }).click();
    await expect(page).toHaveURL(/\/showcase/);
    await expect(
      page.getByRole("heading", { name: /Component.*Showcase/ })
    ).toBeVisible();
  });

  test("can navigate back to home", async ({ page }) => {
    await page.goto("/showcase");
    await page.getByRole("link", { name: /Home/i }).click();
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("heading", { name: /design.*to.*deploy/i })
    ).toBeVisible();
  });
});
