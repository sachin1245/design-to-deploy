"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Dashboard", href: "/dashboard" },
	{ label: "Showcase", href: "/showcase" },
	{ label: "Docs", href: "/docs" },
];

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<line x1="4" y1="6" x2="20" y2="6" />
			<line x1="4" y1="12" x2="20" y2="12" />
			<line x1="4" y1="18" x2="20" y2="18" />
		</svg>
	);
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	);
}

export function MobileNav() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	const prevPathname = useRef(pathname);

	// Close menu on route change
	useEffect(() => {
		if (prevPathname.current !== pathname) {
			prevPathname.current = pathname;
			setOpen(false);
		}
	});

	// Prevent body scroll when menu is open
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<div className="md:hidden">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className={cn(
					"relative z-50 inline-flex h-10 w-10 items-center justify-center",
					"rounded-md text-foreground transition-colors",
					"hover:bg-secondary",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				)}
				aria-label={open ? "Close menu" : "Open menu"}
				aria-expanded={open}
			>
				{open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
			</button>

			{/* Overlay */}
			{open && (
				<div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
					<nav
						aria-label="Mobile navigation"
						className="flex h-full flex-col items-center justify-center gap-2"
					>
						{navItems.map((item) => {
							const isActive =
								item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										"rounded-lg px-8 py-3 text-xl font-medium transition-colors",
										isActive
											? "bg-secondary text-foreground"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{item.label}
								</Link>
							);
						})}
					</nav>
				</div>
			)}
		</div>
	);
}
