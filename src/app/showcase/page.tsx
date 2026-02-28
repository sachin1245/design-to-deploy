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
	CardFooter,
	CardHeader,
	CardTitle,
	Checkbox,
	Chip,
	CommandPalette,
	DatePicker,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Divider,
	EmptyState,
	FileUpload,
	Input,
	NavBar,
	NotificationDot,
	Pagination,
	Popover,
	Progress,
	Radio,
	RadioGroup,
	Select,
	Sheet,
	SidebarNav,
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
   Constants — every variant & size to showcase
   ═══════════════════════════════════════════════════ */

const BUTTON_VARIANTS = ["primary", "secondary", "outline", "ghost", "destructive"] as const;
const BUTTON_SIZES = ["sm", "md", "lg"] as const;
const BADGE_VARIANTS = ["default", "success", "warning", "error", "info"] as const;
const AVATAR_SIZES = ["sm", "md", "lg"] as const;

/* ═══════════════════════════════════════════════════
   Section heading — numbered specimen labels
   ═══════════════════════════════════════════════════ */

function SectionHeading({
	number,
	title,
	description,
}: {
	number: string;
	title: string;
	description: string;
}) {
	return (
		<div className="mb-8">
			<div className="flex items-baseline gap-3">
				<span className="font-mono text-xs font-semibold text-muted-foreground">{number}</span>
				<h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
			</div>
			<p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
		</div>
	);
}

/* ═══════════════════════════════════════════════════
   Showcase Page
   ═══════════════════════════════════════════════════ */

export default function ShowcasePage() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [tabValue, setTabValue] = useState("overview");
	const [page, setPage] = useState(3);
	const [toggleOn, setToggleOn] = useState(false);
	const [radioValue, setRadioValue] = useState("a");
	const [sheetOpen, setSheetOpen] = useState(false);
	const [cmdOpen, setCmdOpen] = useState(false);

	return (
		<div className="space-y-16">
			{/* ── Hero ──────────────────────────────────── */}
			<div>
				<h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
					Component<span className="text-primary">—</span>Showcase
				</h1>
				<p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
					Every component, every variant, every state&mdash;the living reference for the
					design&#8209;to&#8209;deploy system. 36 components total.
				</p>
			</div>

			<hr className="border-border" />

			{/* ── 01 Button ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="01"
					title="Button"
					description="5 variants &times; 3 sizes with hover, focus, active, and disabled states."
				/>
				<div className="space-y-6">
					{BUTTON_VARIANTS.map((variant) => (
						<div key={variant}>
							<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
								{variant}
							</p>
							<div className="flex flex-wrap items-center gap-3">
								{BUTTON_SIZES.map((size) => (
									<Button key={size} variant={variant} size={size}>
										{variant.charAt(0).toUpperCase() + variant.slice(1)}
									</Button>
								))}
								<Button variant={variant} size="md" disabled>
									Disabled
								</Button>
							</div>
						</div>
					))}
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 02 Input ──────────────────────────────── */}
			<section>
				<SectionHeading
					number="02"
					title="Input"
					description="Text fields with optional labels, error messages, and disabled state."
				/>
				<div className="grid max-w-2xl gap-6 sm:grid-cols-2">
					<Input placeholder="Default input" aria-label="Default input" />
					<Input label="Email" placeholder="you@example.com" type="email" />
					<Input label="Username" error="This username is already taken" defaultValue="designbot" />
					<Input label="Disabled" placeholder="Read-only field" disabled />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 03 Badge ──────────────────────────────── */}
			<section>
				<SectionHeading
					number="03"
					title="Badge"
					description="5 semantic variants for status indicators and labels."
				/>
				<div className="flex flex-wrap items-center gap-3">
					{BADGE_VARIANTS.map((variant) => (
						<Badge key={variant} variant={variant}>
							{variant.charAt(0).toUpperCase() + variant.slice(1)}
						</Badge>
					))}
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 04 Card ───────────────────────────────── */}
			<section>
				<SectionHeading
					number="04"
					title="Card"
					description="Compound component with Header, Title, Description, Content, and Footer."
				/>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle>Project Alpha</CardTitle>
							<CardDescription>A next-generation design system</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">
								Typed tokens, themed components, and comprehensive testing infrastructure.
							</p>
						</CardContent>
						<CardFooter className="gap-2">
							<Button size="sm">View</Button>
							<Button size="sm" variant="outline">
								Share
							</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Coverage</CardTitle>
							<CardDescription>Component test coverage</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="font-display text-4xl font-bold text-primary">98.2%</p>
							<p className="mt-1 text-sm text-muted-foreground">across 36 components</p>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Team</CardTitle>
							<CardDescription>Active contributors</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex -space-x-2">
								{["SC", "AB", "MK", "JD"].map((initials) => (
									<Avatar key={initials} size="sm" fallback={initials} />
								))}
							</div>
						</CardContent>
						<CardFooter>
							<Badge variant="success">Sprint Active</Badge>
						</CardFooter>
					</Card>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 05 Avatar ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="05"
					title="Avatar"
					description="3 sizes with initials fallback. Radix-based with image support."
				/>
				<div className="flex items-end gap-4">
					{AVATAR_SIZES.map((size) => (
						<div key={size} className="flex flex-col items-center gap-2">
							<Avatar size={size} fallback="DT" />
							<span className="text-xs text-muted-foreground">{size}</span>
						</div>
					))}
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 06 Dialog ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="06"
					title="Dialog"
					description="Accessible modal with overlay, focus trap, keyboard dismiss, and animations."
				/>
				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogTrigger asChild>
						<Button>Open Dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Confirm Action</DialogTitle>
							<DialogDescription>
								This dialog demonstrates the overlay backdrop, content panel, and footer actions.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button variant="outline" onClick={() => setDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={() => setDialogOpen(false)}>Confirm</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</section>

			<hr className="border-border" />

			{/* ── 07 Divider ────────────────────────────── */}
			<section>
				<SectionHeading
					number="07"
					title="Divider"
					description="Horizontal and vertical separators with optional label."
				/>
				<div className="space-y-6 max-w-lg">
					<Divider />
					<Divider label="or" />
					<div className="flex items-center gap-4 h-8">
						<span className="text-sm">Left</span>
						<Divider orientation="vertical" />
						<span className="text-sm">Right</span>
					</div>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 08 Spinner ────────────────────────────── */}
			<section>
				<SectionHeading
					number="08"
					title="Spinner"
					description="Loading indicator with size and color variants."
				/>
				<div className="flex items-center gap-6">
					<Spinner size="sm" />
					<Spinner size="md" />
					<Spinner size="lg" />
					<Spinner variant="muted" />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 09 Skeleton ───────────────────────────── */}
			<section>
				<SectionHeading
					number="09"
					title="Skeleton"
					description="Loading placeholders for text, circles, and rectangles."
				/>
				<div className="space-y-4 max-w-sm">
					<div className="flex items-center gap-3">
						<Skeleton variant="circular" size="md" />
						<div className="flex-1 space-y-2">
							<Skeleton variant="text" className="w-3/4" />
							<Skeleton variant="text" className="w-1/2" />
						</div>
					</div>
					<Skeleton variant="rectangular" size="sm" />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 10 Progress ───────────────────────────── */}
			<section>
				<SectionHeading
					number="10"
					title="Progress Bar"
					description="Determinate progress with size and color variants."
				/>
				<div className="space-y-4 max-w-md">
					<Progress value={25} size="sm" aria-label="Progress 25%" />
					<Progress value={50} size="md" aria-label="Progress 50%" />
					<Progress value={75} size="lg" variant="accent" aria-label="Progress 75%" />
					<Progress value={90} variant="destructive" aria-label="Progress 90%" />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 11 Notification Dot ───────────────────── */}
			<section>
				<SectionHeading
					number="11"
					title="Notification Dot"
					description="Status indicators with optional pulse animation."
				/>
				<div className="flex items-center gap-6">
					<NotificationDot />
					<NotificationDot variant="success" />
					<NotificationDot variant="warning" />
					<NotificationDot variant="error" />
					<NotificationDot variant="error" pulse />
					<NotificationDot size="lg" pulse />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 12 Textarea ───────────────────────────── */}
			<section>
				<SectionHeading
					number="12"
					title="Textarea"
					description="Multi-line text input with label, error, and auto-resize."
				/>
				<div className="grid max-w-2xl gap-6 sm:grid-cols-2">
					<Textarea label="Message" placeholder="Type your message..." />
					<Textarea label="Bio" error="Bio is too long" defaultValue="Lorem ipsum dolor sit amet" />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 13 Select ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="13"
					title="Select"
					description="Native select with custom styling, label, and error support."
				/>
				<div className="grid max-w-2xl gap-6 sm:grid-cols-2">
					<Select label="Country">
						<option value="">Select a country</option>
						<option value="us">United States</option>
						<option value="uk">United Kingdom</option>
						<option value="ca">Canada</option>
					</Select>
					<Select label="Size" error="Please select a size">
						<option value="">Choose size</option>
						<option value="s">Small</option>
						<option value="m">Medium</option>
					</Select>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 14 Checkbox ───────────────────────────── */}
			<section>
				<SectionHeading
					number="14"
					title="Checkbox"
					description="Custom-styled checkbox with label support."
				/>
				<div className="space-y-3">
					<Checkbox label="Accept terms and conditions" />
					<Checkbox label="Subscribe to newsletter" defaultChecked />
					<Checkbox label="Disabled option" disabled />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 15 Radio ──────────────────────────────── */}
			<section>
				<SectionHeading
					number="15"
					title="Radio"
					description="Radio group with custom styling and controlled state."
				/>
				<RadioGroup name="plan" value={radioValue} onValueChange={setRadioValue}>
					<Radio value="a" label="Free Plan" />
					<Radio value="b" label="Pro Plan" />
					<Radio value="c" label="Enterprise" />
				</RadioGroup>
			</section>

			<hr className="border-border" />

			{/* ── 16 Toggle ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="16"
					title="Toggle / Switch"
					description="On/off switch in 3 sizes."
				/>
				<div className="flex items-center gap-6">
					<Toggle
						size="sm"
						checked={toggleOn}
						onCheckedChange={setToggleOn}
						aria-label="Toggle small"
					/>
					<Toggle
						size="md"
						checked={toggleOn}
						onCheckedChange={setToggleOn}
						aria-label="Toggle medium"
					/>
					<Toggle
						size="lg"
						checked={toggleOn}
						onCheckedChange={setToggleOn}
						aria-label="Toggle large"
					/>
					<span className="text-sm text-muted-foreground">{toggleOn ? "On" : "Off"}</span>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 17 Slider ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="17"
					title="Slider / Range"
					description="Range input with size variants."
				/>
				<div className="space-y-4 max-w-sm">
					<Slider size="sm" defaultValue={25} min={0} max={100} aria-label="Slider small" />
					<Slider size="md" defaultValue={50} min={0} max={100} aria-label="Slider medium" />
					<Slider size="lg" defaultValue={75} min={0} max={100} aria-label="Slider large" />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 18 Alert ──────────────────────────────── */}
			<section>
				<SectionHeading
					number="18"
					title="Alert / Banner"
					description="4 semantic variants with optional title and dismiss."
				/>
				<div className="space-y-3 max-w-lg">
					<Alert variant="info" title="Information">
						Your account has been updated.
					</Alert>
					<Alert variant="success" title="Success">
						Changes saved successfully.
					</Alert>
					<Alert variant="warning" title="Warning">
						You are approaching your storage limit.
					</Alert>
					<Alert variant="error" title="Error" onDismiss={() => {}}>
						Failed to deploy. Please try again.
					</Alert>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 19 Toast ──────────────────────────────── */}
			<section>
				<SectionHeading
					number="19"
					title="Toast / Snackbar"
					description="Lightweight notification with variants and dismiss."
				/>
				<div className="space-y-3 max-w-sm">
					<Toast>File saved</Toast>
					<Toast variant="success">Deployment complete</Toast>
					<Toast variant="error" onDismiss={() => {}}>
						Build failed
					</Toast>
					<Toast variant="info">2 items updated</Toast>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 20 Tooltip ────────────────────────────── */}
			<section>
				<SectionHeading
					number="20"
					title="Tooltip"
					description="Hover tooltips with 4 placement options."
				/>
				<div className="flex flex-wrap gap-4">
					<Tooltip content="Top tooltip" side="top">
						<Button variant="outline" size="sm">
							Top
						</Button>
					</Tooltip>
					<Tooltip content="Right tooltip" side="right">
						<Button variant="outline" size="sm">
							Right
						</Button>
					</Tooltip>
					<Tooltip content="Bottom tooltip" side="bottom">
						<Button variant="outline" size="sm">
							Bottom
						</Button>
					</Tooltip>
					<Tooltip content="Left tooltip" side="left">
						<Button variant="outline" size="sm">
							Left
						</Button>
					</Tooltip>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 21 Popover ────────────────────────────── */}
			<section>
				<SectionHeading
					number="21"
					title="Popover"
					description="Click-triggered content container with placement."
				/>
				<Popover trigger={<Button variant="outline">Open Popover</Button>}>
					<div className="space-y-2 w-48">
						<p className="text-sm font-medium">Settings</p>
						<p className="text-xs text-muted-foreground">Adjust your preferences here.</p>
					</div>
				</Popover>
			</section>

			<hr className="border-border" />

			{/* ── 22 Empty State ─────────────────────────── */}
			<section>
				<SectionHeading
					number="22"
					title="Empty State"
					description="Placeholder for empty content areas with optional action."
				/>
				<Card className="max-w-md">
					<EmptyState
						icon={
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								className="h-6 w-6"
								aria-hidden="true"
							>
								<path
									d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
								<line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						}
						title="No files yet"
						description="Upload your first file to get started."
						action={<Button size="sm">Upload</Button>}
					/>
				</Card>
			</section>

			<hr className="border-border" />

			{/* ── 23 Tabs ───────────────────────────────── */}
			<section>
				<SectionHeading
					number="23"
					title="Tabs"
					description="Tab navigation with controlled state and panels."
				/>
				<Tabs value={tabValue} onValueChange={setTabValue} className="max-w-md">
					<TabList>
						<Tab value="overview">Overview</Tab>
						<Tab value="details">Details</Tab>
						<Tab value="settings">Settings</Tab>
					</TabList>
					<TabPanel value="overview">
						<p className="text-sm text-muted-foreground">Overview content goes here.</p>
					</TabPanel>
					<TabPanel value="details">
						<p className="text-sm text-muted-foreground">Detailed information and specs.</p>
					</TabPanel>
					<TabPanel value="settings">
						<p className="text-sm text-muted-foreground">Configure your preferences.</p>
					</TabPanel>
				</Tabs>
			</section>

			<hr className="border-border" />

			{/* ── 24 Breadcrumb ──────────────────────────── */}
			<section>
				<SectionHeading
					number="24"
					title="Breadcrumb"
					description="Navigation path with separator and current page."
				/>
				<Breadcrumb
					items={[
						{ label: "Home", href: "/" },
						{ label: "Components", href: "/showcase" },
						{ label: "Breadcrumb" },
					]}
					aria-label="Breadcrumb example"
				/>
			</section>

			<hr className="border-border" />

			{/* ── 25 Pagination ──────────────────────────── */}
			<section>
				<SectionHeading
					number="25"
					title="Pagination"
					description="Page navigation with prev/next and active state."
				/>
				<Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
			</section>

			<hr className="border-border" />

			{/* ── 26 Stepper ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="26"
					title="Stepper"
					description="Step indicators with completed, active, and pending states."
				/>
				<Stepper
					steps={[
						{ label: "Details", description: "Basic info" },
						{ label: "Payment", description: "Billing" },
						{ label: "Review" },
						{ label: "Confirm" },
					]}
					activeStep={2}
				/>
			</section>

			<hr className="border-border" />

			{/* ── 27 Navigation Bar ──────────────────────── */}
			<section>
				<SectionHeading
					number="27"
					title="Navigation Bar"
					description="Horizontal nav with brand and active indicator."
				/>
				<NavBar
					brand="Acme"
					items={[
						{ label: "Dashboard", href: "#", active: true },
						{ label: "Projects", href: "#" },
						{ label: "Team", href: "#" },
						{ label: "Settings", href: "#" },
					]}
					className="rounded-lg"
					aria-label="Main navigation example"
				/>
			</section>

			<hr className="border-border" />

			{/* ── 28 Sidebar Navigation ──────────────────── */}
			<section>
				<SectionHeading
					number="28"
					title="Sidebar Navigation"
					description="Vertical nav with collapsible sections."
				/>
				<div className="max-w-xs rounded-lg border border-border">
					<SidebarNav
						collapsible
						aria-label="Sidebar navigation example"
						sections={[
							{
								title: "Main",
								items: [
									{ label: "Dashboard", href: "#", active: true },
									{ label: "Analytics", href: "#" },
								],
							},
							{
								title: "Settings",
								items: [
									{ label: "Profile", href: "#" },
									{ label: "Billing", href: "#" },
								],
							},
						]}
					/>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 29 Table ───────────────────────────────── */}
			<section>
				<SectionHeading
					number="29"
					title="Table"
					description="Responsive data table with header, body, and cells."
				/>
				<Card className="max-w-lg">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Role</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>Alice Chen</TableCell>
								<TableCell>
									<Badge variant="success">Active</Badge>
								</TableCell>
								<TableCell>Admin</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Bob Smith</TableCell>
								<TableCell>
									<Badge variant="warning">Away</Badge>
								</TableCell>
								<TableCell>Editor</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Carol Davis</TableCell>
								<TableCell>
									<Badge variant="default">Pending</Badge>
								</TableCell>
								<TableCell>Viewer</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Card>
			</section>

			<hr className="border-border" />

			{/* ── 30 Accordion ───────────────────────────── */}
			<section>
				<SectionHeading
					number="30"
					title="Accordion"
					description="Collapsible content sections (single and multiple mode)."
				/>
				<div className="max-w-md">
					<Accordion
						items={[
							{
								value: "1",
								trigger: "What is this design system?",
								content:
									"A comprehensive set of 36 React components built with Tailwind CSS v4, TypeScript, and CVA for variant management.",
							},
							{
								value: "2",
								trigger: "How do I install it?",
								content:
									"Clone the repository and run pnpm install. All components are in src/components/ui/.",
							},
							{
								value: "3",
								trigger: "Is dark mode supported?",
								content:
									"Yes! The system uses CSS custom properties with .dark class toggling via next-themes.",
							},
						]}
					/>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 31 Date Picker ──────────────────────────── */}
			<section>
				<SectionHeading
					number="31"
					title="Date Picker"
					description="Styled date input with label and error support."
				/>
				<div className="grid max-w-2xl gap-6 sm:grid-cols-2">
					<DatePicker label="Start date" />
					<DatePicker label="End date" error="End date must be after start date" />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 32 Chip / Filter ────────────────────────── */}
			<section>
				<SectionHeading
					number="32"
					title="Chip / Filter"
					description="Removable and selectable tags."
				/>
				<div className="flex flex-wrap gap-2">
					<Chip>React</Chip>
					<Chip>TypeScript</Chip>
					<Chip selected>Tailwind</Chip>
					<Chip onRemove={() => {}}>Removable</Chip>
					<Chip size="sm">Small</Chip>
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 33 Toolbar ─────────────────────────────── */}
			<section>
				<SectionHeading
					number="33"
					title="Toolbar"
					description="Horizontal action bar with buttons and separators."
				/>
				<Toolbar aria-label="Text formatting">
					<ToolbarButton active aria-label="Bold">
						B
					</ToolbarButton>
					<ToolbarButton aria-label="Italic">I</ToolbarButton>
					<ToolbarButton aria-label="Underline">U</ToolbarButton>
					<ToolbarSeparator />
					<ToolbarButton aria-label="Align left">L</ToolbarButton>
					<ToolbarButton aria-label="Align center">C</ToolbarButton>
					<ToolbarButton aria-label="Align right">R</ToolbarButton>
				</Toolbar>
			</section>

			<hr className="border-border" />

			{/* ── 34 File Upload ──────────────────────────── */}
			<section>
				<SectionHeading
					number="34"
					title="File Upload / Dropzone"
					description="Drag-and-drop area with file list."
				/>
				<div className="max-w-md">
					<FileUpload accept="image/*" maxSizeMB={5} />
				</div>
			</section>

			<hr className="border-border" />

			{/* ── 35 Sheet ───────────────────────────────── */}
			<section>
				<SectionHeading
					number="35"
					title="Sheet / Side Panel"
					description="Slide-in panel from the right with overlay."
				/>
				<Button variant="outline" onClick={() => setSheetOpen(true)}>
					Open Sheet
				</Button>
				<Sheet open={sheetOpen} onClose={() => setSheetOpen(false)} title="Sheet Panel">
					<div className="space-y-4">
						<p className="text-sm text-muted-foreground">
							This is a side panel that slides in from the right.
						</p>
						<Input label="Name" placeholder="Enter name" />
						<Button onClick={() => setSheetOpen(false)}>Save</Button>
					</div>
				</Sheet>
			</section>

			<hr className="border-border" />

			{/* ── 36 Command Palette ──────────────────────── */}
			<section>
				<SectionHeading
					number="36"
					title="Command Palette"
					description="Searchable command list with keyboard navigation."
				/>
				<Button variant="outline" onClick={() => setCmdOpen(true)}>
					Open Command Palette
				</Button>
				<CommandPalette
					open={cmdOpen}
					onClose={() => setCmdOpen(false)}
					groups={[
						{
							heading: "Actions",
							items: [
								{ id: "1", label: "New File", shortcut: "⌘N", onSelect: () => setCmdOpen(false) },
								{ id: "2", label: "Open File", shortcut: "⌘O", onSelect: () => setCmdOpen(false) },
								{ id: "3", label: "Save", shortcut: "⌘S", onSelect: () => setCmdOpen(false) },
							],
						},
						{
							heading: "Navigation",
							items: [
								{ id: "4", label: "Go to Dashboard", onSelect: () => setCmdOpen(false) },
								{ id: "5", label: "Go to Settings", onSelect: () => setCmdOpen(false) },
							],
						},
					]}
				/>
			</section>
		</div>
	);
}
