import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type NavItem = {
	label: string;
	href: string;
	active?: boolean;
};

type NavBarProps = HTMLAttributes<HTMLElement> & {
	items: NavItem[];
	brand?: string;
};

const NavBar = forwardRef<HTMLElement, NavBarProps>(
	({ className, items, brand, ...props }, ref) => (
		<nav
			ref={ref}
			className={cn("flex items-center gap-6 border-b border-border px-4 py-3", className)}
			{...props}
		>
			{brand && (
				<span className="text-base font-semibold text-foreground font-display">{brand}</span>
			)}
			<ul className="flex items-center gap-1">
				{items.map((item) => (
					<li key={item.label}>
						<a
							href={item.href}
							className={cn(
								"inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
								item.active
									? "bg-secondary text-foreground"
									: "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
							)}
							aria-current={item.active ? "page" : undefined}
						>
							{item.label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	),
);
NavBar.displayName = "NavBar";

export { NavBar };
export type { NavBarProps, NavItem };
