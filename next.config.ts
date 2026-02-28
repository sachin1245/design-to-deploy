import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	serverExternalPackages: ["pino", "pino-pretty"],
};

const analyzer = withBundleAnalyzer({
	// biome-ignore lint/complexity/useLiteralKeys: noPropertyAccessFromIndexSignature requires bracket notation
	enabled: process.env["ANALYZE"] === "true",
});

export default withSentryConfig(analyzer(nextConfig), {
	// For all available options, see:
	// https://www.npmjs.com/package/@sentry/webpack-plugin#options

	// biome-ignore lint/complexity/useLiteralKeys: noPropertyAccessFromIndexSignature requires bracket notation
	org: process.env["SENTRY_ORG"] ?? "",
	// biome-ignore lint/complexity/useLiteralKeys: noPropertyAccessFromIndexSignature requires bracket notation
	project: process.env["SENTRY_PROJECT"] ?? "",

	// Only print logs for uploading source maps in CI
	// biome-ignore lint/complexity/useLiteralKeys: noPropertyAccessFromIndexSignature requires bracket notation
	silent: !process.env["CI"],

	// Upload a larger set of source maps for prettier stack traces (increases build time)
	widenClientFileUpload: true,

	// Automatically tree-shake Sentry logger statements to reduce bundle size
	bundleSizeOptimizations: {
		excludeDebugStatements: true,
	},
});
