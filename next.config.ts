import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
};

const analyzer = withBundleAnalyzer({
	enabled: process.env["ANALYZE"] === "true",
});

export default analyzer(nextConfig);
