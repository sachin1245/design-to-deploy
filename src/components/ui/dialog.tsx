"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

/* ═══════════════════════════════════════════════════
   Dialog — Radix-based accessible modal
   Overlay with backdrop blur · Focus trap · Esc dismiss
   Animated open/close via CSS keyframes
   ═══════════════════════════════════════════════════ */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

/* ── Overlay ──────────────────────────────────── */

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={[
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
      "data-[state=open]:animate-dialog-overlay-in data-[state=closed]:animate-dialog-overlay-out",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

/* ── Content ──────────────────────────────────── */

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className = "", children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={[
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        "w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg",
        "data-[state=open]:animate-dialog-content-in data-[state=closed]:animate-dialog-content-out",
        "focus:outline-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={[
          "absolute right-4 top-4 rounded-md p-1",
          "text-muted-foreground transition-colors hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
        ].join(" ")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

/* ── Header / Footer ──────────────────────────── */

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={["flex flex-col gap-1.5 text-center sm:text-left", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={[
      "flex flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

/* ── Title / Description ──────────────────────── */

const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Title
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
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={["text-sm text-muted-foreground", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogOverlay,
  DialogPortal,
};
