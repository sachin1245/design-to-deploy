import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { TestComp } from "../test-comp";

describe("TestComp", () => {
	it("renders with default props", () => {
		render(<TestComp>Hello</TestComp>);
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("renders each variant correctly", () => {
		const variants = ["default", "highlight", "muted"] as const;

		for (const variant of variants) {
			const { unmount } = render(<TestComp variant={variant}>{variant}</TestComp>);
			expect(screen.getByText(variant)).toBeInTheDocument();
			unmount();
		}
	});

	it("renders each size correctly", () => {
		const sizes = ["sm", "md", "lg"] as const;

		for (const size of sizes) {
			const { unmount } = render(<TestComp size={size}>{size}</TestComp>);
			expect(screen.getByText(size)).toBeInTheDocument();
			unmount();
		}
	});

	it("handles click events", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<TestComp onClick={handleClick}>Clickable</TestComp>);

		await user.click(screen.getByText("Clickable"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<TestComp ref={ref}>Ref test</TestComp>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts custom className", () => {
		render(<TestComp className="custom-class">Custom</TestComp>);
		expect(screen.getByText("Custom").className).toContain("custom-class");
	});

	it("renders children content", () => {
		render(
			<TestComp>
				<span>Nested child</span>
			</TestComp>,
		);
		expect(screen.getByText("Nested child")).toBeInTheDocument();
	});
});
