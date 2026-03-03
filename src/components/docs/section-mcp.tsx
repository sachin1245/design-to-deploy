import { MotionItem, MotionReveal, MotionStagger } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MCP_SERVERS } from "./data";

export function SectionMcp() {
	return (
		<section id="mcp" aria-label="MCP Servers">
			<MotionReveal direction="up" spring="gentle">
				<h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
					MCP Servers
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					Model Context Protocol servers extend Claude Code with external capabilities — browser
					automation, design tools, and AI-to-AI collaboration.
				</p>
			</MotionReveal>

			<MotionStagger stagger={0.08} className="mt-6 grid gap-4 sm:grid-cols-3">
				{MCP_SERVERS.map((server) => (
					<MotionItem key={server.name}>
						<Card className="h-full">
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-base">{server.name}</CardTitle>
									<div className="flex items-center gap-1.5">
										<Badge
											variant={server.type === "local" ? "success" : "info"}
											className="text-[10px]"
										>
											{server.type}
										</Badge>
										<Badge
											variant={server.rateLimit === "Unlimited" ? "success" : "warning"}
											className="text-[10px]"
										>
											{server.rateLimit}
										</Badge>
									</div>
								</div>
								<CardDescription>{server.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="mb-2 text-xs font-medium text-foreground">Key Tools</p>
								<div className="flex flex-wrap gap-1.5">
									{server.tools.map((tool) => (
										<span
											key={tool}
											className="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground"
										>
											{tool}
										</span>
									))}
								</div>
							</CardContent>
						</Card>
					</MotionItem>
				))}
			</MotionStagger>
		</section>
	);
}
