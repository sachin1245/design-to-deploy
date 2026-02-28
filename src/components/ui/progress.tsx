import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const progressVariants = cva("w-full overflow-hidden rounded-full bg-secondary", {
	variants: {
		size: {
			sm: "h-1.5",
			md: "h-2.5",
			lg: "h-4",
		},
		variant: {
			primary: "",
			accent: "",
			destructive: "",
		},
	},
	defaultVariants: {
		size: "md",
		variant: "primary",
	},
});

const progressBarVariants = cva("h-full rounded-full transition-all duration-300 ease-out", {
	variants: {
		variant: {
			primary: "bg-primary",
			accent: "bg-accent",
			destructive: "bg-destructive",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

type ProgressProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof progressVariants> & {
		value?: number;
		max?: number;
	};

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
	({ className, size, variant, value = 0, max = 100, ...props }, ref) => {
		const percentage = Math.min(100, Math.max(0, (value / max) * 100));

		return (
			<div
				ref={ref}
				role="progressbar"
				aria-valuenow={value}
				aria-valuemin={0}
				aria-valuemax={max}
				className={cn(progressVariants({ size, variant }), className)}
				{...props}
			>
				<div className={progressBarVariants({ variant })} style={{ width: `${percentage}%` }} />
			</div>
		);
	},
);
Progress.displayName = "Progress";

export { Progress, progressVariants };
export type { ProgressProps };
