"use client";

import { usePathname, useRouter } from "next/navigation";

import { Select } from "@/components/ui/select";

import { Doctor } from "@/types/doctor";
import { AppointmentStatus } from "@/types/enums";
import { APPOINTMENT_STATUSES, STATUS_LABELS } from "@/features/appointments/constants";

type AppointmentsFiltersProps = {
  doctors: Doctor[];
  doctorId?: string;
  status?: AppointmentStatus;
};

export function AppointmentsFilters({
  doctors,
  doctorId,
  status,
}: AppointmentsFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  function updateFilters(nextDoctorId: string, nextStatus: string) {
    const params = new URLSearchParams();

    if (nextDoctorId) {
      params.set("doctor", nextDoctorId);
    }

    if (nextStatus) {
      params.set("status", nextStatus);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <Select
        className="w-[200px]"
        value={doctorId ?? ""}
        onChange={(e) => updateFilters(e.target.value, status ?? "")}
      >
        <option value="">All Doctors</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            Dr. {doctor.firstName} {doctor.lastName}
          </option>
        ))}
      </Select>

      <Select
        className="w-[200px]"
        value={status ?? ""}
        onChange={(e) => updateFilters(doctorId ?? "", e.target.value)}
      >
        <option value="">All Statuses</option>
        {APPOINTMENT_STATUSES.map((statusValue) => (
          <option key={statusValue} value={statusValue}>
            {STATUS_LABELS[statusValue]}
          </option>
        ))}
      </Select>
    </div>
  );
}