"use client";

import { motion, useReducedMotion } from "motion/react";
import { MotionItem, MotionStagger } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pathDraw, reducedMotionTransition, springs } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FEATURES = [
	{
		title: "Lightning Fast",
		description: "Sub-150ms response times with edge-first architecture and smart caching layers.",
		category: "Performance",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-8 w-8"
				aria-hidden="true"
			>
				<motion.path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" variants={pathDraw} />
			</svg>
		),
	},
	{
		title: "Type Safety",
		description: "End-to-end TypeScript with auto-generated types from your schema definitions.",
		category: "Developer Experience",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-8 w-8"
				aria-hidden="true"
			>
				<motion.path d="M7 8l-4 4 4 4" variants={pathDraw} />
				<motion.path d="M17 8l4 4-4 4" variants={pathDraw} />
				<motion.line x1="14" y1="4" x2="10" y2="20" variants={pathDraw} />
			</svg>
		),
	},
	{
		title: "Auto Scaling",
		description:
			"Handles traffic spikes gracefully with automatic horizontal scaling and load balancing.",
		category: "Infrastructure",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-8 w-8"
				aria-hidden="true"
			>
				<motion.path d="M22 12h-4l-3 9L9 3l-3 9H2" variants={pathDraw} />
			</svg>
		),
	},
	{
		title: "Real-time Logs",
		description:
			"Stream structured logs and traces in real-time with built-in observability tooling.",
		category: "Monitoring",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-8 w-8"
				aria-hidden="true"
			>
				<motion.path d="M2 12h4" variants={pathDraw} />
				<motion.path d="M9 12h6" variants={pathDraw} />
				<motion.path d="M18 12h4" variants={pathDraw} />
				<motion.path d="M2 6h20" variants={pathDraw} />
				<motion.path d="M2 18h20" variants={pathDraw} />
			</svg>
		),
	},
	{
		title: "Auth Built In",
		description:
			"JWT, API keys, and OAuth out of the box. Role-based access control with zero config.",
		category: "Security",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-8 w-8"
				aria-hidden="true"
			>
				<motion.path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" variants={pathDraw} />
				<motion.path d="M9 12l2 2 4-4" variants={pathDraw} />
			</svg>
		),
	},
	{
		title: "One-Click Deploy",
		description: "Push to deploy with preview environments, rollbacks, and zero-downtime releases.",
		category: "Deployment",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="h-8 w-8"
				aria-hidden="true"
			>
				<motion.path
					d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
					variants={pathDraw}
				/>
				<motion.path d="M12 12v9" variants={pathDraw} />
				<motion.path d="M8 17l4-5 4 5" variants={pathDraw} />
			</svg>
		),
	},
];

type ApiFeaturesProps = {
	className?: string;
};

export function ApiFeatures({ className }: ApiFeaturesProps) {
	const shouldReduce = useReducedMotion();
	const iconTransition = shouldReduce
		? reducedMotionTransition
		: { ...springs.gentle, duration: 1.2 };

	return (
		<section className={cn("py-24 sm:py-32", className)} aria-label="API features">
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				<div className="text-center mb-16">
					<h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Everything you need to <span className="text-primary">build and scale</span>
					</h2>
					<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
						Production-grade features out of the box. No glue code, no third-party integrations, no
						compromises.
					</p>
				</div>

				<MotionStagger stagger={0.12} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature) => (
						<MotionItem key={feature.title}>
							<Card className="h-full transition-shadow hover:shadow-lg">
								<CardHeader>
									<motion.div
										className="text-primary mb-3"
										initial="hidden"
										whileInView="visible"
										viewport={{ once: true, amount: 0.5 }}
										transition={iconTransition}
									>
										{feature.icon}
									</motion.div>
									<div className="flex items-center gap-2">
										<CardTitle>{feature.title}</CardTitle>
									</div>
									<Badge variant="info" className="w-fit text-xs">
										{feature.category}
									</Badge>
								</CardHeader>
								<CardContent>
									<CardDescription>{feature.description}</CardDescription>
								</CardContent>
							</Card>
						</MotionItem>
					))}
				</MotionStagger>
			</div>
		</section>
	);
}
