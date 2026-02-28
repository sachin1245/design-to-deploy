import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const notificationDotVariants = cva("inline-block rounded-full", {
	variants: {
		size: {
			sm: "h-2 w-2",
			md: "h-2.5 w-2.5",
			lg: "h-3 w-3",
		},
		variant: {
			default: "bg-primary",
			success: "bg-emerald-500",
			warning: "bg-amber-500",
			error: "bg-destructive",
		},
	},
	defaultVariants: {
		size: "md",
		variant: "default",
	},
});

type NotificationDotProps = HTMLAttributes<HTMLSpanElement> &
	VariantProps<typeof notificationDotVariants> & {
		pulse?: boolean;
	};

const NotificationDot = forwardRef<HTMLSpanElement, NotificationDotProps>(
	({ className, size, variant, pulse = false, ...props }, ref) => (
		<span ref={ref} className={cn("relative inline-flex", className)} {...props}>
			{pulse && (
				<span
					aria-hidden="true"
					className={cn(
						"absolute inset-0 animate-ping rounded-full opacity-75",
						variant === "success" && "bg-emerald-500",
						variant === "warning" && "bg-amber-500",
						variant === "error" && "bg-destructive",
						(!variant || variant === "default") && "bg-primary",
					)}
				/>
			)}
			<span className={cn(notificationDotVariants({ size, variant }), "relative")} />
		</span>
	),
);
NotificationDot.displayName = "NotificationDot";

export { NotificationDot, notificationDotVariants };
export type { NotificationDotProps };
