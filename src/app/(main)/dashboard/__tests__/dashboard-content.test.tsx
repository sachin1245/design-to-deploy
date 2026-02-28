import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DashboardContent } from "../dashboard-content";

describe("DashboardContent", () => {
	describe("page header", () => {
		it("renders the page heading", () => {
			render(<DashboardContent />);
			expect(screen.getByRole("heading", { name: /project overview/i })).toBeInTheDocument();
		});

		it("renders the Dashboard badge", () => {
			render(<DashboardContent />);
			expect(screen.getByText("Dashboard")).toBeInTheDocument();
		});

		it("renders the page description", () => {
			render(<DashboardContent />);
			expect(
				screen.getByText(/real-time status of the design-to-deploy project/i),
			).toBeInTheDocument();
		});
	});

	describe("stats cards", () => {
		it("renders all four stat cards", () => {
			render(<DashboardContent />);
			expect(screen.getByText("Components")).toBeInTheDocument();
			expect(screen.getByText("Test Coverage")).toBeInTheDocument();
			expect(screen.getByText("Type Safety")).toBeInTheDocument();
			expect(screen.getByText("Build Score")).toBeInTheDocument();
		});

		it("displays stat values", () => {
			render(<DashboardContent />);
			expect(screen.getByText("36")).toBeInTheDocument();
			expect(screen.getByText("87")).toBeInTheDocument();
			expect(screen.getByText("100")).toBeInTheDocument();
			expect(screen.getByText("98")).toBeInTheDocument();
		});

		it("displays change descriptions", () => {
			render(<DashboardContent />);
			expect(screen.getByText("+4 this sprint")).toBeInTheDocument();
			expect(screen.getByText("+12% this month")).toBeInTheDocument();
			expect(screen.getByText("Strict mode")).toBeInTheDocument();
			expect(screen.getByText("Lighthouse")).toBeInTheDocument();
		});

		it("displays suffixes on applicable stats", () => {
			render(<DashboardContent />);
			// Test Coverage and Type Safety both have "%" suffix, Build Score has "/100"
			const percentSuffixes = screen.getAllByText("%");
			expect(percentSuffixes.length).toBeGreaterThanOrEqual(2);
			expect(screen.getByText("/100")).toBeInTheDocument();
		});
	});

	describe("activity feed", () => {
		it("shows the Activity Feed heading", () => {
			render(<DashboardContent />);
			expect(screen.getByText("Activity Feed")).toBeInTheDocument();
		});

		it("renders initial activity items (4 visible)", () => {
			render(<DashboardContent />);
			expect(screen.getByText(/deployed/)).toBeInTheDocument();
			expect(screen.getByText(/v2\.4\.0 to production/)).toBeInTheDocument();
			expect(screen.getByText(/feat: add Dashboard page with KPI cards/)).toBeInTheDocument();
			expect(screen.getByText(/PR #75/)).toBeInTheDocument();
			expect(screen.getByText(/All 142 tests green/)).toBeInTheDocument();
		});

		it("has Show all activity button", () => {
			render(<DashboardContent />);
			expect(screen.getByRole("button", { name: /show all activity/i })).toBeInTheDocument();
		});

		it("shows all items after clicking Show all activity", async () => {
			const user = userEvent.setup();
			render(<DashboardContent />);

			await user.click(screen.getByRole("button", { name: /show all activity/i }));

			// All 6 items should now be visible
			expect(screen.getByText(/feat: add About page/)).toBeInTheDocument();
			expect(screen.getByText(/fix: scope Home link/)).toBeInTheDocument();
		});

		it("shows Show less button after expanding", async () => {
			const user = userEvent.setup();
			render(<DashboardContent />);

			await user.click(screen.getByRole("button", { name: /show all activity/i }));

			expect(screen.getByRole("button", { name: /show less/i })).toBeInTheDocument();
		});

		it("collapses back to 4 items when Show less is clicked", async () => {
			const user = userEvent.setup();
			render(<DashboardContent />);

			await user.click(screen.getByRole("button", { name: /show all activity/i }));
			await user.click(screen.getByRole("button", { name: /show less/i }));

			expect(screen.getByRole("button", { name: /show all activity/i })).toBeInTheDocument();
			expect(screen.queryByText(/feat: add About page/)).not.toBeInTheDocument();
		});

		it("renders activity type badges", () => {
			render(<DashboardContent />);
			expect(screen.getByText("deploy")).toBeInTheDocument();
			expect(screen.getByText("commit")).toBeInTheDocument();
			expect(screen.getByText("review")).toBeInTheDocument();
			expect(screen.getByText("test")).toBeInTheDocument();
		});

		it("renders user names in activity items", () => {
			render(<DashboardContent />);
			expect(screen.getAllByText("Sachin C").length).toBeGreaterThanOrEqual(1);
			expect(screen.getAllByText("Claude").length).toBeGreaterThanOrEqual(1);
			expect(screen.getByText("CI Pipeline")).toBeInTheDocument();
		});
	});

	describe("quick actions", () => {
		it("renders the Quick Actions heading", () => {
			render(<DashboardContent />);
			expect(screen.getByText("Quick Actions")).toBeInTheDocument();
		});

		it("renders all three quick action cards", () => {
			render(<DashboardContent />);
			expect(screen.getByText("Browse Components")).toBeInTheDocument();
			expect(screen.getByText("View Design System")).toBeInTheDocument();
			expect(screen.getByText("Read About")).toBeInTheDocument();
		});

		it("renders quick action descriptions", () => {
			render(<DashboardContent />);
			expect(screen.getByText(/explore all 36 design system components/i)).toBeInTheDocument();
			expect(screen.getByText(/tokens, typography, and color palette/i)).toBeInTheDocument();
			expect(screen.getByText(/project goals, tech stack, and team/i)).toBeInTheDocument();
		});

		it("renders Go links with correct hrefs", () => {
			render(<DashboardContent />);
			const goLinks = screen.getAllByRole("link", { name: /go/i });
			expect(goLinks).toHaveLength(3);

			const hrefs = goLinks.map((link) => link.getAttribute("href"));
			expect(hrefs).toContain("/showcase");
			expect(hrefs).toContain("/design-system");
			expect(hrefs).toContain("/about");
		});
	});
});
