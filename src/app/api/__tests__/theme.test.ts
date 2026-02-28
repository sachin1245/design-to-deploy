import { beforeEach, describe, expect, it, vi } from "vitest";

const cookieStore = new Map<string, string>();

vi.mock("next/headers", () => ({
	cookies: vi.fn().mockImplementation(() =>
		Promise.resolve({
			get: (name: string) => {
				const value = cookieStore.get(name);
				return value !== undefined ? { name, value } : undefined;
			},
			set: (name: string, value: string) => {
				cookieStore.set(name, value);
			},
		}),
	),
}));

// Import after mock setup
const { GET, POST } = await import("../theme/route");

describe("GET /api/theme", () => {
	beforeEach(() => {
		cookieStore.clear();
	});

	it("returns default theme 'system' when no cookie is set", async () => {
		const response = await GET();
		const body = (await response.json()) as { theme: string };

		expect(response.status).toBe(200);
		expect(body.theme).toBe("system");
	});
});

describe("POST /api/theme", () => {
	beforeEach(() => {
		cookieStore.clear();
	});

	it("sets theme preference", async () => {
		const request = new Request("http://localhost/api/theme", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ theme: "dark" }),
		});

		const response = await POST(request);
		const body = (await response.json()) as { theme: string };

		expect(response.status).toBe(200);
		expect(body.theme).toBe("dark");
	});
});

describe("GET after POST /api/theme", () => {
	beforeEach(() => {
		cookieStore.clear();
	});

	it("returns updated theme after POST", async () => {
		const postRequest = new Request("http://localhost/api/theme", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ theme: "light" }),
		});

		await POST(postRequest);

		const getResponse = await GET();
		const body = (await getResponse.json()) as { theme: string };

		expect(body.theme).toBe("light");
	});
});
