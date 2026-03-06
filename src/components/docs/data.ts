// ─── Types ──────────────────────────────────────────────────────────

export type SectionId =
	| "overview"
	| "pipeline"
	| "agents"
	| "commands"
	| "skills"
	| "plugins"
	| "hooks"
	| "mcp"
	| "parallel";

export type NavSection = {
	id: SectionId;
	label: string;
};

export type PipelineStep = {
	number: number;
	name: string;
	agent: string;
	description: string;
};

export type AgentInfo = {
	name: string;
	model: "opus" | "sonnet";
	description: string;
	whenToUse: string;
	tools: string[];
};

export type CommandInfo = {
	name: string;
	description: string;
	usage: string;
};

export type SkillInfo = {
	name: string;
	trigger: string;
	description: string;
	glob: string;
};

export type PluginInfo = {
	name: string;
	skill: string;
	description: string;
	mandatory?: boolean;
};

export type HookInfo = {
	event: string;
	description: string;
	config: string;
};

export type McpServerInfo = {
	name: string;
	type: "local" | "remote";
	description: string;
	rateLimit: string;
	tools: string[];
};

// ─── Navigation ─────────────────────────────────────────────────────

export const NAV_SECTIONS: NavSection[] = [
	{ id: "overview", label: "Overview" },
	{ id: "pipeline", label: "Pipeline" },
	{ id: "agents", label: "Agents" },
	{ id: "commands", label: "Commands" },
	{ id: "skills", label: "Skills" },
	{ id: "plugins", label: "Plugins" },
	{ id: "hooks", label: "Hooks" },
	{ id: "mcp", label: "MCP Servers" },
	{ id: "parallel", label: "Parallel" },
];

// ─── Overview ───────────────────────────────────────────────────────

export const OVERVIEW = {
	title: "Claude Code Orchestration",
	subtitle: "Interactive developer guide for design-to-deploy",
	description:
		"This project is a Next.js 16 showcase that demonstrates how to orchestrate Claude Code for production development. It combines 7 specialized agents, 7 slash commands, 3 skills, automated hooks, and MCP server integrations into a cohesive workflow.",
	quickStart: [
		"Plan before you build — use Plan mode for non-trivial tasks",
		"Agents are specialized — use the right one for the job",
		"Verification is non-negotiable — typecheck + lint + test before shipping",
		"Everything goes through PRs — issue → branch → PR → merge",
	],
};

// ─── Pipeline ───────────────────────────────────────────────────────

export const PIPELINE_STEPS: PipelineStep[] = [
	{
		number: 1,
		name: "Explore",
		agent: "Explore agent",
		description: "Understand the codebase area before planning",
	},
	{
		number: 2,
		name: "Plan",
		agent: "Plan mode",
		description: "Design the approach and get user sign-off",
	},
	{
		number: 3,
		name: "Staff Review",
		agent: "staff-reviewer",
		description: "Validate the plan before writing code",
	},
	{
		number: 4,
		name: "Implement",
		agent: "Auto-accept mode",
		description: "Write the code after plan approval",
	},
	{
		number: 5,
		name: "Simplify",
		agent: "/simplify",
		description: "Reduce complexity as a cleanup pass",
	},
	{
		number: 6,
		name: "Test",
		agent: "test-writer",
		description: "Write unit + visual tests for components",
	},
	{
		number: 7,
		name: "Verify",
		agent: "verify-app",
		description: "Static analysis + tests + live app checks",
	},
	{
		number: 8,
		name: "Review",
		agent: "code-reviewer",
		description: "Pre-PR structured review for quality",
	},
	{
		number: 9,
		name: "Build Validate",
		agent: "build-validator",
		description: "Confirm production build + bundle analysis",
	},
	{
		number: 10,
		name: "Ship",
		agent: "/pr-ready",
		description: "Create branch and PR targeting main",
	},
];

// ─── Agents ─────────────────────────────────────────────────────────

export const AGENTS: AgentInfo[] = [
	{
		name: "staff-reviewer",
		model: "opus",
		description: "Pre-implementation plan review. Finds problems before code is written.",
		whenToUse: "BEFORE implementation — validates plan, finds problems early",
		tools: ["Read", "Glob", "Grep", "Bash(git diff)", "Bash(git log)"],
	},
	{
		name: "design-implementer",
		model: "opus",
		description:
			"Implements components from design specs or Figma using the project design system.",
		whenToUse: "UI component work from specs or Figma designs",
		tools: ["Read", "Write", "Edit", "Glob", "Grep", "Bash(npm/npx)", "Figma MCP"],
	},
	{
		name: "feature-orchestrator",
		model: "opus",
		description: "Coordinates full feature lifecycle — delegates to other agents.",
		whenToUse: "Complex features that span implement, test, and review",
		tools: ["Read", "Write", "Edit", "Glob", "Grep", "Bash", "Task", "gh CLI"],
	},
	{
		name: "code-reviewer",
		model: "sonnet",
		description:
			"Reviews code for bugs, logic errors, security vulnerabilities, and quality issues.",
		whenToUse: "Pre-PR structured review (TypeScript, a11y, perf, security)",
		tools: ["Read", "Glob", "Grep", "Bash(git diff)", "Bash(git log)"],
	},
	{
		name: "test-writer",
		model: "sonnet",
		description: "Writes comprehensive unit + visual tests for new or modified components.",
		whenToUse: "After component implementation or modification",
		tools: ["Read", "Write", "Edit", "Glob", "Grep", "Bash(vitest)", "Bash(playwright)"],
	},
	{
		name: "verify-app",
		model: "sonnet",
		description: "End-to-end verification: static analysis, tests, and live app checks.",
		whenToUse: "Before shipping — comprehensive verification pass",
		tools: ["Read", "Glob", "Grep", "Bash(pnpm)", "Bash(curl)", "Playwright MCP"],
	},
	{
		name: "build-validator",
		model: "sonnet",
		description: "Build and CI specialist — validates production readiness and bundle size.",
		whenToUse: "Final check before PR — confirms build succeeds",
		tools: ["Read", "Glob", "Grep", "Bash(pnpm)", "Bash(du)", "Bash(wc)"],
	},
];

// ─── Commands ───────────────────────────────────────────────────────

export const COMMANDS: CommandInfo[] = [
	{
		name: "/work-on-issue",
		description:
			"Start working on a GitHub issue — creates branch, reads issue, begins implementation",
		usage: "/work-on-issue 42",
	},
	{
		name: "/pr-ready",
		description: "Prepare current work for a pull request — commit, push, create PR",
		usage: "/pr-ready",
	},
	{
		name: "/verify",
		description: "Run the full verification pipeline: typecheck + lint + unit tests + build",
		usage: "/verify",
	},
	{
		name: "/simplify",
		description: "Review recently changed code for complexity, reuse, and quality — then fix",
		usage: "/simplify",
	},
	{
		name: "/new-component",
		description: "Scaffold a new UI component with tests, barrel export, and showcase entry",
		usage: "/new-component DatePicker",
	},
	{
		name: "/orchestrate",
		description: "Run multiple GitHub issues in parallel using automated subagent worktrees",
		usage: "/orchestrate 19,20,21",
	},
	{
		name: "/learn",
		description: "Capture a correction or lesson as a durable rule in project memory",
		usage: "/learn",
	},
];

// ─── Skills ─────────────────────────────────────────────────────────

export const SKILLS: SkillInfo[] = [
	{
		name: "frontend-stack",
		trigger: "Loaded contextually for *.tsx files",
		description:
			"Injects Next.js 16, React 19, and Tailwind v4 patterns. Covers App Router conventions, Server Component rules, and project-specific component patterns.",
		glob: "src/**/*.tsx",
	},
	{
		name: "testing",
		trigger: "Loaded for test files",
		description:
			"Injects Vitest + React Testing Library + Playwright patterns. Covers mock patterns, assertion styles, and the motion component mock.",
		glob: "tests/**/*.{ts,tsx}, src/**/*.test.{ts,tsx}",
	},
	{
		name: "gemini",
		trigger: "MUST invoke before any mcp__gemini-cli__ tool call",
		description:
			"Sets up Gemini CLI MCP integration. Configures correct model (gemini-3.1-pro-preview), auth, and tool prefixes.",
		glob: "Manual invocation",
	},
];

// ─── Plugins ────────────────────────────────────────────────────────

export const PLUGINS: PluginInfo[] = [
	{
		name: "frontend-design",
		skill: "/frontend-design",
		description:
			"Creates distinctive, production-grade frontend interfaces. Guides typography, color, motion, and spatial composition choices.",
		mandatory: true,
	},
	{
		name: "code-simplifier",
		skill: "/simplify",
		description:
			"Post-implementation cleanup. Simplifies and refines code for clarity, consistency, and maintainability while preserving all functionality.",
	},
	{
		name: "feature-dev",
		skill: "/feature-dev",
		description:
			"Guided feature development with code-reviewer, code-architect, and code-explorer sub-roles.",
	},
];

// ─── Hooks ──────────────────────────────────────────────────────────

export const HOOKS: HookInfo[] = [
	{
		event: "PostToolUse (Write|Edit)",
		description:
			"Auto-formats every file after Write or Edit with Biome. Eliminates manual formatting entirely.",
		config: `{
  "matcher": "Write|Edit",
  "hooks": [{
    "type": "command",
    "command": "pnpm biome check --write --unsafe \\"$CLAUDE_FILE_PATH\\""
  }]
}`,
	},
	{
		event: "Stop",
		description:
			"Runs typecheck + lint on every session stop. Ensures no session ends with broken code.",
		config: `{
  "hooks": [{
    "type": "command",
    "command": "pnpm typecheck && pnpm lint"
  }]
}`,
	},
	{
		event: "Notification",
		description:
			"Sends macOS notification when Claude Code completes a task. Enables async workflow.",
		config: `{
  "hooks": [{
    "type": "command",
    "command": "osascript -e 'display notification ...'"
  }]
}`,
	},
];

export const LEFTHOOK_CONFIG = `pre-commit:
  commands:
    biome:
      glob: "*.{js,ts,jsx,tsx,json,css}"
      run: pnpm biome check --staged --write
      stage_fixed: true
    typecheck:
      run: pnpm tsc --noEmit

commit-msg:
  commands:
    commitlint:
      run: pnpm commitlint --edit {1}`;

// ─── MCP Servers ────────────────────────────────────────────────────

export const MCP_SERVERS: McpServerInfo[] = [
	{
		name: "Playwright",
		type: "local",
		description:
			"Browser automation for visual verification, E2E testing, and responsive design checks.",
		rateLimit: "Unlimited",
		tools: [
			"browser_navigate",
			"browser_take_screenshot",
			"browser_click",
			"browser_type",
			"browser_evaluate",
			"browser_resize",
		],
	},
	{
		name: "Figma",
		type: "remote",
		description: "Read designs from Figma, manage Code Connect mappings, create FigJam diagrams.",
		rateLimit: "6 calls/month (free tier)",
		tools: [
			"get_design_context",
			"get_screenshot",
			"get_metadata",
			"generate_diagram",
			"add_code_connect_map",
		],
	},
	{
		name: "Gemini CLI",
		type: "local",
		description:
			"Broad codebase analysis, second opinions, accessibility audits, and research via Google Gemini.",
		rateLimit: "Unlimited",
		tools: ["chat", "googleSearch", "analyzeFile"],
	},
];

// ─── Parallel Execution ─────────────────────────────────────────────

export const PARALLEL_PATTERNS = {
	worktrees: {
		title: "Worktrees",
		description:
			"Isolated git worktrees for parallel development sessions. Each gets its own branch and pnpm install.",
		usage: `claude -w issue-42    # Creates isolated worktree
claude -w issue-43    # In a separate terminal`,
	},
	orchestrate: {
		title: "/orchestrate Command",
		description:
			"Spawn parallel subagents, each in an isolated worktree. Orchestrator validates issues, spawns agents, and reports results.",
		usage: `/orchestrate 19,20,21          # Parallel
/orchestrate 16,17 | 18,19     # Sequential blocks`,
	},
	agentTeams: {
		title: "Agent Teams",
		description:
			"Coordinated parallel work with shared task list, inter-agent messaging, and centralized coordination.",
		usage: `// Enable in settings:
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }`,
	},
};
