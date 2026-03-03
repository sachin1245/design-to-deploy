import { MotionItem, MotionReveal, MotionStagger } from "@/components/motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "./code-block";
import { PARALLEL_PATTERNS } from "./data";

const patterns = [
	PARALLEL_PATTERNS.worktrees,
	PARALLEL_PATTERNS.orchestrate,
	PARALLEL_PATTERNS.agentTeams,
] as const;

export function SectionParallel() {
	return (
		<section id="parallel" aria-label="Parallel Execution">
			<MotionReveal direction="up" spring="gentle">
				<h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
					Parallel Execution
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					Three patterns for running work concurrently — from simple worktrees to fully coordinated
					agent teams.
				</p>
			</MotionReveal>

			<MotionStagger stagger={0.08} className="mt-6 grid gap-4">
				{patterns.map((pattern) => (
					<MotionItem key={pattern.title}>
						<Card>
							<CardHeader>
								<CardTitle className="text-base">{pattern.title}</CardTitle>
								<CardDescription>{pattern.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<CodeBlock code={pattern.usage} language="bash" />
							</CardContent>
						</Card>
					</MotionItem>
				))}
			</MotionStagger>
		</section>
	);
}
