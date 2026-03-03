import { MotionReveal } from "@/components/motion";
import { PipelineFlow } from "./pipeline-flow";

export function SectionPipeline() {
	return (
		<section id="pipeline" aria-label="Task Execution Pipeline">
			<MotionReveal direction="up" spring="gentle">
				<h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
					Task Execution Pipeline
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					Every non-trivial task follows this 10-step flow. Not every step is needed for every task
					— scale to complexity.
				</p>
			</MotionReveal>

			<div className="mt-8">
				<PipelineFlow />
			</div>
		</section>
	);
}
