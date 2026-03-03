import { MotionItem, MotionReveal, MotionStagger } from "@/components/motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "./code-block";
import { HOOKS, LEFTHOOK_CONFIG } from "./data";

export function SectionHooks() {
	return (
		<section id="hooks" aria-label="Hooks and Quality Gates">
			<MotionReveal direction="up" spring="gentle">
				<h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
					Hooks &amp; Quality Gates
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					Three layers of automated quality enforcement: Claude Code hooks run during AI sessions,
					Lefthook runs on git events, and the Stop hook ensures no session ends with broken code.
				</p>
			</MotionReveal>

			{/* Claude Code Hooks */}
			<MotionReveal direction="up" delay={0.1} spring="gentle">
				<h3 className="mt-8 mb-4 font-display text-lg font-semibold text-foreground">
					Claude Code Hooks
				</h3>
			</MotionReveal>

			<MotionStagger stagger={0.08} className="grid gap-4 sm:grid-cols-3">
				{HOOKS.map((hook) => (
					<MotionItem key={hook.event}>
						<Card className="h-full">
							<CardHeader>
								<CardTitle className="font-mono text-sm">{hook.event}</CardTitle>
								<CardDescription>{hook.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<CodeBlock code={hook.config} language="json" />
							</CardContent>
						</Card>
					</MotionItem>
				))}
			</MotionStagger>

			{/* Lefthook */}
			<MotionReveal direction="up" delay={0.15} spring="gentle">
				<h3 className="mt-10 mb-4 font-display text-lg font-semibold text-foreground">
					Lefthook (Git Hooks)
				</h3>
				<p className="mb-4 text-sm text-muted-foreground">
					Runs Biome lint/format on staged files and typecheck on every commit. Commitlint enforces
					conventional commit messages.
				</p>
				<CodeBlock code={LEFTHOOK_CONFIG} language="yaml" />
			</MotionReveal>
		</section>
	);
}
