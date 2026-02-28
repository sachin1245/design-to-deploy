import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const dividerVariants = cva("shrink-0 bg-border", {
	variants: {
		orientation: {
			horizontal: "h-px w-full",
			vertical: "w-px h-full",
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

type DividerProps = HTMLAttributes<HTMLHRElement> &
	VariantProps<typeof dividerVariants> & {
		label?: string;
	};

const Divider = forwardRef<HTMLHRElement, DividerProps>(
	({ className, orientation = "horizontal", label, ...props }, ref) => {
		if (label && orientation === "horizontal") {
			return (
				<div className={cn("flex w-full items-center gap-3", className)}>
					<hr ref={ref} className="h-px flex-1 border-0 bg-border" {...props} />
					<span className="text-xs font-medium text-muted-foreground">{label}</span>
					<span className="h-px flex-1 bg-border" aria-hidden="true" />
				</div>
			);
		}

		return (
			<hr
				ref={ref}
				className={cn("border-0", dividerVariants({ orientation }), className)}
				{...props}
			/>
		);
	},
);
Divider.displayName = "Divider";

export { Divider, dividerVariants };
export type { DividerProps };
