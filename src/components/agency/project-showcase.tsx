"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MotionReveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const projects = [
	{
		title: "Lumina Rebrand",
		description: "Full brand identity and e-commerce platform for a luxury skincare line.",
		category: "Branding",
		gradient: "from-purple-600/80 to-fuchsia-500/80",
	},
	{
		title: "Vertex Dashboard",
		description:
			"Real-time analytics dashboard for a fintech startup processing millions of transactions.",
		category: "Product Design",
		gradient: "from-blue-600/80 to-cyan-400/80",
	},
	{
		title: "Nomad Social",
		description: "Mobile-first social platform connecting remote workers across the globe.",
		category: "App Development",
		gradient: "from-amber-500/80 to-orange-600/80",
	},
	{
		title: "Echo Music",
		description:
			"Interactive web experience for an independent record label and artist collective.",
		category: "Web Experience",
		gradient: "from-emerald-500/80 to-teal-600/80",
	},
	{
		title: "Arc Architecture",
		description: "Portfolio and booking system for an award-winning architectural firm.",
		category: "Website",
		gradient: "from-rose-500/80 to-pink-600/80",
	},
];

type ProjectShowcaseProps = {
	className?: string;
};

export function ProjectShowcase({ className }: ProjectShowcaseProps) {
	const shouldReduce = useReducedMotion();
	const [isDesktop, setIsDesktop] = useState(false);
	const outerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const mql = window.matchMedia("(min-width: 768px)");
		setIsDesktop(mql.matches);

		const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
		mql.addEventListener("change", handler);
		return () => mql.removeEventListener("change", handler);
	}, []);

	const { scrollYProgress } = useScroll({
		target: outerRef,
		offset: ["start start", "end end"],
	});

	const translatePercent = `${((projects.length - 1) * 100) / projects.length}%`;
	const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${translatePercent}`]);

	const useHorizontalScroll = isDesktop && !shouldReduce;

	return (
		<section className={cn("relative", className)}>
			{/* Section header */}
			<div className="mx-auto max-w-6xl px-6 pt-24 sm:px-8">
				<MotionReveal direction="up" spring="gentle">
					<p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
						Selected Work
					</p>
					<h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
						Projects that speak
					</h2>
					<p className="mt-3 max-w-lg text-muted-foreground">
						A curated selection of recent projects across brand, product, and experience design.
					</p>
				</MotionReveal>
			</div>

			{useHorizontalScroll ? (
				/* Horizontal scroll — desktop only, motion enabled */
				<div
					ref={outerRef}
					style={{ height: `${projects.length * 100}vh` }}
					className="relative mt-12"
				>
					<div className="sticky top-0 flex h-screen items-center overflow-hidden">
						<motion.div
							className="flex gap-8 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
							style={{ x }}
						>
							{projects.map((project) => (
								<div key={project.title} className="w-[min(80vw,500px)] shrink-0">
									<Card className="h-full overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
										<div
											className={cn(
												"flex h-56 items-center justify-center bg-gradient-to-br sm:h-64",
												project.gradient,
											)}
											aria-hidden="true"
										>
											<div className="h-16 w-16 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm" />
										</div>
										<CardHeader>
											<div className="flex items-center justify-between">
												<CardTitle>{project.title}</CardTitle>
												<Badge>{project.category}</Badge>
											</div>
										</CardHeader>
										<CardContent>
											<CardDescription>{project.description}</CardDescription>
										</CardContent>
									</Card>
								</div>
							))}
						</motion.div>
					</div>
				</div>
			) : (
				/* Vertical grid — mobile or reduced motion */
				<div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 px-6 pb-24 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
					{projects.map((project) => (
						<Card key={project.title} className="overflow-hidden border-border/50 bg-card/80">
							<div
								className={cn(
									"flex h-44 items-center justify-center bg-gradient-to-br",
									project.gradient,
								)}
								aria-hidden="true"
							>
								<div className="h-12 w-12 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm" />
							</div>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle>{project.title}</CardTitle>
									<Badge>{project.category}</Badge>
								</div>
							</CardHeader>
							<CardContent>
								<CardDescription>{project.description}</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</section>
	);
}
