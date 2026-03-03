"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
	forwardRef,
	type KeyboardEvent,
	type MouseEvent,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { springs } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Date Helpers ───────────────────────────────────────────────────

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
] as const;

function getDaysInMonth(year: number, month: number): number {
	return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
	return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function isToday(date: Date): boolean {
	return isSameDay(date, new Date());
}

function formatDate(date: Date): string {
	return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// ─── Types ──────────────────────────────────────────────────────────

type DatePickerProps = {
	/** Currently selected date (controlled). */
	value?: Date;
	/** Default date for uncontrolled usage. */
	defaultValue?: Date;
	/** Fires when the user picks or clears a date. */
	onChange?: (date: Date | undefined) => void;
	/** Label text rendered above the trigger. */
	label?: string;
	/** Error message rendered below the trigger. */
	error?: string;
	/** Placeholder when no date is selected. */
	placeholder?: string;
	/** Disables all interaction. */
	disabled?: boolean;
	/** Earliest selectable date. */
	min?: Date;
	/** Latest selectable date. */
	max?: Date;
	/** Extra classes on the root wrapper. */
	className?: string;
};

// ─── Motion Variants ────────────────────────────────────────────────

const calendarVariants = {
	hidden: { opacity: 0, scale: 0.96, y: -4 },
	visible: { opacity: 1, scale: 1, y: 0 },
	exit: { opacity: 0, scale: 0.96, y: -4 },
};

const monthSlideVariants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 80 : -80,
		opacity: 0,
	}),
	center: { x: 0, opacity: 1 },
	exit: (direction: number) => ({
		x: direction > 0 ? -80 : 80,
		opacity: 0,
	}),
};

// ─── Sub-components ─────────────────────────────────────────────────

function ChevronLeft() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path
				d="M10 12L6 8L10 4"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ChevronRight() {
	return (
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path
				d="M6 4L10 8L6 12"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function CalendarIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
			className="shrink-0"
		>
			<rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
			<path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.25" />
			<path d="M5.5 1.5V4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
			<path d="M10.5 1.5V4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
		</svg>
	);
}

// ─── DatePicker ─────────────────────────────────────────────────────

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
	(
		{
			value: controlledValue,
			defaultValue,
			onChange,
			label,
			error,
			placeholder = "Pick a date",
			disabled = false,
			min,
			max,
			className,
		},
		ref,
	) => {
		const uid = useId();
		const pickerId = label ? `datepicker-${uid}` : undefined;
		const shouldReduce = useReducedMotion();

		// ── State ──
		const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue);
		const selected = controlledValue ?? internalValue;

		const [open, setOpen] = useState(false);
		const [viewYear, setViewYear] = useState(() => (selected ?? new Date()).getFullYear());
		const [viewMonth, setViewMonth] = useState(() => (selected ?? new Date()).getMonth());
		const [slideDirection, setSlideDirection] = useState(0);
		const [focusedDay, setFocusedDay] = useState<number | null>(null);

		const containerRef = useRef<HTMLDivElement | null>(null);
		const triggerRef = useRef<HTMLButtonElement>(null);
		const gridRef = useRef<HTMLDivElement>(null);

		// ── Derived ──
		const daysInMonth = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewYear, viewMonth]);
		const firstDay = useMemo(() => getFirstDayOfMonth(viewYear, viewMonth), [viewYear, viewMonth]);

		const monthKey = `${viewYear}-${viewMonth}`;

		// ── Callbacks ──
		const selectDate = useCallback(
			(day: number) => {
				const date = new Date(viewYear, viewMonth, day);
				setInternalValue(date);
				onChange?.(date);
				setOpen(false);
				triggerRef.current?.focus();
			},
			[viewYear, viewMonth, onChange],
		);

		const navigateMonth = useCallback((delta: number) => {
			setSlideDirection(delta);
			setViewMonth((prev) => {
				let next = prev + delta;
				if (next < 0) {
					setViewYear((y) => y - 1);
					next = 11;
				} else if (next > 11) {
					setViewYear((y) => y + 1);
					next = 0;
				}
				return next;
			});
			setFocusedDay(null);
		}, []);

		const isDayDisabled = useCallback(
			(day: number) => {
				const date = new Date(viewYear, viewMonth, day);
				if (min && date < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
				if (max && date > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
				return false;
			},
			[viewYear, viewMonth, min, max],
		);

		// ── Close on outside click ──
		useEffect(() => {
			if (!open) return;
			const handleClick = (e: globalThis.MouseEvent) => {
				if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
					setOpen(false);
				}
			};
			document.addEventListener("mousedown", handleClick);
			return () => document.removeEventListener("mousedown", handleClick);
		}, [open]);

		// ── Sync view when selected date changes externally ──
		useEffect(() => {
			if (selected) {
				setViewYear(selected.getFullYear());
				setViewMonth(selected.getMonth());
			}
		}, [selected]);

		// ── Keyboard nav on trigger ──
		const handleTriggerKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				setOpen((prev) => !prev);
			} else if (e.key === "Escape" && open) {
				e.preventDefault();
				setOpen(false);
			}
		};

		// ── Keyboard nav inside calendar ──
		const handleGridKeyDown = (e: KeyboardEvent) => {
			const current = focusedDay ?? selected?.getDate() ?? 1;

			switch (e.key) {
				case "ArrowRight": {
					e.preventDefault();
					const next = current + 1;
					if (next > daysInMonth) {
						navigateMonth(1);
						setFocusedDay(1);
					} else {
						setFocusedDay(next);
					}
					break;
				}
				case "ArrowLeft": {
					e.preventDefault();
					const next = current - 1;
					if (next < 1) {
						navigateMonth(-1);
						// Focus last day of previous month — deferred since month changes async
						const prevDays = getDaysInMonth(
							viewMonth === 0 ? viewYear - 1 : viewYear,
							viewMonth === 0 ? 11 : viewMonth - 1,
						);
						setFocusedDay(prevDays);
					} else {
						setFocusedDay(next);
					}
					break;
				}
				case "ArrowDown": {
					e.preventDefault();
					const next = current + 7;
					if (next > daysInMonth) {
						navigateMonth(1);
						setFocusedDay(next - daysInMonth);
					} else {
						setFocusedDay(next);
					}
					break;
				}
				case "ArrowUp": {
					e.preventDefault();
					const next = current - 7;
					if (next < 1) {
						navigateMonth(-1);
						const prevDays = getDaysInMonth(
							viewMonth === 0 ? viewYear - 1 : viewYear,
							viewMonth === 0 ? 11 : viewMonth - 1,
						);
						setFocusedDay(prevDays + next);
					} else {
						setFocusedDay(next);
					}
					break;
				}
				case "Enter":
				case " ": {
					e.preventDefault();
					if (current >= 1 && current <= daysInMonth && !isDayDisabled(current)) {
						selectDate(current);
					}
					break;
				}
				case "Escape": {
					e.preventDefault();
					setOpen(false);
					triggerRef.current?.focus();
					break;
				}
				case "Home": {
					e.preventDefault();
					setFocusedDay(1);
					break;
				}
				case "End": {
					e.preventDefault();
					setFocusedDay(daysInMonth);
					break;
				}
			}
		};

		// ── Focus management: focus grid when calendar opens ──
		useEffect(() => {
			if (open) {
				// Small delay for AnimatePresence to mount the element
				const timer = setTimeout(() => gridRef.current?.focus(), 50);
				return () => clearTimeout(timer);
			}
		}, [open]);

		// ── Animation config ──
		const springTransition = shouldReduce ? { duration: 0 } : springs.snappy;
		const monthTransition = shouldReduce ? { duration: 0 } : { ...springs.default, duration: 0.25 };

		// ── Build day cells ──
		const dayCells = useMemo(() => {
			const cells: (number | null)[] = [];
			for (let i = 0; i < firstDay; i++) cells.push(null);
			for (let d = 1; d <= daysInMonth; d++) cells.push(d);
			return cells;
		}, [firstDay, daysInMonth]);

		return (
			<div
				ref={(node) => {
					containerRef.current = node;
					if (typeof ref === "function") ref(node);
					else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
				}}
				className={cn("relative inline-flex w-full max-w-xs flex-col gap-1.5", className)}
			>
				{/* Label */}
				{label && (
					<label htmlFor={pickerId} className="text-sm font-medium text-foreground">
						{label}
					</label>
				)}

				{/* Trigger button */}
				<button
					ref={triggerRef}
					id={pickerId}
					type="button"
					role="combobox"
					disabled={disabled}
					aria-expanded={open}
					aria-haspopup="dialog"
					aria-invalid={error ? true : undefined}
					aria-describedby={error && pickerId ? `${pickerId}-error` : undefined}
					aria-label={label ? undefined : placeholder}
					onClick={(e: MouseEvent) => {
						e.preventDefault();
						setOpen((prev) => !prev);
					}}
					onKeyDown={handleTriggerKeyDown}
					className={cn(
						"flex h-10 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground transition-all",
						"hover:border-ring/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
						"disabled:cursor-not-allowed disabled:opacity-50",
						error && "border-destructive focus-visible:ring-destructive",
						open && "ring-2 ring-ring ring-offset-2 ring-offset-background",
					)}
				>
					<CalendarIcon />
					<span className={cn("flex-1 truncate text-left", !selected && "text-muted-foreground")}>
						{selected ? formatDate(selected) : placeholder}
					</span>
					<motion.svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						aria-hidden="true"
						className="shrink-0 text-muted-foreground"
						animate={{ rotate: open ? 180 : 0 }}
						transition={springTransition}
					>
						<path
							d="M3 4.5L6 7.5L9 4.5"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</motion.svg>
				</button>

				{/* Error message */}
				{error && (
					<p id={pickerId ? `${pickerId}-error` : undefined} className="text-sm text-destructive">
						{error}
					</p>
				)}

				{/* Calendar dropdown */}
				<AnimatePresence>
					{open && (
						<motion.div
							role="dialog"
							aria-label="Choose date"
							aria-modal="true"
							variants={calendarVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							transition={springTransition}
							className={cn(
								"absolute top-full left-0 z-50 mt-2 w-[304px] rounded-xl border border-border bg-popover p-3 shadow-xl",
								"origin-top-left",
							)}
						>
							{/* Calendar header */}
							<div className="mb-2 flex items-center justify-between">
								<button
									type="button"
									aria-label="Previous month"
									onClick={() => navigateMonth(-1)}
									className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								>
									<ChevronLeft />
								</button>

								<div className="relative h-6 flex-1 overflow-hidden">
									<AnimatePresence custom={slideDirection} mode="popLayout">
										<motion.span
											key={monthKey}
											custom={slideDirection}
											variants={monthSlideVariants}
											initial="enter"
											animate="center"
											exit="exit"
											transition={monthTransition}
											className="absolute inset-0 flex items-center justify-center font-display text-sm font-semibold text-foreground"
										>
											{MONTHS[viewMonth]} {viewYear}
										</motion.span>
									</AnimatePresence>
								</div>

								<button
									type="button"
									aria-label="Next month"
									onClick={() => navigateMonth(1)}
									className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
								>
									<ChevronRight />
								</button>
							</div>

							{/* Day-of-week headers */}
							<div className="mb-1 grid grid-cols-7 gap-0" aria-hidden="true">
								{DAYS.map((day) => (
									<div
										key={day}
										className="flex h-8 items-center justify-center text-xs font-medium text-muted-foreground"
									>
										{day}
									</div>
								))}
							</div>

							{/* Day grid */}
							{/* biome-ignore lint/a11y/useSemanticElements: CSS grid layout requires div, not table */}
							<div
								ref={gridRef}
								role="grid"
								aria-label={`${MONTHS[viewMonth]} ${viewYear}`}
								tabIndex={0}
								onKeyDown={handleGridKeyDown}
								className="grid grid-cols-7 gap-0 focus-visible:outline-none"
							>
								{dayCells.map((day, index) => {
									if (day === null) {
										// biome-ignore lint/suspicious/noArrayIndexKey: empty padding cells are positionally stable
										return <div key={`empty-${index}`} className="h-9 w-full" />;
									}

									const date = new Date(viewYear, viewMonth, day);
									const isSelected = selected ? isSameDay(date, selected) : false;
									const isTodayDate = isToday(date);
									const isDisabled = isDayDisabled(day);
									const isFocused = focusedDay === day;

									const canAnimate = !isDisabled && !shouldReduce;

									return (
										<motion.button
											key={day}
											type="button"
											role="gridcell"
											aria-selected={isSelected}
											aria-disabled={isDisabled || undefined}
											aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}`}
											aria-current={isTodayDate ? "date" : undefined}
											data-focused={isFocused || undefined}
											disabled={isDisabled}
											tabIndex={-1}
											onClick={() => !isDisabled && selectDate(day)}
											{...(canAnimate && { whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } })}
											transition={springTransition}
											className={cn(
												"relative flex h-9 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors",
												"focus-visible:outline-none",
												// Default state
												!isSelected && !isTodayDate && "text-foreground hover:bg-secondary",
												// Today (not selected)
												isTodayDate &&
													!isSelected &&
													"bg-accent/15 font-bold text-accent-foreground ring-1 ring-accent/40",
												// Selected
												isSelected && "bg-primary text-primary-foreground shadow-sm",
												// Disabled
												isDisabled &&
													"cursor-not-allowed text-muted-foreground opacity-40 hover:bg-transparent",
												// Keyboard focus ring
												isFocused && "ring-2 ring-ring ring-offset-1 ring-offset-popover",
											)}
										>
											{day}
										</motion.button>
									);
								})}
							</div>

							{/* Footer: Today shortcut */}
							<div className="mt-2 flex items-center justify-between border-t border-border pt-2">
								<button
									type="button"
									onClick={() => {
										const today = new Date();
										setViewYear(today.getFullYear());
										setViewMonth(today.getMonth());
										selectDate(today.getDate());
									}}
									className="text-xs font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:underline"
								>
									Today
								</button>
								{selected && (
									<button
										type="button"
										onClick={() => {
											setInternalValue(undefined);
											onChange?.(undefined);
											setOpen(false);
											triggerRef.current?.focus();
										}}
										className="text-xs font-medium text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:underline"
									>
										Clear
									</button>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		);
	},
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
export type { DatePickerProps };
