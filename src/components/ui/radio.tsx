"use client";

import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type InputHTMLAttributes,
	useContext,
} from "react";
import { cn } from "@/lib/utils";

type RadioGroupContextValue = {
	name: string | undefined;
	value: string | undefined;
	onChange: ((value: string) => void) | undefined;
};

const RadioGroupContext = createContext<RadioGroupContextValue>({
	name: undefined,
	value: undefined,
	onChange: undefined,
});

type RadioGroupProps = HTMLAttributes<HTMLDivElement> & {
	name?: string;
	value?: string;
	onValueChange?: (value: string) => void;
};

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
	({ className, name, value, onValueChange, ...props }, ref) => (
		<RadioGroupContext.Provider value={{ name, value, onChange: onValueChange }}>
			<div
				ref={ref}
				role="radiogroup"
				className={cn("flex flex-col gap-2", className)}
				{...props}
			/>
		</RadioGroupContext.Provider>
	),
);
RadioGroup.displayName = "RadioGroup";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> & {
	label?: string;
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
	({ className, label, id, value, name, checked, ...props }, ref) => {
		const group = useContext(RadioGroupContext);
		const radioId = id ?? (label ? `radio-${label.toLowerCase().replace(/\s+/g, "-")}` : undefined);
		const isChecked =
			checked ??
			(group.value !== undefined && value !== undefined ? group.value === value : undefined);

		return (
			<div className="flex items-center gap-2">
				<div className="relative inline-flex items-center justify-center">
					<input
						ref={ref}
						id={radioId}
						type="radio"
						name={name ?? group.name}
						value={value}
						checked={isChecked}
						onChange={() => group.onChange?.(value as string)}
						className={cn(
							"peer h-4 w-4 shrink-0 appearance-none rounded-full border border-input bg-transparent transition-colors checked:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
							className,
						)}
						{...props}
					/>
					<span
						className="pointer-events-none absolute h-2 w-2 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity"
						aria-hidden="true"
					/>
				</div>
				{label && (
					<label
						htmlFor={radioId}
						className="text-sm font-medium text-foreground cursor-pointer select-none"
					>
						{label}
					</label>
				)}
			</div>
		);
	},
);
Radio.displayName = "Radio";

export { Radio, RadioGroup };
export type { RadioProps, RadioGroupProps };
