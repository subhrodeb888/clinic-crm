import { desc, eq, inArray } from "drizzle-orm";

import { db } from "@/db";
import {
  documents,
  documentStatusEnum,
  documentTypeEnum,
  users,
} from "@/db/schema";

export type DocumentType = (typeof documentTypeEnum.enumValues)[number];

export type DocumentStatus = (typeof documentStatusEnum.enumValues)[number];

export type Document = typeof documents.$inferSelect;

type DocumentInsert = typeof documents.$inferInsert;

export type CreateDocumentData = Pick<
  DocumentInsert,
  | "patientId"
  | "uploadedBy"
  | "filename"
  | "originalFilename"
  | "mimeType"
  | "fileSize"
  | "storagePath"
  | "documentType"
>;

export type UpdateDocumentData = Partial<
  Pick<
    DocumentInsert,
    | "filename"
    | "originalFilename"
    | "mimeType"
    | "fileSize"
    | "storagePath"
    | "documentType"
    | "status"
  >
>;

export class DocumentRepository {
  async create(data: CreateDocumentData) {
    const [document] = await db
      .insert(documents)
      .values(data)
      .returning();

    return document;
  }

  async getById(id: string) {
    const [document] = await db
      .select()
      .from(documents)
      .where(eq(documents.id, id));

    return document ?? null;
  }

  async getByPatient(patientId: string) {
    return db
      .select()
      .from(documents)
      .where(eq(documents.patientId, patientId))
      .orderBy(desc(documents.createdAt));
  }

  async getByPatientWithUploaderName(patientId: string) {
    const patientDocuments = await this.getByPatient(patientId);

    const userIds = [
      ...new Set(patientDocuments.map((doc) => doc.uploadedBy)),
    ];

    if (userIds.length === 0) {
      return patientDocuments.map((doc) => ({
        ...doc,
        uploadedByName: null as string | null,
      }));
    }

    const userRows = await db
      .select({ id: users.id, name: users.name })
      .from(users)
      .where(inArray(users.id, userIds));

    const userMap = new Map(userRows.map((user) => [user.id, user.name]));

    return patientDocuments.map((doc) => ({
      ...doc,
      uploadedByName: userMap.get(doc.uploadedBy) ?? null,
    }));
  }

  async update(id: string, data: UpdateDocumentData) {
    const [document] = await db
      .update(documents)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(documents.id, id))
      .returning();

    return document ?? null;
  }

  async delete(id: string): Promise<Document | null> {
    const [deleted] = await db
      .delete(documents)
      .where(eq(documents.id, id))
      .returning();

    return deleted ?? null;
  }
}

export const documentRepository = new DocumentRepository();
