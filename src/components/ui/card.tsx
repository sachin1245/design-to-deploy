import * as React from "react";

/* ═══════════════════════════════════════════════════
   Card — Composition API
   Compound component with semantic sub-parts.
   Each piece accepts className for full customisation.
   ═══════════════════════════════════════════════════ */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={[
      "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={["flex flex-col gap-1.5 p-6", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={[
      "font-display text-lg font-semibold leading-none tracking-tight",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={["text-sm text-muted-foreground", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={["p-6 pt-0", className].filter(Boolean).join(" ")}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={["flex items-center p-6 pt-0", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
