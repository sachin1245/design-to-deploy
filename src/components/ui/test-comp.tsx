import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const testCompVariants = cva(
	"inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-all",
	{
		variants: {
			variant: {
				default: "border-border bg-secondary/50 text-foreground hover:bg-secondary",
				highlight: "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20",
				muted: "border-transparent bg-muted text-muted-foreground hover:text-foreground",
			},
			size: {
				sm: "px-3 py-1 text-xs",
				md: "px-4 py-2 text-sm",
				lg: "px-5 py-3 text-base",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

type TestCompProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof testCompVariants>;

const TestComp = forwardRef<HTMLDivElement, TestCompProps>(
	({ className, variant, size, ...props }, ref) => (
		<div ref={ref} className={cn(testCompVariants({ variant, size }), className)} {...props} />
	),
);
TestComp.displayName = "TestComp";

export { TestComp, testCompVariants };
export type { TestCompProps };
