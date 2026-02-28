"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes, type ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

const sheetContentVariants = cva(
	"fixed z-50 flex flex-col bg-card shadow-xl transition-transform duration-300 ease-out",
	{
		variants: {
			side: {
				right: "inset-y-0 right-0 w-full max-w-sm border-l border-border",
				left: "inset-y-0 left-0 w-full max-w-sm border-r border-border",
			},
		},
		defaultVariants: {
			side: "right",
		},
	},
);

type SheetProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof sheetContentVariants> & {
		open: boolean;
		onClose: () => void;
		title?: string;
		children: ReactNode;
	};

const Sheet = forwardRef<HTMLDivElement, SheetProps>(
	({ className, side, open, onClose, title, children, ...props }, ref) => {
		useEffect(() => {
			if (!open) return;
			const handleEsc = (e: KeyboardEvent) => {
				if (e.key === "Escape") onClose();
			};
			document.addEventListener("keydown", handleEsc);
			return () => document.removeEventListener("keydown", handleEsc);
		}, [open, onClose]);

		if (!open) return null;

		return (
			<>
				<div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} aria-hidden="true" />
				<div
					ref={ref}
					role="dialog"
					aria-modal="true"
					aria-label={title}
					className={cn(sheetContentVariants({ side }), className)}
					{...props}
				>
					<div className="flex items-center justify-between border-b border-border px-4 py-3">
						{title && <h2 className="text-base font-semibold text-foreground">{title}</h2>}
						<button
							type="button"
							onClick={onClose}
							className="rounded-sm p-1 text-muted-foreground hover:text-foreground transition-colors ml-auto"
							aria-label="Close"
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
					</div>
					<div className="flex-1 overflow-auto p-4">{children}</div>
				</div>
			</>
		);
	},
);
Sheet.displayName = "Sheet";

export { Sheet, sheetContentVariants };
export type { SheetProps };
