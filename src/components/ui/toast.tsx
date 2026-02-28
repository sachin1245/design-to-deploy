import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const toastVariants = cva(
	"pointer-events-auto flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-lg",
	{
		variants: {
			variant: {
				default: "text-card-foreground",
				success: "border-emerald-500/30 bg-emerald-500/10 text-foreground",
				error: "border-destructive/30 bg-destructive/10 text-foreground",
				info: "border-primary/30 bg-primary/10 text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type ToastProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof toastVariants> & {
		icon?: ReactNode;
		onDismiss?: () => void;
	};

const Toast = forwardRef<HTMLDivElement, ToastProps>(
	({ className, variant, icon, onDismiss, children, ...props }, ref) => (
		// biome-ignore lint/a11y/useSemanticElements: role="status" with aria-live is the correct pattern for toast notifications
		<div
			ref={ref}
			role="status"
			aria-live="polite"
			className={cn(toastVariants({ variant }), className)}
			{...props}
		>
			{icon && <span className="shrink-0">{icon}</span>}
			<span className="flex-1">{children}</span>
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
						className="h-3.5 w-3.5"
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
Toast.displayName = "Toast";

export { Toast, toastVariants };
export type { ToastProps };
