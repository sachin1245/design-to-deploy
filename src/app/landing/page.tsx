import { DesignSystemToggle } from "@/components/design-system-toggle";
import { CtaSection } from "@/components/landing/cta-section";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Testimonials } from "@/components/landing/testimonials";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata = {
	title: "Clarity — A Design System for Teams That Ship",
	description:
		"36 production-ready React components built on Tailwind CSS v4. Accessible, themeable, and designed for teams that care about craft.",
};

export default function LandingPage() {
	return (
		<div className="min-h-screen">
			{/* Floating header */}
			<header className="fixed right-6 top-6 z-50 flex items-center gap-3 sm:right-8">
				<DesignSystemToggle />
				<ThemeToggle />
			</header>

			<main>
				<Hero />
				<Features />
				<Testimonials />
				<CtaSection />
			</main>

			<Footer />
		</div>
	);
}
