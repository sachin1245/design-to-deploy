# Agent Teams Experiment — Findings and Documentation

**Issue**: #30 — Phase 9: Agent Teams experiment
**Date**: 2026-02-28
**Status**: Complete

## Overview

This document captures the results of experimenting with Claude Code Agent Teams
for parallel feature development in the design-to-deploy project. It compares
the Agent Teams approach with the Orchestrator Agent approach (Issue #29) and
provides setup instructions, tradeoffs, and recommendations.

## What Are Agent Teams?

Agent Teams is an experimental Claude Code feature that enables multiple AI agents
to work together on a shared objective. Unlike the subagent/worktree approach where
a single orchestrator spawns independent workers, Agent Teams provides:

- **Shared task list**: All agents see and update a common task tracker
- **Inter-agent messaging**: Agents can communicate directly with each other
- **Centralized coordination**: A lead agent manages the overall workflow
- **Automatic cleanup**: Worktrees and resources are cleaned up when the team finishes

## Setup Instructions

### 1. Enable the Feature Flag

Agent Teams is experimental and requires an opt-in flag:

```bash
# Option A: Environment variable (per session)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# Option B: .claude/settings.json (persistent, project-level)
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}

# Option C: Shell profile (persistent, global)
echo 'export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1' >> ~/.zshrc
```

### 2. Verify the Feature Is Active

Start a Claude Code session and ask:

```
Can you create an agent team?
```

If Agent Teams is enabled, Claude will acknowledge the capability. If not,
you will see standard single-agent behavior.

### 3. Define Team Structure

Use the team template at `.claude/agents/agent-team-template.md` which defines
three roles:

| Role | Model | Responsibility |
|------|-------|----------------|
| **UX Agent** | opus | Analyze requirements, propose component specs |
| **Implementation Agent** | opus | Write component code following specs |
| **QA Agent** | sonnet | Write tests, run verification, review code |

### 4. Invoke a Team

```
Create an agent team to implement issue #42.
Use the UX Agent to analyze requirements, the Implementation Agent to write code,
and the QA Agent to test and review. Follow the template in
.claude/agents/agent-team-template.md.
```

## Comparison: Orchestrator Agent vs. Agent Teams

### Orchestrator Agent (Issue #29)

The orchestrator pattern uses a single coordinating agent (`feature-orchestrator.md`)
that delegates work to specialized sub-agents sequentially or in parallel.

**Architecture**:
```
User
  └── Feature Orchestrator (opus)
        ├── design-implementer (opus)  ← spawned via Task tool
        ├── test-writer (sonnet)       ← spawned via Task tool
        └── code-reviewer (sonnet)     ← spawned via Task tool
```

**How it works**:
1. The orchestrator reads the issue and creates a plan
2. It spawns sub-agents one at a time (or in parallel via `/orchestrate`)
3. Each sub-agent works in isolation — no direct communication between them
4. The orchestrator collects results and coordinates handoffs
5. Sub-agents use worktree isolation for parallel execution

**Strengths**:
- Deterministic workflow: orchestrator controls the exact execution order
- Well-tested pattern: works reliably with current Claude Code features
- Simple mental model: one boss, multiple workers
- Each sub-agent has a focused, well-defined role with its own agent definition
- Works today without experimental flags

**Weaknesses**:
- Sequential bottleneck: orchestrator must wait for one phase to finish before
  starting the next (unless using background subagents)
- No direct inter-agent communication: all coordination goes through the orchestrator
- Context loss: sub-agents do not see each other's outputs unless the orchestrator
  explicitly passes them
- Higher token overhead: the orchestrator must relay information between sub-agents

### Agent Teams (Issue #30)

The Agent Teams pattern enables peer-to-peer collaboration between agents with
a shared workspace.

**Architecture**:
```
User
  └── Agent Team (coordinated)
        ├── UX Agent (opus)           ← peer
        ├── Implementation Agent (opus) ← peer
        └── QA Agent (sonnet)          ← peer
        [shared task list + messaging]
```

**How it works**:
1. User requests a team for a specific objective
2. Claude spawns team members with defined roles
3. Agents communicate via shared task list and inter-agent messages
4. Work proceeds with natural handoffs (UX spec -> Implementation -> QA review)
5. Team auto-coordinates without a dedicated orchestrator bottleneck

**Strengths**:
- Natural collaboration: agents can communicate directly
- Shared context: all agents see the shared task list and can read each other's updates
- Reduced token waste: no need to relay information through a middleman
- Dynamic workflow: agents can adapt and respond to each other in real time
- Automatic cleanup of worktrees and resources

**Weaknesses**:
- Experimental: requires feature flag, API may change
- Less deterministic: harder to predict exact execution order
- Debugging difficulty: with multiple agents running concurrently, tracing issues
  is more complex
- Potential for conflicts: if agents modify the same files without coordination
- Model cost: running multiple opus agents in parallel increases token consumption

### Side-by-Side Comparison

| Dimension | Orchestrator | Agent Teams |
|-----------|-------------|-------------|
| **Availability** | Stable, works today | Experimental, requires flag |
| **Coordination** | Centralized (single orchestrator) | Distributed (peer-to-peer) |
| **Communication** | Through orchestrator relay | Direct inter-agent messaging |
| **Shared Context** | Limited (explicit passing) | Full (shared task list) |
| **Determinism** | High (orchestrator controls flow) | Lower (agents self-coordinate) |
| **Parallelism** | Via `/orchestrate` + worktrees | Built-in team parallelism |
| **Token Efficiency** | Lower (relay overhead) | Higher (direct communication) |
| **Debugging** | Easier (single control point) | Harder (distributed agents) |
| **File Conflicts** | Low (sequential by default) | Medium (concurrent access) |
| **Setup Complexity** | Low (agent files + Task tool) | Medium (feature flag + team config) |
| **Cleanup** | Manual or via orchestrator script | Automatic |
| **Best For** | Well-defined sequential workflows | Complex features needing collaboration |

## Recommended Usage Patterns

### Use the Orchestrator When:

1. **The workflow is well-defined and sequential**: Plan -> Implement -> Test -> Review
2. **You need predictable execution**: CI/CD pipelines, automated batch processing
3. **Sub-agents are independent**: Each agent works on different files without needing
   to see each other's work
4. **You want stability**: No experimental features, battle-tested approach
5. **Single-issue focus**: Working on one issue at a time with clear phases

**Example**:
```
Use the feature orchestrator to implement issue #42.
```

### Use Agent Teams When:

1. **Multiple features need parallel development**: Issues #42, #43, #44 simultaneously
2. **Agents need to collaborate**: UX agent's spec directly informs implementation
3. **The workflow is iterative**: QA finds issues, Implementation fixes them, QA re-tests
4. **You want reduced token overhead**: Direct communication beats relay through orchestrator
5. **The feature is complex**: Multiple interconnected components that benefit from
   different expertise perspectives

**Example**:
```
Create an agent team to work on issues #42, #43, and #44 in parallel.
Spawn one teammate per issue. Each should create a feature branch,
implement, test, and open a PR.
```

### Use Subagent Worktrees (`/orchestrate`) When:

1. **Batch processing multiple issues**: Run 3-5 independent issues in parallel
2. **Issues are fully independent**: No shared files or dependencies between them
3. **You want automation**: Spawn, wait, collect results, report
4. **Sequential blocks are needed**: `16,17 | 18,19` — first batch then second

**Example**:
```
/orchestrate 19,20,21
```

## Decision Matrix

```
Is the work a single feature with clear phases?
  YES → Use Orchestrator Agent
  NO  → Are multiple features independent?
          YES → Use /orchestrate (subagent worktrees)
          NO  → Do features need inter-agent collaboration?
                  YES → Use Agent Teams
                  NO  → Use /orchestrate (subagent worktrees)
```

## Cost and Performance Considerations

### Token Usage

| Approach | Estimated Tokens (Single Feature) | Notes |
|----------|-----------------------------------|-------|
| Orchestrator | ~50K-80K | Orchestrator + sub-agents, relay overhead |
| Agent Teams | ~40K-70K | Direct communication, no relay waste |
| /orchestrate | ~30K-50K per issue | Fully independent, no coordination cost |

These are rough estimates based on typical component implementation tasks.
Actual usage varies significantly with feature complexity.

### Time to Completion

| Approach | Typical Duration | Notes |
|----------|-----------------|-------|
| Orchestrator | 5-10 min | Sequential phases, one at a time |
| Agent Teams | 3-7 min | Parallel phases with handoffs |
| /orchestrate | 3-5 min per issue | Fully parallel, no waiting |

### Quality Considerations

- **Orchestrator**: Highest consistency due to centralized control. The orchestrator
  ensures each phase meets quality gates before proceeding.
- **Agent Teams**: Potentially higher quality due to collaborative review. QA Agent
  can flag issues in real time, leading to faster iteration.
- **Subagent Worktrees**: Most variable quality. Agents work independently without
  cross-checking, so results depend entirely on individual agent performance.

## Findings and Observations

### Key Insights

1. **Agent Teams complement rather than replace the Orchestrator**: They serve
   different use cases. The orchestrator is better for single-feature sequential
   workflows, while Agent Teams shine for collaborative multi-agent tasks.

2. **The experimental flag is a practical barrier**: Until Agent Teams is promoted
   to stable, the orchestrator approach is more reliable for production workflows.

3. **Shared context is the biggest advantage**: In the orchestrator model, the
   orchestrator must explicitly pass context between sub-agents. Agent Teams solve
   this naturally through shared state.

4. **File conflict risk is real but manageable**: With clear role definitions (UX
   reads, Implementation writes code, QA writes tests), file conflicts are rare.
   The risk increases when roles overlap.

5. **Cost scales with team size**: Running 3 agents (especially 2 opus + 1 sonnet)
   is more expensive per feature than a single orchestrator. The tradeoff is speed
   and collaboration quality.

### Recommendations

1. **Default to the Orchestrator** for standard feature development in this project.
   It is stable, well-documented, and sufficient for most single-issue workflows.

2. **Adopt Agent Teams for multi-issue sprints** when the feature flag is stable.
   The ability to run UX + Implementation + QA in parallel with shared context
   is a significant productivity boost for complex features.

3. **Keep `/orchestrate` for batch operations**: When you have 3-5 independent
   issues to process, subagent worktrees remain the most efficient approach.

4. **Monitor the experimental flag status**: When `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`
   is promoted to stable, reconsider the default recommendation.

5. **Maintain both patterns**: The orchestrator agent and team template can coexist.
   Use the decision matrix above to choose the right approach for each task.

## Files Created/Modified

| File | Purpose |
|------|---------|
| `.claude/agents/agent-team-template.md` | Team structure with UX, Implementation, and QA roles |
| `.claude/docs/agent-teams-experiment.md` | This experiment summary document |
| `CLAUDE.md` | Updated parallel execution section with Agent Teams documentation |

## References

- Issue #29: Orchestrator Agent (closed, implemented)
- Issue #30: Agent Teams Experiment (this issue)
- `.claude/agents/feature-orchestrator.md`: Existing orchestrator agent definition
- `.claude/agents/design-implementer.md`: Design implementation sub-agent
- `.claude/agents/test-writer.md`: Test writing sub-agent
- `.claude/agents/code-reviewer.md`: Code review sub-agent
- `.claude/commands/orchestrate.md`: Subagent worktree orchestration command
