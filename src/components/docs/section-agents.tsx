"use client";

import { useState } from "react";
import { MotionItem, MotionReveal, MotionStagger } from "@/components/motion";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/tabs";
import { AgentCard } from "./agent-card";
import { AGENTS } from "./data";

export function SectionAgents() {
	const [filter, setFilter] = useState("all");

	const filtered = filter === "all" ? AGENTS : AGENTS.filter((a) => a.model === filter);

	return (
		<section id="agents" aria-label="Agents">
			<MotionReveal direction="up" spring="gentle">
				<h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Agents</h2>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					7 specialized agents, each with a distinct role. Opus agents handle complex reasoning;
					Sonnet agents handle review and validation.
				</p>
			</MotionReveal>

			<div className="mt-6">
				<Tabs value={filter} onValueChange={setFilter}>
					<TabList aria-label="Filter agents by model">
						<Tab value="all">All ({AGENTS.length})</Tab>
						<Tab value="opus">Opus ({AGENTS.filter((a) => a.model === "opus").length})</Tab>
						<Tab value="sonnet">Sonnet ({AGENTS.filter((a) => a.model === "sonnet").length})</Tab>
					</TabList>
					<TabPanel value={filter}>
						<MotionStagger key={filter} stagger={0.06} className="mt-4 grid gap-4 sm:grid-cols-2">
							{filtered.map((agent) => (
								<MotionItem key={agent.name}>
									<AgentCard agent={agent} />
								</MotionItem>
							))}
						</MotionStagger>
					</TabPanel>
				</Tabs>
			</div>
		</section>
	);
}
