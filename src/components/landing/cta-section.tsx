import { Button } from "@/components/ui/button";

export function CtaSection() {
	return (
		<section className="py-24 sm:py-32">
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				<div className="relative overflow-hidden rounded-2xl bg-primary px-8 py-16 sm:px-16 sm:py-20">
					{/* Background accent shapes */}
					<div
						className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
						aria-hidden="true"
					/>
					<div
						className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl"
						aria-hidden="true"
					/>

					<div className="relative max-w-xl">
						<h2 className="font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
							Start building with
							<br />
							Clarity today.
						</h2>
						<p className="mt-4 text-lg text-primary-foreground/80">
							Install the library, import a component, and ship. No configuration ceremony. No
							learning curve. Just good components.
						</p>

						{/* Code snippet */}
						<div className="mt-8 rounded-lg bg-black/20 px-4 py-3 font-mono text-sm text-primary-foreground/90 backdrop-blur-sm">
							<span className="select-none text-primary-foreground/50">$ </span>
							pnpm add @clarity/ui
						</div>

						<div className="mt-8 flex flex-wrap gap-4">
							<Button
								size="lg"
								className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
							>
								Get Started
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
							>
								Read the Docs
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
