"use client";

import { useEffect } from "react";

import { Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/components/ui/card";

import {
  prescriptionSchema,
  PrescriptionSchema,
} from "@/lib/validations/prescription-schema";

import { createPrescription } from "@/actions/prescriptions/create-prescription";
import { updatePrescription } from "@/actions/prescriptions/update-prescription";

import { MedicineRow } from "./medicine-row";

import type { PrescriptionWithMedicines } from "@/types/prescription-model";

import { useRouter } from "next/navigation";

type PrescriptionBuilderProps = {
  consultationId?: string;

  appointmentId: string;

  prescription?: PrescriptionWithMedicines | null;
};

export function PrescriptionBuilder({
  consultationId,
  appointmentId,
  prescription,
}: PrescriptionBuilderProps) {
  const form = useForm<PrescriptionSchema>({
    resolver: zodResolver(prescriptionSchema),

    defaultValues: {
      medicines: prescription?.medicines.map((medicine) => ({
        medicine: medicine.medicineName,
        dosage: medicine.dosage ?? "",
        frequency: medicine.frequency ?? "",
        duration: medicine.durationDays?.toString() ?? "",
        instructions: medicine.instructions ?? "",
      })) ?? [
        {
          medicine: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ],
    },
  });
  const { control, register, handleSubmit, reset } = form;
  const router = useRouter();
  useEffect(() => {
    if (!prescription) {
      return;
    }

    reset({
      medicines: prescription.medicines.map((medicine) => ({
        medicine: medicine.medicineName,
        dosage: medicine.dosage ?? "",
        frequency: medicine.frequency ?? "",
        duration: medicine.durationDays?.toString() ?? "",
        instructions: medicine.instructions ?? "",
      })),
    });
  }, [prescription, reset]);

  const disabled = !consultationId;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });

  async function onSubmit(data: PrescriptionSchema) {
    if (!consultationId) {
      return;
    }

    const medicines = data.medicines.map((medicine) => ({
      medicine: medicine.medicine,
      dosage: medicine.dosage,
      frequency: medicine.frequency,
      duration: Number(medicine.duration),
      instructions: medicine.instructions,
    }));

    if (prescription) {
      await updatePrescription({
        consultationId,
        prescriptionId: prescription.id,
        medicines,
      });

      router.refresh();

      return;
    }

    await createPrescription({
      consultationId,
      appointmentId,
      medicines,
    });

    router.refresh();
  }

  return (
    <Card className="p-6">
      {/* HEADER */}

      <div
        className="
          mb-6
          flex items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
            "
          >
            Prescription
          </h2>

          <p
            className="
              mt-1 text-sm
              text-gray-500
            "
          >
            Add medicines and dosage
          </p>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (disabled) {
              return;
            }

            append({
              medicine: "",
              dosage: "",
              frequency: "",
              duration: "",
              instructions: "",
            });
          }}
          className="
            flex items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4 py-2
            text-sm
            font-medium
            text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Plus size={16} />
          Add Medicine
        </button>
      </div>

      {disabled && (
        <div
          className="
            mb-4 rounded-xl
            border border-amber-200
            bg-amber-50
            p-4 text-sm
            text-amber-800
          "
        >
          Save the consultation before adding a prescription.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {fields.map((field, index) => (
          <MedicineRow
            key={field.id}
            index={index}
            register={register}
            remove={remove}
            disabled={disabled}
          />
        ))}

        <button
          type="submit"
          disabled={disabled}
          className="
            rounded-xl
            bg-green-600
            px-5 py-2
            font-medium
            text-white
            transition-colors
            hover:bg-green-700
            disabled:cursor-not-allowed
            disabled:bg-gray-400
          "
        >
          {prescription ? "Update Prescription" : "Save Prescription"}
        </button>
      </form>
    </Card>
  );
}
