import { MotionItem, MotionReveal, MotionStagger } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SKILLS } from "./data";

export function SectionSkills() {
	return (
		<section id="skills" aria-label="Skills">
			<MotionReveal direction="up" spring="gentle">
				<h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Skills</h2>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					Skills inject contextual knowledge based on file patterns. They automatically load
					relevant patterns when you work in matching files.
				</p>
			</MotionReveal>

			<MotionStagger stagger={0.08} className="mt-6 grid gap-4 sm:grid-cols-3">
				{SKILLS.map((skill) => (
					<MotionItem key={skill.name}>
						<Card className="h-full">
							<CardHeader>
								<CardTitle className="font-mono text-base">{skill.name}</CardTitle>
								<CardDescription>{skill.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex items-center gap-2 text-xs text-muted-foreground">
										<span className="font-medium text-foreground">Glob:</span>
										<Badge variant="info" className="px-1.5 py-0 text-[10px] font-mono">
											{skill.glob}
										</Badge>
									</div>
									<p className="text-xs text-muted-foreground">
										<span className="font-medium text-foreground">Trigger: </span>
										{skill.trigger}
									</p>
								</div>
							</CardContent>
						</Card>
					</MotionItem>
				))}
			</MotionStagger>
		</section>
	);
}
