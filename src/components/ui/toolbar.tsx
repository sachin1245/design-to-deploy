import * as React from "react";
import { cn } from "@/lib/utils";

const Toolbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			role="toolbar"
			className={cn(
				"flex items-center gap-1 rounded-lg border border-border bg-card p-1",
				className,
			)}
			{...props}
		/>
	),
);
Toolbar.displayName = "Toolbar";

const ToolbarButton = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }
>(({ className, active, ...props }, ref) => (
	<button
		ref={ref}
		type="button"
		className={cn(
			"inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors hover:bg-secondary hover:text-foreground disabled:pointer-events-none disabled:opacity-50",
			active ? "bg-secondary text-foreground" : "text-muted-foreground",
			className,
		)}
		{...props}
	/>
));
ToolbarButton.displayName = "ToolbarButton";

const ToolbarSeparator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
	({ className, ...props }, ref) => (
		<hr ref={ref} className={cn("mx-0.5 h-5 w-px border-0 bg-border", className)} {...props} />
	),
);
ToolbarSeparator.displayName = "ToolbarSeparator";

export { Toolbar, ToolbarButton, ToolbarSeparator };
