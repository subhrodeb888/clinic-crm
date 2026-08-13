"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import {
  documentAuthorizationService,
  DocumentAuthorizationError,
} from "@/services/document-authorization.service";
import { documentService } from "@/services/document.service";

type DeleteDocumentResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function deleteDocument(
  documentId: string,
  patientId: string,
): Promise<DeleteDocumentResult> {
  if (!documentId) {
    return {
      success: false,
      error: "Document ID is required",
    };
  }

  if (!patientId) {
    return {
      success: false,
      error: "Patient ID is required",
    };
  }

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  try {
    await documentAuthorizationService.requireDocumentAccess(
      session,
      documentId,
      patientId,
    );

    await documentService.delete(documentId);

    revalidatePath(`/patients/${patientId}`);

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof DocumentAuthorizationError) {
      return {
        success: false,
        error: error.message,
      };
    }

    console.error("Failed to delete document:", error);

    return {
      success: false,
      error: "Failed to delete document",
    };
  }
}
