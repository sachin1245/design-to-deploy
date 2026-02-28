import { forwardRef, type TextareaHTMLAttributes, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label?: string;
	error?: string;
	autoResize?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, label, error, autoResize = false, id, onChange, ...props }, ref) => {
		const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
		const internalRef = useRef<HTMLTextAreaElement | null>(null);

		const handleResize = useCallback(() => {
			const el = internalRef.current;
			if (el && autoResize) {
				el.style.height = "auto";
				el.style.height = `${el.scrollHeight}px`;
			}
		}, [autoResize]);

		useEffect(() => {
			handleResize();
		}, [handleResize]);

		return (
			<div className="flex flex-col gap-1.5">
				{label && (
					<label htmlFor={textareaId} className="text-sm font-medium text-foreground">
						{label}
					</label>
				)}
				<textarea
					ref={(node) => {
						internalRef.current = node;
						if (typeof ref === "function") ref(node);
						else if (ref)
							(ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
					}}
					id={textareaId}
					className={cn(
						"flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 resize-y",
						autoResize && "resize-none overflow-hidden",
						error && "border-destructive focus-visible:ring-destructive",
						className,
					)}
					aria-invalid={error ? true : undefined}
					aria-describedby={error && textareaId ? `${textareaId}-error` : undefined}
					onChange={(e) => {
						handleResize();
						onChange?.(e);
					}}
					{...props}
				/>
				{error && (
					<p
						id={textareaId ? `${textareaId}-error` : undefined}
						className="text-sm text-destructive"
					>
						{error}
					</p>
				)}
			</div>
		);
	},
);
Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
