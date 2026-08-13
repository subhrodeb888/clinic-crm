"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { FormField } from "@/components/ui/form-field";
import { Textarea } from "@/components/ui/textarea";

import { createConsultation } from "@/actions/consultations/create-consultation";
import { updateConsultation } from "@/actions/consultations/update-consultation";

import { Card } from "@/components/ui/card";

import type { CreateConsultationInput } from "@/validations/consultation.schema";

type ConsultationFormProps = {
  patientId: string;

  doctorId: string;

  appointmentId?: string;

  consultation?: {
    id: string;

    chiefComplaint: string | null;

    diagnosis: string | null;

    notes: string | null;

    aiSummary: string | null;
  } | null;

  onCreated?: (consultationId: string) => void;
};

export function ConsultationForm({
  patientId,
  doctorId,
  appointmentId,
  consultation,
  onCreated,
}: ConsultationFormProps) {
  const form = useForm<CreateConsultationInput>({
    defaultValues: {
      patientId,

      doctorId,

      appointmentId,

      chiefComplaint: consultation?.chiefComplaint ?? "",

      diagnosis: consultation?.diagnosis ?? "",

      notes: consultation?.notes ?? "",

      aiSummary: consultation?.aiSummary ?? "",
    },
  });

  useEffect(() => {
    if (!consultation) {
      return;
    }

    form.reset({
      patientId,

      doctorId,

      appointmentId,

      chiefComplaint: consultation.chiefComplaint ?? "",

      diagnosis: consultation.diagnosis ?? "",

      notes: consultation.notes ?? "",

      aiSummary: consultation.aiSummary ?? "",
    });
  }, [consultation, patientId, doctorId, appointmentId, form]);

  async function onSubmit(data: CreateConsultationInput) {
    if (consultation) {
      await updateConsultation({
        id: consultation.id,

        chiefComplaint: data.chiefComplaint,

        diagnosis: data.diagnosis,

        notes: data.notes,

        aiSummary: data.aiSummary,
      });

      form.reset(data);

      return;
    }

    const createdConsultation = await createConsultation({
      ...data,

      patientId,

      doctorId,

      appointmentId,
    });

    onCreated?.(createdConsultation.id);
  }

  return (
    <Card className="p-6">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            label="Chief Complaint"
            error={form.formState.errors.chiefComplaint?.message}
          >
            <Textarea
              rows={3}
              placeholder="Enter the patient's chief complaint..."
              {...form.register("chiefComplaint")}
            />
          </FormField>

          <FormField
            label="Diagnosis"
            error={form.formState.errors.diagnosis?.message}
          >
            <Textarea
              rows={4}
              placeholder="Enter diagnosis..."
              {...form.register("diagnosis")}
            />
          </FormField>

          <FormField
            label="Clinical Notes"
            error={form.formState.errors.notes?.message}
          >
            <Textarea
              rows={6}
              placeholder="Enter consultation notes..."
              {...form.register("notes")}
            />
          </FormField>

          <button
            type="submit"
            className="
      rounded-xl
      bg-blue-600
      px-4 py-2
      text-white
      hover:bg-blue-700
    "
          >
            {consultation ? "Update Consultation" : "Save Consultation"}
          </button>
        </div>
      </form>
    </Card>
  );
}
