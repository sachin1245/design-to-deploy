"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const sliderVariants = cva(
	"w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-secondary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:hover:shadow-md [&::-webkit-slider-thumb]:focus-visible:ring-2 [&::-webkit-slider-thumb]:focus-visible:ring-ring [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-secondary [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-sm",
	{
		variants: {
			size: {
				sm: "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:-mt-[5px] [&::-moz-range-track]:h-1 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5",
				md: "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:-mt-[6px] [&::-moz-range-track]:h-1.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:w-4.5",
				lg: "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-thumb]:h-5.5 [&::-webkit-slider-thumb]:w-5.5 [&::-webkit-slider-thumb]:-mt-[7px] [&::-moz-range-track]:h-2 [&::-moz-range-thumb]:h-5.5 [&::-moz-range-thumb]:w-5.5",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> &
	VariantProps<typeof sliderVariants>;

const Slider = forwardRef<HTMLInputElement, SliderProps>(({ className, size, ...props }, ref) => (
	<input ref={ref} type="range" className={cn(sliderVariants({ size }), className)} {...props} />
));
Slider.displayName = "Slider";

export { Slider, sliderVariants };
export type { SliderProps };
