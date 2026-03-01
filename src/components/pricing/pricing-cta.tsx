"use client";

import { useReducedMotion } from "motion/react";
import { MotionReveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PricingCtaProps = {
	className?: string;
};

export function PricingCta({ className }: PricingCtaProps) {
	useReducedMotion();

	return (
		<section className={cn("relative overflow-hidden bg-muted/40 py-24", className)}>
			{/* Decorative gradient */}
			<div
				className="pointer-events-none absolute inset-0 -z-10 opacity-30 dark:opacity-15"
				style={{
					background: "radial-gradient(ellipse at center, var(--primary) 0%, transparent 60%)",
				}}
				aria-hidden="true"
			/>

			<div className="mx-auto max-w-3xl px-6 text-center sm:px-8">
				<MotionReveal direction="up" spring="gentle">
					<h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
						Ready to get started?
					</h2>
					<p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
						Join thousands of teams already using our platform. Start free today and upgrade as you
						grow.
					</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
						<Button size="lg">Start Free Trial</Button>
						<Button variant="outline" size="lg">
							Talk to Sales
						</Button>
					</div>
				</MotionReveal>
			</div>
		</section>
	);
}
