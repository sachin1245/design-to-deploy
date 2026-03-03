import { MotionItem, MotionReveal, MotionStagger } from "@/components/motion";
import { CommandCard } from "./command-card";
import { COMMANDS } from "./data";

export function SectionCommands() {
	return (
		<section id="commands" aria-label="Slash Commands">
			<MotionReveal direction="up" spring="gentle">
				<h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
					Slash Commands
				</h2>
				<p className="mt-2 max-w-2xl text-sm text-muted-foreground">
					7 custom commands in{" "}
					<code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">
						.claude/commands/
					</code>{" "}
					that encode repetitive workflows into one-line invocations.
				</p>
			</MotionReveal>

			<MotionStagger stagger={0.06} className="mt-6 grid gap-4 sm:grid-cols-2">
				{COMMANDS.map((cmd) => (
					<MotionItem key={cmd.name}>
						<CommandCard command={cmd} />
					</MotionItem>
				))}
			</MotionStagger>
		</section>
	);
}
