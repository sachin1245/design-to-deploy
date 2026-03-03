import { MotionItem, MotionReveal, MotionStagger } from "@/components/motion";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PLUGINS } from "./data";

export function SectionPlugins() {
	return (
		<section id="plugins" aria-label="Plugins">
			<MotionReveal direction="up" spring="gentle">
				<h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Plugins</h2>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					Installed globally, plugins extend Claude Code with specialized capabilities and skills.
				</p>
			</MotionReveal>

			<MotionReveal direction="up" delay={0.1} spring="gentle">
				<Alert variant="warning" title="Mandatory Plugin" className="mt-6">
					The <strong>frontend-design</strong> plugin MUST be invoked before writing or modifying
					any UI component code. This is non-negotiable per CLAUDE.md.
				</Alert>
			</MotionReveal>

			<MotionStagger stagger={0.08} className="mt-6 grid gap-4 sm:grid-cols-3">
				{PLUGINS.map((plugin) => (
					<MotionItem key={plugin.name}>
						<Card className="h-full">
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="font-mono text-base">{plugin.name}</CardTitle>
									{plugin.mandatory && (
										<Badge variant="warning" className="text-[10px]">
											Required
										</Badge>
									)}
								</div>
								<CardDescription>{plugin.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-xs text-muted-foreground">
									<span className="font-medium text-foreground">Skill: </span>
									<code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">
										{plugin.skill}
									</code>
								</p>
							</CardContent>
						</Card>
					</MotionItem>
				))}
			</MotionStagger>
		</section>
	);
}
