"use client";

import { createAppointment } from "@/actions/appointments/create-appointment";

import { Modal } from "@/components/ui/modal";

import { AppointmentForm } from "./appointment-form";

import type { AppointmentFormValues } from "../schemas/appointment-schema";

import { Patient } from "@/types/patient";
import { Doctor } from "@/types/doctor";

type CreateAppointmentModalProps = {
  open: boolean;

  onClose: () => void;

  patients: Patient[];

  doctors: Doctor[];

  initialPatientId?: string;

  initialAppointmentDate?: string;

  initialAppointmentTime?: string;
};

export function CreateAppointmentModal({
  open,
  onClose,
  patients,
  doctors,
  initialPatientId,
  initialAppointmentDate,
  initialAppointmentTime,
}: CreateAppointmentModalProps) {
  async function handleSubmit(values: AppointmentFormValues) {
    try {
      await createAppointment(values);

      onClose();
    } catch (error) {
      console.error("Failed to create appointment", error);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Create Appointment">
      <AppointmentForm
        patients={patients}
        doctors={doctors}
        defaultValues={
          initialPatientId || initialAppointmentDate || initialAppointmentTime
            ? {
                patientId: initialPatientId,
                appointmentDate: initialAppointmentDate,
                appointmentTime: initialAppointmentTime,
              }
            : undefined
        }
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}
