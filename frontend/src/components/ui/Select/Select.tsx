import { forwardRef } from "react";

import { cn } from "@/lib/cn";
import type { SelectProps } from "./Select.types";

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      id,
      options,
      placeholder = "Select an option",
      ...props
    },
    ref
  ) => {
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

        <select
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-md border border-border",
            "bg-surface px-3 py-2",
            "text-sm text-text",
            "focus:outline-none",
            "focus:ring-2 focus:ring-focus",
            error && "border-danger",
            className
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <span className="text-sm text-danger">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;