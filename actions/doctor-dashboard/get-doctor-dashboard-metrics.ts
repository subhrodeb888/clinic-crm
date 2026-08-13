"use server";

import { getCurrentDoctor } from "./get-current-doctor";
import { doctorDashboardService } from "@/services/doctor-dashboard.service";

export async function getDoctorDashboardMetrics() {
  const doctor = await getCurrentDoctor();

  return doctorDashboardService.getMetrics(doctor.id);
}
