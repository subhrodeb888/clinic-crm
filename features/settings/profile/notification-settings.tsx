"use client";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export function NotificationSettings() {
  return (
    <Card>
      <div className="mb-6">
        <h2
          className="
            text-lg font-semibold
            text-gray-900
          "
        >
          Notification Settings
        </h2>

        <p
          className="
            mt-1 text-sm
            text-gray-500
          "
        >
          Control which alerts and notifications you receive.
        </p>
      </div>

      <div className="space-y-4">
        <NotificationItem
          title="Appointment Alerts"
          description="Receive appointment booking and cancellation notifications."
        />

        <NotificationItem
          title="Payment Alerts"
          description="Receive billing and payment updates."
        />

        <NotificationItem
          title="Follow-Up Reminders"
          description="Receive patient follow-up notifications."
        />

        <NotificationItem
          title="System Notifications"
          description="Receive platform and operational updates."
        />

        <div
          className="
            flex justify-end
            border-t border-gray-200
            pt-6
          "
        >
          <Button>Save Preferences</Button>
        </div>
      </div>
    </Card>
  );
}

type NotificationItemProps = {
  title: string;

  description: string;
};

function NotificationItem({ title, description }: NotificationItemProps) {
  return (
    <label
      className="
        flex items-start
        justify-between
        gap-4

        rounded-xl
        border border-gray-200

        p-4

        hover:bg-gray-50
      "
    >
      <div>
        <p
          className="
            font-medium
            text-gray-900
          "
        >
          {title}
        </p>

        <p
          className="
            mt-1 text-sm
            text-gray-500
          "
        >
          {description}
        </p>
      </div>

      <input
        type="checkbox"
        defaultChecked
        className="
          mt-1 h-4 w-4
        "
      />
    </label>
  );
}
