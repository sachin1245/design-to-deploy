"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type LogoMarqueeProps = {
	className?: string;
};

const companies = [
	"Vercel",
	"Stripe",
	"Linear",
	"Notion",
	"Figma",
	"Shopify",
	"Supabase",
	"Railway",
];

export function LogoMarquee({ className }: LogoMarqueeProps) {
	const shouldReduce = useReducedMotion();

	return (
		<section className={cn("border-y border-border bg-muted/30 py-8", className)}>
			<p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
				Trusted by teams at
			</p>
			<div className="relative overflow-hidden" role="marquee" aria-label="Companies that trust us">
				{/* Fade edges */}
				<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
				<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

				<div className={cn("flex gap-12 whitespace-nowrap", !shouldReduce && "animate-marquee")}>
					{/* Primary set */}
					{companies.map((name) => (
						<span
							key={name}
							className="inline-flex items-center font-display text-lg font-semibold text-muted-foreground/60 select-none sm:text-xl"
						>
							{name}
						</span>
					))}
					{/* Duplicate for seamless loop */}
					<div aria-hidden="true" className="flex gap-12">
						{companies.map((name) => (
							<span
								key={`dup-${name}`}
								className="inline-flex items-center font-display text-lg font-semibold text-muted-foreground/60 select-none sm:text-xl"
							>
								{name}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
