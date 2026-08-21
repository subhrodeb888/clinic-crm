import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  textClassName?: string;
};

/**
 * Product logo — a blue rounded mark with the "C" initial, matching the
 * sign-in screen, alongside the product wordmark.
 */
export function Logo({ className, textClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
        C
      </span>

      <span className={cn("text-lg font-bold tracking-tight text-gray-900", textClassName)}>
        Clinic CRM
      </span>
    </span>
  );
}
