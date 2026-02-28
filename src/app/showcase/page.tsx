"use client";

import { useState } from "react";
import {
	Avatar,
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
} from "@/components/ui";

/* ═══════════════════════════════════════════════════
   Constants — every variant & size to showcase
   ═══════════════════════════════════════════════════ */

const BUTTON_VARIANTS = ["primary", "secondary", "outline", "ghost", "destructive"] as const;
const BUTTON_SIZES = ["sm", "md", "lg"] as const;
const BADGE_VARIANTS = ["default", "success", "warning", "error", "info"] as const;
const AVATAR_SIZES = ["sm", "md", "lg"] as const;

/* ═══════════════════════════════════════════════════
   Section heading — numbered specimen labels
   ═══════════════════════════════════════════════════ */

function SectionHeading({
	number,
	title,
	description,
}: {
	number: string;
	title: string;
	description: string;
}) {
	return (
		<div className="mb-8">
			<div className="flex items-baseline gap-3">
				<span className="font-mono text-xs font-semibold text-primary/50">{number}</span>
				<h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
			</div>
			<p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
		</div>
	);
}

/* ═══════════════════════════════════════════════════
   Showcase Page
   ═══════════════════════════════════════════════════ */

export default function ShowcasePage() {
	const [dialogOpen, setDialogOpen] = useState(false);

	return (
		<div className="space-y-16">
			{/* ── Hero ──────────────────────────────────── */}
			<div>
				<h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
					Component<span className="text-primary">—</span>Showcase
				</h1>
				<p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
					Every component, every variant, every state&mdash;the living reference for the
					design&#8209;to&#8209;deploy system.
				</p>
			</div>

			<hr className="border-border" />

			{/* ── 01 Button ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="01"
					title="Button"
					description="5 variants &times; 3 sizes with hover, focus, active, and disabled states."
				/>
				<div className="space-y-6">
					{BUTTON_VARIANTS.map((variant) => (
						<div key={variant}>
							<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
								{variant}
							</p>
							<div className="flex flex-wrap items-center gap-3">
								{BUTTON_SIZES.map((size) => (
									<Button key={size} variant={variant} size={size}>
										{variant.charAt(0).toUpperCase() + variant.slice(1)}
									</Button>
								))}
								<Button variant={variant} size="md" disabled>
									Disabled
								</Button>
							</div>
						</div>
					))}
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 02 Input ──────────────────────────────── */}
			<section>
				<SectionHeading
					number="02"
					title="Input"
					description="Text fields with optional labels, error messages, and disabled state."
				/>
				<div className="grid max-w-2xl gap-6 sm:grid-cols-2">
					<Input placeholder="Default input" />
					<Input label="Email" placeholder="you@example.com" type="email" />
					<Input label="Username" error="This username is already taken" defaultValue="designbot" />
					<Input label="Disabled" placeholder="Read-only field" disabled />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 03 Badge ──────────────────────────────── */}
			<section>
				<SectionHeading
					number="03"
					title="Badge"
					description="5 semantic variants for status indicators and labels."
				/>
				<div className="flex flex-wrap items-center gap-3">
					{BADGE_VARIANTS.map((variant) => (
						<Badge key={variant} variant={variant}>
							{variant.charAt(0).toUpperCase() + variant.slice(1)}
						</Badge>
					))}
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 04 Card ───────────────────────────────── */}
			<section>
				<SectionHeading
					number="04"
					title="Card"
					description="Compound component with Header, Title, Description, Content, and Footer."
				/>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{/* Card with actions */}
					<Card>
						<CardHeader>
							<CardTitle>Project Alpha</CardTitle>
							<CardDescription>A next-generation design system</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Typed tokens, themed components, and comprehensive testing infrastructure.
							</p>
						</CardContent>
						<CardFooter className="gap-2">
							<Button size="sm">View</Button>
							<Button size="sm" variant="outline">
								Share
							</Button>
						</CardFooter>
					</Card>

					{/* Card with metric */}
					<Card>
						<CardHeader>
							<CardTitle>Coverage</CardTitle>
							<CardDescription>Component test coverage</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="font-display text-4xl font-bold text-primary">98.2%</p>
							<p className="mt-1 text-sm text-muted-foreground">across 6 components</p>
						</CardContent>
					</Card>

					{/* Card with avatars + badge */}
					<Card>
						<CardHeader>
							<CardTitle>Team</CardTitle>
							<CardDescription>Active contributors</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex -space-x-2">
								{["SC", "AB", "MK", "JD"].map((initials) => (
									<Avatar key={initials} size="sm" fallback={initials} />
								))}
							</div>
						</CardContent>
						<CardFooter>
							<Badge variant="success">Sprint Active</Badge>
						</CardFooter>
					</Card>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 05 Avatar ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="05"
					title="Avatar"
					description="3 sizes with initials fallback. Radix-based with image support."
				/>
				<div className="space-y-6">
					<div>
						<p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
							Sizes
						</p>
						<div className="flex items-end gap-4">
							{AVATAR_SIZES.map((size) => (
								<div key={size} className="flex flex-col items-center gap-2">
									<Avatar size={size} fallback="DT" />
									<span className="text-xs text-muted-foreground">{size}</span>
								</div>
							))}
						</div>
					</div>
					<div>
						<p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
							Initials
						</p>
						<div className="flex items-center gap-3">
							{["SC", "AB", "MK", "JD", "RL"].map((initials) => (
								<Avatar key={initials} size="md" fallback={initials} />
							))}
						</div>
					</div>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 06 Dialog ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="06"
					title="Dialog"
					description="Accessible modal with overlay, focus trap, keyboard dismiss, and animations."
				/>
				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirm Action</DialogTitle>
							<DialogDescription>
								This dialog demonstrates the overlay backdrop, content panel, close button, and
								footer action layout.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" onClick={() => setDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={() => setDialogOpen(false)}>Confirm</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</section>
		</div>
	);
}
