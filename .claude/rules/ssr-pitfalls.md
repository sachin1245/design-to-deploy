---
paths:
  - "src/app/**/*.tsx"
  - "src/app/**/*.ts"
---

# Hydration and SSR Pitfalls

- **`suppressHydrationWarning` on theme scripts**: Inline `<script>` tags that
  read `localStorage` (for FOUC prevention) cause hydration mismatches because
  browsers clear `nonce` attributes from the DOM after reading them. Always add
  `suppressHydrationWarning` to these script elements.

- **`next-themes` + custom design systems**: The `.dark` class and
  `data-design-system` attribute are independent axes. Test all 4 combinations
  (default-light, default-dark, area-light, area-dark).
