"use client";

import { useReducedMotion } from "motion/react";
import { MotionReveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DeveloperCtaProps = {
	className?: string;
};

export function DeveloperCta({ className }: DeveloperCtaProps) {
	useReducedMotion();

	return (
		<section className={cn("py-24 sm:py-32", className)} aria-label="Call to action">
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				<div className="text-center">
					<MotionReveal direction="up" spring="bouncy">
						<Badge className="mb-6">v2.0 Beta</Badge>
					</MotionReveal>

					<MotionReveal direction="up" spring="bouncy" delay={0.1}>
						<h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
							Ready to build <span className="text-primary">something great</span>?
						</h2>
					</MotionReveal>

					<MotionReveal direction="up" spring="bouncy" delay={0.2}>
						<p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
							Get started in under 2 minutes. No credit card required. Free tier includes 10,000 API
							calls per month.
						</p>
					</MotionReveal>

					{/* Code teaser */}
					<MotionReveal direction="up" spring="default" delay={0.3}>
						<div className="mt-8 inline-block rounded-lg border border-border bg-[#0d0b14] px-6 py-3 font-mono text-sm text-muted-foreground">
							<span className="text-emerald-400">$</span> npx clarity init my-api
						</div>
					</MotionReveal>

					{/* CTAs */}
					<MotionReveal direction="up" spring="bouncy" delay={0.4}>
						<div className="mt-10 flex flex-wrap justify-center gap-4">
							<Button size="lg">Start Building Free</Button>
							<Button variant="outline" size="lg">
								Talk to Sales
							</Button>
						</div>
					</MotionReveal>
				</div>
			</div>
		</section>
	);
}
