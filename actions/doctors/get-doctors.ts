"use server";

import { doctorService } from "@/services/doctor.service";

export async function getDoctors() {
  return doctorService.getDoctors();
}
