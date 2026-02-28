import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/logger", () => ({
	logger: {
		info: vi.fn(),
		error: vi.fn(),
		warn: vi.fn(),
		debug: vi.fn(),
	},
}));

const { GET } = await import("../health/route");

describe("GET /api/health", () => {
	it("returns 200 status", async () => {
		const response = GET();
		expect(response.status).toBe(200);
	});

	it("response body has status and timestamp", async () => {
		const response = GET();
		const body = (await response.json()) as {
			status: string;
			timestamp: string;
		};

		expect(body).toHaveProperty("status");
		expect(body).toHaveProperty("timestamp");
		expect(body.status).toBe("ok");
		expect(typeof body.timestamp).toBe("string");
	});

	it("timestamp is a valid ISO 8601 string", async () => {
		const before = new Date().toISOString();
		const response = GET();
		const body = (await response.json()) as {
			status: string;
			timestamp: string;
		};
		const after = new Date().toISOString();

		expect(body.timestamp >= before).toBe(true);
		expect(body.timestamp <= after).toBe(true);
		// Verify it's a valid date
		expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
	});
});
