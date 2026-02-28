import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Toast } from "../toast";

describe("Toast", () => {
	it("renders with status role", () => {
		render(<Toast>Saved</Toast>);
		expect(screen.getByRole("status")).toBeInTheDocument();
	});

	it("renders content", () => {
		render(<Toast>File uploaded</Toast>);
		expect(screen.getByText("File uploaded")).toBeInTheDocument();
	});

	it("renders success variant", () => {
		render(<Toast variant="success">Done</Toast>);
		expect(screen.getByRole("status").className).toContain("border-emerald-500/30");
	});

	it("renders error variant", () => {
		render(<Toast variant="error">Failed</Toast>);
		expect(screen.getByRole("status").className).toContain("border-destructive/30");
	});

	it("renders dismiss button when onDismiss provided", async () => {
		const user = userEvent.setup();
		const onDismiss = vi.fn();
		render(<Toast onDismiss={onDismiss}>Dismissable</Toast>);
		await user.click(screen.getByLabelText("Dismiss"));
		expect(onDismiss).toHaveBeenCalledOnce();
	});

	it("accepts custom className", () => {
		render(<Toast className="extra">Test</Toast>);
		expect(screen.getByRole("status").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Toast ref={ref}>Ref</Toast>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
