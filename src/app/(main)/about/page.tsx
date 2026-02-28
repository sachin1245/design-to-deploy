import type { Metadata } from "next";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";

/* ═══════════════════════════════════════════════════
   About Page — Project description, tech stack, team
   Pure Server Component (static content)
   ═══════════════════════════════════════════════════ */

export const metadata: Metadata = {
	title: "About",
	description: "Learn about the design-to-deploy project, our tech stack, and the team behind it.",
};

const techStack = [
	{
		name: "Next.js 15",
		description: "App Router with Server Components and streaming SSR",
		category: "Framework",
	},
	{
		name: "React 19",
		description: "Latest React with concurrent features and server components",
		category: "UI Library",
	},
	{
		name: "TypeScript",
		description: "Strict mode for type-safe components and APIs",
		category: "Language",
	},
	{
		name: "Tailwind CSS v4",
		description: "CSS-first configuration with @theme inline tokens",
		category: "Styling",
	},
	{
		name: "Vitest",
		description: "Unit and integration testing with React Testing Library",
		category: "Testing",
	},
	{
		name: "Playwright",
		description: "End-to-end and visual regression testing across browsers",
		category: "Testing",
	},
	{
		name: "Biome",
		description: "Fast linting and formatting in one toolchain",
		category: "DX",
	},
	{
		name: "Vercel",
		description: "Deployment platform with preview deployments and analytics",
		category: "Infrastructure",
	},
];

const teamMembers = [
	{
		name: "Sachin C",
		role: "Project Lead",
		initials: "SC",
		bio: "Architect of the design-to-deploy pipeline. Focused on bridging the gap between design tools and production code.",
	},
	{
		name: "Claude",
		role: "AI Engineering Partner",
		initials: "CL",
		bio: "Collaborated on component architecture, testing strategy, and page implementation. The always-available pair programmer.",
	},
	{
		name: "Design System",
		role: "36 Components Strong",
		initials: "DS",
		bio: "From Button to CommandPalette. Every component built with forwardRef, cva variants, and design tokens. Tested and accessible.",
	},
];

const categoryColors: Record<string, "default" | "success" | "warning" | "info"> = {
	Framework: "default",
	"UI Library": "info",
	Language: "warning",
	Styling: "success",
	Testing: "info",
	DX: "warning",
	Infrastructure: "success",
};

export default function AboutPage() {
	return (
		<div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
			{/* ── Project Description ─────────────────────── */}
			<section className="max-w-3xl">
				<Badge variant="info" className="mb-6">
					About This Project
				</Badge>
				<h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
					Building the bridge from <span className="text-primary">design to deploy</span>
				</h1>
				<p className="mt-6 text-lg leading-relaxed text-muted-foreground">
					design-to-deploy is a reference implementation that demonstrates how to build a complete,
					production-grade design system from scratch. It covers every stage of the pipeline: token
					definition, component architecture, testing strategy, CI/CD automation, and real page
					composition.
				</p>
				<p className="mt-4 text-lg leading-relaxed text-muted-foreground">
					The project serves as both a learning resource and a practical starter kit. Every decision
					is documented, every component is tested, and every pattern is intentional.
				</p>
			</section>

			<Divider className="my-16 sm:my-20" />

			{/* ── Tech Stack ──────────────────────────────── */}
			<section>
				<h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
					Tech Stack
				</h2>
				<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{techStack.map((tech) => (
						<Card key={tech.name}>
							<CardHeader className="pb-3">
								<Badge
									variant={categoryColors[tech.category] ?? "default"}
									className="mb-2 w-fit text-[10px]"
								>
									{tech.category}
								</Badge>
								<CardTitle className="text-base">{tech.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<CardDescription>{tech.description}</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<Divider className="my-16 sm:my-20" />

			{/* ── Team / Contributors ─────────────────────── */}
			<section>
				<h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
					Team
				</h2>
				<div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{teamMembers.map((member) => (
						<Card key={member.name}>
							<CardHeader>
								<div className="flex items-center gap-4">
									<Avatar fallback={member.initials} size="lg" />
									<div>
										<CardTitle className="text-base">{member.name}</CardTitle>
										<p className="text-sm text-muted-foreground">{member.role}</p>
									</div>
								</div>
							</CardHeader>
							<CardContent>
								<CardDescription>{member.bio}</CardDescription>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<Divider className="my-16 sm:my-20" />

			{/* ── Project Stats ────────────────────────────── */}
			<section>
				<h2 className="font-display text-xs font-semibold tracking-widest text-muted-foreground uppercase">
					By the Numbers
				</h2>
				<div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
					{[
						{ value: "36", label: "UI Components" },
						{ value: "10", label: "Project Phases" },
						{ value: "3", label: "App Pages" },
						{ value: "100%", label: "TypeScript" },
					].map((stat) => (
						<div
							key={stat.label}
							className="rounded-xl border border-border bg-card p-6 text-center"
						>
							<p className="font-display text-3xl font-bold text-primary sm:text-4xl">
								{stat.value}
							</p>
							<p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
