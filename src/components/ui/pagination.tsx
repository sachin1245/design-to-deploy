import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type PaginationProps = HTMLAttributes<HTMLElement> & {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	siblingCount?: number;
};

function getPageNumbers(current: number, total: number, siblings: number): (number | "...")[] {
	const pages: (number | "...")[] = [];
	const left = Math.max(1, current - siblings);
	const right = Math.min(total, current + siblings);

	if (left > 1) {
		pages.push(1);
		if (left > 2) pages.push("...");
	}

	for (let i = left; i <= right; i++) {
		pages.push(i);
	}

	if (right < total) {
		if (right < total - 1) pages.push("...");
		pages.push(total);
	}

	return pages;
}

const Pagination = forwardRef<HTMLElement, PaginationProps>(
	({ className, currentPage, totalPages, onPageChange, siblingCount = 1, ...props }, ref) => {
		const pages = getPageNumbers(currentPage, totalPages, siblingCount);

		return (
			<nav ref={ref} aria-label="Pagination" className={cn("", className)} {...props}>
				<ul className="flex items-center gap-1">
					<li>
						<button
							type="button"
							disabled={currentPage <= 1}
							onClick={() => onPageChange(currentPage - 1)}
							className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50 disabled:pointer-events-none"
							aria-label="Previous page"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-4 w-4"
								aria-hidden="true"
							>
								<path d="m15 18-6-6 6-6" />
							</svg>
						</button>
					</li>
					{pages.map((page, i) =>
						page === "..." ? (
							// biome-ignore lint/suspicious/noArrayIndexKey: ellipsis items have no stable identifier
							<li key={`ellipsis-${i}`}>
								<span className="inline-flex h-9 w-9 items-center justify-center text-sm text-muted-foreground">
									...
								</span>
							</li>
						) : (
							<li key={page}>
								<button
									type="button"
									onClick={() => onPageChange(page)}
									aria-current={page === currentPage ? "page" : undefined}
									className={cn(
										"inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
										page === currentPage
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:text-foreground hover:bg-secondary",
									)}
								>
									{page}
								</button>
							</li>
						),
					)}
					<li>
						<button
							type="button"
							disabled={currentPage >= totalPages}
							onClick={() => onPageChange(currentPage + 1)}
							className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors disabled:opacity-50 disabled:pointer-events-none"
							aria-label="Next page"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-4 w-4"
								aria-hidden="true"
							>
								<path d="m9 18 6-6-6-6" />
							</svg>
						</button>
					</li>
				</ul>
			</nav>
		);
	},
);
Pagination.displayName = "Pagination";

export { Pagination };
export type { PaginationProps };
