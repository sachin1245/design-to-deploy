"use client";

import { motion, useReducedMotion } from "motion/react";
import { createStaggerContainer, fadeInUp, reducedMotionTransition, springs } from "@/lib/motion";
import { cn } from "@/lib/utils";

const CODE_LINES = [
	{ content: "// api/users/route.ts", color: "text-muted-foreground" },
	{ content: "import", color: "text-primary" },
	{ content: " { NextRequest, NextResponse }", color: "text-foreground" },
	{ content: " from ", color: "text-primary" },
	{ content: '"next/server"', color: "text-emerald-400" },
	{ content: "", color: "" },
	{ content: "export async function", color: "text-primary" },
	{ content: " GET", color: "text-amber-400" },
	{ content: "(req: NextRequest) {", color: "text-foreground" },
	{ content: "  const users = await", color: "text-primary" },
	{ content: " db.user.findMany", color: "text-amber-400" },
	{ content: "({", color: "text-foreground" },
	{ content: '    orderBy: { createdAt: "desc" },', color: "text-foreground" },
	{ content: "    take: 20,", color: "text-foreground" },
	{ content: "  })", color: "text-foreground" },
	{ content: "", color: "" },
	{ content: "  return", color: "text-primary" },
	{ content: " NextResponse.json", color: "text-amber-400" },
	{ content: "(users)", color: "text-foreground" },
	{ content: "}", color: "text-foreground" },
];

// Merge tokens into lines for display
function buildDisplayLines() {
	const lines: { tokens: { content: string; color: string }[] }[] = [];
	let currentLine: { content: string; color: string }[] = [];

	for (const token of CODE_LINES) {
		if (token.content === "" && token.color === "") {
			lines.push({
				tokens: currentLine.length > 0 ? currentLine : [{ content: "\u00A0", color: "" }],
			});
			currentLine = [];
		} else {
			currentLine.push(token);
		}
	}
	if (currentLine.length > 0) {
		lines.push({ tokens: currentLine });
	}
	return lines;
}

const DISPLAY_LINES = buildDisplayLines();

type CodeRevealProps = {
	className?: string;
};

export function CodeReveal({ className }: CodeRevealProps) {
	const shouldReduce = useReducedMotion();

	const containerVariants = shouldReduce
		? { hidden: {}, visible: {} }
		: createStaggerContainer(0.08, 0.1);

	const itemTransition = shouldReduce ? reducedMotionTransition : springs.gentle;

	return (
		<section className={cn("py-24 sm:py-32", className)}>
			<div className="mx-auto max-w-6xl px-6 sm:px-8">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={containerVariants}
					className="grid gap-12 lg:grid-cols-2 lg:items-center"
				>
					{/* Text content */}
					<div>
						<motion.h2
							className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
							variants={fadeInUp}
							transition={itemTransition}
						>
							Type-safe from <span className="text-primary">endpoint to edge</span>
						</motion.h2>
						<motion.p
							className="mt-4 text-lg text-muted-foreground"
							variants={fadeInUp}
							transition={itemTransition}
						>
							Full TypeScript inference across your entire API surface. Define once, get
							autocomplete everywhere — from route handlers to client-side data fetching.
						</motion.p>
					</div>

					{/* Code block */}
					<motion.div
						variants={fadeInUp}
						transition={itemTransition}
						className="overflow-hidden rounded-lg border border-border bg-[#0d0b14] shadow-lg"
					>
						{/* File tab */}
						<div className="flex items-center border-b border-border/50 px-4 py-2">
							<span className="rounded bg-secondary/50 px-3 py-1 text-xs font-mono text-muted-foreground">
								api/users/route.ts
							</span>
						</div>

						{/* Code content */}
						<motion.div
							className="p-5 font-mono text-sm leading-relaxed"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, amount: 0.3 }}
							variants={
								shouldReduce ? { hidden: {}, visible: {} } : createStaggerContainer(0.06, 0.2)
							}
						>
							{DISPLAY_LINES.map((line) => {
								const lineKey = line.tokens.map((t) => t.content).join("");
								return (
									<motion.div
										key={lineKey}
										variants={fadeInUp}
										transition={itemTransition}
										className="whitespace-pre"
									>
										{line.tokens.map((token) => (
											<span key={`${lineKey}-${token.content}`} className={token.color}>
												{token.content}
											</span>
										))}
									</motion.div>
								);
							})}
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
