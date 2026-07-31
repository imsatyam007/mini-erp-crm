import { forwardRef } from "react";

import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type CardDescriptionProps =
  HTMLAttributes<HTMLParagraphElement>;

const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-sm text-text-secondary",
        className
      )}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

export default CardDescription;