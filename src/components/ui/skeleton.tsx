import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const skeletonVariants = cva("animate-pulse bg-muted", {
	variants: {
		variant: {
			text: "h-4 w-full rounded-md",
			circular: "rounded-full",
			rectangular: "rounded-lg",
		},
		size: {
			sm: "",
			md: "",
			lg: "",
		},
	},
	defaultVariants: {
		variant: "text",
		size: "md",
	},
	compoundVariants: [
		{ variant: "circular", size: "sm", className: "h-8 w-8" },
		{ variant: "circular", size: "md", className: "h-10 w-10" },
		{ variant: "circular", size: "lg", className: "h-12 w-12" },
		{ variant: "rectangular", size: "sm", className: "h-20 w-full" },
		{ variant: "rectangular", size: "md", className: "h-32 w-full" },
		{ variant: "rectangular", size: "lg", className: "h-48 w-full" },
	],
});

type SkeletonProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof skeletonVariants>;

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
	({ className, variant, size, ...props }, ref) => (
		<div
			ref={ref}
			aria-hidden="true"
			className={cn(skeletonVariants({ variant, size }), className)}
			{...props}
		/>
	),
);
Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
export type { SkeletonProps };
