"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Reminder } from "@/types/reminder";

import { patients } from "@/mock/patients";

import { ReminderStatusBadge } from "../table/reminder-status-badge";
import { ReminderTypeBadge } from "../table/reminder-type-badge";

type ReminderDetailsDrawerProps = {
  open: boolean;

  reminder: Reminder | null;

  onClose: () => void;
};

export function ReminderDetailsDrawer({
  open,
  reminder,
  onClose,
}: ReminderDetailsDrawerProps) {
  if (!open || !reminder) {
    return null;
  }

  const patient = patients.find((p) => p.id === reminder.patientId);

  return (
    <>
      {/* BACKDROP */}

      <div
        className="
          fixed inset-0 z-40
          bg-black/40
        "
        onClick={onClose}
      />

      {/* DRAWER */}

      <div
        className="
          fixed right-0 top-0
          z-50

          h-screen
          w-full
          max-w-3xl

          overflow-hidden

          border-l border-gray-200
          bg-white
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex items-center
            justify-between

            border-b border-gray-200

            px-6 py-4
          "
        >
          <div>
            <h2
              className="
                text-xl font-semibold
                text-gray-900
              "
            >
              Reminder Details
            </h2>

            <p
              className="
                mt-1 text-sm
                text-gray-500
              "
            >
              Review reminder activity and communication history.
            </p>
          </div>

          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>

        {/* CONTENT */}

        <div
          className="
            h-[calc(100vh-81px)]
            overflow-y-auto
            p-6
          "
        >
          <div className="space-y-6">
            {/* REMINDER OVERVIEW */}

            <div
              className="
                rounded-xl
                border border-gray-200
                bg-white
                p-5
              "
            >
              <div
                className="
                  flex flex-wrap
                  items-center gap-3
                "
              >
                <ReminderTypeBadge type={reminder.type} />

                <ReminderStatusBadge status={reminder.status} />
              </div>

              <p
                className="
                  mt-4 text-sm
                  text-gray-600
                "
              >
                Reminder ID
              </p>

              <p
                className="
                  mt-1 font-medium
                  text-gray-900
                "
              >
                {reminder.id}
              </p>
            </div>

            {/* PATIENT INFORMATION */}

            <div
              className="
                rounded-xl
                border border-gray-200
                bg-white
                p-5
              "
            >
              <h3
                className="
                  mb-4 text-lg
                  font-semibold
                  text-gray-900
                "
              >
                Patient Information
              </h3>

              <div
                className="
                  grid gap-4
                  md:grid-cols-2
                "
              >
                <InfoRow
                  label="Patient Name"
                  value={
                    patient
                      ? `${patient.firstName} ${patient.lastName}`
                      : "Unknown Patient"
                  }
                />

                <InfoRow label="Phone" value={patient?.phone ?? "-"} />

                <InfoRow label="Email" value={patient?.email ?? "-"} />

                <InfoRow
                  label="Assigned Doctor"
                  value={
                    patient?.assignedDoctor
                      ? `Dr. ${patient.assignedDoctor}`
                      : "-"
                  }
                />
              </div>
            </div>

            {/* MESSAGE */}

            <div
              className="
                rounded-xl
                border border-gray-200
                bg-white
                p-5
              "
            >
              <h3
                className="
                  mb-4 text-lg
                  font-semibold
                  text-gray-900
                "
              >
                Reminder Message
              </h3>

              <div
                className="
                  rounded-lg
                  bg-gray-50
                  p-4
                "
              >
                <p
                  className="
                    whitespace-pre-wrap
                    text-sm
                    text-gray-700
                  "
                >
                  {reminder.message}
                </p>
              </div>
            </div>

            {/* TIMING */}

            <div
              className="
                rounded-xl
                border border-gray-200
                bg-white
                p-5
              "
            >
              <h3
                className="
                  mb-4 text-lg
                  font-semibold
                  text-gray-900
                "
              >
                Reminder Timeline
              </h3>

              <div className="space-y-5">
                <TimelineItem
                  title="Reminder Scheduled"
                  timestamp={reminder.scheduledFor}
                  description="Reminder added to communication queue."
                />

                {reminder.sentAt && (
                  <TimelineItem
                    title="Reminder Sent"
                    timestamp={reminder.sentAt}
                    description="Reminder delivered to patient."
                  />
                )}

                {reminder.status === "failed" && (
                  <TimelineItem
                    title="Delivery Failed"
                    timestamp={reminder.sentAt ?? reminder.scheduledFor}
                    description="Reminder delivery failed."
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type InfoRowProps = {
  label: string;

  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div>
      <p
        className="
          mb-1 text-xs
          font-medium
          uppercase tracking-wide
          text-gray-500
        "
      >
        {label}
      </p>

      <p
        className="
          text-sm font-medium
          text-gray-900
        "
      >
        {value}
      </p>
    </div>
  );
}

type TimelineItemProps = {
  title: string;

  timestamp: string;

  description: string;
};

function TimelineItem({ title, timestamp, description }: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div
        className="
          mt-2 h-3 w-3
          rounded-full
          bg-blue-600
        "
      />

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
            text-xs
            text-gray-500
          "
        >
          {timestamp}
        </p>

        <p
          className="
            mt-1 text-sm
            text-gray-600
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}
