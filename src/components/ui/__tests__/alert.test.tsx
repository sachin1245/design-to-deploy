import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { Alert } from "../alert";

describe("Alert", () => {
	it("renders with alert role", () => {
		render(<Alert>Message</Alert>);
		expect(screen.getByRole("alert")).toBeInTheDocument();
	});

	it("renders title and children", () => {
		render(<Alert title="Heads up">Details here</Alert>);
		expect(screen.getByText("Heads up")).toBeInTheDocument();
		expect(screen.getByText("Details here")).toBeInTheDocument();
	});

	it("renders info variant by default", () => {
		render(<Alert>Info</Alert>);
		expect(screen.getByRole("alert").className).toContain("border-primary/20");
	});

	it("renders error variant", () => {
		render(<Alert variant="error">Error</Alert>);
		expect(screen.getByRole("alert").className).toContain("border-destructive/20");
	});

	it("renders dismiss button when onDismiss provided", async () => {
		const user = userEvent.setup();
		const onDismiss = vi.fn();
		render(<Alert onDismiss={onDismiss}>Dismissable</Alert>);
		await user.click(screen.getByLabelText("Dismiss"));
		expect(onDismiss).toHaveBeenCalledOnce();
	});

	it("does not render dismiss button without onDismiss", () => {
		render(<Alert>No dismiss</Alert>);
		expect(screen.queryByLabelText("Dismiss")).not.toBeInTheDocument();
	});

	it("accepts custom className", () => {
		render(<Alert className="extra">Test</Alert>);
		expect(screen.getByRole("alert").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Alert ref={ref}>Ref</Alert>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
