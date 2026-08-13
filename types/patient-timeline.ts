export type PatientTimelineEvent = {
  id: string;
  type: "appointment" | "consultation" | "prescription";
  title: string;
  description: string;
  createdAt: Date;
};