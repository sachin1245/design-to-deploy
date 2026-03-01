# MCP Server Configuration

Two MCP servers are configured in `.mcp.json` for browser automation and design integration.

## Playwright MCP (Local)
- **Server**: `@anthropic-ai/mcp-playwright` (runs locally via npx)
- **Rate limits**: None — unlimited usage
- **Capabilities**: Navigate, screenshot, click/type/interact, evaluate JS, resize viewport
- **Tools prefix**: `mcp__plugin_playwright_playwright__*`
- **Use for**: Visual verification, E2E testing, component screenshots, responsive design checks

## Figma MCP (Remote)
- **Server**: `https://mcp.figma.com/mcp` (remote HTTP)
- **Auth**: OAuth popup — first Figma tool call triggers a browser popup, click "Allow"
- **Rate limits**: Free tier = 6 MCP calls/month. Be strategic with calls.
- **Tools prefix**: `mcp__claude_ai_Figma__*`
- **Key tools**: `whoami`, `get_design_context`, `get_screenshot`, `create_design_system_rules`, `generate_diagram`, `add_code_connect_map`
- **Use Playwright instead of Figma** for screenshots of running app (saves Figma calls)

## Design Workflow (Figma <-> Code)
1. **Figma -> Code**: `get_design_context(nodeId, fileKey)` -> adapt output to project stack
2. **Code -> Visual**: Use Playwright to screenshot running app at multiple viewports
3. **Code Connect**: Map components via `add_code_connect_map` (deferred until Figma plan upgrade)
