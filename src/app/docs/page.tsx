import { DocsShell } from "@/components/docs/docs-shell";
import { SectionAgents } from "@/components/docs/section-agents";
import { SectionCommands } from "@/components/docs/section-commands";
import { SectionHooks } from "@/components/docs/section-hooks";
import { SectionMcp } from "@/components/docs/section-mcp";
import { SectionOverview } from "@/components/docs/section-overview";
import { SectionParallel } from "@/components/docs/section-parallel";
import { SectionPipeline } from "@/components/docs/section-pipeline";
import { SectionPlugins } from "@/components/docs/section-plugins";
import { SectionSkills } from "@/components/docs/section-skills";

export default function DocsPage() {
	return (
		<DocsShell>
			<SectionOverview />
			<SectionPipeline />
			<SectionAgents />
			<SectionCommands />
			<SectionSkills />
			<SectionPlugins />
			<SectionHooks />
			<SectionMcp />
			<SectionParallel />
		</DocsShell>
	);
}
