"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Dashboard", href: "/dashboard" },
	{ label: "Showcase", href: "/showcase" },
	{ label: "Docs", href: "/docs" },
];

export function NavLinks() {
	const pathname = usePathname();

	return (
		<ul className="hidden items-center gap-1 md:flex">
			{navItems.map((item) => {
				const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
				return (
					<li key={item.href}>
						<Link
							href={item.href}
							className={cn(
								"inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
								isActive
									? "bg-secondary text-foreground"
									: "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
							)}
							aria-current={isActive ? "page" : undefined}
						>
							{item.label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
