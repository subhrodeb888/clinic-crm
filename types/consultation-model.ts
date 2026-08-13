export type ConsultationWithDetails = {
  id: string;

  status: "draft" | "completed";

  chiefComplaint: string | null;

  diagnosis: string | null;

  notes: string | null;

  aiSummary: string | null;
};

export type ConsultationHistoryItem = {
  id: string;

  diagnosis: string | null;

  createdAt: Date;
};

export type TimelineEvent = {
  date: Date;

  event: string;
};