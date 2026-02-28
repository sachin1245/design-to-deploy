import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
	label: string;
	href?: string;
};

type BreadcrumbProps = HTMLAttributes<HTMLElement> & {
	items: BreadcrumbItem[];
	separator?: ReactNode;
};

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
	({ className, items, separator, ...props }, ref) => (
		<nav ref={ref} aria-label="Breadcrumb" className={cn("", className)} {...props}>
			<ol className="flex items-center gap-1.5 text-sm">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					return (
						<li key={item.label} className="inline-flex items-center gap-1.5">
							{index > 0 && (
								<span className="text-muted-foreground" aria-hidden="true">
									{separator ?? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="h-3.5 w-3.5"
											aria-hidden="true"
										>
											<path d="m9 18 6-6-6-6" />
										</svg>
									)}
								</span>
							)}
							{isLast || !item.href ? (
								<span
									className={cn(isLast ? "font-medium text-foreground" : "text-muted-foreground")}
									aria-current={isLast ? "page" : undefined}
								>
									{item.label}
								</span>
							) : (
								<a
									href={item.href}
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									{item.label}
								</a>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	),
);
Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };
export type { BreadcrumbProps, BreadcrumbItem };
