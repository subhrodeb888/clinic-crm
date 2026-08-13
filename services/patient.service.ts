import {
  createPatientSchema,
  patientSearchSchema,
  updatePatientSchema,
  type CreatePatientInput,
  type PatientSearchInput,
  type UpdatePatientInput,
} from "@/validations/patient.schema";

import { patientRepository } from "@/repositories/patient.repository";

import { mapPatientToUI } from "./mappers/patient.mapper";

import { activityService } from "./activity.service";
import { invoiceService } from "./invoice.service";

import { ACTIVITY_ACTIONS } from "@/lib/activity/actions";

export class PatientService {
  async createPatient(data: CreatePatientInput) {
    const validated = createPatientSchema.parse(data);

    const patient = await patientRepository.createPatient(validated);

    try {
      await activityService.log({
        action: ACTIVITY_ACTIONS.PATIENT_CREATED,

        entityType: "patient",

        entityId: patient.id,
      });
    } catch (error) {
      console.error(error);
    }

    return patient;
  }

  async updatePatient(id: string, data: UpdatePatientInput) {
    const existing = await patientRepository.getPatientById(id);

    if (!existing) {
      throw new Error("Patient not found");
    }

    const validated = updatePatientSchema.parse(data);

    const patient = await patientRepository.updatePatient(id, validated);

    try {
      await activityService.log({
        action: ACTIVITY_ACTIONS.PATIENT_UPDATED,

        entityType: "patient",

        entityId: patient.id,
      });
    } catch (error) {
      console.error(error);
    }

    return patient;
  }

  async deletePatient(id: string) {
    const existing = await patientRepository.getPatientById(id);

    if (!existing) {
      throw new Error("Patient not found");
    }

    const patient = await patientRepository.deletePatient(id);

    try {
      await activityService.log({
        action: ACTIVITY_ACTIONS.PATIENT_DELETED,

        entityType: "patient",

        entityId: id,
      });
    } catch (error) {
      console.error(error);
    }

    return patient;
  }

  async getPatient(id: string) {
    const patient = await patientRepository.getPatientById(id);

    if (!patient) {
      throw new Error("Patient not found");
    }

    return mapPatientToUI(patient);
  }

  async getPatients() {
    const [patients, balances] = await Promise.all([
      patientRepository.getPatients(),
      invoiceService.getOutstandingBalancesByPatient(),
    ]);

    const balanceByPatient = new Map(
      balances.map((item) => [item.patientId, Number(item.balance ?? 0)]),
    );

    return patients.map((patient) =>
      mapPatientToUI({
        ...patient,
        balance: balanceByPatient.get(patient.id) ?? 0,
      }),
    );
  }

  async searchPatients(filters: PatientSearchInput) {
    const validated = patientSearchSchema.parse(filters);

    const patients = await patientRepository.searchPatients(validated);

    return patients.map(mapPatientToUI);
  }

  async assignDoctor(patientId: string, doctorId: string) {
    const patient = await patientRepository.getPatientById(patientId);

    if (!patient) {
      throw new Error("Patient not found");
    }

    const updatedPatient = await patientRepository.updatePatient(patientId, {
      assignedDoctorId: doctorId,
    });

    try {
      await activityService.log({
        action: ACTIVITY_ACTIONS.DOCTOR_ASSIGNED,

        entityType: "patient",

        entityId: patientId,

        metadata: {
          doctorId,
        },
      });
    } catch (error) {
      console.error(error);
    }

    return updatedPatient;
  }

  async changePatientStatus(
    patientId: string,
    status: "active" | "inactive" | "follow_up" | "high_risk",
  ) {
    const patient = await patientRepository.getPatientById(patientId);

    if (!patient) {
      throw new Error("Patient not found");
    }

    const updatedPatient = await patientRepository.updatePatient(patientId, {
      status,
    });

    try {
      await activityService.log({
        action: ACTIVITY_ACTIONS.PATIENT_STATUS_CHANGED,

        entityType: "patient",

        entityId: patientId,

        metadata: {
          status,
        },
      });
    } catch (error) {
      console.error(error);
    }

    return updatedPatient;
  }

  async updateLastVisit(patientId: string, lastVisit: Date) {
    return patientRepository.updateLastVisit(patientId, lastVisit);
  }
}

export const patientService = new PatientService();
