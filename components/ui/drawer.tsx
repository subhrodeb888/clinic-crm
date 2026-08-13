"use client";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type DrawerProps = {
  open: boolean;

  onClose: () => void;

  title?: string;

  children: React.ReactNode;

  className?: string;
};

export function Drawer({
  open,
  onClose,
  title,
  children,
  className,
}: DrawerProps) {
  if (!open) return null;

  return (
    <>
      {/* OVERLAY */}

      <div
        className="
          fixed inset-0 z-40
          bg-black/40 backdrop-blur-[1px]
        "
        onClick={onClose}
      />

      {/* DRAWER */}

      <div
        className={cn(
          `
          fixed right-0 top-0 z-50
          flex h-full w-full flex-col
          bg-white shadow-2xl
          transition-transform

          sm:max-w-lg
          `,
          className,
        )}
      >
        {/* HEADER */}

        <div
          className="
            flex items-center justify-between
            border-b border-gray-200
            px-6 py-4
          "
        >
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg p-2
              transition-colors
              hover:bg-gray-100
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}

        <div
          className="
            flex-1 overflow-y-auto
            p-6
          "
        >
          {children}
        </div>
      </div>
    </>
  );
}
