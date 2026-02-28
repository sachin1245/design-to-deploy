"use client";

import { forwardRef, type HTMLAttributes, type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type AccordionItemData = {
	value: string;
	trigger: ReactNode;
	content: ReactNode;
};

type AccordionProps = HTMLAttributes<HTMLDivElement> & {
	items: AccordionItemData[];
	type?: "single" | "multiple";
	defaultValue?: string[];
};

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
	({ className, items, type = "single", defaultValue = [], ...props }, ref) => {
		const [openItems, setOpenItems] = useState<string[]>(defaultValue);

		const toggle = (value: string) => {
			if (type === "single") {
				setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
			} else {
				setOpenItems((prev) =>
					prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
				);
			}
		};

		return (
			<div ref={ref} className={cn("w-full divide-y divide-border", className)} {...props}>
				{items.map((item) => {
					const isOpen = openItems.includes(item.value);
					return (
						<div key={item.value}>
							<button
								type="button"
								onClick={() => toggle(item.value)}
								className="flex w-full items-center justify-between py-4 text-sm font-medium text-foreground transition-colors hover:text-foreground/80"
								aria-expanded={isOpen}
							>
								<span>{item.trigger}</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className={cn(
										"h-4 w-4 shrink-0 text-muted-foreground transition-transform",
										isOpen && "rotate-180",
									)}
									aria-hidden="true"
								>
									<path d="m6 9 6 6 6-6" />
								</svg>
							</button>
							{isOpen && <div className="pb-4 text-sm text-muted-foreground">{item.content}</div>}
						</div>
					);
				})}
			</div>
		);
	},
);
Accordion.displayName = "Accordion";

export { Accordion };
export type { AccordionProps, AccordionItemData };
