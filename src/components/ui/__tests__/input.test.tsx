import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from "../input";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Input label="Email" error="Email is required" />);
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
  });

  it("handles value changes", async () => {
    const user = userEvent.setup();
    render(<Input label="Name" />);

    const input = screen.getByLabelText("Name");
    await user.type(input, "John");
    expect(input).toHaveValue("John");
  });

  it("disabled state", () => {
    render(<Input label="Name" disabled />);
    expect(screen.getByLabelText("Name")).toBeDisabled();
  });

  it("renders different input types", () => {
    const { rerender } = render(<Input label="Password" type="password" />);
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password"
    );

    rerender(<Input label="Count" type="number" />);
    expect(screen.getByLabelText("Count")).toHaveAttribute("type", "number");
  });

  it("forwards ref", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} label="Test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("accepts custom className", () => {
    render(<Input label="Styled" className="custom-input" />);
    const input = screen.getByLabelText("Styled");
    expect(input.className).toContain("custom-input");
  });

  it("renders without label", () => {
    render(<Input placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });
});
