import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { DM_Serif_Display, Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import { DesignSystemProvider } from "@/components/design-system-provider";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
	variable: "--font-space-grotesk",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
	variable: "--font-dm-serif-display",
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "design-to-deploy",
	description: "From pixel to production.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const nonce = (await headers()).get("x-nonce") ?? undefined;

	// Inline script to prevent FOUC — reads localStorage before paint
	const dsScript = `(function(){try{var d=localStorage.getItem('design-system');if(d)document.documentElement.setAttribute('data-design-system',d)}catch(e){}})()`;

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: FOUC prevention requires inline script before paint */}
				<script dangerouslySetInnerHTML={{ __html: dsScript }} {...(nonce ? { nonce } : {})} />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${dmSerifDisplay.variable} antialiased`}
			>
				<DesignSystemProvider>
					<ThemeProvider {...(nonce ? { nonce } : {})}>{children}</ThemeProvider>
				</DesignSystemProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
