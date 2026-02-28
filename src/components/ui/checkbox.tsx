"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const checkboxVariants = cva(
	"peer h-4 w-4 shrink-0 appearance-none rounded-sm border border-input bg-transparent transition-colors checked:border-primary checked:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
	{
		variants: {
			variant: {
				default: "",
				error:
					"border-destructive checked:border-destructive checked:bg-destructive focus-visible:ring-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> &
	VariantProps<typeof checkboxVariants> & {
		label?: string;
	};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, variant, label, id, ...props }, ref) => {
		const checkboxId =
			id ?? (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);

		return (
			<div className="flex items-center gap-2">
				<div className="relative inline-flex items-center justify-center">
					<input
						ref={ref}
						id={checkboxId}
						type="checkbox"
						className={cn(checkboxVariants({ variant }), className)}
						{...props}
					/>
					<svg
						className="pointer-events-none absolute h-3 w-3 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</div>
				{label && (
					<label
						htmlFor={checkboxId}
						className="text-sm font-medium text-foreground cursor-pointer select-none"
					>
						{label}
					</label>
				)}
			</div>
		);
	},
);
Checkbox.displayName = "Checkbox";

export { Checkbox, checkboxVariants };
export type { CheckboxProps };
