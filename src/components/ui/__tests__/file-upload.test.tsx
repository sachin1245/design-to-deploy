import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { FileUpload } from "../file-upload";

describe("FileUpload", () => {
	it("renders dropzone", () => {
		render(<FileUpload />);
		expect(screen.getByText("Drop files here or click to browse")).toBeInTheDocument();
	});

	it("shows max file size", () => {
		render(<FileUpload maxSizeMB={5} />);
		expect(screen.getByText("Max 5MB per file")).toBeInTheDocument();
	});

	it("has a hidden file input", () => {
		render(<FileUpload />);
		expect(screen.getByLabelText("Upload files")).toBeInTheDocument();
	});

	it("accepts custom className", () => {
		const { container } = render(<FileUpload className="extra" />);
		expect((container.firstChild as HTMLElement).className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<FileUpload ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});
});
