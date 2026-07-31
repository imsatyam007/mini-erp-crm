import { forwardRef } from "react";

import { cn } from "@/lib/cn";
import type { CardProps } from "./Card.types";

const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1.5 p-6 border-b border-border",
          className
        )}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

export default CardHeader;