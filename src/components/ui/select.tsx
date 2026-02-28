import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label?: string;
	error?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ className, label, error, id, children, ...props }, ref) => {
		const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

		return (
			<div className="flex flex-col gap-1.5">
				{label && (
					<label htmlFor={selectId} className="text-sm font-medium text-foreground">
						{label}
					</label>
				)}
				<div className="relative">
					<select
						ref={ref}
						id={selectId}
						className={cn(
							"flex h-10 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-8 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
							error && "border-destructive focus-visible:ring-destructive",
							className,
						)}
						aria-invalid={error ? true : undefined}
						aria-describedby={error && selectId ? `${selectId}-error` : undefined}
						{...props}
					>
						{children}
					</select>
					<svg
						className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</div>
				{error && (
					<p id={selectId ? `${selectId}-error` : undefined} className="text-sm text-destructive">
						{error}
					</p>
				)}
			</div>
		);
	},
);
Select.displayName = "Select";

export { Select };
export type { SelectProps };
