import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement, createRef, forwardRef, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

// ── Mock motion/react ───────────────────────────────────────────────
vi.mock("motion/react", () => ({
	motion: new Proxy(
		{},
		{
			get: (_target, prop: string) => {
				const Component = forwardRef((props: Record<string, unknown>, ref: unknown) => {
					const htmlProps: Record<string, unknown> = {};
					for (const [key, value] of Object.entries(props)) {
						if (
							!key.startsWith("while") &&
							!key.startsWith("animate") &&
							![
								"initial",
								"exit",
								"variants",
								"transition",
								"viewport",
								"whileInView",
								"layout",
								"layoutId",
								"custom",
							].includes(key)
						) {
							htmlProps[key] = value;
						}
					}
					return createElement(prop, { ...htmlProps, ref });
				});
				Component.displayName = `motion.${prop}`;
				return Component;
			},
		},
	),
	useReducedMotion: () => false,
	AnimatePresence: ({ children }: { children: ReactNode }) => children,
}));

import { DatePicker } from "../date-picker";

describe("DatePicker", () => {
	it("renders with default placeholder", () => {
		render(<DatePicker />);
		expect(screen.getByRole("combobox")).toBeInTheDocument();
		expect(screen.getByText("Pick a date")).toBeInTheDocument();
	});

	it("renders with custom placeholder", () => {
		render(<DatePicker placeholder="Select date" />);
		expect(screen.getByText("Select date")).toBeInTheDocument();
	});

	it("renders with label", () => {
		render(<DatePicker label="Start date" />);
		expect(screen.getByText("Start date")).toBeInTheDocument();
	});

	it("renders error message", () => {
		render(<DatePicker label="Date" error="Required" />);
		expect(screen.getByText("Required")).toBeInTheDocument();
	});

	it("sets aria-invalid on error", () => {
		render(<DatePicker error="Bad" />);
		expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
	});

	it("opens calendar on click", async () => {
		const user = userEvent.setup();
		render(<DatePicker />);
		await user.click(screen.getByRole("combobox"));
		expect(screen.getByRole("dialog")).toBeInTheDocument();
		expect(screen.getByRole("grid")).toBeInTheDocument();
	});

	it("shows current month and year in header", async () => {
		const user = userEvent.setup();
		render(<DatePicker />);
		await user.click(screen.getByRole("combobox"));

		const now = new Date();
		const months = [
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
		];
		const expected = `${months[now.getMonth()]} ${now.getFullYear()}`;
		expect(screen.getByText(expected)).toBeInTheDocument();
	});

	it("displays day-of-week headers", async () => {
		const user = userEvent.setup();
		render(<DatePicker />);
		await user.click(screen.getByRole("combobox"));

		for (const day of ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]) {
			expect(screen.getByText(day)).toBeInTheDocument();
		}
	});

	it("selects a date and closes calendar", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();
		render(<DatePicker onChange={handleChange} />);

		await user.click(screen.getByRole("combobox"));
		const day15 = screen.getByRole("gridcell", { name: /15,/ });
		await user.click(day15);

		expect(handleChange).toHaveBeenCalledTimes(1);
		const selectedDate = handleChange.mock.calls[0]?.[0] as Date;
		expect(selectedDate.getDate()).toBe(15);
		// Calendar should be closed
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("displays selected date in trigger", async () => {
		const user = userEvent.setup();
		render(<DatePicker defaultValue={new Date(2026, 2, 15)} />);

		expect(screen.getByText("March 15, 2026")).toBeInTheDocument();

		// Open and verify the calendar shows March 2026
		await user.click(screen.getByRole("combobox"));
		expect(screen.getByText("March 2026")).toBeInTheDocument();
	});

	it("navigates to previous month", async () => {
		const user = userEvent.setup();
		render(<DatePicker defaultValue={new Date(2026, 2, 15)} />);

		await user.click(screen.getByRole("combobox"));
		await user.click(screen.getByRole("button", { name: "Previous month" }));

		expect(screen.getByText("February 2026")).toBeInTheDocument();
	});

	it("navigates to next month", async () => {
		const user = userEvent.setup();
		render(<DatePicker defaultValue={new Date(2026, 2, 15)} />);

		await user.click(screen.getByRole("combobox"));
		await user.click(screen.getByRole("button", { name: "Next month" }));

		expect(screen.getByText("April 2026")).toBeInTheDocument();
	});

	it("wraps year when navigating past December", async () => {
		const user = userEvent.setup();
		render(<DatePicker defaultValue={new Date(2026, 11, 1)} />);

		await user.click(screen.getByRole("combobox"));
		expect(screen.getByText("December 2026")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Next month" }));
		expect(screen.getByText("January 2027")).toBeInTheDocument();
	});

	it("wraps year when navigating before January", async () => {
		const user = userEvent.setup();
		render(<DatePicker defaultValue={new Date(2026, 0, 1)} />);

		await user.click(screen.getByRole("combobox"));
		expect(screen.getByText("January 2026")).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Previous month" }));
		expect(screen.getByText("December 2025")).toBeInTheDocument();
	});

	it("disables dates before min", async () => {
		const user = userEvent.setup();
		render(<DatePicker defaultValue={new Date(2026, 2, 15)} min={new Date(2026, 2, 10)} />);

		await user.click(screen.getByRole("combobox"));
		const day5 = screen.getByRole("gridcell", { name: /March 5, 2026/ });
		expect(day5).toBeDisabled();
	});

	it("disables dates after max", async () => {
		const user = userEvent.setup();
		render(<DatePicker defaultValue={new Date(2026, 2, 15)} max={new Date(2026, 2, 20)} />);

		await user.click(screen.getByRole("combobox"));
		const day25 = screen.getByRole("gridcell", { name: /March 25, 2026/ });
		expect(day25).toBeDisabled();
	});

	it("closes on Escape key", async () => {
		const user = userEvent.setup();
		render(<DatePicker />);
		await user.click(screen.getByRole("combobox"));
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		await user.keyboard("{Escape}");
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("Today button selects today", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();
		render(<DatePicker onChange={handleChange} />);

		await user.click(screen.getByRole("combobox"));
		await user.click(screen.getByText("Today"));

		const selectedDate = handleChange.mock.calls[0]?.[0] as Date;
		const today = new Date();
		expect(selectedDate.getDate()).toBe(today.getDate());
		expect(selectedDate.getMonth()).toBe(today.getMonth());
	});

	it("Clear button removes selection", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();
		render(<DatePicker defaultValue={new Date(2026, 2, 15)} onChange={handleChange} />);

		expect(screen.getByText("March 15, 2026")).toBeInTheDocument();

		await user.click(screen.getByRole("combobox"));
		await user.click(screen.getByText("Clear"));

		expect(handleChange).toHaveBeenCalledWith(undefined);
		expect(screen.getByText("Pick a date")).toBeInTheDocument();
	});

	it("disabled state prevents opening", async () => {
		const user = userEvent.setup();
		render(<DatePicker disabled />);

		const trigger = screen.getByRole("combobox");
		expect(trigger).toBeDisabled();
		await user.click(trigger);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it("forwards ref to root container", () => {
		const ref = createRef<HTMLDivElement>();
		render(<DatePicker ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts custom className", () => {
		const ref = createRef<HTMLDivElement>();
		render(<DatePicker ref={ref} className="extra-class" />);
		expect(ref.current?.className).toContain("extra-class");
	});

	it("controlled value updates display", () => {
		const { rerender } = render(<DatePicker value={new Date(2026, 0, 1)} />);
		expect(screen.getByText("January 1, 2026")).toBeInTheDocument();

		rerender(<DatePicker value={new Date(2026, 5, 20)} />);
		expect(screen.getByText("June 20, 2026")).toBeInTheDocument();
	});

	it("has proper aria-expanded state", async () => {
		const user = userEvent.setup();
		render(<DatePicker />);

		const trigger = screen.getByRole("combobox");
		expect(trigger).toHaveAttribute("aria-expanded", "false");

		await user.click(trigger);
		expect(trigger).toHaveAttribute("aria-expanded", "true");
	});

	it("closes calendar on outside click", async () => {
		const user = userEvent.setup();
		render(
			<div>
				<DatePicker />
				<button type="button">Outside</button>
			</div>,
		);

		await user.click(screen.getByRole("combobox"));
		expect(screen.getByRole("dialog")).toBeInTheDocument();

		await user.click(screen.getByText("Outside"));
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});
});
