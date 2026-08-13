import type { documents } from "@/db/schema";

export type Document = typeof documents.$inferSelect;

export type PatientDocument = Document & {
  uploadedByName: string | null;
};
