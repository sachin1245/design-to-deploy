"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
	"relative inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
	{
		variants: {
			size: {
				sm: "h-5 w-9",
				md: "h-6 w-11",
				lg: "h-7 w-[3.25rem]",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

const toggleThumbVariants = cva(
	"pointer-events-none block rounded-full bg-white shadow-sm transition-transform",
	{
		variants: {
			size: {
				sm: "h-3.5 w-3.5",
				md: "h-4.5 w-4.5",
				lg: "h-5.5 w-5.5",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

type ToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> &
	VariantProps<typeof toggleVariants> & {
		checked?: boolean;
		onCheckedChange?: (checked: boolean) => void;
	};

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
	({ className, size, checked = false, onCheckedChange, ...props }, ref) => {
		const translateX = {
			sm: checked ? "translate-x-4" : "translate-x-0.5",
			md: checked ? "translate-x-5" : "translate-x-0.5",
			lg: checked ? "translate-x-6" : "translate-x-0.5",
		};

		return (
			<button
				ref={ref}
				type="button"
				role="switch"
				aria-checked={checked}
				className={cn(toggleVariants({ size }), checked ? "bg-primary" : "bg-input", className)}
				onClick={() => onCheckedChange?.(!checked)}
				{...props}
			>
				<span className={cn(toggleThumbVariants({ size }), translateX[size ?? "md"])} />
			</button>
		);
	},
);
Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
export type { ToggleProps };
