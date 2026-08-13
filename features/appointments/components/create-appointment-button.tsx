"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { CreateAppointmentModal } from "./create-appointment-modal";

import { Patient } from "@/types/patient";
import { Doctor } from "@/types/doctor";

type CreateAppointmentButtonProps = {
  patients: Patient[];
  doctors: Doctor[];
};

export function CreateAppointmentButton({
  patients,
  doctors,
}: CreateAppointmentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add Appointment</Button>

      <CreateAppointmentModal
        open={open}
        onClose={() => setOpen(false)}
        patients={patients}
        doctors={doctors}
      />
    </>
  );
}
