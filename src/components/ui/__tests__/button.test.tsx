import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../button";

describe("Button", () => {
	it("renders with default props", () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole("button", { name: "Click me" });
		expect(button).toBeInTheDocument();
	});

	it("renders each variant correctly", () => {
		const variants = ["primary", "secondary", "outline", "ghost", "destructive"] as const;

		for (const variant of variants) {
			const { unmount } = render(<Button variant={variant}>{variant}</Button>);
			const button = screen.getByRole("button", { name: variant });
			expect(button).toBeInTheDocument();
			unmount();
		}
	});

	it("renders each size correctly", () => {
		const sizes = ["sm", "md", "lg"] as const;

		for (const size of sizes) {
			const { unmount } = render(<Button size={size}>{size}</Button>);
			const button = screen.getByRole("button", { name: size });
			expect(button).toBeInTheDocument();
			unmount();
		}
	});

	it("handles click events", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click me</Button>);

		await user.click(screen.getByRole("button", { name: "Click me" }));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("disabled state prevents clicks", async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(
			<Button disabled onClick={handleClick}>
				Disabled
			</Button>,
		);

		const button = screen.getByRole("button", { name: "Disabled" });
		expect(button).toBeDisabled();

		await user.click(button);
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLButtonElement>();
		render(<Button ref={ref}>Ref</Button>);
		expect(ref.current).toBeInstanceOf(HTMLButtonElement);
	});

	it("accepts custom className", () => {
		render(<Button className="custom-class">Custom</Button>);
		const button = screen.getByRole("button", { name: "Custom" });
		expect(button.className).toContain("custom-class");
	});
});
