import { AgencyHero } from "@/components/agency/agency-hero";
import { ContactSection } from "@/components/agency/contact-section";
import { ProcessTimeline } from "@/components/agency/process-timeline";
import { ProjectShowcase } from "@/components/agency/project-showcase";
import { TeamGrid } from "@/components/agency/team-grid";

export const metadata = {
	title: "Creative Agency — We Craft Digital Experiences",
	description:
		"Strategy, design, and engineering for brands that refuse to blend in. Full-service creative agency with a track record of 120+ projects shipped.",
};

export default function AgencyPage() {
	return (
		<div className="min-h-screen bg-background">
			<main>
				<AgencyHero />
				<ProjectShowcase />
				<TeamGrid />
				<ProcessTimeline />
				<ContactSection />
			</main>
		</div>
	);
}
