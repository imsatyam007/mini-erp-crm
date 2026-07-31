import { forwardRef } from "react";

import { cn } from "@/lib/cn";
import type { CardProps } from "./Card.types";

const CardContent = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-6", className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = "CardContent";

export default CardContent;