"use client";

import { Pencil } from "lucide-react";

import { useState } from "react";

import { updateAppointment } from "@/actions/appointments/update-appointment";

import { Appointment } from "@/types/appointment";
import { Patient } from "@/types/patient";
import { Doctor } from "@/types/doctor";

import { Modal } from "@/components/ui/modal";

import { AppointmentForm } from "./appointment-form";

import type { AppointmentFormValues } from "../schemas/appointment-schema";

type EditAppointmentModalProps = {
  appointment: Appointment;

  patients: Patient[];

  doctors: Doctor[];
};

export function EditAppointmentModal({
  appointment,
  patients,
  doctors,
}: EditAppointmentModalProps) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(values: AppointmentFormValues) {
    try {
      await updateAppointment(appointment.id, values);

      setOpen(false);
    } catch (error) {
      console.error("Failed to update appointment", error);
    }
  }

  const defaultValues: Partial<AppointmentFormValues> = {
    patientId: appointment.patientId,

    doctorId: appointment.doctorId,

    appointmentDate: appointment.appointmentDate,

    appointmentTime: appointment.startTime,

    notes: appointment.notes ?? "",
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
    rounded-lg p-2 text-gray-500
    transition-colors hover:bg-gray-100
    hover:text-gray-900
  "
      >
        <Pencil size={16} />
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Appointment"
      >
        <AppointmentForm
          patients={patients}
          doctors={doctors}
          defaultValues={defaultValues}
          submitLabel="Update Appointment"
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
}
