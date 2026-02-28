import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";

describe("Table", () => {
	it("renders a table", () => {
		render(
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Name</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>Alice</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(screen.getByRole("table")).toBeInTheDocument();
		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Alice")).toBeInTheDocument();
	});

	it("renders multiple rows", () => {
		render(
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>A</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>B</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(screen.getAllByRole("row")).toHaveLength(2);
	});

	it("accepts custom className on table", () => {
		render(
			<Table className="extra">
				<TableBody>
					<TableRow>
						<TableCell>X</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(screen.getByRole("table").className).toContain("extra");
	});

	it("forwards ref", () => {
		const ref = createRef<HTMLTableElement>();
		render(
			<Table ref={ref}>
				<TableBody>
					<TableRow>
						<TableCell>X</TableCell>
					</TableRow>
				</TableBody>
			</Table>,
		);
		expect(ref.current).toBeInstanceOf(HTMLTableElement);
	});
});
