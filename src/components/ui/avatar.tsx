"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

/* ═══════════════════════════════════════════════════
   Avatar — Radix-based with image + initials fallback
   Sizes: sm (32px) · md (40px) · lg (48px)
   ═══════════════════════════════════════════════════ */

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full border border-border",
  {
    variants: {
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    alt?: string;
    fallback: string;
  };

const Avatar = React.forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className = "", size, src, alt, fallback, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={avatarVariants({ size, className })}
    {...props}
  >
    {src && (
      <AvatarPrimitive.Image
        src={src}
        alt={alt ?? fallback}
        className="aspect-square h-full w-full object-cover"
      />
    )}
    <AvatarPrimitive.Fallback
      className="flex h-full w-full items-center justify-center bg-secondary font-medium text-secondary-foreground"
      delayMs={src ? 600 : 0}
    >
      {fallback}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
));
Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };
export type { AvatarProps };
