/* Import React for JSX and TypeScript types */
import * as React from "react";

/* Utility to merge conditional Tailwind classes */
import { cn } from "@/lib/utils";

/* Props extend native button attributes and add custom variant/size options */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
};

/* Reusable button with variant and size styling */
export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        /* Base: flex layout, rounded corners, medium weight, smooth transitions, no focus ring, disabled invisible and non-interactive */
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",

        /* Variant: choose background, text, and hover colors based on the passed variant prop */
        {
          primary: "bg-blue-600 text-white hover:bg-blue-700",
          secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
          outline: "border border-gray-300 bg-white hover:bg-gray-50",
          danger: "bg-red-600 text-white hover:bg-red-700",
          ghost: "hover:bg-gray-100",
        }[variant],

        /* Size: adjust height, horizontal padding, and font size for small, medium, or large */
        {
          sm: "h-8 px-3 text-sm",
          md: "h-10 px-4 text-sm",
          lg: "h-11 px-6 text-base",
        }[size],

        /* Allow external className to override or extend styles */
        className,
      )}
      {...props} /* Spread all remaining native button attributes like onClick, disabled, type, etc. */
    />
  );
}
