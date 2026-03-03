import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "./code-block";
import type { CommandInfo } from "./data";

type CommandCardProps = {
	command: CommandInfo;
};

export function CommandCard({ command }: CommandCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="font-mono text-base text-primary">{command.name}</CardTitle>
				<CardDescription>{command.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<CodeBlock code={command.usage} language="bash" />
			</CardContent>
		</Card>
	);
}
