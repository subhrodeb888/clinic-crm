import { relations } from "drizzle-orm"; // Imports Drizzle's relations helper for defining relationships between tables.

import {
  users,
  doctors,
  patients,
  appointments,
  consultations,
  prescriptions,
  prescriptionItems,
  invoices,
  invoiceItems,
  reminders,
  notifications,
  activityLogs,
  aiUsageLogs,
  documents,
  documentChunks,
  chatSessions,
  chatMessages,
} from "@/db/schema"; // Imports all database tables used in these relationships.

// Defines the relationships for the users table.
export const usersRelations = relations(users, ({ many }) => ({
  notifications: many(notifications), // One user can have many notifications.

  activityLogs: many(activityLogs), // One user can have many activity log records.

  aiUsageLogs: many(aiUsageLogs), // One user can have many AI usage log records.

  documents: many(documents), // One user can upload many documents.

  chatSessions: many(chatSessions), // One user can have many chat sessions.
}));

// Defines the relationships for the doctors table.
export const doctorsRelations = relations(doctors, ({ many }) => ({
  appointments: many(appointments), // One doctor can have many appointments.

  consultations: many(consultations), // One doctor can have many consultations.
}));

// Defines the relationships for the patients table.
export const patientsRelations = relations(patients, ({ many }) => ({
  appointments: many(appointments), // One patient can have many appointments.

  consultations: many(consultations), // One patient can have many consultations.

  invoices: many(invoices), // One patient can have many invoices.

  reminders: many(reminders), // One patient can have many reminders.

  documents: many(documents), // One patient can have many medical documents.

  chatSessions: many(chatSessions), // One patient can have many AI chat sessions.
}));

// Defines the relationships for the appointments table.
export const appointmentsRelations = relations(appointments, ({ one }) => ({
  patient: one(patients, {
    fields: [appointments.patientId], // Uses the appointment's patientId to identify the patient.

    references: [patients.id], // Matches patientId with the patient's primary key.
  }),

  doctor: one(doctors, {
    fields: [appointments.doctorId], // Uses the appointment's doctorId to identify the doctor.

    references: [doctors.id], // Matches doctorId with the doctor's primary key.
  }),
}));

// Defines the relationships for the consultations table.
export const consultationsRelations = relations(
  consultations,
  ({ one, many }) => ({
    patient: one(patients, {
      fields: [consultations.patientId], // Uses the consultation's patientId to identify the patient.

      references: [patients.id], // Matches patientId with the patient's primary key.
    }),

    doctor: one(doctors, {
      fields: [consultations.doctorId], // Uses the consultation's doctorId to identify the doctor.

      references: [doctors.id], // Matches doctorId with the doctor's primary key.
    }),

    prescriptions: many(prescriptions), // One consultation can have many prescriptions.
  }),
);

// Defines the relationships for the documents table.
export const documentRelations = relations(documents, ({ one, many }) => ({
  patient: one(patients, {
    fields: [documents.patientId], // Uses the document's patientId to identify the patient.

    references: [patients.id], // Matches patientId with the patient's primary key.
  }),

  uploadedBy: one(users, {
    fields: [documents.uploadedBy], // Uses uploadedBy to identify the user who uploaded the document.

    references: [users.id], // Matches uploadedBy with the user's primary key.
  }),

  chunks: many(documentChunks), // One document can be divided into many chunks.
}));

// Defines the relationships for the documentChunks table.
export const documentChunksRelations = relations(documentChunks, ({ one }) => ({
  document: one(documents, {
    fields: [documentChunks.documentId], // Uses documentId to identify the parent document.

    references: [documents.id], // Matches documentId with the document's primary key.
  }),
}));

// Defines the relationships for the chatSessions table.
export const chatSessionsRelations = relations(
  chatSessions,
  ({ one, many }) => ({
    patient: one(patients, {
      fields: [chatSessions.patientId], // Uses patientId to identify which patient the chat belongs to.

      references: [patients.id], // Matches patientId with the patient's primary key.
    }),

    user: one(users, {
      fields: [chatSessions.userId], // Uses userId to identify the user who owns the chat session.

      references: [users.id], // Matches userId with the user's primary key.
    }),

    messages: many(chatMessages), // One chat session can contain many messages.
  }),
);

// Defines the relationships for the chatMessages table.
export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [chatMessages.sessionId], // Uses sessionId to identify the chat session.

    references: [chatSessions.id], // Matches sessionId with the session's primary key.
  }),
}));

// Defines the relationships for the prescriptions table.
export const prescriptionsRelations = relations(
  prescriptions,
  ({ one, many }) => ({
    consultation: one(consultations, {
      fields: [prescriptions.consultationId], // Uses consultationId to identify the consultation.

      references: [consultations.id], // Matches consultationId with the consultation's primary key.
    }),

    items: many(prescriptionItems), // One prescription can contain many prescription items.
  }),
);

// Defines the relationships for the prescriptionItems table.
export const prescriptionItemsRelations = relations(
  prescriptionItems,
  ({ one }) => ({
    prescription: one(prescriptions, {
      fields: [prescriptionItems.prescriptionId], // Uses prescriptionId to identify the prescription.

      references: [prescriptions.id], // Matches prescriptionId with the prescription's primary key.
    }),
  }),
);

// Defines the relationships for the invoices table.
export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  patient: one(patients, {
    fields: [invoices.patientId], // Uses patientId to identify the patient who owns the invoice.

    references: [patients.id], // Matches patientId with the patient's primary key.
  }),

  items: many(invoiceItems), // One invoice can contain many invoice items.
}));

// Defines the relationships for the invoiceItems table.
export const invoiceItemsRelations = relations(invoiceItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [invoiceItems.invoiceId], // Uses invoiceId to identify the parent invoice.

    references: [invoices.id], // Matches invoiceId with the invoice's primary key.
  }),
}));

// Defines the relationships for the reminders table.
export const remindersRelations = relations(reminders, ({ one }) => ({
  patient: one(patients, {
    fields: [reminders.patientId], // Uses patientId to identify the patient receiving the reminder.

    references: [patients.id], // Matches patientId with the patient's primary key.
  }),
}));

// Defines the relationships for the notifications table.
export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId], // Uses userId to identify the user receiving the notification.

    references: [users.id], // Matches userId with the user's primary key.
  }),
}));

// Defines the relationships for the activityLogs table.
export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId], // Uses userId to identify which user performed the activity.

    references: [users.id], // Matches userId with the user's primary key.
  }),
}));

// Defines the relationships for the aiUsageLogs table.
export const aiUsageLogsRelations = relations(aiUsageLogs, ({ one }) => ({
  user: one(users, {
    fields: [aiUsageLogs.userId], // Uses userId to identify which user used the AI feature.

    references: [users.id], // Matches userId with the user's primary key.
  }),
}));
