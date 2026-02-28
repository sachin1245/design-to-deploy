"use client";

import {
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "@/lib/utils";

type CommandItem = {
	id: string;
	label: string;
	icon?: ReactNode;
	shortcut?: string;
	onSelect: () => void;
};

type CommandGroup = {
	heading: string;
	items: CommandItem[];
};

type CommandPaletteProps = HTMLAttributes<HTMLDivElement> & {
	open: boolean;
	onClose: () => void;
	groups: CommandGroup[];
	placeholder?: string;
};

const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
	({ className, open, onClose, groups, placeholder = "Search commands...", ...props }, ref) => {
		const [query, setQuery] = useState("");
		const [activeIndex, setActiveIndex] = useState(0);
		const inputRef = useRef<HTMLInputElement>(null);

		const filtered = groups
			.map((group) => ({
				...group,
				items: group.items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
			}))
			.filter((group) => group.items.length > 0);

		const allItems = filtered.flatMap((g) => g.items);

		useEffect(() => {
			if (open) {
				setQuery("");
				setActiveIndex(0);
				setTimeout(() => inputRef.current?.focus(), 0);
			}
		}, [open]);

		useEffect(() => {
			if (!open) return;
			const handleKey = (e: KeyboardEvent) => {
				if (e.key === "Escape") {
					onClose();
				} else if (e.key === "ArrowDown") {
					e.preventDefault();
					setActiveIndex((i) => (i + 1) % Math.max(1, allItems.length));
				} else if (e.key === "ArrowUp") {
					e.preventDefault();
					setActiveIndex((i) => (i - 1 + allItems.length) % Math.max(1, allItems.length));
				} else if (e.key === "Enter" && allItems[activeIndex]) {
					e.preventDefault();
					allItems[activeIndex].onSelect();
					onClose();
				}
			};
			document.addEventListener("keydown", handleKey);
			return () => document.removeEventListener("keydown", handleKey);
		});

		// biome-ignore lint/correctness/useExhaustiveDependencies: reset index when query changes; setActiveIndex is stable
		useEffect(() => {
			setActiveIndex(0);
		}, [query]);

		if (!open) return null;

		let itemIndex = -1;

		return (
			<>
				<div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} aria-hidden="true" />
				<div
					ref={ref}
					role="dialog"
					aria-modal="true"
					aria-label="Command palette"
					className={cn(
						"fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 rounded-xl border border-border bg-card shadow-2xl",
						className,
					)}
					{...props}
				>
					<div className="flex items-center border-b border-border px-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-4 w-4 shrink-0 text-muted-foreground"
							aria-hidden="true"
						>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
						<input
							ref={inputRef}
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder={placeholder}
							className="flex h-11 w-full bg-transparent py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
						/>
					</div>
					<div className="max-h-72 overflow-y-auto p-1">
						{filtered.length === 0 ? (
							<p className="py-6 text-center text-sm text-muted-foreground">No results found.</p>
						) : (
							filtered.map((group) => (
								<div key={group.heading}>
									<p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
										{group.heading}
									</p>
									{group.items.map((item) => {
										itemIndex++;
										const isActive = itemIndex === activeIndex;
										const currentIndex = itemIndex;
										return (
											<button
												key={item.id}
												type="button"
												onClick={() => {
													item.onSelect();
													onClose();
												}}
												onMouseEnter={() => setActiveIndex(currentIndex)}
												className={cn(
													"flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
													isActive
														? "bg-secondary text-foreground"
														: "text-muted-foreground hover:bg-secondary/50",
												)}
											>
												{item.icon && <span className="shrink-0">{item.icon}</span>}
												<span className="flex-1 text-left">{item.label}</span>
												{item.shortcut && (
													<kbd className="ml-auto text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
														{item.shortcut}
													</kbd>
												)}
											</button>
										);
									})}
								</div>
							))
						)}
					</div>
				</div>
			</>
		);
	},
);
CommandPalette.displayName = "CommandPalette";

export { CommandPalette };
export type { CommandPaletteProps, CommandGroup, CommandItem };
