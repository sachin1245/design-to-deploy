import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const alertVariants = cva("relative flex w-full gap-3 rounded-lg border p-4 text-sm", {
	variants: {
		variant: {
			info: "border-primary/20 bg-primary/5 text-foreground [&>svg]:text-primary",
			success:
				"border-emerald-500/20 bg-emerald-500/5 text-foreground [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400",
			warning:
				"border-amber-500/20 bg-amber-500/5 text-foreground [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400",
			error: "border-destructive/20 bg-destructive/5 text-foreground [&>svg]:text-destructive",
		},
	},
	defaultVariants: {
		variant: "info",
	},
});

type AlertProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof alertVariants> & {
		title?: string;
		icon?: ReactNode;
		onDismiss?: () => void;
	};

const Alert = forwardRef<HTMLDivElement, AlertProps>(
	({ className, variant, title, icon, onDismiss, children, ...props }, ref) => (
		<div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
			{icon && <span className="shrink-0 mt-0.5">{icon}</span>}
			<div className="flex-1 space-y-1">
				{title && <p className="font-medium leading-none">{title}</p>}
				{children && <div className="text-sm text-muted-foreground">{children}</div>}
			</div>
			{onDismiss && (
				<button
					type="button"
					onClick={onDismiss}
					className="shrink-0 rounded-sm p-0.5 text-muted-foreground hover:text-foreground transition-colors"
					aria-label="Dismiss"
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
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
			)}
		</div>
	),
);
Alert.displayName = "Alert";

export { Alert, alertVariants };
export type { AlertProps };
