import { FeatureComparison } from "@/components/pricing/feature-comparison";
import { LogoMarquee } from "@/components/pricing/logo-marquee";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { PricingCta } from "@/components/pricing/pricing-cta";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { PricingHero } from "@/components/pricing/pricing-hero";
import { ScrollProgress } from "@/components/pricing/scroll-progress";

export const metadata = {
	title: "Pricing — Simple plans for every team",
	description:
		"Start free and scale as you grow. Transparent pricing with no hidden fees for individuals, teams, and enterprises.",
};

export default function PricingPage() {
	return (
		<div className="min-h-screen">
			<ScrollProgress />

			<main>
				<PricingHero />
				<LogoMarquee />
				<PricingCards />
				<FeatureComparison />
				<PricingFaq />
				<PricingCta />
			</main>
		</div>
	);
}
