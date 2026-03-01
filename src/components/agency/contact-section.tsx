"use client";

import { useReducedMotion } from "motion/react";
import { MotionItem, MotionReveal, MotionStagger } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ContactSectionProps = {
	className?: string;
};

export function ContactSection({ className }: ContactSectionProps) {
	useReducedMotion();

	return (
		<section className={cn("pb-24", className)}>
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				<Divider className="mb-24" />

				<div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
					{/* Left column — heading */}
					<MotionReveal direction="up" spring="gentle">
						<p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-primary">
							Get in Touch
						</p>
						<h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
							Let&apos;s build something
							<br />
							remarkable together
						</h2>
						<p className="mt-4 max-w-md text-muted-foreground">
							Have a project in mind? We would love to hear about it. Drop us a line and we will get
							back to you within 24 hours.
						</p>
					</MotionReveal>

					{/* Right column — form */}
					<MotionStagger stagger={0.08}>
						<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
							<MotionItem>
								<Input label="Name" placeholder="Your full name" />
							</MotionItem>

							<MotionItem>
								<Input label="Email" type="email" placeholder="you@company.com" />
							</MotionItem>

							<MotionItem>
								<Textarea label="Message" placeholder="Tell us about your project..." rows={5} />
							</MotionItem>

							<MotionItem>
								<Button type="submit" size="lg" className="w-full sm:w-auto">
									Send Message
								</Button>
							</MotionItem>
						</form>
					</MotionStagger>
				</div>
			</div>
		</section>
	);
}
