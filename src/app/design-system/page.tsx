"use client";

import { useState } from "react";
import {
	Accordion,
	Alert,
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Checkbox,
	Chip,
	Divider,
	EmptyState,
	Input,
	NotificationDot,
	Pagination,
	Progress,
	Radio,
	RadioGroup,
	Select,
	Skeleton,
	Slider,
	Spinner,
	Stepper,
	Tab,
	TabList,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TabPanel,
	Tabs,
	Textarea,
	Toast,
	Toggle,
	Toolbar,
	ToolbarButton,
	ToolbarSeparator,
	Tooltip,
} from "@/components/ui";

/* ═══════════════════════════════════════════════════
   Design System Reference Page
   Optimized for html.to.design Figma import
   ═══════════════════════════════════════════════════ */

/* ─── Section wrapper for consistent spacing ─── */
function Section({
	id,
	title,
	children,
}: {
	id: string;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section id={id} className="border-b border-border pb-16">
			<div className="mb-8 flex items-center gap-4">
				<div className="h-px flex-1 bg-border" />
				<h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-primary">
					{title}
				</h2>
				<div className="h-px flex-1 bg-border" />
			</div>
			{children}
		</section>
	);
}

/* ─── Color swatch ─── */
function Swatch({ name, cssVar }: { name: string; cssVar: string }) {
	return (
		<div className="flex flex-col items-center gap-2">
			<div
				className="h-16 w-16 rounded-lg border border-border shadow-sm"
				style={{ backgroundColor: `var(${cssVar})` }}
			/>
			<span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
				{name}
			</span>
			<span className="font-mono text-[10px] text-muted-foreground/60">{cssVar}</span>
		</div>
	);
}

/* ─── Token display block ─── */
function TokenRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between border-b border-border/50 py-2">
			<span className="text-xs font-medium text-foreground">{label}</span>
			<span className="font-mono text-xs text-muted-foreground">{value}</span>
		</div>
	);
}

/* ─── Subsection label ─── */
function SubLabel({ children }: { children: React.ReactNode }) {
	return (
		<p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
			{children}
		</p>
	);
}

export default function DesignSystemPage() {
	const [toggleOn, setToggleOn] = useState(false);
	const [radioValue, setRadioValue] = useState("a");
	const [tabValue, setTabValue] = useState("tab1");
	const [page, setPage] = useState(3);

	return (
		<div className="min-h-screen bg-background">
			{/* ═══ Header ═══ */}
			<header className="border-b border-border px-8 py-12">
				<div className="mx-auto max-w-6xl">
					<p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary">
						Design System Reference
					</p>
					<h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground">
						Clarity<span className="text-primary">.</span>
					</h1>
					<p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
						36 components, design tokens, typography, and motion — structured for Figma import via
						html.to.design.
					</p>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-16 px-8 py-16">
				{/* ═══════════════════════════════════════════
				    1. COLOR TOKENS
				    ═══════════════════════════════════════════ */}
				<Section id="colors" title="Color Tokens">
					<div className="space-y-10">
						<div>
							<SubLabel>Core</SubLabel>
							<div className="flex flex-wrap gap-6">
								<Swatch name="Background" cssVar="--background" />
								<Swatch name="Foreground" cssVar="--foreground" />
								<Swatch name="Primary" cssVar="--primary" />
								<Swatch name="Primary FG" cssVar="--primary-foreground" />
								<Swatch name="Secondary" cssVar="--secondary" />
								<Swatch name="Secondary FG" cssVar="--secondary-foreground" />
							</div>
						</div>
						<div>
							<SubLabel>Semantic</SubLabel>
							<div className="flex flex-wrap gap-6">
								<Swatch name="Accent" cssVar="--accent" />
								<Swatch name="Accent FG" cssVar="--accent-foreground" />
								<Swatch name="Muted" cssVar="--muted" />
								<Swatch name="Muted FG" cssVar="--muted-foreground" />
								<Swatch name="Destructive" cssVar="--destructive" />
								<Swatch name="Destructive FG" cssVar="--destructive-foreground" />
							</div>
						</div>
						<div>
							<SubLabel>UI</SubLabel>
							<div className="flex flex-wrap gap-6">
								<Swatch name="Card" cssVar="--card" />
								<Swatch name="Card FG" cssVar="--card-foreground" />
								<Swatch name="Popover" cssVar="--popover" />
								<Swatch name="Popover FG" cssVar="--popover-foreground" />
								<Swatch name="Border" cssVar="--border" />
								<Swatch name="Input" cssVar="--input" />
								<Swatch name="Ring" cssVar="--ring" />
							</div>
						</div>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    2. TYPOGRAPHY
				    ═══════════════════════════════════════════ */}
				<Section id="typography" title="Typography">
					<div className="space-y-10">
						<div>
							<SubLabel>Font Families</SubLabel>
							<div className="grid grid-cols-3 gap-8">
								<div className="rounded-lg border border-border p-6">
									<p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
										Display
									</p>
									<p className="font-display text-3xl font-bold">Space Grotesk</p>
									<p className="mt-1 font-mono text-[10px] text-muted-foreground">font-display</p>
								</div>
								<div className="rounded-lg border border-border p-6">
									<p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
										Body
									</p>
									<p className="font-sans text-3xl font-bold">Geist Sans</p>
									<p className="mt-1 font-mono text-[10px] text-muted-foreground">font-sans</p>
								</div>
								<div className="rounded-lg border border-border p-6">
									<p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
										Mono
									</p>
									<p className="font-mono text-3xl font-bold">Geist Mono</p>
									<p className="mt-1 font-mono text-[10px] text-muted-foreground">font-mono</p>
								</div>
							</div>
						</div>

						<div>
							<SubLabel>Type Scale</SubLabel>
							<div className="space-y-4 rounded-lg border border-border p-6">
								<div className="flex items-baseline gap-4">
									<span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">
										text-4xl
									</span>
									<p className="text-4xl font-bold tracking-tight">The quick brown fox</p>
								</div>
								<div className="flex items-baseline gap-4">
									<span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">
										text-3xl
									</span>
									<p className="text-3xl font-bold tracking-tight">The quick brown fox</p>
								</div>
								<div className="flex items-baseline gap-4">
									<span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">
										text-2xl
									</span>
									<p className="text-2xl font-semibold">The quick brown fox</p>
								</div>
								<div className="flex items-baseline gap-4">
									<span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">
										text-xl
									</span>
									<p className="text-xl font-medium">The quick brown fox</p>
								</div>
								<div className="flex items-baseline gap-4">
									<span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">
										text-lg
									</span>
									<p className="text-lg">The quick brown fox</p>
								</div>
								<div className="flex items-baseline gap-4">
									<span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">
										text-base
									</span>
									<p className="text-base">The quick brown fox</p>
								</div>
								<div className="flex items-baseline gap-4">
									<span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">
										text-sm
									</span>
									<p className="text-sm">The quick brown fox</p>
								</div>
								<div className="flex items-baseline gap-4">
									<span className="w-16 shrink-0 font-mono text-[10px] text-muted-foreground">
										text-xs
									</span>
									<p className="text-xs">The quick brown fox</p>
								</div>
							</div>
						</div>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    3. SPACING, RADIUS & MOTION
				    ═══════════════════════════════════════════ */}
				<Section id="tokens" title="Spacing, Radius & Motion">
					<div className="grid grid-cols-3 gap-8">
						<div>
							<SubLabel>Border Radius</SubLabel>
							<div className="flex flex-wrap gap-4">
								{[
									{ name: "sm", val: "0.375rem" },
									{ name: "md", val: "0.5rem" },
									{ name: "lg", val: "0.75rem" },
									{ name: "xl", val: "1rem" },
								].map((r) => (
									<div key={r.name} className="flex flex-col items-center gap-2">
										<div
											className="h-16 w-16 border-2 border-primary bg-primary/10"
											style={{ borderRadius: r.val }}
										/>
										<span className="text-[10px] font-medium text-muted-foreground">{r.name}</span>
										<span className="font-mono text-[10px] text-muted-foreground/60">{r.val}</span>
									</div>
								))}
							</div>
						</div>

						<div>
							<SubLabel>Motion Durations</SubLabel>
							<div className="space-y-0">
								<TokenRow label="Instant" value="50ms" />
								<TokenRow label="Fast" value="150ms" />
								<TokenRow label="Normal" value="250ms" />
								<TokenRow label="Slow" value="400ms" />
								<TokenRow label="Slower" value="600ms" />
							</div>
						</div>

						<div>
							<SubLabel>Easing Curves</SubLabel>
							<div className="space-y-0">
								<TokenRow label="Default" value="cubic-bezier(0.2, 0, 0, 1)" />
								<TokenRow label="Spring" value="cubic-bezier(0.34, 1.56, 0.64, 1)" />
								<TokenRow label="Out" value="cubic-bezier(0.16, 1, 0.3, 1)" />
							</div>
						</div>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    4. BUTTON
				    ═══════════════════════════════════════════ */}
				<Section id="button" title="Button">
					<div className="space-y-6">
						{(["primary", "secondary", "outline", "ghost", "destructive"] as const).map(
							(variant) => (
								<div key={variant}>
									<SubLabel>{variant}</SubLabel>
									<div className="flex flex-wrap items-center gap-3">
										<Button variant={variant} size="sm">
											Small
										</Button>
										<Button variant={variant} size="md">
											Medium
										</Button>
										<Button variant={variant} size="lg">
											Large
										</Button>
										<Button variant={variant} size="md" disabled>
											Disabled
										</Button>
									</div>
								</div>
							),
						)}
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    5. BADGE
				    ═══════════════════════════════════════════ */}
				<Section id="badge" title="Badge">
					<div className="flex flex-wrap gap-3">
						{(["default", "success", "warning", "error", "info"] as const).map((v) => (
							<Badge key={v} variant={v}>
								{v.charAt(0).toUpperCase() + v.slice(1)}
							</Badge>
						))}
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    6. AVATAR
				    ═══════════════════════════════════════════ */}
				<Section id="avatar" title="Avatar">
					<div className="space-y-6">
						<div>
							<SubLabel>With Image</SubLabel>
							<div className="flex items-end gap-4">
								<Avatar size="sm" src="https://i.pravatar.cc/64?u=a" alt="User A" fallback="UA" />
								<Avatar size="md" src="https://i.pravatar.cc/128?u=b" alt="User B" fallback="UB" />
								<Avatar size="lg" src="https://i.pravatar.cc/256?u=c" alt="User C" fallback="UC" />
							</div>
						</div>
						<div>
							<SubLabel>Fallback</SubLabel>
							<div className="flex items-end gap-4">
								<Avatar size="sm" fallback="AB" />
								<Avatar size="md" fallback="CD" />
								<Avatar size="lg" fallback="EF" />
							</div>
						</div>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    7. CARD
				    ═══════════════════════════════════════════ */}
				<Section id="card" title="Card">
					<div className="grid grid-cols-2 gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Card Title</CardTitle>
								<CardDescription>Card description with context</CardDescription>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									This card shows the standard layout with header and content areas.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Feature Card</CardTitle>
								<CardDescription>Interactive component wrapper</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex gap-2">
									<Button size="sm">Action</Button>
									<Button size="sm" variant="outline">
										Secondary
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    8. INPUT & TEXTAREA
				    ═══════════════════════════════════════════ */}
				<Section id="input" title="Input & Textarea">
					<div className="grid grid-cols-2 gap-8">
						<div className="space-y-4">
							<SubLabel>Input</SubLabel>
							<Input placeholder="Default input" />
							<Input placeholder="Disabled input" disabled />
						</div>
						<div className="space-y-4">
							<SubLabel>Textarea</SubLabel>
							<Textarea placeholder="Write a message…" rows={3} />
							<Textarea placeholder="Disabled textarea" disabled rows={3} />
						</div>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    9. SELECT
				    ═══════════════════════════════════════════ */}
				<Section id="select" title="Select">
					<div className="max-w-xs">
						<Select>
							<option value="">Choose an option…</option>
							<option value="react">React</option>
							<option value="vue">Vue</option>
							<option value="angular">Angular</option>
						</Select>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    10. CHECKBOX & RADIO
				    ═══════════════════════════════════════════ */}
				<Section id="checkbox-radio" title="Checkbox & Radio">
					<div className="grid grid-cols-2 gap-8">
						<div className="space-y-3">
							<SubLabel>Checkbox</SubLabel>
							<Checkbox label="Accept terms" defaultChecked />
							<Checkbox label="Send notifications" />
							<Checkbox label="Disabled option" disabled />
						</div>
						<div className="space-y-3">
							<SubLabel>Radio Group</SubLabel>
							<RadioGroup name="ds-demo" value={radioValue} onValueChange={setRadioValue}>
								<Radio value="a" label="Option A" />
								<Radio value="b" label="Option B" />
								<Radio value="c" label="Option C" disabled />
							</RadioGroup>
						</div>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    11. TOGGLE & SLIDER
				    ═══════════════════════════════════════════ */}
				<Section id="toggle-slider" title="Toggle & Slider">
					<div className="grid grid-cols-2 gap-8">
						<div className="space-y-4">
							<SubLabel>Toggle</SubLabel>
							<div className="flex items-center gap-6">
								<div className="flex items-center gap-2">
									<Toggle checked={toggleOn} onCheckedChange={setToggleOn} />
									<span className="text-sm">{toggleOn ? "On" : "Off"}</span>
								</div>
								<div className="flex items-center gap-2">
									<Toggle checked disabled />
									<span className="text-sm text-muted-foreground">Disabled</span>
								</div>
							</div>
						</div>
						<div className="space-y-4">
							<SubLabel>Slider</SubLabel>
							<Slider min={0} max={100} defaultValue={40} />
							<Slider min={0} max={100} defaultValue={75} size="lg" />
						</div>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    12. DIVIDER
				    ═══════════════════════════════════════════ */}
				<Section id="divider" title="Divider">
					<div className="space-y-6">
						<Divider />
						<Divider label="With Label" />
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    13. SPINNER & SKELETON
				    ═══════════════════════════════════════════ */}
				<Section id="spinner-skeleton" title="Spinner & Skeleton">
					<div className="grid grid-cols-2 gap-8">
						<div>
							<SubLabel>Spinner</SubLabel>
							<div className="flex items-end gap-4">
								<Spinner size="sm" />
								<Spinner size="md" />
								<Spinner size="lg" />
							</div>
						</div>
						<div>
							<SubLabel>Skeleton</SubLabel>
							<div className="space-y-3">
								<Skeleton variant="text" className="w-3/4" />
								<Skeleton variant="text" className="w-1/2" />
								<Skeleton variant="circular" className="h-12 w-12" />
								<Skeleton variant="rectangular" className="h-24 w-full" />
							</div>
						</div>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    14. PROGRESS
				    ═══════════════════════════════════════════ */}
				<Section id="progress" title="Progress Bar">
					<div className="space-y-4">
						<Progress value={25} />
						<Progress value={50} variant="primary" />
						<Progress value={75} variant="accent" />
						<Progress value={100} variant="destructive" />
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    15. NOTIFICATION DOT
				    ═══════════════════════════════════════════ */}
				<Section id="notification-dot" title="Notification Dot">
					<div className="flex items-center gap-6">
						<NotificationDot variant="default" />
						<NotificationDot variant="success" />
						<NotificationDot variant="warning" />
						<NotificationDot variant="error" />
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    16. ALERT & TOAST
				    ═══════════════════════════════════════════ */}
				<Section id="alert-toast" title="Alert & Toast">
					<div className="space-y-8">
						<div>
							<SubLabel>Alert</SubLabel>
							<div className="space-y-3">
								<Alert variant="info" title="Info">
									Informational alert message.
								</Alert>
								<Alert variant="success" title="Success">
									Operation completed successfully.
								</Alert>
								<Alert variant="warning" title="Warning">
									Please review before proceeding.
								</Alert>
								<Alert variant="error" title="Error">
									Something went wrong.
								</Alert>
							</div>
						</div>
						<div>
							<SubLabel>Toast</SubLabel>
							<div className="space-y-3">
								<Toast variant="info">Info toast notification</Toast>
								<Toast variant="success">Success toast notification</Toast>
								<Toast variant="error">Error toast notification</Toast>
							</div>
						</div>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    17. TOOLTIP & CHIP
				    ═══════════════════════════════════════════ */}
				<Section id="tooltip-chip" title="Tooltip & Chip">
					<div className="grid grid-cols-2 gap-8">
						<div>
							<SubLabel>Tooltip</SubLabel>
							<div className="flex gap-4">
								<Tooltip content="Tooltip on top" side="top" delayMs={0}>
									<Button variant="outline" size="sm">
										Top
									</Button>
								</Tooltip>
								<Tooltip content="Tooltip on bottom" side="bottom" delayMs={0}>
									<Button variant="outline" size="sm">
										Bottom
									</Button>
								</Tooltip>
							</div>
						</div>
						<div>
							<SubLabel>Chip</SubLabel>
							<div className="flex flex-wrap gap-2">
								<Chip variant="default">Default</Chip>
								<Chip variant="selected">Selected</Chip>
								<Chip variant="default" size="sm">
									Small
								</Chip>
								<Chip variant="default" onRemove={() => {}}>
									Removable
								</Chip>
							</div>
						</div>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    18. EMPTY STATE
				    ═══════════════════════════════════════════ */}
				<Section id="empty-state" title="Empty State">
					<div className="max-w-sm">
						<EmptyState
							title="No results found"
							description="Try adjusting your search or filters."
							action={<Button size="sm">Clear Filters</Button>}
						/>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    19. TABS
				    ═══════════════════════════════════════════ */}
				<Section id="tabs" title="Tabs">
					<Tabs value={tabValue} onValueChange={setTabValue}>
						<TabList>
							<Tab value="tab1">Overview</Tab>
							<Tab value="tab2">Settings</Tab>
							<Tab value="tab3">Analytics</Tab>
						</TabList>
						<TabPanel value="tab1">
							<p className="text-sm text-muted-foreground">Overview content area</p>
						</TabPanel>
						<TabPanel value="tab2">
							<p className="text-sm text-muted-foreground">Settings content area</p>
						</TabPanel>
						<TabPanel value="tab3">
							<p className="text-sm text-muted-foreground">Analytics content area</p>
						</TabPanel>
					</Tabs>
				</Section>

				{/* ═══════════════════════════════════════════
				    20. BREADCRUMB
				    ═══════════════════════════════════════════ */}
				<Section id="breadcrumb" title="Breadcrumb">
					<Breadcrumb
						items={[
							{ label: "Home", href: "/" },
							{ label: "Design System", href: "/design-system" },
							{ label: "Components" },
						]}
					/>
				</Section>

				{/* ═══════════════════════════════════════════
				    21. PAGINATION
				    ═══════════════════════════════════════════ */}
				<Section id="pagination" title="Pagination">
					<Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
				</Section>

				{/* ═══════════════════════════════════════════
				    22. STEPPER
				    ═══════════════════════════════════════════ */}
				<Section id="stepper" title="Stepper">
					<Stepper
						activeStep={1}
						steps={[
							{ label: "Account" },
							{ label: "Profile" },
							{ label: "Review" },
							{ label: "Submit" },
						]}
					/>
				</Section>

				{/* ═══════════════════════════════════════════
				    23. TABLE
				    ═══════════════════════════════════════════ */}
				<Section id="table" title="Table">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Component</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Variants</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>Button</TableCell>
								<TableCell>Foundational</TableCell>
								<TableCell>5</TableCell>
								<TableCell>
									<Badge variant="success">Stable</Badge>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Dialog</TableCell>
								<TableCell>Feedback</TableCell>
								<TableCell>1</TableCell>
								<TableCell>
									<Badge variant="success">Stable</Badge>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Date Picker</TableCell>
								<TableCell>Composite</TableCell>
								<TableCell>1</TableCell>
								<TableCell>
									<Badge variant="warning">Beta</Badge>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Section>

				{/* ═══════════════════════════════════════════
				    24. ACCORDION
				    ═══════════════════════════════════════════ */}
				<Section id="accordion" title="Accordion">
					<div className="max-w-lg">
						<Accordion
							items={[
								{
									value: "acc-1",
									trigger: "What is Clarity?",
									content:
										"Clarity is a production-ready React component library built on Tailwind CSS v4.",
								},
								{
									value: "acc-2",
									trigger: "How many components?",
									content:
										"36 components across 5 categories: Foundational, Forms, Feedback, Navigation, and Data.",
								},
								{
									value: "acc-3",
									trigger: "Is it accessible?",
									content:
										"100% accessible. All components follow WAI-ARIA patterns with keyboard navigation support.",
								},
							]}
						/>
					</div>
				</Section>

				{/* ═══════════════════════════════════════════
				    25. TOOLBAR
				    ═══════════════════════════════════════════ */}
				<Section id="toolbar" title="Toolbar">
					<Toolbar>
						<ToolbarButton>Bold</ToolbarButton>
						<ToolbarButton>Italic</ToolbarButton>
						<ToolbarButton>Underline</ToolbarButton>
						<ToolbarSeparator />
						<ToolbarButton>Left</ToolbarButton>
						<ToolbarButton>Center</ToolbarButton>
						<ToolbarButton>Right</ToolbarButton>
					</Toolbar>
				</Section>

				{/* ═══════════════════════════════════════════
				    26. SHADOW SCALE
				    ═══════════════════════════════════════════ */}
				<Section id="shadows" title="Shadow Scale">
					<div className="flex flex-wrap gap-8">
						{["shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"].map((s) => (
							<div key={s} className="flex flex-col items-center gap-3">
								<div className={`h-20 w-20 rounded-lg border border-border bg-card ${s}`} />
								<span className="text-[10px] font-medium text-muted-foreground">{s}</span>
							</div>
						))}
					</div>
				</Section>
			</div>

			{/* ═══ Footer ═══ */}
			<footer className="border-t border-border px-8 py-8">
				<div className="mx-auto max-w-6xl">
					<p className="text-xs text-muted-foreground">
						Clarity Design System — 36 components · React 19 · Tailwind CSS v4 · TypeScript
					</p>
				</div>
			</footer>
		</div>
	);
}
