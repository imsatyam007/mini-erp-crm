import { forwardRef } from "react";

import { cn } from "@/lib/cn";
import type { CardProps } from "./Card.types";

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg",
          "border",
          "border-border",
          "bg-surface",
          "shadow-card",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export default Card;