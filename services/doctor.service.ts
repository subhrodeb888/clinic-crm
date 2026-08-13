import { doctorRepository } from "@/repositories/doctor.repository";

import { mapDoctorToUI } from "./mappers/doctor.mapper";

export class DoctorService {
  async getDoctors() {
    const doctors = await doctorRepository.getDoctors();

    return doctors.map(mapDoctorToUI);
  }

  async getDoctorsBySpecialization(specialization: string) {
    const doctors =
      await doctorRepository.getDoctorsBySpecialization(specialization);

    return doctors.map(mapDoctorToUI);
  }

  async getDoctor(id: string) {
    const doctor = await doctorRepository.getDoctorById(id);

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return mapDoctorToUI(doctor);
  }

  async getDoctorByUserId(userId: string) {
    const doctor = await doctorRepository.getDoctorByUserId(userId);

    if (!doctor) {
      throw new Error(
        "No doctor record is linked to the current user account. Please contact an administrator.",
      );
    }

    return mapDoctorToUI(doctor);
  }
}

export const doctorService = new DoctorService();
