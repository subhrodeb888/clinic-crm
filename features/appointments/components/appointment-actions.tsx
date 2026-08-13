"use client";

import { Eye, Trash2 } from "lucide-react";

import { Appointment } from "@/types/appointment";
import { Patient } from "@/types/patient";
import { Doctor } from "@/types/doctor";

import { EditAppointmentModal } from "./edit-appointment-modal";
import { deleteAppointment } from "@/actions/appointments/delete-appointment";

type AppointmentActionsProps = {
  appointment: Appointment;

  patients: Patient[];

  doctors: Doctor[];

  onView: () => void;
};

export function AppointmentActions({
  appointment,
  patients,
  doctors,
  onView,
}: AppointmentActionsProps) {
  return (
    <div
      className="flex items-center gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      {/* VIEW */}

      <button
        onClick={onView}
        className="
          rounded-lg p-2 text-gray-500
          transition-colors hover:bg-gray-100
          hover:text-gray-900
        "
      >
        <Eye size={16} />
      </button>

      {/* EDIT */}

      <EditAppointmentModal
        appointment={appointment}
        patients={patients}
        doctors={doctors}
      />

      {/* DELETE */}

      <button
        onClick={async () => {
          const confirmed = window.confirm("Delete this appointment?");

          if (!confirmed) return;

          await deleteAppointment(appointment.id);
        }}
        className="
    rounded-lg p-2 text-red-500
    transition-colors hover:bg-red-50
  "
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
