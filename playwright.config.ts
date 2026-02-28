import { defineConfig, devices } from "@playwright/test";

const CI = process.env["CI"];
const PORT = CI ? 3000 : 3100;

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: !!CI,
	retries: CI ? 1 : 0,
	...(CI ? { workers: 1 } : {}),
	reporter: "html",
	use: {
		baseURL: `http://localhost:${PORT}`,
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	webServer: {
		command: `npx next dev --port ${PORT}`,
		url: `http://localhost:${PORT}`,
		reuseExistingServer: !CI,
	},
});
