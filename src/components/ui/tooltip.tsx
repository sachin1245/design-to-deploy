"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

const tooltipContentVariants = cva(
	"absolute z-50 rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md pointer-events-none",
	{
		variants: {
			side: {
				top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
				bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
				left: "right-full top-1/2 -translate-y-1/2 mr-2",
				right: "left-full top-1/2 -translate-y-1/2 ml-2",
			},
		},
		defaultVariants: {
			side: "top",
		},
	},
);

type TooltipProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof tooltipContentVariants> & {
		content: ReactNode;
		children: ReactNode;
		delayMs?: number;
	};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
	({ className, side, content, children, delayMs = 200, ...props }, ref) => {
		const [open, setOpen] = useState(false);
		const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

		const handleOpen = () => {
			const id = setTimeout(() => setOpen(true), delayMs);
			setTimeoutId(id);
		};

		const handleClose = () => {
			if (timeoutId) clearTimeout(timeoutId);
			setOpen(false);
		};

		return (
			// biome-ignore lint/a11y/noStaticElementInteractions: tooltip wrapper needs mouse/focus events for show/hide behavior
			<div
				ref={ref}
				className={cn("relative inline-flex", className)}
				onMouseEnter={handleOpen}
				onMouseLeave={handleClose}
				onFocus={handleOpen}
				onBlur={handleClose}
				{...props}
			>
				{children}
				{open && (
					<span role="tooltip" className={tooltipContentVariants({ side })}>
						{content}
					</span>
				)}
			</div>
		);
	},
);
Tooltip.displayName = "Tooltip";

export { Tooltip, tooltipContentVariants };
export type { TooltipProps };
