"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "@/lib/utils";

const popoverContentVariants = cva(
	"absolute z-50 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg",
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
			side: "bottom",
		},
	},
);

type PopoverProps = HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof popoverContentVariants> & {
		trigger: ReactNode;
		children: ReactNode;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	};

const Popover = forwardRef<HTMLDivElement, PopoverProps>(
	({ className, side, trigger, children, open: controlledOpen, onOpenChange, ...props }, ref) => {
		const [internalOpen, setInternalOpen] = useState(false);
		const containerRef = useRef<HTMLDivElement | null>(null);
		const isOpen = controlledOpen ?? internalOpen;

		const toggle = () => {
			const next = !isOpen;
			setInternalOpen(next);
			onOpenChange?.(next);
		};

		const close = () => {
			setInternalOpen(false);
			onOpenChange?.(false);
		};

		useEffect(() => {
			if (!isOpen) return;
			const handleClick = (e: MouseEvent) => {
				if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
					close();
				}
			};
			document.addEventListener("mousedown", handleClick);
			return () => document.removeEventListener("mousedown", handleClick);
		});

		return (
			<div
				ref={(node) => {
					containerRef.current = node;
					if (typeof ref === "function") ref(node);
					else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
				}}
				className={cn("relative inline-flex", className)}
				{...props}
			>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: wrapper delegates interaction to the trigger child */}
				<div onClick={toggle} onKeyDown={(e) => e.key === "Enter" && toggle()}>
					{trigger}
				</div>
				{isOpen && <div className={popoverContentVariants({ side })}>{children}</div>}
			</div>
		);
	},
);
Popover.displayName = "Popover";

export { Popover, popoverContentVariants };
export type { PopoverProps };
