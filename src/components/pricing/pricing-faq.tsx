"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { MotionReveal } from "@/components/motion";
import { reducedMotionTransition, springs } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type PricingFaqProps = {
	className?: string;
};

type FaqItem = {
	question: string;
	answer: string;
};

const faqs: FaqItem[] = [
	{
		question: "Can I switch plans at any time?",
		answer:
			"Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remaining billing period. When downgrading, the new rate applies at the start of the next cycle.",
	},
	{
		question: "Is there a free trial for the Pro plan?",
		answer:
			"Absolutely. Every Pro plan starts with a 14-day free trial with full access to all features. No credit card required to start.",
	},
	{
		question: "What payment methods do you accept?",
		answer:
			"We accept all major credit cards (Visa, Mastercard, American Express), as well as PayPal and bank transfers for annual Enterprise plans.",
	},
	{
		question: "What happens when I exceed my storage limit?",
		answer:
			"We'll notify you when you're approaching your limit. You won't lose any data — we'll simply pause new uploads until you upgrade your plan or free up space.",
	},
	{
		question: "Do you offer discounts for nonprofits or education?",
		answer:
			"Yes, we offer a 50% discount for verified nonprofits and educational institutions. Contact our sales team to get set up.",
	},
];

function FaqAccordionItem({
	item,
	isOpen,
	onToggle,
	shouldReduce,
}: {
	item: FaqItem;
	isOpen: boolean;
	onToggle: () => void;
	shouldReduce: boolean | null;
}) {
	const transition = shouldReduce ? reducedMotionTransition : { ...springs.snappy, duration: 0.3 };

	return (
		<div className="border-b border-border">
			<button
				type="button"
				onClick={onToggle}
				className="flex w-full items-center justify-between py-5 text-left text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
				aria-expanded={isOpen}
			>
				{item.question}
				<svg
					className={cn(
						"ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
						isOpen && "rotate-180",
					)}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					aria-hidden="true"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</button>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={transition}
						className="overflow-hidden"
					>
						<p className="pb-5 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

export function PricingFaq({ className }: PricingFaqProps) {
	const shouldReduce = useReducedMotion();
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section className={cn("mx-auto w-full max-w-3xl px-6 py-20 sm:px-8", className)}>
			<MotionReveal direction="up" spring="gentle">
				<h2 className="mb-4 text-center font-display text-3xl font-bold text-foreground sm:text-4xl">
					Frequently asked questions
				</h2>
				<p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
					Everything you need to know about our pricing and plans.
				</p>
			</MotionReveal>

			<div>
				{faqs.map((faq, index) => (
					<FaqAccordionItem
						key={faq.question}
						item={faq}
						isOpen={openIndex === index}
						onToggle={() => setOpenIndex(openIndex === index ? null : index)}
						shouldReduce={shouldReduce}
					/>
				))}
			</div>
		</section>
	);
}
