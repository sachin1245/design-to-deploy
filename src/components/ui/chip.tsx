import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const chipVariants = cva(
	"inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors",
	{
		variants: {
			size: {
				sm: "h-6 px-2.5 text-xs",
				md: "h-7 px-3 text-xs",
			},
			variant: {
				default: "border-border bg-secondary text-secondary-foreground hover:bg-secondary/80",
				selected: "border-primary bg-primary/10 text-primary",
			},
		},
		defaultVariants: {
			size: "md",
			variant: "default",
		},
	},
);

type ChipProps = HTMLAttributes<HTMLSpanElement> &
	VariantProps<typeof chipVariants> & {
		onRemove?: () => void;
		selected?: boolean;
	};

const Chip = forwardRef<HTMLSpanElement, ChipProps>(
	({ className, size, variant, selected, onRemove, children, ...props }, ref) => (
		<span
			ref={ref}
			className={cn(chipVariants({ size, variant: selected ? "selected" : variant }), className)}
			{...props}
		>
			{children}
			{onRemove && (
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
					className="inline-flex shrink-0 items-center justify-center rounded-full hover:bg-foreground/10 transition-colors h-3.5 w-3.5"
					aria-label="Remove"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="h-2.5 w-2.5"
						aria-hidden="true"
					>
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
					</svg>
				</button>
			)}
		</span>
	),
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
export type { ChipProps };
