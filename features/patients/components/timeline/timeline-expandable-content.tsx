"use client";

import { useState } from "react";

type TimelineExpandableContentProps = {
  content: string;
};

export function TimelineExpandableContent({
  content,
}: TimelineExpandableContentProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="
          text-sm font-medium
          text-blue-600
        "
      >
        {expanded ? "Hide Details" : "View Details"}
      </button>

      {expanded && (
        <div
          className="
            mt-3 rounded-2xl
            border border-gray-200
            bg-gray-50 p-4
          "
        >
          <p
            className="
              text-sm leading-7
              text-gray-700
            "
          >
            {content}
          </p>
        </div>
      )}
    </div>
  );
}
