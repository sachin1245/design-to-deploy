"use client";

import Link from "next/link";
import { useState } from "react";
import {
	Avatar,
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Divider,
	Progress,
} from "@/components/ui";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════
   Dashboard Content — Client component for interactivity
   Stats cards, activity feed, quick actions
   ═══════════════════════════════════════════════════ */

function TrendUpIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
			<polyline points="16 7 22 7 22 13" />
		</svg>
	);
}

function ComponentIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
			<path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
			<path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
			<path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
		</svg>
	);
}

function TestTubeIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2" />
			<path d="M8.5 2h7" />
			<path d="M14.5 16h-5" />
		</svg>
	);
}

function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
			<path d="m9 12 2 2 4-4" />
		</svg>
	);
}

function RocketIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			{...props}
		>
			<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
			<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
			<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
			<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
		</svg>
	);
}

const stats = [
	{
		label: "Components",
		value: 36,
		change: "+4 this sprint",
		progress: 100,
		icon: ComponentIcon,
		variant: "primary" as const,
	},
	{
		label: "Test Coverage",
		value: 87,
		suffix: "%",
		change: "+12% this month",
		progress: 87,
		icon: TestTubeIcon,
		variant: "accent" as const,
	},
	{
		label: "Type Safety",
		value: 100,
		suffix: "%",
		change: "Strict mode",
		progress: 100,
		icon: ShieldCheckIcon,
		variant: "primary" as const,
	},
	{
		label: "Build Score",
		value: 98,
		suffix: "/100",
		change: "Lighthouse",
		progress: 98,
		icon: RocketIcon,
		variant: "accent" as const,
	},
];

type ActivityItem = {
	id: number;
	user: string;
	initials: string;
	action: string;
	target: string;
	time: string;
	type: "commit" | "review" | "deploy" | "test";
};

const activityFeed: ActivityItem[] = [
	{
		id: 1,
		user: "Sachin C",
		initials: "SC",
		action: "deployed",
		target: "v2.4.0 to production",
		time: "10 min ago",
		type: "deploy",
	},
	{
		id: 2,
		user: "Claude",
		initials: "CL",
		action: "committed",
		target: "feat: add Dashboard page with KPI cards",
		time: "25 min ago",
		type: "commit",
	},
	{
		id: 3,
		user: "Sachin C",
		initials: "SC",
		action: "reviewed",
		target: "PR #75 — Design system Figma page",
		time: "1 hour ago",
		type: "review",
	},
	{
		id: 4,
		user: "CI Pipeline",
		initials: "CI",
		action: "passed",
		target: "All 142 tests green",
		time: "1 hour ago",
		type: "test",
	},
	{
		id: 5,
		user: "Claude",
		initials: "CL",
		action: "committed",
		target: "feat: add About page with tech stack",
		time: "2 hours ago",
		type: "commit",
	},
	{
		id: 6,
		user: "Sachin C",
		initials: "SC",
		action: "committed",
		target: "fix: scope Home link to header nav",
		time: "3 hours ago",
		type: "commit",
	},
];

const typeBadgeVariant: Record<string, "default" | "success" | "warning" | "info"> = {
	commit: "default",
	review: "info",
	deploy: "success",
	test: "warning",
};

const quickActions = [
	{
		label: "Browse Components",
		description: "Explore all 36 design system components",
		href: "/showcase",
	},
	{
		label: "View Design System",
		description: "Tokens, typography, and color palette",
		href: "/design-system",
	},
	{
		label: "Read About",
		description: "Project goals, tech stack, and team",
		href: "/about",
	},
];

export function DashboardContent() {
	const [visibleCount, setVisibleCount] = useState(4);

	const visibleActivity = activityFeed.slice(0, visibleCount);

	return (
		<div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
			{/* ── Page Header ─────────────────────────────── */}
			<section className="max-w-3xl">
				<Badge variant="info" className="mb-6">
					Dashboard
				</Badge>
				<h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
					Project overview
				</h1>
				<p className="mt-4 text-lg text-muted-foreground">
					Real-time status of the design-to-deploy project. Components, coverage, and deployment
					health at a glance.
				</p>
			</section>

			<Divider className="my-12 sm:my-16" />

			{/* ── Stats Cards ─────────────────────────────── */}
			<section>
				<h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
					Key Metrics
				</h2>
				<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((stat) => (
						<Card key={stat.label}>
							<CardHeader className="pb-2">
								<div className="flex items-center justify-between">
									<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
										<stat.icon className="h-4 w-4" />
									</div>
									<TrendUpIcon className="h-4 w-4 text-emerald-500" />
								</div>
								<p className="mt-3 text-sm font-medium text-muted-foreground">{stat.label}</p>
							</CardHeader>
							<CardContent>
								<p className="font-display text-3xl font-bold tracking-tight">
									{stat.value}
									{stat.suffix && (
										<span className="text-lg text-muted-foreground">{stat.suffix}</span>
									)}
								</p>
								<p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
								<Progress value={stat.progress} variant={stat.variant} size="sm" className="mt-3" />
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<Divider className="my-12 sm:my-16" />

			{/* ── Activity Feed + Quick Actions ───────────── */}
			<div className="grid gap-6 lg:grid-cols-3">
				{/* Activity Feed — spans 2 columns */}
				<section className="lg:col-span-2">
					<h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
						Activity Feed
					</h2>
					<Card className="mt-8">
						<CardContent className="pt-6">
							<ul className="space-y-5">
								{visibleActivity.map((item) => (
									<li key={item.id} className="flex items-start gap-3">
										<Avatar fallback={item.initials} size="sm" />
										<div className="flex-1 min-w-0">
											<p className="text-sm">
												<span className="font-medium text-foreground">{item.user}</span>{" "}
												<span className="text-muted-foreground">{item.action}</span>{" "}
												<span className="text-foreground">{item.target}</span>
											</p>
											<p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
										</div>
										<Badge
											variant={typeBadgeVariant[item.type] ?? "default"}
											className="shrink-0 text-[10px]"
										>
											{item.type}
										</Badge>
									</li>
								))}
							</ul>
							{visibleCount < activityFeed.length && (
								<Button
									variant="ghost"
									size="sm"
									className="mt-4 w-full"
									onClick={() => setVisibleCount(activityFeed.length)}
								>
									Show all activity
								</Button>
							)}
							{visibleCount >= activityFeed.length && activityFeed.length > 4 && (
								<Button
									variant="ghost"
									size="sm"
									className="mt-4 w-full"
									onClick={() => setVisibleCount(4)}
								>
									Show less
								</Button>
							)}
						</CardContent>
					</Card>
				</section>

				{/* Quick Actions — spans 1 column */}
				<section>
					<h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
						Quick Actions
					</h2>
					<div className="mt-8 space-y-4">
						{quickActions.map((action) => (
							<Card key={action.label}>
								<CardHeader className="pb-2">
									<CardTitle className="text-base">{action.label}</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="mb-3">{action.description}</CardDescription>
									<Link
										href={action.href}
										className={cn(
											buttonVariants({
												variant: "outline",
												size: "sm",
											}),
											"w-full",
										)}
									>
										Go &rarr;
									</Link>
								</CardContent>
							</Card>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
