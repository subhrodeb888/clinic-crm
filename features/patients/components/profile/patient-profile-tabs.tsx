"use client";

export type Tab =
  | "overview"
  | "appointments"
  | "documents"
  | "assistant"
  | "billing";

type PatientProfileTabsProps = {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
};

const tabs: ReadonlyArray<{
  id: Tab;
  label: string;
}> = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "appointments",
    label: "Appointments",
  },
  {
    id: "documents",
    label: "Documents",
  },
  {
    id: "assistant",
    label: "AI Assistant",
  },
  {
    id: "billing",
    label: "Billing",
  },
];

export function PatientProfileTabs({
  activeTab,
  onChange,
}: PatientProfileTabsProps) {
  return (
    <div
      className="
        overflow-x-auto
        rounded-2xl
        border
        border-gray-200
        bg-white
      "
    >
      <div className="flex min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`
              whitespace-nowrap
              border-b-2
              px-6
              py-4
              text-sm
              font-medium
              transition-colors
              ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }
            `}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}