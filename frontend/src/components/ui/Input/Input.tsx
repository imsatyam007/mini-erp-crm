import { forwardRef } from "react";

import { cn } from "@/lib/cn";
import type { InputProps } from "./Input.types";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-text"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-md border border-border",
            "bg-surface px-3 py-2",
            "text-sm text-text",
            "placeholder:text-text-secondary",
            "focus:outline-none",
            "focus:ring-2 focus:ring-focus",
            error && "border-danger",
            className
          )}
          {...props}
        />

        {error && (
          <span className="text-sm text-danger">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;