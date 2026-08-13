"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";

import {
  documentService,
  DocumentUploadError,
} from "@/services/document.service";
import {
  documentAuthorizationService,
  DocumentAuthorizationError,
} from "@/services/document-authorization.service";
import type { DocumentType } from "@/repositories/document.repository";
import { documentTypeEnum } from "@/db/schema";

// Build a set of allowed document types from the database enum.
const VALID_DOCUMENT_TYPES = new Set<DocumentType>(documentTypeEnum.enumValues);

// Define the possible return shapes: success with a document or failure with an error message.
type UploadDocumentResult =
  | {
      success: true;
      document: Awaited<ReturnType<typeof documentService.upload>>;
    }
  | { success: false; error: string };

// Server action that handles document uploads for a patient.
export async function uploadDocument(
  formData: FormData,
): Promise<UploadDocumentResult> {
  // Verify the user is logged in.
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  // Pull the submitted fields out of the form data.
  const patientId = formData.get("patientId");
  const documentType = formData.get("documentType");
  const file = formData.get("file");

  // Ensure a non-empty patient ID was provided.
  if (typeof patientId !== "string" || patientId.length === 0) {
    return { success: false, error: "patientId is required" };
  }

  // Cast the submitted type to our DocumentType for validation.
  const normalizedDocumentType = documentType as DocumentType;

  // Reject the request if the document type is missing or not in the allowed set.
  if (
    typeof documentType !== "string" ||
    !VALID_DOCUMENT_TYPES.has(normalizedDocumentType)
  ) {
    return { success: false, error: "documentType is invalid" };
  }

  // Confirm a real file was uploaded.
  if (!(file instanceof File)) {
    return { success: false, error: "file is required" };
  }

  // Refuse empty files.
  if (file.size === 0) {
    return { success: false, error: "file is empty" };
  }

  try {
    // Make sure the current user is allowed to access this patient's records.
    await documentAuthorizationService.requirePatientAccess(session, patientId);

    // Persist the file and create the document record.
    const document = await documentService.upload({
      patientId,
      uploadedBy: session.user.id,
      documentType: normalizedDocumentType,
      file,
    });

    // Clear the Next.js cache for the patient page so the new document appears.
    revalidatePath(`/patients/${patientId}`);

    return { success: true, document };
  } catch (error) {
    // Return a clean error message for known upload failures.
    if (error instanceof DocumentUploadError) {
      return { success: false, error: error.message };
    }

    // Return a clean error message for known permission failures.
    if (error instanceof DocumentAuthorizationError) {
      return { success: false, error: error.message };
    }

    // Log unexpected errors and return a generic failure response.
    console.error("Failed to upload document:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to upload document",
    };
  }
}
