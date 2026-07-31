import { cn } from "@/lib/cn";
import type { BadgeProps } from "./Badge.types";

const Badge = ({
  className,
  variant = "info",
  children,
  ...props
}: BadgeProps) => {
  const variants = {
    success: "bg-success-bg text-success",
    warning: "bg-warning-bg text-warning",
    danger: "bg-danger-bg text-danger",
    info: "bg-neutral-bg text-neutral",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;