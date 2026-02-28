import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "../pagination";

describe("Pagination", () => {
	it("renders pagination navigation", () => {
		render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
		expect(screen.getByLabelText("Pagination")).toBeInTheDocument();
	});

	it("marks current page", () => {
		render(<Pagination currentPage={3} totalPages={5} onPageChange={vi.fn()} />);
		expect(screen.getByText("3")).toHaveAttribute("aria-current", "page");
	});

	it("disables previous on first page", () => {
		render(<Pagination currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
		expect(screen.getByLabelText("Previous page")).toBeDisabled();
	});

	it("disables next on last page", () => {
		render(<Pagination currentPage={5} totalPages={5} onPageChange={vi.fn()} />);
		expect(screen.getByLabelText("Next page")).toBeDisabled();
	});

	it("calls onPageChange when page clicked", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<Pagination currentPage={1} totalPages={5} onPageChange={onChange} />);
		await user.click(screen.getByText("2"));
		expect(onChange).toHaveBeenCalledWith(2);
	});

	it("calls onPageChange for next button", async () => {
		const user = userEvent.setup();
		const onChange = vi.fn();
		render(<Pagination currentPage={2} totalPages={5} onPageChange={onChange} />);
		await user.click(screen.getByLabelText("Next page"));
		expect(onChange).toHaveBeenCalledWith(3);
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLElement>();
		render(<Pagination ref={ref} currentPage={1} totalPages={5} onPageChange={vi.fn()} />);
		expect(ref.current).toBeInstanceOf(HTMLElement);
	});
});
