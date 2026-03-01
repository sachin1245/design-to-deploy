"use client";

import {
	animate,
	motion,
	useInView,
	useMotionValue,
	useReducedMotion,
	useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { Chip } from "@/components/ui/chip";
import { cn } from "@/lib/utils";

type StatItem = {
	value: number;
	suffix: string;
	label: string;
	category: string;
};

const STATS: StatItem[] = [
	{ value: 99.9, suffix: "%", label: "Uptime SLA", category: "Reliability" },
	{ value: 150, suffix: "ms", label: "Avg Latency", category: "Speed" },
	{ value: 10, suffix: "M+", label: "API Calls / Day", category: "Scale" },
	{ value: 50, suffix: "K+", label: "Developers", category: "Community" },
];

function AnimatedCounter({
	value,
	suffix,
	shouldReduce,
}: {
	value: number;
	suffix: string;
	shouldReduce: boolean;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.5 });
	const motionValue = useMotionValue(0);
	const rounded = useTransform(motionValue, (v: number) => {
		// For decimal values like 99.9, show one decimal place
		if (value % 1 !== 0) {
			return v.toFixed(1);
		}
		return Math.round(v).toString();
	});

	useEffect(() => {
		if (shouldReduce) {
			motionValue.set(value);
			return;
		}

		if (isInView) {
			const controls = animate(motionValue, value, {
				duration: 2,
				ease: "easeOut",
			});
			return () => controls.stop();
		}
	}, [isInView, value, motionValue, shouldReduce]);

	return (
		<span ref={ref} className="font-display text-4xl font-bold text-foreground sm:text-5xl">
			<motion.span>{rounded}</motion.span>
			<span className="text-primary">{suffix}</span>
		</span>
	);
}

type StatsCounterProps = {
	className?: string;
};

export function StatsCounter({ className }: StatsCounterProps) {
	const shouldReduce = useReducedMotion() ?? false;

	return (
		<section
			className={cn("py-24 sm:py-32 border-y border-border", className)}
			aria-label="Platform statistics"
		>
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					{STATS.map((stat) => (
						<div key={stat.label} className="text-center">
							<AnimatedCounter
								value={stat.value}
								suffix={stat.suffix}
								shouldReduce={shouldReduce}
							/>
							<p className="mt-2 text-sm font-medium text-foreground">{stat.label}</p>
							<Chip size="sm" className="mt-3">
								{stat.category}
							</Chip>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
