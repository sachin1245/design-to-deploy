"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
	code: string;
	language?: string;
	className?: string;
};

function tokenize(line: string) {
	const tokens: { text: string; className: string }[] = [];
	// Simple token-based coloring for bash/json/yaml snippets
	const patterns: [RegExp, string][] = [
		// Comments
		[/^(#.*)$/, "text-muted-foreground"],
		[/^(\/\/.*)$/, "text-muted-foreground"],
		// Strings (double and single quotes)
		[/"[^"]*"/, "text-emerald-400 dark:text-emerald-300"],
		[/'[^']*'/, "text-emerald-400 dark:text-emerald-300"],
		// Keywords / commands
		[
			/\b(import|from|export|const|let|function|return|if|else|true|false|null|type|run|glob|stage_fixed)\b/,
			"text-primary",
		],
		// Flags
		[/\s(--?\w[\w-]*)/, "text-amber-400 dark:text-amber-300"],
		// Numbers
		[/\b(\d+)\b/, "text-amber-400 dark:text-amber-300"],
	];

	let remaining = line;
	while (remaining.length > 0) {
		let matched = false;
		for (const [pattern, cls] of patterns) {
			const match = remaining.match(pattern);
			if (match?.index !== undefined) {
				// Add text before the match
				if (match.index > 0) {
					tokens.push({
						text: remaining.slice(0, match.index),
						className: "text-foreground",
					});
				}
				tokens.push({ text: match[0], className: cls });
				remaining = remaining.slice(match.index + match[0].length);
				matched = true;
				break;
			}
		}
		if (!matched) {
			tokens.push({ text: remaining, className: "text-foreground" });
			break;
		}
	}
	return tokens;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(code).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	}, [code]);

	const lines = code.split("\n");

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-lg border border-border/60 bg-[#0f0d15] dark:bg-[#0a0812]",
				className,
			)}
		>
			{/* Header bar */}
			<div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
				<div className="flex items-center gap-1.5">
					<span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
					<span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
					<span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
				</div>
				{language && (
					<span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
						{language}
					</span>
				)}
			</div>

			{/* Code content */}
			<div className="overflow-x-auto p-4">
				<pre className="font-mono text-[13px] leading-relaxed">
					{lines.map((line, i) => (
						<div key={`${i}-${line.slice(0, 20)}`} className="whitespace-pre">
							{line === ""
								? "\u00A0"
								: tokenize(line).map((token, j) => (
										<span key={`${j}-${token.text.slice(0, 10)}`} className={token.className}>
											{token.text}
										</span>
									))}
						</div>
					))}
				</pre>
			</div>

			{/* Copy button */}
			<button
				type="button"
				onClick={handleCopy}
				className={cn(
					"absolute right-2 top-10 rounded-md px-2.5 py-1 font-mono text-xs transition-all",
					"opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
					copied
						? "bg-emerald-500/20 text-emerald-300"
						: "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80",
				)}
				aria-label={copied ? "Copied to clipboard" : "Copy code"}
			>
				{copied ? "Copied!" : "Copy"}
			</button>
		</div>
	);
}
