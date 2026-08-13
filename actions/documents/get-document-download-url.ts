"use server";

import { auth } from "@/auth";

import {
  documentAuthorizationService,
  DocumentAuthorizationError,
} from "@/services/document-authorization.service";
import { storageService } from "@/services/storage.service";

type Result =
  | {
      success: true;
      url: string;
    }
  | {
      success: false;
      error: string;
    };

export async function getDocumentDownloadUrl(
  documentId: string,
  patientId: string,
): Promise<Result> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  try {
    const document = await documentAuthorizationService.requireDocumentAccess(
      session,
      documentId,
      patientId,
    );

    const url = await storageService.getSignedUrl(document.storagePath);

    return {
      success: true,
      url,
    };
  } catch (error) {
    if (error instanceof DocumentAuthorizationError) {
      return {
        success: false,
        error: error.message,
      };
    }

    console.error("Failed to create document download URL:", error);

    return {
      success: false,
      error: "Failed to create document download URL",
    };
  }
}
