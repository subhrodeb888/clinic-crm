"use server";

import { getCurrentDoctor } from "./get-current-doctor";
import { doctorDashboardService } from "@/services/doctor-dashboard.service";

export async function getTodaysPatients() {
  const doctor = await getCurrentDoctor();

  return doctorDashboardService.getTodaysPatients(doctor.id);
}
