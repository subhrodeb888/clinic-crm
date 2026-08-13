import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core"; // Imports Drizzle functions for defining PostgreSQL tables and columns.

import { patients } from "./patients"; // Imports the patients table so documents can be linked to a patient.
import { users } from "./auth"; // Imports the users table so documents can be linked to the user who uploaded them.

// Defines the possible processing statuses of a medical document.
export const documentStatusEnum = pgEnum("document_status", [
  "UPLOADED", // The document has been uploaded but processing has not started.
  "PROCESSING", // The document is currently being processed.
  "READY", // The document has been successfully processed and is ready to use.
  "FAILED", // Processing the document failed.
]);

// Defines the possible types of medical documents.
export const documentTypeEnum = pgEnum("document_type", [
  "LAB_REPORT", // A laboratory or blood test report.
  "PRESCRIPTION", // A doctor's prescription.
  "DISCHARGE_SUMMARY", // A summary given when a patient leaves a hospital.
  "MRI", // An MRI scan report or document.
  "CT_SCAN", // A CT scan report or document.
  "X_RAY", // An X-ray report or document.
  "REFERRAL", // A referral document from one healthcare provider to another.
  "CONSULTATION_NOTE", // Notes written during a medical consultation.
  "OTHER", // Any document that does not fit the above categories.
]);

export const documents = pgTable("documents", {
  id: uuid("id").defaultRandom().primaryKey(), // Creates a unique ID for each document.

  patientId: uuid("patient_id")
    .notNull()
    .references(() => patients.id, {
      onDelete: "cascade",
    }), // Links the document to a patient and deletes the document if that patient is deleted.

  uploadedBy: text("uploaded_by")
    .notNull()
    .references(() => users.id), // Stores which user uploaded the document.

  filename: text("filename").notNull(), // Stores the internal filename used by the application.

  originalFilename: text("original_filename").notNull(), // Stores the original filename given by the user.

  mimeType: text("mime_type").notNull(), // Stores the file type such as application/pdf or image/png.

  fileSize: integer("file_size").notNull(), // Stores the size of the uploaded file.

  storagePath: text("storage_path").notNull(), // Stores the location/path where the file is stored.

  documentType: documentTypeEnum("document_type").notNull().default("OTHER"), // Stores what type of medical document this is.

  status: documentStatusEnum("status").notNull().default("UPLOADED"), // Stores the current processing status of the document.

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(), // Stores when the document was created.

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(), // Stores when the document was last updated.
});
