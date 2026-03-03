"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DocsProgress } from "@/components/developer/docs-progress";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { NAV_SECTIONS, type SectionId } from "./data";

type DocsShellProps = {
	children: React.ReactNode;
};

export function DocsShell({ children }: DocsShellProps) {
	const [activeSection, setActiveSection] = useState<SectionId>("overview");
	const observerRef = useRef<IntersectionObserver | null>(null);

	const sidebarSections = [
		{
			title: "Guide",
			items: NAV_SECTIONS.map((s) => ({
				label: s.label,
				href: `#${s.id}`,
				active: s.id === activeSection,
			})),
		},
	];

	const setupObserver = useCallback(() => {
		if (observerRef.current) {
			observerRef.current.disconnect();
		}

		observerRef.current = new IntersectionObserver(
			(entries) => {
				// Find the most visible section
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

				if (visible.length > 0 && visible[0]) {
					setActiveSection(visible[0].target.id as SectionId);
				}
			},
			{
				rootMargin: "-80px 0px -60% 0px",
				threshold: [0, 0.25, 0.5],
			},
		);

		for (const section of NAV_SECTIONS) {
			const el = document.getElementById(section.id);
			if (el) {
				observerRef.current.observe(el);
			}
		}
	}, []);

	useEffect(() => {
		setupObserver();
		return () => observerRef.current?.disconnect();
	}, [setupObserver]);

	return (
		<>
			<DocsProgress />
			<div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[220px_1fr]">
				{/* Sidebar — sticky, hidden on mobile */}
				<aside className="hidden lg:block" aria-label="Documentation navigation">
					<div className="sticky top-20">
						<SidebarNav sections={sidebarSections} />
					</div>
				</aside>

				{/* Content */}
				<div className="min-w-0 space-y-20">{children}</div>
			</div>
		</>
	);
}
