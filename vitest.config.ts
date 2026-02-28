import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", "tests/e2e", "tests/visual"],
    coverage: {
      provider: "v8",
      include: [
        "src/components/ui/button.tsx",
        "src/components/ui/input.tsx",
        "src/components/ui/badge.tsx",
        "src/lib/utils.ts",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
      },
    },
  },
});
