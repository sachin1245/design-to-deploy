"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { MotionItem, MotionStagger } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Toggle } from "@/components/ui/toggle";
import { hoverLift, scaleInUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type PricingCardsProps = {
	className?: string;
};

type Tier = {
	name: string;
	monthlyPrice: string;
	yearlyPrice: string;
	description: string;
	features: string[];
	cta: string;
	popular?: boolean;
};

const tiers: Tier[] = [
	{
		name: "Starter",
		monthlyPrice: "$0",
		yearlyPrice: "$0",
		description: "For individuals and small projects getting started.",
		features: ["5 projects", "1 GB storage", "Community support", "Basic analytics"],
		cta: "Get Started Free",
	},
	{
		name: "Pro",
		monthlyPrice: "$29",
		yearlyPrice: "$290",
		description: "For growing teams that need more power and flexibility.",
		features: [
			"Unlimited projects",
			"100 GB storage",
			"Priority support",
			"Advanced analytics",
			"Custom domains",
			"Team collaboration",
		],
		cta: "Start Free Trial",
		popular: true,
	},
	{
		name: "Enterprise",
		monthlyPrice: "Custom",
		yearlyPrice: "Custom",
		description: "For organizations with advanced security and compliance needs.",
		features: [
			"Everything in Pro",
			"Unlimited storage",
			"24/7 dedicated support",
			"SSO & SAML",
			"Audit logs",
			"Custom contracts",
		],
		cta: "Contact Sales",
	},
];

export function PricingCards({ className }: PricingCardsProps) {
	const shouldReduce = useReducedMotion();
	const [isYearly, setIsYearly] = useState(false);

	const interactionProps = shouldReduce ? {} : hoverLift;

	return (
		<section className={cn("mx-auto w-full max-w-6xl px-6 py-20 sm:px-8", className)}>
			{/* Billing toggle */}
			<div className="mb-12 flex items-center justify-center gap-3">
				<span
					className={cn(
						"text-sm font-medium transition-colors",
						!isYearly ? "text-foreground" : "text-muted-foreground",
					)}
				>
					Monthly
				</span>
				<Toggle
					checked={isYearly}
					onCheckedChange={setIsYearly}
					aria-label="Toggle yearly billing"
				/>
				<span
					className={cn(
						"text-sm font-medium transition-colors",
						isYearly ? "text-foreground" : "text-muted-foreground",
					)}
				>
					Yearly
				</span>
				{isYearly && (
					<Badge variant="success" className="ml-1">
						Save 17%
					</Badge>
				)}
			</div>

			{/* Cards */}
			<MotionStagger stagger={0.15} className="grid gap-8 md:grid-cols-3">
				{tiers.map((tier) => (
					<MotionItem key={tier.name} variants={scaleInUp}>
						<motion.div {...interactionProps}>
							<Card
								className={cn(
									"relative flex h-full flex-col",
									tier.popular && "border-primary shadow-lg ring-1 ring-primary/20",
								)}
							>
								{tier.popular && (
									<Badge variant="info" className="absolute -top-3 left-1/2 -translate-x-1/2">
										Popular
									</Badge>
								)}
								<CardHeader>
									<CardTitle>{tier.name}</CardTitle>
									<div className="mt-3">
										<span className="font-display text-4xl font-bold text-foreground">
											{isYearly ? tier.yearlyPrice : tier.monthlyPrice}
										</span>
										{tier.monthlyPrice !== "Custom" && (
											<span className="text-sm text-muted-foreground">
												/{isYearly ? "year" : "month"}
											</span>
										)}
									</div>
									<p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
								</CardHeader>
								<CardContent className="flex-1">
									<ul className="space-y-3">
										{tier.features.map((feature) => (
											<li key={feature} className="flex items-start gap-2 text-sm text-foreground">
												<svg
													className="mt-0.5 h-4 w-4 shrink-0 text-primary"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth={2.5}
													aria-hidden="true"
												>
													<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
												</svg>
												{feature}
											</li>
										))}
									</ul>
									<div className="mt-4 flex flex-wrap gap-1.5">
										{tier.features.slice(0, 3).map((feature) => (
											<Chip key={feature} size="sm">
												{feature}
											</Chip>
										))}
									</div>
								</CardContent>
								<CardFooter>
									<Button
										variant={tier.popular ? "primary" : "outline"}
										className="w-full"
										size="lg"
									>
										{tier.cta}
									</Button>
								</CardFooter>
							</Card>
						</motion.div>
					</MotionItem>
				))}
			</MotionStagger>
		</section>
	);
}
