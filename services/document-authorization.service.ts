import type { Session } from "next-auth";

import { doctorRepository } from "@/repositories/doctor.repository";
import {
  documentRepository,
  type Document,
} from "@/repositories/document.repository";
import { patientRepository } from "@/repositories/patient.repository";

export class DocumentAuthorizationError extends Error {
  constructor(
    message: string,
    readonly code: "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND",
  ) {
    super(message);
    this.name = "DocumentAuthorizationError";
  }
}

export class DocumentAuthorizationService {
  async requirePatientAccess(session: Session | null, patientId: string) {
    if (!session?.user?.id) {
      throw new DocumentAuthorizationError("Unauthorized", "UNAUTHORIZED");
    }

    const patient = await patientRepository.getPatientById(patientId);

    if (!patient) {
      throw new DocumentAuthorizationError("Patient not found", "NOT_FOUND");
    }

    if (this.canAccessAllPatients(session.user.role)) {
      return patient;
    }

    if (session.user.role === "doctor") {
      const doctor = await doctorRepository.getDoctorByUserId(session.user.id);

      if (doctor && patient.assignedDoctorId === doctor.id) {
        return patient;
      }
    }

    throw new DocumentAuthorizationError("Forbidden", "FORBIDDEN");
  }

  async requireDocumentAccess(
    session: Session | null,
    documentId: string,
    patientId: string,
  ): Promise<Document> {
    const document = await documentRepository.getById(documentId);

    if (!document || document.patientId !== patientId) {
      throw new DocumentAuthorizationError("Document not found", "NOT_FOUND");
    }

    await this.requirePatientAccess(session, document.patientId);

    return document;
  }

  private canAccessAllPatients(role: string | undefined) {
    return role === "admin" || role === "receptionist";
  }
}

export const documentAuthorizationService =
  new DocumentAuthorizationService();
