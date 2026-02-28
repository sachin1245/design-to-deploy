import { describe, expect, it } from "vitest";
import { GET } from "../health/route";

describe("GET /api/health", () => {
	it("returns 200 status", async () => {
		const response = GET();
		expect(response.status).toBe(200);
	});

	it("response body has status and timestamp", async () => {
		const response = GET();
		const body = (await response.json()) as { status: string; timestamp: number };

		expect(body).toHaveProperty("status");
		expect(body).toHaveProperty("timestamp");
		expect(body.status).toBe("ok");
		expect(typeof body.timestamp).toBe("number");
	});

	it("timestamp is recent (within last 5 seconds)", async () => {
		const before = Date.now();
		const response = GET();
		const body = (await response.json()) as { status: string; timestamp: number };
		const after = Date.now();

		expect(body.timestamp).toBeGreaterThanOrEqual(before);
		expect(body.timestamp).toBeLessThanOrEqual(after);
	});
});
