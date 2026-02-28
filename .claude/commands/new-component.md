Create a new UI component named $ARGUMENTS.

Steps:
1. Create `src/components/ui/$ARGUMENTS.tsx` with:
   - Proper TypeScript types
   - forwardRef pattern
   - cva for variants (if applicable)
   - cn() for className merging
   - Export from the file
2. Add export to `src/components/ui/index.ts`
3. Create `src/components/ui/__tests__/$ARGUMENTS.test.tsx` with:
   - Default render test
   - Variant tests (if applicable)
   - Event handler tests
   - Accessibility checks
4. Add component section to `src/app/showcase/page.tsx`
5. Run `pnpm test:unit` to verify tests pass
6. Run `pnpm typecheck` to verify types

Follow existing component patterns in `src/components/ui/button.tsx` as reference.
