"use client";

import { useState } from "react";

import { Reminder } from "@/types/reminder";

import { DataTable } from "@/components/tables/data-table";

import { ReminderToolbar } from "./reminder-toolbar";
import { getReminderColumns } from "./reminder-columns";

import { ReminderDetailsDrawer } from "../details/reminder-details-drawer";

import { reminders } from "@/mock/reminders";

type RemindersTableProps = {
  reminders: Reminder[];
};

export function RemindersTable({ reminders }: RemindersTableProps) {
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null,
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleViewReminder(reminder: Reminder) {
    setSelectedReminder(reminder);

    setDrawerOpen(true);
  }

  return (
    <>
      <DataTable
        data={reminders}
        columns={getReminderColumns(handleViewReminder)}
        toolbar={(table) => <ReminderToolbar table={table} />}
      />

      <ReminderDetailsDrawer
        open={drawerOpen}
        reminder={selectedReminder}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
