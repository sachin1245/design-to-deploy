"use client";

import { motion, useReducedMotion } from "motion/react";
import { MotionItem, MotionStagger } from "@/components/motion";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { springs } from "@/lib/motion";
import { cn } from "@/lib/utils";

const teamMembers = [
	{
		name: "Ava Chen",
		initials: "AC",
		role: "Creative Director",
		bio: "15 years shaping brand identities for Fortune 500 companies and ambitious startups alike.",
	},
	{
		name: "Marcus Rivera",
		initials: "MR",
		role: "Lead Engineer",
		bio: "Full-stack architect with a passion for performance, accessibility, and elegant code.",
	},
	{
		name: "Sofia Andersson",
		initials: "SA",
		role: "UX Strategist",
		bio: "Research-driven designer who transforms complex problems into intuitive experiences.",
	},
	{
		name: "James Okafor",
		initials: "JO",
		role: "Motion Designer",
		bio: "Crafts animations and micro-interactions that bring interfaces to life with purpose.",
	},
	{
		name: "Lena Park",
		initials: "LP",
		role: "Brand Designer",
		bio: "Visual storyteller specializing in identity systems, typography, and art direction.",
	},
	{
		name: "Daniel Torres",
		initials: "DT",
		role: "Project Lead",
		bio: "Keeps teams aligned and projects on track from kickoff to launch and beyond.",
	},
];

type TeamGridProps = {
	className?: string;
};

export function TeamGrid({ className }: TeamGridProps) {
	const shouldReduce = useReducedMotion();

	return (
		<section className={cn("py-24", className)}>
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				<div className="mb-12">
					<p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
						The Team
					</p>
					<h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
						People behind the pixels
					</h2>
					<p className="mt-3 max-w-lg text-muted-foreground">
						A tight-knit crew of designers, engineers, and strategists who believe great work starts
						with great collaboration.
					</p>
				</div>

				<MotionStagger
					stagger={0.08}
					className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
				>
					{teamMembers.map((member) => (
						<MotionItem key={member.name}>
							<motion.div
								className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
								{...(shouldReduce ? {} : { whileHover: { scale: 1.03 } })}
								transition={springs.snappy}
							>
								<div className="flex items-start gap-4">
									<Avatar fallback={member.initials} size="lg" />
									<div className="min-w-0 flex-1">
										<h3 className="font-display text-base font-semibold text-foreground">
											{member.name}
										</h3>
										<Badge className="mt-1">{member.role}</Badge>
									</div>
								</div>

								{/* Hover overlay with bio */}
								<div className="mt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
									<p className="text-sm text-muted-foreground">{member.bio}</p>
								</div>

								{/* Subtle gradient accent on hover */}
								<div
									className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
									style={{
										background:
											"radial-gradient(circle at bottom right, var(--primary) 0%, transparent 60%)",
										opacity: 0.05,
									}}
									aria-hidden="true"
								/>
							</motion.div>
						</MotionItem>
					))}
				</MotionStagger>
			</div>
		</section>
	);
}
