const navigation = {
	product: [
		{ label: "Components", href: "/showcase" },
		{ label: "Documentation", href: "#" },
		{ label: "Figma Kit", href: "#" },
		{ label: "Changelog", href: "#" },
	],
	developers: [
		{ label: "Getting Started", href: "#" },
		{ label: "API Reference", href: "#" },
		{ label: "Design Tokens", href: "#" },
		{ label: "GitHub", href: "#" },
	],
	company: [
		{ label: "About", href: "#" },
		{ label: "Blog", href: "#" },
		{ label: "Careers", href: "#" },
		{ label: "Contact", href: "#" },
	],
};

export function Footer() {
	return (
		<footer className="border-t border-border py-16">
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				<div className="grid gap-12 sm:grid-cols-4">
					{/* Brand column */}
					<div>
						<p className="font-display text-lg font-bold tracking-tight text-foreground">Clarity</p>
						<p className="mt-2 text-sm text-muted-foreground">
							A design system for teams that care about craft.
						</p>
					</div>

					{/* Navigation columns */}
					<div>
						<p className="mb-4 text-sm font-semibold text-foreground">Product</p>
						<ul className="space-y-2.5">
							{navigation.product.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className="mb-4 text-sm font-semibold text-foreground">Developers</p>
						<ul className="space-y-2.5">
							{navigation.developers.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className="mb-4 text-sm font-semibold text-foreground">Company</p>
						<ul className="space-y-2.5">
							{navigation.company.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className="text-sm text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
					<p className="text-xs text-muted-foreground">
						&copy; {new Date().getFullYear()} Clarity. All rights reserved.
					</p>
					<div className="flex gap-6">
						<a
							href="/privacy"
							className="text-xs text-muted-foreground transition-colors hover:text-foreground"
						>
							Privacy
						</a>
						<a
							href="/terms"
							className="text-xs text-muted-foreground transition-colors hover:text-foreground"
						>
							Terms
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
