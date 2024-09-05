"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define label variants using CVA
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        small: "text-xs",
        medium: "text-sm",
        large: "text-base",
      },
      color: {
        default: "text-gray-700",
        primary: "text-sand-500",
        secondary: "text-gray-500",
      },
    },
    defaultVariants: {
      size: "medium",
      color: "default",
    },
  }
);

type LabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>;

// Label component using forwardRef to pass refs to Radix Label
const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, size, color, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants({ size, color }), className)}
      {...props}
    />
  )
);

Label.displayName = "Label";

export { Label };
