import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export function GET() {
	logger.info({ route: "/api/health" }, "Health check requested");

	return NextResponse.json({
		status: "ok",
		timestamp: new Date().toISOString(),
	});
}
