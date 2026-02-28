import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../card";

describe("Card", () => {
	it("renders with default props", () => {
		render(<Card data-testid="card">Card content</Card>);
		const card = screen.getByTestId("card");
		expect(card).toBeInTheDocument();
		expect(card).toHaveTextContent("Card content");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<Card ref={ref}>Ref test</Card>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts custom className", () => {
		render(
			<Card data-testid="card" className="custom-card">
				Styled
			</Card>,
		);
		const card = screen.getByTestId("card");
		expect(card.className).toContain("custom-card");
	});

	it("merges className with base styles", () => {
		render(
			<Card data-testid="card" className="extra">
				Content
			</Card>,
		);
		const card = screen.getByTestId("card");
		expect(card.className).toContain("rounded-xl");
		expect(card.className).toContain("extra");
	});

	it("passes additional HTML attributes", () => {
		render(
			<Card data-testid="card" aria-label="Example card">
				Content
			</Card>,
		);
		const card = screen.getByTestId("card");
		expect(card).toHaveAttribute("aria-label", "Example card");
	});
});

describe("CardHeader", () => {
	it("renders children", () => {
		render(<CardHeader data-testid="header">Header content</CardHeader>);
		expect(screen.getByTestId("header")).toHaveTextContent("Header content");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<CardHeader ref={ref}>Header</CardHeader>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts custom className", () => {
		render(
			<CardHeader data-testid="header" className="custom-header">
				Header
			</CardHeader>,
		);
		expect(screen.getByTestId("header").className).toContain("custom-header");
	});
});

describe("CardTitle", () => {
	it("renders children", () => {
		render(<CardTitle data-testid="title">My Title</CardTitle>);
		expect(screen.getByTestId("title")).toHaveTextContent("My Title");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<CardTitle ref={ref}>Title</CardTitle>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts custom className", () => {
		render(
			<CardTitle data-testid="title" className="custom-title">
				Title
			</CardTitle>,
		);
		expect(screen.getByTestId("title").className).toContain("custom-title");
	});
});

describe("CardDescription", () => {
	it("renders children", () => {
		render(<CardDescription data-testid="desc">A description</CardDescription>);
		expect(screen.getByTestId("desc")).toHaveTextContent("A description");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<CardDescription ref={ref}>Desc</CardDescription>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts custom className", () => {
		render(
			<CardDescription data-testid="desc" className="custom-desc">
				Desc
			</CardDescription>,
		);
		expect(screen.getByTestId("desc").className).toContain("custom-desc");
	});
});

describe("CardContent", () => {
	it("renders children", () => {
		render(<CardContent data-testid="content">Main content</CardContent>);
		expect(screen.getByTestId("content")).toHaveTextContent("Main content");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<CardContent ref={ref}>Content</CardContent>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts custom className", () => {
		render(
			<CardContent data-testid="content" className="custom-content">
				Content
			</CardContent>,
		);
		expect(screen.getByTestId("content").className).toContain("custom-content");
	});
});

describe("CardFooter", () => {
	it("renders children", () => {
		render(<CardFooter data-testid="footer">Footer content</CardFooter>);
		expect(screen.getByTestId("footer")).toHaveTextContent("Footer content");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLDivElement>();
		render(<CardFooter ref={ref}>Footer</CardFooter>);
		expect(ref.current).toBeInstanceOf(HTMLDivElement);
	});

	it("accepts custom className", () => {
		render(
			<CardFooter data-testid="footer" className="custom-footer">
				Footer
			</CardFooter>,
		);
		expect(screen.getByTestId("footer").className).toContain("custom-footer");
	});
});

describe("Card — compound composition", () => {
	it("renders a complete card with all sub-components", () => {
		render(
			<Card data-testid="card">
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
					<CardDescription>Card description</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Card body text</p>
				</CardContent>
				<CardFooter>
					<button type="button">Action</button>
				</CardFooter>
			</Card>,
		);

		expect(screen.getByTestId("card")).toBeInTheDocument();
		expect(screen.getByText("Card Title")).toBeInTheDocument();
		expect(screen.getByText("Card description")).toBeInTheDocument();
		expect(screen.getByText("Card body text")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
	});
});
