"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
		</svg>
	);
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	);
}

function MonitorIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
			<line x1="8" y1="21" x2="16" y2="21" />
			<line x1="12" y1="17" x2="12" y2="21" />
		</svg>
	);
}

const themes = ["light", "dark", "system"] as const;
const icons = { light: SunIcon, dark: MoonIcon, system: MonitorIcon };
const labels = { light: "Light", dark: "Dark", system: "System" };

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
	const { theme, setTheme } = useTheme();
	const mounted = useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);

	if (!mounted) {
		return <div className="h-10 w-10 rounded-full bg-secondary" aria-hidden="true" />;
	}

	const current = (theme ?? "system") as (typeof themes)[number];
	const nextIndex = (themes.indexOf(current) + 1) % themes.length;
	const next = themes[nextIndex] ?? "system";

	const Icon = icons[current];

	return (
		<button
			type="button"
			onClick={() => setTheme(next)}
			className={[
				"group relative inline-flex h-10 w-10 items-center justify-center",
				"rounded-full border border-border bg-card",
				"text-foreground transition-all duration-200",
				"hover:scale-110 hover:border-primary/40 hover:shadow-md",
				"active:scale-95",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			aria-label={`Theme: ${labels[current]}. Switch to ${labels[next]}.`}
		>
			<span key={current} className="animate-theme-icon">
				<Icon className="h-[18px] w-[18px]" />
			</span>
		</button>
	);
}
