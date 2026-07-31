import { forwardRef } from "react";

import { cn } from "@/lib/cn";
import type { TextAreaProps } from "./TextArea.types";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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

        <textarea
          ref={ref}
          id={id}
          rows={4}
          className={cn(
            "w-full rounded-md border border-border",
            "bg-surface px-3 py-2",
            "text-sm text-text",
            "placeholder:text-text-secondary",
            "focus:outline-none",
            "focus:ring-2 focus:ring-focus",
            "resize-none",
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

TextArea.displayName = "TextArea";

export default TextArea;