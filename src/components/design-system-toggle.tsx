"use client";

import { useSyncExternalStore } from "react";
import { type DesignSystem, useDesignSystem } from "@/components/design-system-provider";
import { cn } from "@/lib/utils";

const systems: { id: DesignSystem; label: string; icon: React.ReactNode }[] = [
	{
		id: "default",
		label: "Default",
		icon: (
			<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
				<path d="M6 0L7.8 4.2L12 6L7.8 7.8L6 12L4.2 7.8L0 6L4.2 4.2Z" />
			</svg>
		),
	},
	{
		id: "area",
		label: "Area",
		icon: (
			<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
				<path d="M6.5 1C6.5 1 8 4 8.5 6C9 8 8 10 6 11C4 10 3 8 3.5 6C4 4 5.5 1 6.5 1Z" />
			</svg>
		),
	},
];

const emptySubscribe = () => () => {};

export function DesignSystemToggle({ className }: { className?: string }) {
	const { designSystem, setDesignSystem } = useDesignSystem();
	const mounted = useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);

	if (!mounted) {
		return (
			<div
				className={cn("h-9 w-[152px] rounded-full bg-secondary", className)}
				aria-hidden="true"
			/>
		);
	}

	const activeIndex = systems.findIndex((s) => s.id === designSystem);

	return (
		<fieldset
			aria-label="Design system"
			className={cn(
				"relative inline-flex h-9 items-center rounded-full border border-border bg-muted/50 p-0.5",
				"m-0 min-w-0 appearance-none",
				className,
			)}
		>
			<legend className="sr-only">Design system</legend>
			{/* Sliding active indicator */}
			<div
				className="absolute top-0.5 left-0.5 h-[calc(100%-4px)] w-[calc(50%-2px)] rounded-full bg-primary shadow-sm transition-transform duration-200"
				style={{
					transform: `translateX(${activeIndex * 100}%)`,
					transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
				}}
			/>

			{systems.map((system) => {
				const isActive = designSystem === system.id;
				return (
					<button
						key={system.id}
						type="button"
						aria-pressed={isActive}
						onClick={() => setDesignSystem(system.id)}
						className={cn(
							"relative z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
							isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
						)}
					>
						{system.icon}
						{system.label}
					</button>
				);
			})}
		</fieldset>
	);
}
