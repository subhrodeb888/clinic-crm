"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";

import { Patient } from "@/types/patient";
import { Doctor } from "@/types/doctor";

import {
  appointmentSchema,
  AppointmentFormValues,
} from "../schemas/appointment-schema";

type AppointmentFormProps = {
  patients: Patient[];

  doctors: Doctor[];

  defaultValues?: Partial<AppointmentFormValues>;

  onSubmit: (values: AppointmentFormValues) => void | Promise<void>;

  submitLabel?: string;
};

export function AppointmentForm({
  patients,
  doctors,
  defaultValues,
  onSubmit,
  submitLabel = "Create Appointment",
}: AppointmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),

    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* PATIENT */}

      <FormField label="Patient" error={errors.patientId?.message}>
        <Select {...register("patientId")}>
          <option value="">Select patient</option>

          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.firstName} {patient.lastName}
            </option>
          ))}
        </Select>
      </FormField>

      {/* DOCTOR */}

      <FormField label="Doctor" error={errors.doctorId?.message}>
        <Select {...register("doctorId")}>
          <option value="">Select doctor</option>

          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              Dr. {doctor.firstName} {doctor.lastName}
            </option>
          ))}
        </Select>
      </FormField>

      {/* DATE + TIME */}

      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          label="Appointment Date"
          error={errors.appointmentDate?.message}
        >
          <Input type="date" {...register("appointmentDate")} />
        </FormField>

        <FormField
          label="Appointment Time"
          error={errors.appointmentTime?.message}
        >
          <Input type="time" {...register("appointmentTime")} />
        </FormField>
      </div>

      {/* NOTES */}

      <FormField label="Notes" error={errors.notes?.message}>
        <Textarea
          placeholder="Add appointment notes..."
          {...register("notes")}
        />
      </FormField>

      {/* ACTIONS */}

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
