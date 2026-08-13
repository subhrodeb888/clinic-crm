"use server";

import { auth } from "@/auth";

import { documentService } from "@/services/document.service";
import { documentAuthorizationService } from "@/services/document-authorization.service";

export async function getDocumentsByPatient(patientId: string) {
  const session = await auth();

  await documentAuthorizationService.requirePatientAccess(session, patientId);

  return documentService.getByPatient(patientId);
}
