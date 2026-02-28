import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Stepper } from "../stepper";

const steps = [{ label: "Details" }, { label: "Payment" }, { label: "Confirm" }];

describe("Stepper", () => {
	it("renders all steps", () => {
		render(<Stepper steps={steps} activeStep={0} />);
		expect(screen.getByText("Details")).toBeInTheDocument();
		expect(screen.getByText("Payment")).toBeInTheDocument();
		expect(screen.getByText("Confirm")).toBeInTheDocument();
	});

	it("shows step numbers", () => {
		render(<Stepper steps={steps} activeStep={0} />);
		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("marks active step", () => {
		render(<Stepper steps={steps} activeStep={1} />);
		const activeIndicator = screen.getByText("2");
		expect(activeIndicator.className).toContain("border-primary");
	});

	it("marks completed steps", () => {
		render(<Stepper steps={steps} activeStep={2} />);
		const list = screen.getByLabelText("Progress");
		const completedSteps = list.querySelectorAll(".bg-primary");
		expect(completedSteps.length).toBeGreaterThanOrEqual(2);
	});

	it("has progress aria label", () => {
		render(<Stepper steps={steps} activeStep={0} />);
		expect(screen.getByLabelText("Progress")).toBeInTheDocument();
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLOListElement>();
		render(<Stepper ref={ref} steps={steps} activeStep={0} />);
		expect(ref.current).toBeInstanceOf(HTMLOListElement);
	});
});
