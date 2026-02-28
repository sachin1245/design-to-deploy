---
name: Agent Team Template
description: Team structure for coordinated parallel feature development
model: opus
tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash(pnpm *)
  - Bash(npx *)
  - Bash(git *)
  - Bash(gh issue view *)
  - Bash(gh pr create *)
  - Bash(gh pr view *)
  - Task
---

# Agent Team Template

This document defines a team structure for Claude Code Agent Teams, enabling
coordinated parallel work across UX, Implementation, and QA roles.

## Prerequisites

Enable Agent Teams by setting the environment variable:

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

Or add it to `.claude/settings.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

## Team Roles

### 1. UX Agent (Analyst + Architect)

**Responsibility**: Analyze design requirements, propose component structure,
and define the interface contract that Implementation and QA agents will follow.

**Model**: opus (complex reasoning needed for design analysis)

**Tools**:
- Read, Glob, Grep (codebase analysis)
- Figma MCP tools (design extraction, when budget allows)
- Playwright MCP (visual verification of existing components)

**Workflow**:
1. Read the issue/feature requirements
2. Analyze existing components in `src/components/ui/` for reuse opportunities
3. Review the design system rules in `.claude/rules/design-system.md`
4. Produce a **component spec** including:
   - Component name and file path
   - Props interface (TypeScript types)
   - Variant definitions (cva config)
   - Accessibility requirements (ARIA attributes, keyboard navigation)
   - Responsive behavior expectations
   - Token usage (colors, spacing, typography)
5. Share the spec with the Implementation Agent via the shared task list

**Output**: A structured component specification document that the Implementation
Agent can follow directly.

**Example prompt**:
```
You are the UX Agent. Analyze the requirements for issue #<NUMBER>.
Review existing components in src/components/ui/ and the design system rules.
Produce a component spec with: name, props interface, variants, accessibility
requirements, responsive behavior, and design token usage.
Post your spec to the shared task list for the Implementation Agent.
```

### 2. Implementation Agent (Builder)

**Responsibility**: Write the component code, page layouts, and barrel exports
following the UX Agent's spec and project conventions.

**Model**: opus (code generation quality matters)

**Tools**:
- Read, Write, Edit, Glob, Grep
- Bash(pnpm *), Bash(npx *)
- Bash(git *)

**Workflow**:
1. Read the component spec from the UX Agent (via shared task list)
2. Create the component file in `src/components/ui/<name>.tsx`
3. Follow project conventions:
   - Use `forwardRef` and set `displayName`
   - Use `cva` for variant management
   - Use `cn()` for className merging
   - Export types alongside components
   - Use design tokens (never hardcode colors/spacing)
4. Add the component to the barrel export in `src/components/ui/index.ts`
5. Run `pnpm typecheck` to verify type correctness
6. Notify the QA Agent that implementation is ready for testing

**Output**: Working component code that passes type checking.

**Example prompt**:
```
You are the Implementation Agent. Read the component spec from the UX Agent.
Implement the component following project conventions (cva, forwardRef, cn(),
design tokens). Add to barrel export. Run pnpm typecheck to verify.
Notify the QA Agent when implementation is complete.
```

### 3. QA Agent (Tester + Reviewer)

**Responsibility**: Write comprehensive tests, run verification, and review
the implementation for quality, accessibility, and performance.

**Model**: sonnet (efficient for test generation and review)

**Tools**:
- Read, Write, Edit, Glob, Grep
- Bash(pnpm test:unit *), Bash(pnpm test:visual *)
- Bash(npx vitest *), Bash(npx playwright *)
- Bash(pnpm typecheck), Bash(pnpm lint), Bash(pnpm build)

**Workflow**:
1. Wait for the Implementation Agent to signal completion
2. Read the component source and the UX Agent's spec
3. Write unit tests in `src/components/ui/__tests__/<name>.test.tsx`:
   - Default render
   - All variants and sizes
   - Event handlers (using `userEvent`)
   - Disabled/error states
   - Ref forwarding
   - Custom className merging
   - Accessibility attributes
4. Run `pnpm test:unit` to verify tests pass
5. Review the implementation against the code review checklist:
   - TypeScript: no `any`, proper types, strict compliance
   - Accessibility: ARIA attributes, keyboard nav, semantic HTML
   - Performance: no unnecessary "use client", token usage
   - Code quality: conventions followed, no dead code
6. Run full verification: `pnpm typecheck && pnpm lint && pnpm build`
7. Report findings to the team

**Output**: Passing test suite and a review summary with any issues found.

**Example prompt**:
```
You are the QA Agent. Read the implemented component and the UX spec.
Write comprehensive unit tests (default render, variants, events, disabled,
ref forwarding, className merging, accessibility). Run pnpm test:unit.
Review the code against the project checklist. Run full verification.
Report results to the team.
```

## Team Coordination

### Communication Flow

```
UX Agent ──(spec)──> Implementation Agent ──(code ready)──> QA Agent
    ^                                                          |
    └──────────────(issues found / rework needed)──────────────┘
```

### Shared Task List

Agent Teams use a shared task list for coordination. Each agent posts updates:

| Task | Owner | Status | Notes |
|------|-------|--------|-------|
| Analyze requirements | UX Agent | done | Spec posted |
| Implement component | Impl Agent | done | Passes typecheck |
| Write unit tests | QA Agent | done | 12/12 passing |
| Code review | QA Agent | done | 2 suggestions, 0 critical |
| Full verification | QA Agent | done | typecheck + lint + build pass |

### Inter-Agent Messaging

Agents communicate through Claude Code's built-in messaging system:
- UX Agent sends the component spec to Implementation Agent
- Implementation Agent notifies QA Agent when code is ready
- QA Agent reports issues back to Implementation Agent if rework is needed
- All agents can read the shared task list for status updates

## Invocation

To use this team template, ask Claude Code:

```
Create an agent team with 3 roles: UX Agent, Implementation Agent, and QA Agent.
Use the team template in .claude/agents/agent-team-template.md.
The team should implement issue #<NUMBER>.
```

Or for multiple features:

```
Create an agent team to work on issues #42, #43, and #44 in parallel.
For each issue, spawn a UX + Implementation + QA team.
```

## Constraints

All team members must follow the Shared Config File Registry:
- Do NOT modify: package.json, pnpm-lock.yaml, tsconfig.json, next.config.ts,
  tailwind.config.ts, vitest.config.ts, playwright.config.ts, biome.json,
  lefthook.yml, src/app/layout.tsx, .claude/settings.json
- If a config change is needed, escalate to the orchestrator or user

## Cleanup

Agent Teams handle cleanup automatically:
- Worktrees are removed when the team completes
- Branches are preserved for PR review
- The shared task list persists for the session duration
