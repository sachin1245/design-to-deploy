"use client";

import { MotionItem, MotionStagger } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PIPELINE_STEPS } from "./data";

export function PipelineFlow({ className }: { className?: string }) {
	return (
		<MotionStagger stagger={0.08} className={cn("relative", className)}>
			{/* Vertical line */}
			<div
				className="absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent"
				aria-hidden="true"
			/>

			<div className="space-y-1">
				{PIPELINE_STEPS.map((step) => (
					<MotionItem key={step.number}>
						<div className="group relative flex items-start gap-4 rounded-lg py-3 pl-0 pr-4 transition-colors hover:bg-secondary/30">
							{/* Step number circle */}
							<div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 bg-background font-mono text-xs font-bold text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
								{step.number}
							</div>

							{/* Content */}
							<div className="min-w-0 pt-1">
								<div className="flex items-center gap-2">
									<span className="font-display text-sm font-semibold text-foreground">
										{step.name}
									</span>
									<Badge variant="info" className="px-1.5 py-0 text-[10px] font-normal">
										{step.agent}
									</Badge>
								</div>
								<p className="mt-0.5 text-sm text-muted-foreground">{step.description}</p>
							</div>
						</div>
					</MotionItem>
				))}
			</div>
		</MotionStagger>
	);
}
