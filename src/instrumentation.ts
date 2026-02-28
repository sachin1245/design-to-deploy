import * as Sentry from "@sentry/nextjs";

export async function register() {
	// biome-ignore lint/complexity/useLiteralKeys: noPropertyAccessFromIndexSignature requires bracket notation
	if (process.env["NEXT_RUNTIME"] === "nodejs") {
		await import("../sentry.server.config");
	}

	// biome-ignore lint/complexity/useLiteralKeys: noPropertyAccessFromIndexSignature requires bracket notation
	if (process.env["NEXT_RUNTIME"] === "edge") {
		await import("../sentry.edge.config");
	}
}

export const onRequestError = Sentry.captureRequestError;
