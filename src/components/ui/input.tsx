import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, label, error, id, type = "text", ...props }, ref) => {
		const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

		return (
			<div className="flex flex-col gap-1.5">
				{label && (
					<label htmlFor={inputId} className="text-sm font-medium text-foreground">
						{label}
					</label>
				)}
				<input
					ref={ref}
					id={inputId}
					type={type}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
						error && "border-destructive focus-visible:ring-destructive",
						className,
					)}
					aria-invalid={error ? true : undefined}
					aria-describedby={error && inputId ? `${inputId}-error` : undefined}
					{...props}
				/>
				{error && (
					<p id={inputId ? `${inputId}-error` : undefined} className="text-sm text-destructive">
						{error}
					</p>
				)}
			</div>
		);
	},
);
Input.displayName = "Input";

export { Input };
export type { InputProps };
