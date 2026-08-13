"use client";

import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";

import { format, parse, startOfWeek, getDay } from "date-fns";

import { enUS } from "date-fns/locale/en-US";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Appointment } from "@/types/appointment";
import { Doctor } from "@/types/doctor";
import { Patient } from "@/types/patient";
import { mapAppointmentToCalendarEvent } from "../utils/map-appointment-to-calendar-event";

import { CalendarToolbar } from "./calendar-toolbar";

import { CalendarEvent } from "./calendar-event";

import { AppointmentDetailsDrawer } from "./appointment-details-drawer";

import { CreateAppointmentModal } from "./create-appointment-modal";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function formatDateOnly(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTimeOnly(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}

type AppointmentsCalendarProps = {
  appointments: Appointment[];

  patients: Patient[];

  doctors: Doctor[];
};

export function AppointmentsCalendar({
  appointments,
  patients,
  doctors,
}: AppointmentsCalendarProps) {
  const events = appointments.map(mapAppointmentToCalendarEvent);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [selectedSlotDate, setSelectedSlotDate] = useState<string>();
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>();

  function closeCreateModal() {
    setCreateModalOpen(false);
    setSelectedSlotDate(undefined);
    setSelectedSlotTime(undefined);
  }

  return (
    <Card className="p-4">
      <div className="h-[calc(100vh-16rem)]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={[Views.DAY, Views.WEEK, Views.MONTH]}
          defaultView={Views.WEEK}
          popup
          selectable
          components={{
            toolbar: CalendarToolbar,
            event: CalendarEvent,
          }}
          onSelectSlot={(slot) => {
            setSelectedSlotDate(formatDateOnly(slot.start));
            setSelectedSlotTime(formatTimeOnly(slot.start));
            setCreateModalOpen(true);
          }}
          onSelectEvent={(event) => {
            setSelectedAppointment(event.resource);
            setDrawerOpen(true);
          }}
        />
      </div>

      <AppointmentDetailsDrawer
        open={drawerOpen}
        appointment={selectedAppointment}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedAppointment(null);
        }}
      />

      <CreateAppointmentModal
        open={createModalOpen}
        onClose={closeCreateModal}
        patients={patients}
        doctors={doctors}
        initialAppointmentDate={selectedSlotDate}
        initialAppointmentTime={selectedSlotTime}
      />
    </Card>
  );
}
