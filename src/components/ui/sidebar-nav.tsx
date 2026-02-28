"use client";

import { forwardRef, type HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

type SidebarItem = {
	label: string;
	href: string;
	active?: boolean;
};

type SidebarSection = {
	title: string;
	items: SidebarItem[];
};

type SidebarNavProps = HTMLAttributes<HTMLElement> & {
	sections: SidebarSection[];
	collapsible?: boolean;
};

const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(
	({ className, sections, collapsible = false, ...props }, ref) => {
		const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

		const toggleSection = (title: string) => {
			if (!collapsible) return;
			setCollapsed((prev) => ({ ...prev, [title]: !prev[title] }));
		};

		return (
			<nav ref={ref} className={cn("flex flex-col gap-4 py-2", className)} {...props}>
				{sections.map((section) => (
					<div key={section.title}>
						<button
							type="button"
							onClick={() => toggleSection(section.title)}
							className={cn(
								"flex w-full items-center justify-between px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								collapsible && "cursor-pointer hover:text-foreground transition-colors",
								!collapsible && "cursor-default",
							)}
							aria-expanded={collapsible ? !collapsed[section.title] : undefined}
						>
							{section.title}
							{collapsible && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className={cn(
										"h-3.5 w-3.5 transition-transform",
										collapsed[section.title] && "-rotate-90",
									)}
									aria-hidden="true"
								>
									<path d="m6 9 6 6 6-6" />
								</svg>
							)}
						</button>
						{!collapsed[section.title] && (
							<ul className="mt-1 flex flex-col gap-0.5">
								{section.items.map((item) => (
									<li key={item.label}>
										<a
											href={item.href}
											className={cn(
												"block rounded-md px-3 py-1.5 text-sm transition-colors",
												item.active
													? "bg-secondary font-medium text-foreground"
													: "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
											)}
											aria-current={item.active ? "page" : undefined}
										>
											{item.label}
										</a>
									</li>
								))}
							</ul>
						)}
					</div>
				))}
			</nav>
		);
	},
);
SidebarNav.displayName = "SidebarNav";

export { SidebarNav };
export type { SidebarNavProps, SidebarSection, SidebarItem };
