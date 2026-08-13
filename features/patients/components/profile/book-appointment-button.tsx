"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CreateAppointmentModal } from "@/features/appointments/components/create-appointment-modal";

import { Patient } from "@/types/patient";
import { Doctor } from "@/types/doctor";

type BookAppointmentButtonProps = {
  patientId: string;

  patients: Patient[];

  doctors: Doctor[];
};

export function BookAppointmentButton({
  patientId,
  patients,
  doctors,
}: BookAppointmentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Book Appointment</Button>

      <CreateAppointmentModal
        open={open}
        onClose={() => setOpen(false)}
        patients={patients}
        doctors={doctors}
        initialPatientId={patientId}
      />
    </>
  );
}
