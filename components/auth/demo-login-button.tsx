"use client";

import { useFormStatus } from "react-dom";

type DemoLoginButtonProps = {
  label: string;
  role: string;
};

export function DemoLoginButton({ label, role }: DemoLoginButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="flex w-full flex-col items-start rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 transition-colors hover:border-blue-300 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="flex items-center gap-2 text-sm font-medium text-gray-800">
        {pending && (
          <span
            className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"
            aria-hidden="true"
          />
        )}
        {pending ? "Signing in..." : label}
      </span>

      <span className="text-xs capitalize text-gray-400">{role}</span>
    </button>
  );
}
