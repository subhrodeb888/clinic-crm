"use client";

import { Eye } from "lucide-react";

type ReminderActionsProps = {
  onView: () => void;
};

export function ReminderActions({ onView }: ReminderActionsProps) {
  return (
    <div className="flex items-center">
      <button
        onClick={onView}
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
    </div>
  );
}
