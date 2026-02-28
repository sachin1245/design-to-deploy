# Figma ↔ Code Bidirectional Workflow

## Overview

This project uses the Figma MCP server for bidirectional design-code integration. The pipeline supports:
- **Figma → Code**: Extract designs from Figma and implement as React components
- **Code → Visual**: Capture rendered components via Playwright for visual verification
- **Code Connect**: Map components between Figma and codebase (deferred until plan upgrade)

## MCP Server Setup

### Configuration (`.mcp.json`)
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-playwright"]
    },
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

### Authentication
- **Figma**: OAuth popup on first tool call → click "Allow" in browser
- **Playwright**: No auth needed (runs locally)

### Rate Limits
- **Figma Free Tier**: 6 MCP calls/month — be strategic
- **Playwright**: Unlimited

## Figma → Code Workflow

### Step 1: Extract Design
```
get_design_context(nodeId, fileKey)
```

Parse Figma URLs:
- `figma.com/design/:fileKey/:fileName?node-id=:nodeId`
- Convert `-` to `:` in nodeId from URL
- Branch URLs: use `branchKey` as fileKey

### Step 2: Adapt to Project
The MCP response includes React + Tailwind code, but always adapt:
1. Map colors to project tokens (`#7c3aed` → `bg-primary`)
2. Use existing components (Button, Card, Badge, etc.)
3. Follow project conventions (cva, forwardRef, cn())
4. Ensure dark mode compatibility

### Step 3: Visual Verify (Playwright)
```
browser_navigate → localhost:3000/showcase
browser_take_screenshot → capture rendered output
```

## Code → Visual Workflow

Use Playwright MCP (no Figma calls) to capture the running app:

### Capture Viewports
| Viewport | Width | Theme |
|----------|-------|-------|
| Desktop Light | 1440px | light |
| Desktop Dark | 1440px | dark |
| Mobile Light | 375px | light |
| Mobile Dark | 375px | dark |

### Commands
```
browser_navigate(url: "http://localhost:3000/showcase")
browser_resize(width: 1440, height: 900)
browser_take_screenshot(filename: "showcase-desktop-light.png")
```

## Code Connect (Deferred)

When the Figma plan is upgraded, establish component mappings:

### Mapping Table
| Component | File Path | Code Connect Label |
|-----------|-----------|-------------------|
| Button | src/components/ui/button.tsx | React |
| Badge | src/components/ui/badge.tsx | React |
| Avatar | src/components/ui/avatar.tsx | React |
| Card | src/components/ui/card.tsx | React |
| Dialog | src/components/ui/dialog.tsx | React |
| Input | src/components/ui/input.tsx | React |
| Divider | src/components/ui/divider.tsx | React |
| Spinner | src/components/ui/spinner.tsx | React |
| Skeleton | src/components/ui/skeleton.tsx | React |
| Progress | src/components/ui/progress.tsx | React |
| NotificationDot | src/components/ui/notification-dot.tsx | React |
| Textarea | src/components/ui/textarea.tsx | React |
| Select | src/components/ui/select.tsx | React |
| Checkbox | src/components/ui/checkbox.tsx | React |
| Radio | src/components/ui/radio.tsx | React |
| Toggle | src/components/ui/toggle.tsx | React |
| Slider | src/components/ui/slider.tsx | React |
| Alert | src/components/ui/alert.tsx | React |
| Toast | src/components/ui/toast.tsx | React |
| Tooltip | src/components/ui/tooltip.tsx | React |
| Popover | src/components/ui/popover.tsx | React |
| EmptyState | src/components/ui/empty-state.tsx | React |
| Tabs | src/components/ui/tabs.tsx | React |
| Breadcrumb | src/components/ui/breadcrumb.tsx | React |
| Pagination | src/components/ui/pagination.tsx | React |
| Stepper | src/components/ui/stepper.tsx | React |
| NavBar | src/components/ui/navbar.tsx | React |
| SidebarNav | src/components/ui/sidebar-nav.tsx | React |
| Table | src/components/ui/table.tsx | React |
| Accordion | src/components/ui/accordion.tsx | React |
| DatePicker | src/components/ui/date-picker.tsx | React |
| Chip | src/components/ui/chip.tsx | React |
| Toolbar | src/components/ui/toolbar.tsx | React |
| FileUpload | src/components/ui/file-upload.tsx | React |
| Sheet | src/components/ui/sheet.tsx | React |
| CommandPalette | src/components/ui/command-palette.tsx | React |

### Execute Mappings
```
For each component:
add_code_connect_map(nodeId, fileKey, source, componentName, label: "React")
```

## Design System Rules

Generated via `create_design_system_rules` and saved to `.claude/rules/design-system.md`.

Key rules:
- React + TypeScript + Tailwind v4
- cva for variant management
- forwardRef on all components
- CSS custom properties for theming
- Dark mode via `.dark` class
- Mobile-first responsive design

## Strategic Call Usage (Free Tier)

| Priority | Tool | Purpose | Monthly Budget |
|----------|------|---------|---------------|
| 1 | `whoami` | Auth verification | 1 call |
| 2 | `create_design_system_rules` | Rules file | 1 call |
| 3 | `get_design_context` | Design extraction | 2-3 calls |
| 4 | `get_screenshot` | Visual reference | 1 call |
| - | Playwright (unlimited) | All screenshots | 0 Figma calls |
