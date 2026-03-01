"use client";

import { useReducedMotion } from "motion/react";
import { MotionReveal } from "@/components/motion";
import { Divider } from "@/components/ui/divider";
import { cn } from "@/lib/utils";

export type FeatureComparisonProps = {
	className?: string;
};

type FeatureRow = {
	feature: string;
	starter: boolean | string;
	pro: boolean | string;
	enterprise: boolean | string;
};

const sections: { title: string; rows: FeatureRow[] }[] = [
	{
		title: "Core",
		rows: [
			{ feature: "Projects", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
			{ feature: "Storage", starter: "1 GB", pro: "100 GB", enterprise: "Unlimited" },
			{ feature: "API access", starter: true, pro: true, enterprise: true },
			{ feature: "Webhooks", starter: false, pro: true, enterprise: true },
		],
	},
	{
		title: "Collaboration",
		rows: [
			{ feature: "Team members", starter: "1", pro: "10", enterprise: "Unlimited" },
			{ feature: "Guest access", starter: false, pro: true, enterprise: true },
			{ feature: "Role-based permissions", starter: false, pro: false, enterprise: true },
		],
	},
	{
		title: "Support",
		rows: [
			{ feature: "Community support", starter: true, pro: true, enterprise: true },
			{ feature: "Priority email", starter: false, pro: true, enterprise: true },
			{ feature: "Dedicated account manager", starter: false, pro: false, enterprise: true },
			{ feature: "SLA", starter: false, pro: false, enterprise: true },
		],
	},
];

function CellValue({ value }: { value: boolean | string }) {
	if (typeof value === "string") {
		return <span className="text-sm font-medium text-foreground">{value}</span>;
	}
	if (value) {
		return (
			<svg
				className="h-5 w-5 text-primary"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				strokeWidth={2.5}
				aria-label="Included"
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
			</svg>
		);
	}
	return (
		<svg
			className="h-5 w-5 text-muted-foreground/40"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
			aria-label="Not included"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
		</svg>
	);
}

export function FeatureComparison({ className }: FeatureComparisonProps) {
	const shouldReduce = useReducedMotion();

	return (
		<section className={cn("mx-auto w-full max-w-5xl px-6 py-20 sm:px-8", className)}>
			<MotionReveal direction="up" spring="gentle">
				<h2 className="mb-4 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
					Compare plans
				</h2>
				<p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
					See which plan is right for your team with a detailed feature breakdown.
				</p>
			</MotionReveal>

			{/* Table header */}
			<div className="mb-2 grid grid-cols-4 gap-4 px-4">
				<div />
				<div className="text-center text-sm font-semibold text-foreground">Starter</div>
				<div className="text-center text-sm font-semibold text-primary">Pro</div>
				<div className="text-center text-sm font-semibold text-foreground">Enterprise</div>
			</div>

			{sections.map((section, sIdx) => (
				<div key={section.title}>
					{sIdx > 0 && <Divider className="my-6" />}
					<MotionReveal direction="up" spring="gentle" delay={shouldReduce ? 0 : sIdx * 0.05}>
						<h3 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
							{section.title}
						</h3>
					</MotionReveal>
					{section.rows.map((row, rIdx) => (
						<MotionReveal
							key={row.feature}
							direction="up"
							spring="gentle"
							delay={shouldReduce ? 0 : (sIdx * 4 + rIdx) * 0.03}
						>
							<div
								className={cn(
									"grid grid-cols-4 gap-4 rounded-lg px-4 py-3",
									rIdx % 2 === 0 ? "bg-muted/30" : "bg-transparent",
								)}
							>
								<div className="text-sm text-foreground">{row.feature}</div>
								<div className="flex items-center justify-center">
									<CellValue value={row.starter} />
								</div>
								<div className="flex items-center justify-center">
									<CellValue value={row.pro} />
								</div>
								<div className="flex items-center justify-center">
									<CellValue value={row.enterprise} />
								</div>
							</div>
						</MotionReveal>
					))}
				</div>
			))}
		</section>
	);
}
