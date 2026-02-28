import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
	icon?: ReactNode;
	title: string;
	description?: string;
	action?: ReactNode;
};

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
	({ className, icon, title, description, action, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(
				"flex flex-col items-center justify-center gap-3 py-12 px-6 text-center",
				className,
			)}
			{...props}
		>
			{icon && (
				<span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
					{icon}
				</span>
			)}
			<div className="space-y-1">
				<h3 className="text-base font-semibold text-foreground">{title}</h3>
				{description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
			</div>
			{action && <div className="mt-2">{action}</div>}
		</div>
	),
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
export type { EmptyStateProps };
