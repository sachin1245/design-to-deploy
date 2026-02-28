import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
	label?: string;
	error?: string;
};

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
	({ className, label, error, id, ...props }, ref) => {
		const pickerId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

		return (
			<div className="flex flex-col gap-1.5">
				{label && (
					<label htmlFor={pickerId} className="text-sm font-medium text-foreground">
						{label}
					</label>
				)}
				<input
					ref={ref}
					id={pickerId}
					type="date"
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
						error && "border-destructive focus-visible:ring-destructive",
						className,
					)}
					aria-invalid={error ? true : undefined}
					aria-describedby={error && pickerId ? `${pickerId}-error` : undefined}
					{...props}
				/>
				{error && (
					<p id={pickerId ? `${pickerId}-error` : undefined} className="text-sm text-destructive">
						{error}
					</p>
				)}
			</div>
		);
	},
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
export type { DatePickerProps };
