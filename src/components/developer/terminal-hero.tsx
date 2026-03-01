"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MotionReveal } from "@/components/motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TERMINAL_LINES = [
	{ text: "$ npx clarity init --template api", delay: 40 },
	{ text: "", delay: 300 },
	{ text: "  Creating project structure...", delay: 20 },
	{ text: "  Installing dependencies...", delay: 20 },
	{ text: "  Configuring TypeScript strict mode...", delay: 20 },
	{ text: "  Setting up API routes...", delay: 20 },
	{ text: "", delay: 200 },
	{ text: "  \u2713 Project ready at ./my-api", delay: 30 },
	{ text: "  \u2713 Run `pnpm dev` to start", delay: 30 },
];

type TerminalHeroProps = {
	className?: string;
};

export function TerminalHero({ className }: TerminalHeroProps) {
	const shouldReduce = useReducedMotion();
	const [displayedLines, setDisplayedLines] = useState<string[]>([]);
	const [currentLineIndex, setCurrentLineIndex] = useState(0);
	const [currentCharIndex, setCurrentCharIndex] = useState(0);
	const [isTypingComplete, setIsTypingComplete] = useState(false);
	const [isInView, setIsInView] = useState(false);
	const terminalRef = useRef<HTMLDivElement>(null);

	// IntersectionObserver to detect when terminal is visible
	useEffect(() => {
		const el = terminalRef.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry?.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.3 },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	// If reduced motion, show all text immediately
	useEffect(() => {
		if (shouldReduce && isInView) {
			setDisplayedLines(TERMINAL_LINES.map((l) => l.text));
			setIsTypingComplete(true);
		}
	}, [shouldReduce, isInView]);

	// Typing animation
	useEffect(() => {
		if (shouldReduce || !isInView || isTypingComplete) return;
		if (currentLineIndex >= TERMINAL_LINES.length) {
			setIsTypingComplete(true);
			return;
		}

		const line = TERMINAL_LINES[currentLineIndex];
		if (!line) {
			setIsTypingComplete(true);
			return;
		}

		// Empty line or complete line
		if (line.text.length === 0 || currentCharIndex >= line.text.length) {
			const timer = setTimeout(
				() => {
					setDisplayedLines((prev) => {
						const next = [...prev];
						next[currentLineIndex] = line.text;
						return next;
					});
					setCurrentLineIndex((i) => i + 1);
					setCurrentCharIndex(0);
				},
				line.text.length === 0 ? line.delay : 50,
			);
			return () => clearTimeout(timer);
		}

		// Type character by character
		const timer = setTimeout(() => {
			setDisplayedLines((prev) => {
				const next = [...prev];
				next[currentLineIndex] = line.text.slice(0, currentCharIndex + 1);
				return next;
			});
			setCurrentCharIndex((c) => c + 1);
		}, line.delay);
		return () => clearTimeout(timer);
	}, [shouldReduce, isInView, isTypingComplete, currentLineIndex, currentCharIndex]);

	const getLineColor = useCallback((text: string) => {
		if (text.startsWith("$")) return "text-emerald-400";
		if (text.startsWith("  \u2713")) return "text-emerald-400";
		if (text.includes("...")) return "text-muted-foreground";
		return "text-foreground";
	}, []);

	return (
		<section className={cn("relative min-h-[90vh] flex items-center overflow-hidden", className)}>
			{/* Background grid pattern */}
			<div
				className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
				style={{
					backgroundImage:
						"linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
				aria-hidden="true"
			/>

			{/* Glow accent */}
			<div
				className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
				style={{
					background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
				}}
				aria-hidden="true"
			/>

			<div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-8">
				<MotionReveal direction="up" spring="gentle">
					<Badge variant="info" className="mb-6">
						Developer Platform
					</Badge>
				</MotionReveal>

				<MotionReveal direction="up" spring="gentle" delay={0.1}>
					<h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
						Ship APIs in minutes,
						<br />
						not <span className="text-primary">months</span>.
					</h1>
				</MotionReveal>

				<MotionReveal direction="up" spring="gentle" delay={0.2}>
					<p className="mt-6 max-w-xl text-lg text-muted-foreground">
						A complete developer platform with type-safe APIs, real-time monitoring, and
						production-grade infrastructure out of the box.
					</p>
				</MotionReveal>

				{/* Terminal window */}
				<MotionReveal direction="up" spring="default" delay={0.3}>
					<div
						ref={terminalRef}
						className="mt-10 overflow-hidden rounded-lg border border-border bg-[#0d0b14] shadow-xl"
					>
						{/* Title bar */}
						<div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
							<span className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden="true" />
							<span className="h-3 w-3 rounded-full bg-yellow-500/80" aria-hidden="true" />
							<span className="h-3 w-3 rounded-full bg-emerald-500/80" aria-hidden="true" />
							<span className="ml-3 text-xs text-muted-foreground font-mono">terminal</span>
						</div>

						{/* Terminal body */}
						<div
							className="p-5 font-mono text-sm leading-relaxed min-h-[260px]"
							role="img"
							aria-label="Terminal showing CLI initialization of a Clarity API project"
						>
							{displayedLines.map((line, i) => (
								<div
									key={`line-${TERMINAL_LINES[i]?.text.slice(0, 10) ?? i}-${i}`}
									className={cn("whitespace-pre", getLineColor(line))}
								>
									{line || "\u00A0"}
								</div>
							))}
							{!isTypingComplete && (
								<span
									className="inline-block h-4 w-2 bg-emerald-400 animate-[blink_1s_step-end_infinite]"
									aria-hidden="true"
								/>
							)}
						</div>
					</div>
				</MotionReveal>

				{/* CTAs */}
				<MotionReveal direction="up" spring="gentle" delay={0.4}>
					<div className="mt-8 flex flex-wrap gap-4">
						<Button size="lg">Get Started</Button>
						<Button variant="outline" size="lg">
							Read the Docs
						</Button>
					</div>
				</MotionReveal>
			</div>
		</section>
	);
}
