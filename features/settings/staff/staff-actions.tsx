"use client";

import { Eye, Pencil, UserX } from "lucide-react";

type StaffActionsProps = {
  staffId: string;
};

export function StaffActions({ staffId }: StaffActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="
          rounded-lg p-2
          text-gray-400
          transition-colors
          hover:bg-gray-100
          hover:text-gray-700
        "
      >
        <Eye size={16} />
      </button>

      <button
        className="
          rounded-lg p-2
          text-gray-400
          transition-colors
          hover:bg-gray-100
          hover:text-gray-700
        "
      >
        <Pencil size={16} />
      </button>

      <button
        className="
          rounded-lg p-2
          text-gray-400
          transition-colors
          hover:bg-red-50
          hover:text-red-600
        "
      >
        <UserX size={16} />
      </button>
    </div>
  );
}
