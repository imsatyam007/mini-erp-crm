import { forwardRef } from "react";

import { cn } from "@/lib/cn";
import type { ButtonProps } from "./Button.types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-hover",

      secondary:
        "bg-secondary text-white hover:opacity-90",

      danger:
        "bg-danger text-white hover:opacity-90",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center",
          "rounded-md",
          "px-4 py-2",
          "text-sm font-medium",
          "transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-focus",
          "disabled:cursor-not-allowed disabled:opacity-50",
          variants[variant],
          className
        )}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;