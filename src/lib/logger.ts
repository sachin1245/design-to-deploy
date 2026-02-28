import pino from "pino";

// biome-ignore lint/complexity/useLiteralKeys: noPropertyAccessFromIndexSignature requires bracket notation
const isDev = process.env["NODE_ENV"] === "development";

export const logger = pino({
	// biome-ignore lint/complexity/useLiteralKeys: noPropertyAccessFromIndexSignature requires bracket notation
	level: process.env["LOG_LEVEL"] || "info",
	...(isDev && { transport: { target: "pino-pretty" } }),
});
