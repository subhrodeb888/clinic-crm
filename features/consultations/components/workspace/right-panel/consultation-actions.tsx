"use client";
import { finishConsultation } from "@/actions/consultations/finish-consultation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ConsultationActionsProps = {
  consultationId?: string;

  appointmentId: string;

  patientId: string;
};

export function ConsultationActions({
  consultationId,
  appointmentId,
  patientId,
}: ConsultationActionsProps) {
  const router = useRouter();
  return (
    <div
      className="
        sticky bottom-0 z-30
        mt-6 rounded-2xl border
        border-gray-200 bg-white
        p-4 shadow-lg
      "
    >
      <div
        className="
          flex flex-wrap
          items-center gap-3
        "
      >
        <Button
          disabled={!consultationId}
          onClick={async () => {
            if (!consultationId) return;

            const result = await finishConsultation(
              consultationId,
              appointmentId,
              patientId,
            );

            if (result.success) {
              router.push("/doctors");

              router.refresh();
            }
          }}
        >
          Complete Consultation
        </Button>

        <Button variant="outline">Save Draft</Button>
      </div>
    </div>
  );
}
