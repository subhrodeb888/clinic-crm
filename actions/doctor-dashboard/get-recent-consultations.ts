"use server";

import { getCurrentDoctor } from "./get-current-doctor";
import { doctorDashboardService } from "@/services/doctor-dashboard.service";

export async function getRecentConsultations() {
  const doctor = await getCurrentDoctor();

  return doctorDashboardService.getRecentConsultations(doctor.id);
}
