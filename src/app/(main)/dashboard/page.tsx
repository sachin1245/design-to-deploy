import type { Metadata } from "next";
import { DashboardContent } from "./dashboard-content";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Project dashboard with stats, activity feed, and quick actions.",
};

export default function DashboardPage() {
	return <DashboardContent />;
}
