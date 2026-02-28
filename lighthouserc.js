/** @type {import('@lhci/cli').Config} */
module.exports = {
	ci: {
		collect: {
			// Use the production build for accurate measurements
			startServerCommand: "pnpm start",
			startServerReadyPattern: "Ready in",
			startServerReadyTimeout: 30000,

			// Pages to audit
			url: [
				"http://localhost:3000/",
				"http://localhost:3000/about",
				"http://localhost:3000/dashboard",
				"http://localhost:3000/showcase",
			],

			// Run 3 times per URL for stable medians
			numberOfRuns: 3,

			settings: {
				// Use desktop preset for consistent CI results
				preset: "desktop",
				// Skip network throttling in CI for speed
				throttlingMethod: "simulate",
			},
		},

		assert: {
			assertions: {
				// Category scores (0-1 scale)
				"categories:performance": ["error", { minScore: 0.9 }],
				"categories:accessibility": ["error", { minScore: 0.95 }],
				"categories:best-practices": ["error", { minScore: 0.9 }],

				// Core Web Vitals
				"largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
				"cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
				"total-blocking-time": ["error", { maxNumericValue: 200 }],
			},
		},

		upload: {
			// Use temporary public storage (free, results expire after 7 days)
			target: "temporary-public-storage",
		},
	},
};
