import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin", {
	variants: {
		size: {
			sm: "h-4 w-4",
			md: "h-6 w-6",
			lg: "h-8 w-8",
		},
		variant: {
			primary: "text-primary",
			muted: "text-muted-foreground",
		},
	},
	defaultVariants: {
		size: "md",
		variant: "primary",
	},
});

type SpinnerProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof spinnerVariants>;

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
	({ className, size, variant, ...props }, ref) => (
		// biome-ignore lint/a11y/useSemanticElements: role="status" is correct for a loading spinner; <output> is not semantically appropriate
		<div ref={ref} role="status" className={cn("inline-flex", className)} {...props}>
			<svg
				className={cn(spinnerVariants({ size, variant }))}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"
				/>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
			<span className="sr-only">Loading</span>
		</div>
	),
);
Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
export type { SpinnerProps };
