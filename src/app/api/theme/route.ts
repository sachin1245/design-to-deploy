import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const THEME_COOKIE = "theme-preference";
const DEFAULT_THEME = "system";

export async function GET() {
	const cookieStore = await cookies();
	const theme = cookieStore.get(THEME_COOKIE)?.value ?? DEFAULT_THEME;

	return NextResponse.json({ theme });
}

export async function POST(request: Request) {
	const body = (await request.json()) as Record<string, unknown>;
	const theme = typeof body["theme"] === "string" ? body["theme"] : DEFAULT_THEME;

	const cookieStore = await cookies();
	cookieStore.set(THEME_COOKIE, theme, {
		httpOnly: true,
		secure: process.env["NODE_ENV"] === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 365, // 1 year
	});

	return NextResponse.json({ theme });
}
