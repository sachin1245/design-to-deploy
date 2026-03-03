import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { AgentInfo } from "./data";

type AgentCardProps = {
	agent: AgentInfo;
};

export function AgentCard({ agent }: AgentCardProps) {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="font-mono text-base">{agent.name}</CardTitle>
					<Badge
						variant={agent.model === "opus" ? "default" : "info"}
						className="text-[10px] uppercase tracking-wider"
					>
						{agent.model}
					</Badge>
				</div>
				<CardDescription>{agent.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="mb-3 text-xs text-muted-foreground">
					<span className="font-medium text-foreground">When: </span>
					{agent.whenToUse}
				</p>
				<Accordion
					items={[
						{
							value: "tools",
							trigger: `Tools (${agent.tools.length})`,
							content: (
								<div className="flex flex-wrap gap-1.5">
									{agent.tools.map((tool) => (
										<span
											key={tool}
											className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
										>
											{tool}
										</span>
									))}
								</div>
							),
						},
					]}
				/>
			</CardContent>
		</Card>
	);
}
