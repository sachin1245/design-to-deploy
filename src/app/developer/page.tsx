import { ApiFeatures } from "@/components/developer/api-features";
import { ApiPlayground } from "@/components/developer/api-playground";
import { CodeReveal } from "@/components/developer/code-reveal";
import { DeveloperCta } from "@/components/developer/developer-cta";
import { DocsProgress } from "@/components/developer/docs-progress";
import { StatsCounter } from "@/components/developer/stats-counter";
import { TerminalHero } from "@/components/developer/terminal-hero";

export const metadata = {
	title: "Developer Platform — Clarity",
	description:
		"Ship APIs in minutes, not months. Type-safe, auto-scaling, production-grade developer platform with real-time monitoring.",
};

export default function DeveloperPage() {
	return (
		<div className="min-h-screen">
			<DocsProgress />

			<main>
				<TerminalHero />
				<CodeReveal />
				<ApiFeatures />
				<StatsCounter />
				<ApiPlayground />
				<DeveloperCta />
			</main>
		</div>
	);
}
