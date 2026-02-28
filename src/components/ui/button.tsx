import { cva, type VariantProps } from "class-variance-authority";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70",
				outline:
					"border border-input bg-transparent text-foreground hover:bg-secondary hover:text-secondary-foreground active:bg-secondary/80",
				ghost:
					"text-foreground hover:bg-secondary hover:text-secondary-foreground active:bg-secondary/80",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
			},
			size: {
				sm: "h-8 px-3 text-xs rounded-sm",
				md: "h-10 px-4 text-sm",
				lg: "h-12 px-6 text-base rounded-lg",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "md",
		},
	},
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => (
		<button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
	),
);
Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
